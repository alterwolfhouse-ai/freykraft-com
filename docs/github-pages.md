# GitHub Pages Deployment

GitHub Pages is the static launch-page path for Freykraft. It does not run Node.js, so API routes are not available after export.

## What Works

- Homepage
- Images
- SEO metadata
- Static email form UI
- Third-party email capture endpoint through `public/freykraft-config.js`

## What Does Not Work

- `/api/subscribe`
- `/api/health`
- Stripe webhooks
- Admin, database, checkout, or server-side order workflows

Those require Hostinger Node.js, Vercel, Railway, Render, or a VPS.

## Build Locally

```bash
npm.cmd run build:pages
```

The static export is generated in `out/`.

## Email Capture

Before collecting real emails, set a real endpoint in `public/freykraft-config.js`:

```js
window.FREYKRAFT_CONFIG = {
  emailCaptureEndpoint: "https://formspree.io/f/your-form-id"
};
```

Good temporary choices: Formspree, Getform, Basin, Klaviyo, or Brevo.

## GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` builds and deploys `out/` on every push to `main`.

In the GitHub repository:

1. Open `Settings -> Pages`.
2. Set source to `GitHub Actions`.
3. Push to `main`.
4. Check the workflow result and open the Pages URL.
