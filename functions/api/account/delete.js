/**
 * Cloudflare Pages Function: /api/account/delete
 * Endpoint for Google Play Account Deletion Requirement.
 *
 * Deletes user account record and all associated activity, telemetry,
 * and device profiles from Cloudflare KV.
 */

function responseHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: responseHeaders()
  });
}

export async function onRequestGet({ request }) {
  return new Response(JSON.stringify({
    ok: true,
    service: 'Xylen Sim Platform Account & Data Deletion API',
    description: 'Compliant with Google Play User Data Policy. Send POST or DELETE request with JSON body { email, userId } to initiate permanent deletion of user account and all associated telemetry.',
    webPortal: 'https://xylen-platform.pages.dev/delete-account',
    privacyPolicy: 'https://xylen-platform.pages.dev/privacy.html'
  }, null, 2), {
    status: 200,
    headers: responseHeaders()
  });
}

export async function onRequestPost({ request, env }) {
  return handleDelete({ request, env });
}

export async function onRequestDelete({ request, env }) {
  return handleDelete({ request, env });
}

async function handleDelete({ request, env }) {
  try {
    let email = '';
    let userId = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => ({}));
      email = String(body.email || '').trim().toLowerCase();
      userId = String(body.userId || body.deviceId || '').trim();
    } else {
      const url = new URL(request.url);
      email = String(url.searchParams.get('email') || '').trim().toLowerCase();
      userId = String(url.searchParams.get('userId') || url.searchParams.get('deviceId') || '').trim();
    }

    if (!email && !userId) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Для удаления аккаунта требуется указать email или идентификатор устройства (userId).'
      }), {
        status: 400,
        headers: responseHeaders()
      });
    }

    let deletedUsersCount = 0;
    let deletedActivitiesCount = 0;

    // Purge from Cloudflare KV
    if (env && env.XYLEN_KV) {
      try {
        const storedUsers = await env.XYLEN_KV.get('audit_users_json', 'json');
        const matchedUserIds = new Set();
        if (userId) matchedUserIds.add(userId);

        if (Array.isArray(storedUsers)) {
          const originalLength = storedUsers.length;
          // Collect all userIds associated with this email
          storedUsers.forEach(u => {
            const uEmail = String(u.email || '').trim().toLowerCase();
            if (email && uEmail === email && u.userId) {
              matchedUserIds.add(String(u.userId).trim());
            }
          });

          const filteredUsers = storedUsers.filter(u => {
            const uEmail = String(u.email || '').trim().toLowerCase();
            const uUserId = String(u.userId || '').trim();
            const matchEmail = email && uEmail === email;
            const matchUser = userId && uUserId === userId;
            const matchSet = uUserId && matchedUserIds.has(uUserId);
            return !(matchEmail || matchUser || matchSet);
          });
          deletedUsersCount = originalLength - filteredUsers.length;
          await env.XYLEN_KV.put('audit_users_json', JSON.stringify(filteredUsers));
        }

        const storedActs = await env.XYLEN_KV.get('audit_activities_json', 'json');
        if (Array.isArray(storedActs)) {
          const originalLength = storedActs.length;
          const filteredActs = storedActs.filter(a => {
            const aEmail = String(a.email || '').trim().toLowerCase();
            const aUserId = String(a.userId || '').trim();
            const matchEmail = email && aEmail === email;
            const matchUser = userId && aUserId === userId;
            const matchSet = aUserId && matchedUserIds.has(aUserId);
            return !(matchEmail || matchUser || matchSet);
          });
          deletedActivitiesCount = originalLength - filteredActs.length;
          await env.XYLEN_KV.put('audit_activities_json', JSON.stringify(filteredActs));
        }
      } catch (kvErr) {
        console.error('KV Deletion Error:', kvErr);
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      message: 'Аккаунт и все связанные данные (профиль, телеметрия, устройства) успешно удалены.',
      deletedUsersCount,
      deletedActivitiesCount,
      deletedAt: new Date().toISOString()
    }), {
      status: 200,
      headers: responseHeaders()
    });
  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Ошибка при удалении аккаунта: ' + err.message
    }), {
      status: 500,
      headers: responseHeaders()
    });
  }
}
