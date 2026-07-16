# DesignForge AI

**An AI-powered React component library and interactive playground.**

DesignForge AI is a copy-paste-first component library and developer tool: browse a catalog of accessible, themeable React + Tailwind components, tune them live in an interactive playground, ask an AI assistant to restyle them in plain English, and export the ones you keep to a personal "My Kit" — all without a database or authentication system.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript, React 19 |
| Styling | Tailwind CSS, custom design-token system, `tailwindcss-animate` |
| Motion | Framer Motion |
| Primitives | Radix UI (Dialog, Select, Tabs, Toast, Tooltip, Switch, Checkbox) |
| Icons | lucide-react |
| State | Zustand (+ `persist` middleware for localStorage) |
| Docs | MDX via `next-mdx-remote/rsc` |
| Code highlighting | Shiki |
| AI | Anthropic Messages API via a Next.js Route Handler, with a deterministic mock fallback |
| Export | JSZip + FileSaver (client-side ZIP generation) |
| Storage | `localStorage` only — no database, no auth |

---

## Getting started

```bash
git clone <your-repo-url> designforge-ai
cd designforge-ai
npm install
cp .env.example .env.local   # optional — see "AI generator" below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # run the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Environment variables

The AI Component Generator works out of the box with **no configuration** — if no
API key is present it automatically falls back to a deterministic mock generator,
so the feature is always demoable.

Copy `.env.example` to `.env.local` and fill in what you have:

```bash
# Anthropic API key for the AI Component Generator.
# If omitted, the app automatically falls back to a mock generator.
ANTHROPIC_API_KEY=

# Optional alternate provider
OPENAI_API_KEY=

# Which provider to use: "anthropic" | "openai" | "mock"
AI_PROVIDER=anthropic
```

Set `AI_PROVIDER=mock` to force the offline generator even if a key is present
(useful for demos or CI). The route handler lives at `app/api/ai-generate/route.ts`.

---

## Project structure

```
app/
  api/ai-generate/route.ts   # AI generator endpoint (Anthropic + mock fallback)
  docs/[slug]/page.tsx        # MDX-powered documentation pages
  library/                    # Component library — search, filter, sort
  playground/                 # Live props editor + preview + AI assistant
  my-kit/                      # Favorites, collections, ZIP export
  changelog/                   # Version history
  settings/                    # Theme engine UI
  layout.tsx, page.tsx, globals.css

components/
  ui/                # 20+ reusable primitives (Button, Input, Modal, Table, …)
  landing/            # Hero, feature grid, showcase, CTA, header/footer
  playground/          # CodeBlock (Shiki), PropsEditor, PreviewFrame, AI panel
  docs/                # PropsTable, ComponentPreview (MDX helper components)
  shared/              # ThemeProvider

data/
  components.tsx    # The component *catalog* — metadata + live render + code + controls
  changelog.ts        # Changelog entries

store/
  useKitStore.ts     # Favorites & collections (Zustand + persist)
  useToastStore.ts    # Global toast queue

hooks/
  useTheme.ts        # Theme engine state (mode, accent, font scale) — persisted

content/docs/        # MDX source files rendered by app/docs/[slug]
lib/utils.ts          # cn(), clipboard, date/slug helpers
```

### How the catalog works

Every entry in `data/components.tsx` ties together four things for one catalog
item: a **live `render()` function** (using the real component), a **copyable
code string**, **playground controls** (which props are editable), and
**metadata** (category, tags, description). The Library, Playground, and MDX
docs pages all read from this single registry, so adding a new catalog entry
automatically makes it searchable, playable, and documentable.

The Buttons category, for example, ships five catalog entries (Primary,
Gradient, Ghost, Icon, Loading) that are all variants of one underlying
`<Button />` primitive — this is intentional: a real design system exposes
variety through props, not through five divergent components with duplicated
logic. The same pattern applies to Alert, Badge, and Toggle.

---

## Accessibility

- Every interactive primitive is built on native elements or Radix UI, so
  keyboard navigation, focus management, and ARIA wiring come for free.
- Focus rings are never suppressed (`:focus-visible` is styled globally, not hidden).
- Form components associate labels, hints, and errors via `aria-describedby`/`aria-invalid`.
- `prefers-reduced-motion` is respected globally.
- Icon-only buttons require an explicit `aria-label` (enforced by convention in the catalog).

---

## Theming

The Theme Engine (`/settings`) lets you switch dark/light mode, swap the brand
accent (ember / blueprint / copper), and adjust a global font scale. All three
are persisted to `localStorage` via `hooks/useTheme.ts` and applied to
`<html>` by `components/shared/theme-provider.tsx`. Design tokens live in
`tailwind.config.ts` under `colors.ink / graphite / paper / ember / copper / blueprint`.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** → import the repo. Framework preset:
   **Next.js** (auto-detected).
3. Add environment variables under **Project Settings → Environment Variables**:
   - `ANTHROPIC_API_KEY` (optional — omit to ship with the mock AI generator)
   - `AI_PROVIDER` = `anthropic` (or `mock`)
4. Deploy. No database, no auth provider, and no additional infrastructure is required —
   all persistence is client-side `localStorage`.

---

## What's included vs. left as an exercise

This repo ships a fully working app: landing page, 27 catalog entries across
all 6 required categories (Buttons, Forms, Navigation, Cards, Feedback, Data
Display), a live playground, AI generator with mock fallback, theme engine,
search/filter/sort, My Kit with ZIP export, MDX docs for two representative
components, and a changelog. To reach the full "30–40 components" brief,
follow the pattern in `data/components.tsx` and `content/docs/button.mdx` to
add more catalog entries and doc pages — the architecture is built so each
new component is a single registry entry away from being searchable, playable,
and documented.

## License

MIT — built as a portfolio/reference project.
