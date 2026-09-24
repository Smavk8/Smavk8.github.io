import { denied, requireOwner } from './_access.js';

const memoryStore = { users: new Map(), activities: [] };

export async function onRequestGet({ request, env }) {
  if (!await requireOwner(request, env)) return denied();

  let users = Array.from(memoryStore.users.values());
  let activities = memoryStore.activities;
  if (env && env.XYLEN_KV) {
    try {
      const storedUsers = await env.XYLEN_KV.get('audit_users_json', 'json');
      const storedActivities = await env.XYLEN_KV.get('audit_activities_json', 'json');
      if (Array.isArray(storedUsers)) users = storedUsers;
      if (Array.isArray(storedActivities)) activities = storedActivities;
    } catch (_) {
      return new Response(JSON.stringify({ ok: false, error: 'Audit storage is unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
      });
    }
  }

  const now = Date.now();
  users = users
    .map(user => ({
      ...user,
      status: user.status !== 'offline' && now - (user.lastSeenMs || 0) < 75000 ? 'online' : 'offline'
    }))
    .sort((a, b) => (b.lastSeenMs || 0) - (a.lastSeenMs || 0));
  return new Response(JSON.stringify({ ok: true, serverTime: now, users, recentActivities: activities.slice(0, 200) }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
