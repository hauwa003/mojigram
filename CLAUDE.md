@AGENTS.md

# Mojigram

Emoji word game — mobile-first web app.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4, shadcn/ui (base-ui based — NO `asChild` prop)
- Supabase (not connected yet — using seed JSON data as in-memory fallback)
- Framer Motion (installed, not heavily used yet)

## Key Patterns
- Fonts: Baloo 2 (headings via `font-heading`), Inter (body via `font-sans`)
- Colors: Electric Purple (#7C3AED) primary, Hot Pink (#EC4899), Lemon Yellow (#FACC15), Green (#22C55E)
- Game state: useReducer in `GameScreen.tsx`, API calls for guess validation
- Seed data: `data/seed-puzzles.json` and `data/seed-packs.json` loaded via `lib/game/puzzleData.ts`
- Answer normalization: lowercase, trim, remove articles, hyphens — `lib/game/normalizeAnswer.ts`
- Scoring: 10/7/5 points for attempts 1/2/3, -2 hint penalty

## Folder Structure
- `app/` — pages and API routes
- `components/game/` — gameplay UI components
- `components/layout/` — AppShell, Header, BottomNav
- `components/packs/` — pack selection UI
- `components/home/` — home page cards
- `components/modals/` — HintModal
- `lib/game/` — game logic utilities
- `lib/supabase/` — Supabase clients (not active yet)
- `types/` — TypeScript types
- `data/` — seed JSON data
- `supabase/migrations/` — DB schema (ready for when Supabase is connected)
