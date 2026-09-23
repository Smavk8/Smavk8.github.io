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

// In-memory cache on Cloudflare edge isolate
const memoryStore = {
  users: new Map(),
  activities: [],
  maxActivities: 150
};

// Default seed if completely fresh
function ensureSeed() {
  if (memoryStore.users.size === 0) {
    // Empty by default for 100% real reporting
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Device-Id',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders()
  });
}

export async function onRequestGet({ request }) {
  ensureSeed();
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);

  const usersArray = Array.from(memoryStore.users.values()).sort((a, b) => b.lastSeenMs - a.lastSeenMs);
  const now = Date.now();

  // Mark as offline if no heartbeat for > 60 seconds
  const resolvedUsers = usersArray.map(u => ({
    ...u,
    status: (now - u.lastSeenMs < 75000) ? 'online' : 'offline'
  }));

  const responsePayload = {
    ok: true,
    serverTime: now,
    totalUsersCount: resolvedUsers.length,
    onlineUsersCount: resolvedUsers.filter(u => u.status === 'online').length,
    users: resolvedUsers,
    recentActivities: memoryStore.activities.slice(0, limit)
  };

  return new Response(JSON.stringify(responsePayload, null, 2), {
    status: 200,
    headers: corsHeaders()
  });
}

export async function onRequestPost({ request }) {
  try {
    const data = await request.json();
    if (!data) {
      return new Response(JSON.stringify({ ok: false, error: 'Empty body' }), {
        status: 400,
        headers: corsHeaders()
      });
    }

    const now = Date.now();
    const userId = String(data.userId || data.deviceId || 'user-' + Math.random().toString(36).substring(2, 8)).trim();
    const testerName = String(data.testerName || data.userName || userId).trim();
    const model = String(data.model || data.deviceModel || 'Смартфон').trim();
    const platform = String(data.platform || 'Android').trim();
    const currentScreen = String(data.currentScreen || data.screen || 'Главная').trim();
    const lastAction = String(data.action || data.lastAction || 'Активность в приложении').trim();
    const actionDetails = String(data.details || '').trim();
    const carrier = String(data.carrier || data.activeCarrier || 'Сотовая связь').trim();
    const todayBytes = Number(data.todayBytes) || 0;
    const sessionBytes = Number(data.sessionBytes) || 0;
    const totalBytes = Number(data.totalBytes) || todayBytes;

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
      status: 'online',
      lastSeenMs: now,
      lastSeenIso: new Date(now).toISOString()
    };

    memoryStore.users.set(userId, updatedUser);

    // If an action was performed, record it in the activity feed
    if (data.action || data.logEvent !== false) {
      const activityEntry = {
        id: 'act-' + now + '-' + Math.random().toString(36).substring(2, 6),
        userId,
        testerName: updatedUser.testerName,
        model,
        screen: currentScreen,
        action: lastAction,
        details: actionDetails,
        carrier,
        bytesDelta: Number(data.bytesDelta) || 0,
        todayBytes: updatedUser.todayBytes,
        timestamp: now,
        timeDisplay: new Date(now).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      memoryStore.activities.unshift(activityEntry);
      if (memoryStore.activities.length > memoryStore.maxActivities) {
        memoryStore.activities.pop();
      }
    }

    return new Response(JSON.stringify({ ok: true, registeredUser: updatedUser }), {
      status: 200,
      headers: corsHeaders()
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: corsHeaders()
    });
  }
}
