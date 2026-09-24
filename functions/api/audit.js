/**
 * Cloudflare Pages Function: /api/audit
 * User Activity, Navigation & Cellular Traffic Spend Gateway for Xylen Platform.
 * 
 * Tracks:
 * 1. Who is using the app (userId, testerName, model, platform).
 * 2. Who is visiting where (currentScreen, lastSeen).
 * 3. What they are using (actions, features triggered).
 * 4. Who is spending how much (sessionBytes, todayBytes, totalBytes, carrier).
 */

const memoryStore = {
  users: new Map(),
  activities: [],
  maxActivities: 200
};

function responseHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: responseHeaders()
  });
}

export async function onRequestGet({ request, env }) {
  const now = Date.now();

  let users = [];
  let activities = [];

  // 1. Check persistent Cloudflare KV
  if (env && env.XYLEN_KV) {
    try {
      const storedUsers = await env.XYLEN_KV.get('audit_users_json', 'json');
      if (Array.isArray(storedUsers)) users = storedUsers;
      const storedActs = await env.XYLEN_KV.get('audit_activities_json', 'json');
      if (Array.isArray(storedActs)) activities = storedActs;
    } catch (_) {}
  }

  // 2. Fallback to memoryStore
  if (users.length === 0 && memoryStore.users.size > 0) {
    users = Array.from(memoryStore.users.values());
  }
  if (activities.length === 0 && memoryStore.activities.length > 0) {
    activities = memoryStore.activities;
  }

  // Public endpoint returns aggregate counts only. Device identities, screen
  // names, carrier details and activity records are served by /api/admin.
  const onlineUsers = users.filter(u => u.status !== 'offline' && now - (u.lastSeenMs || 0) < 75000);
  const responsePayload = {
    ok: true,
    serverTime: now,
    totalUsersCount: users.length,
    onlineUsersCount: onlineUsers.length,
    todayBytes: users.reduce((total, user) => total + (Number(user.todayBytes) || 0), 0),
    activityCount: activities.length,
    lastActivityAt: activities.length ? activities[0].timestamp : null
  };

  return new Response(JSON.stringify(responsePayload, null, 2), {
    status: 200,
    headers: responseHeaders()
  });
}

export async function onRequestPost({ request, env }) {
  try {
    const bodyText = await request.text();
    if (new TextEncoder().encode(bodyText).byteLength > 12000) {
      return new Response(JSON.stringify({ ok: false, error: 'Payload too large' }), {
        status: 413,
        headers: responseHeaders()
      });
    }
    const data = JSON.parse(bodyText);
    if (!data) {
      return new Response(JSON.stringify({ ok: false, error: 'Empty body' }), {
        status: 400,
        headers: responseHeaders()
      });
    }

    const now = Date.now();
    const userId = String(data.userId || data.deviceId || '').trim().slice(0, 96);
    if (!userId) {
      return new Response(JSON.stringify({ ok: false, error: 'A stable device id is required' }), {
        status: 400,
        headers: responseHeaders()
      });
    }
    const testerName = String(data.testerName || data.userName || userId).trim().slice(0, 100);
    const model = String(data.model || data.deviceModel || 'Mobile device').trim().slice(0, 120);
    const platform = String(data.platform || 'Android').trim().slice(0, 32);
    const currentScreen = String(data.currentScreen || data.screen || 'Home').trim().slice(0, 100);
    const lastAction = String(data.action || data.lastAction || 'App activity').trim().slice(0, 160);
    const actionDetails = String(data.details || '').trim().slice(0, 1000);
    const carrier = String(data.carrier || data.activeCarrier || 'Cellular').trim().slice(0, 100);
    const asCounter = value => Number.isFinite(Number(value)) ? Math.max(0, Math.min(Number(value), Number.MAX_SAFE_INTEGER)) : 0;
    const todayBytes = asCounter(data.todayBytes);
    const sessionBytes = asCounter(data.sessionBytes);
    const totalBytes = asCounter(data.totalBytes) || todayBytes;

    const existingUser = memoryStore.users.get(userId) || {};

    const updatedUser = {
      userId,
      testerName: testerName || existingUser.testerName || userId,
      model,
      platform,
      currentScreen,
      lastAction,
      carrier,
      todayBytes: Math.max(todayBytes, existingUser.todayBytes || 0),
      sessionBytes,
      totalBytes: Math.max(totalBytes, existingUser.totalBytes || 0),
      status: data.status === 'offline' ? 'offline' : 'online',
      lastSeenMs: now,
      lastSeenIso: new Date(now).toISOString()
    };

    // Update memoryStore
    memoryStore.users.set(userId, updatedUser);

    const activityEntry = {
      id: 'act-' + now + '-' + Math.random().toString(36).substring(2, 6),
      userId,
      testerName: updatedUser.testerName,
      model,
      screen: currentScreen,
      action: lastAction,
      details: actionDetails,
      carrier,
      bytesDelta: asCounter(data.bytesDelta),
      todayBytes: updatedUser.todayBytes,
      timestamp: now,
      timeDisplay: new Date(now).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    if (data.action || data.logEvent !== false) {
      memoryStore.activities.unshift(activityEntry);
      if (memoryStore.activities.length > memoryStore.maxActivities) {
        memoryStore.activities.pop();
      }
    }

    // Persist to Cloudflare KV
    if (env && env.XYLEN_KV) {
      try {
        let allUsers = [];
        const storedUsers = await env.XYLEN_KV.get('audit_users_json', 'json');
        if (Array.isArray(storedUsers)) allUsers = storedUsers;
        const idx = allUsers.findIndex(u => u.userId === userId);
        if (idx >= 0) {
          allUsers[idx] = updatedUser;
        } else {
          allUsers.push(updatedUser);
        }
        await env.XYLEN_KV.put('audit_users_json', JSON.stringify(allUsers));

        if (data.action || data.logEvent !== false) {
          let allActs = [];
          const storedActs = await env.XYLEN_KV.get('audit_activities_json', 'json');
          if (Array.isArray(storedActs)) allActs = storedActs;
          allActs.unshift(activityEntry);
          if (allActs.length > 200) allActs = allActs.slice(0, 200);
          await env.XYLEN_KV.put('audit_activities_json', JSON.stringify(allActs));
        }
      } catch (_) {}
    }

    return new Response(JSON.stringify({ ok: true, registeredUser: updatedUser }), {
      status: 200,
        headers: responseHeaders()
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: responseHeaders()
    });
  }
}
