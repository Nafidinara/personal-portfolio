# nafidinara.com — Personal Portfolio

The source for [nafidinara.com](https://www.nafidinara.com): a single-page portfolio for Alfara Nafi Dinara, a grounded **Ask Alfara** LLM chat, and a **blog** at `/blogs`.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — styling; fonts via `next/font` (Atkinson Hyperlegible, Hanken Grotesk, IBM Plex Mono)
- **Motion** (`motion/react`) + **Lenis** — animation and smooth scroll
- **three / @react-three/fiber / drei** — hero visuals
- **Vercel AI SDK v7** + **OpenRouter** — the Ask Alfara chat (provider-agnostic)
- **Upstash Redis** — chat rate limiting
- Deployed on **Vercel** (Node runtime — not a static export, because the chat needs a server route)

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

For the Ask Alfara chat locally, copy `.env.example` to `.env.local` and fill in the LLM keys. Without them the page still runs; only the chat is disabled. Upstash is optional in dev (the limiter no-ops) and required in production.

## Scripts

```bash
pnpm dev          # start the dev server
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm test         # vitest (run once)
pnpm snapshot     # rebuild the GitHub activity snapshot
```

## Structure

```
src/
  app/
    page.tsx                # homepage — composes every section
    layout.tsx              # fonts, metadata, SmoothScroll
    globals.css             # theme tokens + hero/marquee CSS
    api/chat/route.ts       # Ask Alfara streaming endpoint
    components/             # hero, projects, experiences, tools, blog teaser, ...
      ask-alfara/           # the chat sidebar
    blogs/                  # the blog (see below)
  lib/
    blog-data.ts            # all article content + helpers
    chat-*.ts, llm.ts, rate-limit.ts   # chat grounding + LLM + limiter
content/profile.md          # canonical facts the chat is grounded on
resume.md                   # long-form CV, also used for grounding
public/                     # images, blog media, section assets
docs/                       # design docs
```

## Blog (`/blogs`)

Articles live as structured data in [`src/lib/blog-data.ts`](src/lib/blog-data.ts) — no CMS, no markdown files. Each article is an object with metadata plus a `body` array of typed blocks, rendered to match the homepage design system.

- **`/blogs`** — article list with cover thumbnails
- **`/blogs/[slug]`** — article page (statically generated via `generateStaticParams`, per-article SEO + OpenGraph)

**Supported body blocks:** `p`, `h2`, `ul`, `ol`, `quote`, `code` (with copy button), `image`, `gif` (animated SVG), `video`, `gallery`, `callout` (info/tip/warning/success), `stats`, `divider`.

**Covers:** each article has a `glyph` (branded-cover fallback) and an optional `coverImage`. Articles with a real screenshot use it; the rest render an on-brand gradient cover with a topic glyph. See [`src/app/blogs/blog-cover.tsx`](src/app/blogs/blog-cover.tsx).

**To add an article:** append an object to the `articles` array in `blog-data.ts`. Everything derived from it — the list card, the page, reading time, static params, the homepage teaser (top 3 by date) — updates automatically.

All article content is grounded in `content/profile.md` and `resume.md` — real work, real numbers.

## Deploy

Production tracks the `main` branch on GitHub; pushing to `main` triggers a Vercel production deploy. Environment variables (LLM + Upstash) are configured in the Vercel project settings.
