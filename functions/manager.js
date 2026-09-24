import { denied, requireOwner } from './api/_access.js';

export async function onRequestGet({ request, env }) {
  if (!await requireOwner(request, env)) return denied();
  return Response.redirect(new URL('/#admin', request.url), 302);
}
