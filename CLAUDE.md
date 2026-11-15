# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run type-check   # TypeScript check (tsc --noEmit)
```

There are no tests in this project.

## Architecture

This is a Next.js 14 App Router Pokédex that renders as a visual Pokédex device. It fetches data entirely from [PokéAPI](https://pokeapi.co/) at request time — there is no database or backend.

### Route structure

```
/                               → empty device (D-pad + search)
/[slug]                         → redirect to /[slug]/overview (@screen/default.tsx)
/[slug]/@screen/overview        → overview tab (parallel route)
/[slug]/@screen/abilities       → abilities tab
/[slug]/@screen/evolutions      → evolutions tab
/[slug]/@screen/forms           → forms tab
/[slug]/@screen/games           → games tab
/[slug]/@screen/moves           → moves tab
/api/[slug]                     → JSON PokemonData (404 JSON if unknown)
```

Old `/pokedex/...` URLs are 308-redirected to the root-level routes in `next.config.mjs`. Don't reintroduce a `/pokedex` prefix in links.

The `@screen` segment is a Next.js **parallel route** — the layout at `src/app/[slug]/layout.tsx` receives it as the `screen` slot and passes it into the right-side display panel. Navigation between tabs (Overview, Forms, Games, etc.) is handled by `ButtonNav` changing the URL segment; the active tab is determined by which `@screen` child route matches.

### Component split: LeftSide / RightSide

`MainLayout` (`src/components/Global/main.layout.tsx`) renders two halves of the Pokédex shell:

- **LeftSide** (`src/components/LeftSide/`) — the image display screen, the D-pad controller, and the small lower display with search/navigation. Client components here use `"use client"` and rely on `useSearchParams`/`useRouter` for image cycling and Pokémon navigation.
- **RightSide** (`src/components/RightSide/`) — the text screen (parallel route slot), plus `ButtonNav` for tab switching.

### Data flow

All data fetching lives in `src/utils/api.ts`. The main entry point is `getAllData(slug)`, which calls `genPokemonData(slug)`:

1. Fetches the base Pokémon from PokéAPI
2. Calls `normalizeAbilities`, `normalizeForms`, `normalizeEvolutionChain`, `normalizeSpecies` — each fetches additional PokéAPI endpoints in parallel
3. Returns a fully-shaped `PokemonData` object (see `src/types/data.ts`)

Each `@screen` page calls `getAllData` independently; Next.js request deduplication (fetch cache) prevents duplicate network calls within a single render.

### Image cycling (D-pad left/right)

The currently-displayed image is tracked via the `imageIndex` URL search param. `usePageIndex` (in `src/utils/route.ts`) reads it and syncs local state. The D-pad left/right buttons set this param; the slideshow in `ClientSlideshow` reads it to show the correct sprite.

### Navigation (D-pad up/down)

`usePokemonIndexes` resolves the previous/next Pokémon names by looking up the current slug in the full list fetched from `/api/v2/pokemon?limit=1302`. D-pad up/down navigate to `/{name}/overview`.

### Styling

- **Tailwind** for layout and most styles. Custom theme values (metal textures, ridge box shadows, dot-gothic/nanum fonts) are in `tailwind.config.js`.
- **CSS Modules** (`.module.css`) used for complex component-specific styles (dpad, button-nav, leftside).
- **`classnames`** used everywhere to compose Tailwind class strings — style objects are sometimes extracted into a separate `*.styles.ts` file (see `leftside.styles.ts`).
- Background images (`bg-metal`, `bg-screen`) reference files in `/public/`.
