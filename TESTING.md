# Testing Guide

## Test layers

- `npm run check`
  Type-safety across client, server and shared contracts.

- `npm run test:unit`
  Vitest suite for UI smoke tests, Suzely pipeline logic and router validation.

- `npm run test:coverage`
  Same suite with coverage enabled.

- `npm run test:e2e`
  Playwright smoke tests against a live local server.

- `npm run benchmark:suzely`
  Offline ranking benchmark for `MRR`, `NDCG@5` and `Recall@5`.

- `npm run test:all`
  Full local gate: typecheck + unit + e2e + benchmark.

## Local setup

1. Copy `.env.test.example` to `.env.test` or export equivalent vars.
2. Install deps with `npm install`.
3. Install Playwright browser once:
   `npx playwright install chromium`
4. Run the desired test layer.

## CI defaults

The GitHub Actions workflow uses safe placeholder env vars for smoke coverage.
DB-backed flows remain optional unless a real `DATABASE_URL` is provided.
