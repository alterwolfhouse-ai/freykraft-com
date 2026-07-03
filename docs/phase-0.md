# Phase 0 Foundation

## Goal

Ship the Freykraft pre-launch surface first, while keeping the project ready for catalog, checkout, admin, and analytics work.

## Included Now

- Freykraft brand tokens: cream, sand, taupe, ink, terracotta, olive, and bronze
- Pre-launch homepage with email capture
- Provider-ready `/api/subscribe` route
- Development subscriber log for local testing only
- Initial Prisma schema for the commerce backbone
- Generated hero image saved under `public/images/freykraft-hero-still-life.png`

## External Setup Still Required

- Email provider or automation endpoint for `EMAIL_CAPTURE_WEBHOOK_URL`
- Production database URL
- Stripe and Stripe Tax accounts
- Shipping provider decision: EasyPost or Shippo
- CMS decision: Sanity or Payload
- Analytics destinations: GA4, Meta Pixel, and server-side events
- Final social profile URLs

## Next Build Steps

1. Add the product seed data for the 10 archetypes in the handout.
2. Add catalog routes: `/shop`, `/collections/[slug]`, and `/products/[slug]`.
3. Add admin authentication and product CRUD behind protected routes.
4. Add Stripe checkout in test mode with idempotent webhooks.
5. Add Lighthouse, accessibility, and Playwright checks to CI.
