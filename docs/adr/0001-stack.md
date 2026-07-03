# ADR 0001: Phase 0 Web Stack

## Status

Accepted

## Context

The engineering handout asks for a custom full-stack e-commerce store rather than Shopify. The first production milestone is a pre-launch email capture page, followed by catalog, checkout, admin operations, analytics, and fulfillment workflows.

## Decision

Use Next.js App Router with TypeScript as the web foundation. Use Tailwind CSS for the Freykraft design system, Prisma for the PostgreSQL data model, and a provider-ready email capture route that can forward opt-ins to an external marketing provider.

## Rationale

- Next.js gives the project server-rendered pages, metadata control, image optimization, and API routes in one deployable app.
- TypeScript strict mode protects money, order, and inventory logic as the commerce surface grows.
- Tailwind maps cleanly to the handout's tokenized "Modern Artisan" design direction.
- Prisma keeps the commerce model explicit and migration-friendly.
- The email capture route avoids fake production success. It writes locally only in development and requires a real provider endpoint in production.

## Consequences

- Production launch still needs real provider credentials and deployment configuration.
- The initial schema is intentionally small and should be expanded through migrations as catalog and checkout features land.
- The project can move to Payload or Sanity for CMS without changing the public pre-launch surface.
