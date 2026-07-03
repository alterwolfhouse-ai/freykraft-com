# Freykraft.com

Freykraft is a custom full-stack e-commerce build for handcrafted home decor and gifts. This repository starts with the Phase 0 launch surface: brand foundation, pre-launch email capture, provider-ready subscription API, and the initial commerce data model.

## Canonical Domain

- Public brand: `Freykraft`
- Domain: `freykraft.com`
- Local folder typo is intentionally ignored; product-facing code and copy use Freykraft.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS with Freykraft design tokens
- Prisma schema targeting PostgreSQL
- Provider-ready email capture API
- Future integrations: Stripe, Stripe Tax, EasyPost or Shippo, CMS, analytics, and monitoring

## Local Setup

```bash
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Hostinger Deployment

Use Hostinger's managed Node.js Web App flow for this project. See `docs/hostinger-deploy.md` for hPanel values and environment variables.

## GitHub Pages Static Launch

GitHub Pages can host the current pre-launch page as static files. It cannot run Node.js API routes. See `docs/github-pages.md`.

## Environment

Copy `.env.example` to `.env.local` and fill production values before deployment.

Email capture behavior:

- Development without `EMAIL_CAPTURE_WEBHOOK_URL`: appends valid opt-ins to `.local/email-subscribers.jsonl`.
- Local production preview can do the same only when `EMAIL_CAPTURE_ALLOW_LOCAL_STORE=true` is set.
- Production without `EMAIL_CAPTURE_WEBHOOK_URL`: returns an error instead of pretending the subscriber was captured.
- Any environment with `EMAIL_CAPTURE_WEBHOOK_URL`: POSTs the subscriber payload to that endpoint.

## Phase 0 Scope

- Launch page with generated hero image and early-access signup
- UTM capture on signup
- Strict TypeScript and lint-ready config
- Initial Prisma model sketch for subscribers, products, variants, images, and orders
- ADR for the stack decision

## Source Briefs

- `Freykraft Engineering Handout - Codex Build Brief.pdf`
- `Freykraft.com Launch Plan and Growth Strategy.pdf`
