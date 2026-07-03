# Hostinger Deployment

Freykraft should be deployed as a Hostinger Node.js Web App, not as a static shared-hosting upload. The app uses Next.js runtime features and API routes, so static hosting would break `/api/subscribe`.

## Required Hostinger Plan

Use one of Hostinger's Node.js Web App-capable plans:

- Business Web Hosting
- Cloud Startup or higher
- VPS, only if you want to manage the server manually

## Recommended Path

Use Hostinger hPanel Node.js Web App with GitHub integration.

Hostinger setup values:

- Framework: `Next.js`
- Node.js version: `24.x`
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm run start`
- Health check URL: `/api/health`
- Production domain: `freykraft.com`

## Environment Variables

Set these in Hostinger before first production deploy:

```bash
NEXT_PUBLIC_SITE_URL=https://freykraft.com
EMAIL_CAPTURE_WEBHOOK_URL=
EMAIL_CAPTURE_WEBHOOK_SECRET=
DATABASE_URL=
```

Do not set `EMAIL_CAPTURE_ALLOW_LOCAL_STORE=true` in production. That flag is only for local production-preview testing.

## Verification After Deploy

Check these URLs after deployment:

- `https://freykraft.com`
- `https://freykraft.com/api/health`

Then submit a real test email through the homepage and confirm it reaches the configured email provider.

## ZIP Fallback

If GitHub is not connected yet, Hostinger also supports uploading a compressed project ZIP. Use GitHub for ongoing work because it enables automatic redeployment after commits.
