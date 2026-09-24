# Owner-only manager access

The manager API is fail-closed. Before using the manager in production:

1. Create a Cloudflare Access self-hosted application covering `xylen-platform.pages.dev/manager*` and `xylen-platform.pages.dev/api/admin*`.
2. Add an allow policy for the owner's exact email address. Do not add a public or `Everyone` policy.
3. Set these Cloudflare Pages Functions environment variables in both Preview and Production:
   - `XYLEN_ACCESS_TEAM_DOMAIN`: the Access team hostname, for example `example.cloudflareaccess.com` (hostname only).
   - `XYLEN_ACCESS_AUD`: the audience tag for the Access application protecting the manager paths.
   - `XYLEN_ADMIN_EMAIL`: the one owner email allowed by the function.
4. Deploy the Pages Functions and confirm an unauthenticated request to `/api/admin` returns 401, while the owner's authenticated request succeeds.

The application independently verifies the Access JWT signature, issuer, audience, expiry, and owner email. Missing configuration denies access. Keep `/api/audit` public only for its aggregate summary and mobile-client POSTs; it does not return device identities or activity records.

## Current client coverage

Android submits device identity, model, platform, current screen, action details, carrier, and its current session/today traffic counters to `/api/audit` after privacy consent. The iOS app currently records activity locally and does not submit device or SIM data to this site. Do not describe iOS devices as live web telemetry until that client integration exists.
