const encoder = new TextEncoder();
let cachedKeys;
let keysExpireAt = 0;

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function getJwks(teamDomain) {
  if (cachedKeys && Date.now() < keysExpireAt) return cachedKeys;
  const response = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`, {
    headers: { Accept: 'application/json' },
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  if (!response.ok) throw new Error('Unable to load Access signing keys');
  cachedKeys = await response.json();
  keysExpireAt = Date.now() + 5 * 60 * 1000;
  return cachedKeys;
}

export async function requireOwner(request, env) {
  const teamDomain = String(env.XYLEN_ACCESS_TEAM_DOMAIN || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const ownerEmail = String(env.XYLEN_ADMIN_EMAIL || '').trim().toLowerCase();
  const audience = String(env.XYLEN_ACCESS_AUD || '').trim();
  if (!teamDomain || !ownerEmail || !audience) return false;

  const token = request.headers.get('CF-Access-Jwt-Assertion');
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const header = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[0])));
    const claims = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[1])));
    if (header.alg !== 'RS256' || !header.kid) return false;
    const issuer = `https://${teamDomain}`;
    if (claims.iss !== issuer || !Array.isArray(claims.aud) || !claims.aud.includes(audience)) return false;
    if (String(claims.email || '').toLowerCase() !== ownerEmail) return false;
    if (!Number.isFinite(claims.exp) || claims.exp <= Date.now() / 1000) return false;
    if (claims.nbf && claims.nbf > Date.now() / 1000) return false;

    const keys = await getJwks(teamDomain);
    const jwk = (keys.keys || []).find(key => key.kid === header.kid && key.kty === 'RSA');
    if (!jwk) return false;
    const publicKey = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const signedData = encoder.encode(`${parts[0]}.${parts[1]}`);
    return await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, decodeBase64Url(parts[2]), signedData);
  } catch (_) {
    return false;
  }
}

export function denied() {
  return new Response(JSON.stringify({ ok: false, error: 'Owner authentication required' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}
