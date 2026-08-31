# NO WAY / ECHT?

A bilingual, mobile-first real-or-fake guessing game built as a single Next.js PWA.

## Run locally

```bash
npm install
npm run dev
```

Open `/`; the locale proxy selects German for `de*` browser languages and English otherwise. The manual language setting is stored in a cookie and the demo user profile.

## Architecture

- `app/[locale]`: shared locale-aware consumer routes
- `app/api`: backend HTTP boundary for content, sessions, guesses, daily sets, profiles, friends, rankings and challenges
- `lib/repositories`: typed repository interfaces and local implementations; replace these with PostgreSQL/Supabase adapters without changing pages
- `lib/i18n.ts`: centralized semantic EN/DE copy
- `data/images.ts`: curated canonical content with bilingual metadata on the same record

The local repositories deliberately require no secrets. They keep runtime data in memory and are intended for development; a production adapter should persist the same types in PostgreSQL.

## Quality commands

```bash
npm test
npm run lint
npm run build
```
