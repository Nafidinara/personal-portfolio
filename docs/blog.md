# Blog system

The blog at `/blogs` is data-driven — there is no CMS and no markdown files. Every article is a typed object in [`src/lib/blog-data.ts`](../src/lib/blog-data.ts), rendered with the same design system as the homepage.

## Files

| File | Role |
|---|---|
| `src/lib/blog-data.ts` | All article content + helpers (`readingTime`, `getArticle`, `sortedArticles`) |
| `src/app/blogs/page.tsx` | `/blogs` list page (metadata, maps articles → cards) |
| `src/app/blogs/[slug]/page.tsx` | Article page (`generateStaticParams`, `generateMetadata`, hero, body) |
| `src/app/blogs/blog-list.tsx` | Animated list cards (client) |
| `src/app/blogs/blog-cover.tsx` | Cover thumbnail / hero banner (photo or branded gradient) |
| `src/app/blogs/article-body.tsx` | Renders the typed body blocks |
| `src/app/blogs/code-block.tsx` | Code block with copy button (client) |
| `src/app/blogs/rich-text.tsx` | Inline `**bold**` / `*italic*` parser |
| `src/app/blogs/blog-nav.tsx` | Top bar (back link + avatar) |

## The `Article` shape

```ts
{
  slug: string;          // URL segment: /blogs/<slug>
  title: string;
  description: string;   // list card + meta description
  date: string;          // human label, e.g. "July 2025"
  dateISO: string;       // sorting + <time>, e.g. "2025-07-15"
  tag: string;           // e.g. "Blockchain"
  accent: string;        // tailwind gradient classes for the branded cover
  glyph: CoverGlyph;     // lending | llm | chain | automation | ai | trophy
  coverImage?: string;   // real screenshot; omit to use the branded cover
  coverAlt?: string;
  intro: string;         // lead paragraph
  body: ArticleBlock[];  // the article, block by block
}
```

## Body blocks

```ts
{ type: "p", text }
{ type: "h2", text }
{ type: "ul", items: string[] }
{ type: "ol", items: string[] }
{ type: "quote", text }
{ type: "code", lang?, code }                          // dark card + copy button
{ type: "image", src, alt, caption?, width, height }
{ type: "gif", src, alt, caption?, label? }            // animated SVG, plays like a gif
{ type: "video", src, poster?, caption? }              // muted autoplay loop + controls
{ type: "gallery", images: {src,alt,width,height}[], caption? }
{ type: "callout", variant: "info"|"tip"|"warning"|"success", title?, text }
{ type: "stats", items: {value,label}[] }
{ type: "divider" }
```

`text` fields support `**bold**` and `*italic*`.

## Adding an article

1. Append an object to the `articles` array in `blog-data.ts`.
2. Put any media under `public/blog/` (or reuse existing `public/` assets).
3. Done — the list card, the article page, reading time, static params, and the homepage teaser (top 3 by `dateISO`) all derive from the array automatically.

## Media notes

- **Animated diagrams** (`gif`) are plain SVGs with CSS keyframes in a `<style>` block, loaded via `<img>`. Example: `public/blog/creditopia-loop.svg`. They honor `prefers-reduced-motion`.
- **Video** is self-hosted MP4 under `public/blog/`. The demo clip was generated from a screenshot with ffmpeg (Ken Burns zoompan).
- **Covers** with a real `coverImage` show the photo; otherwise `blog-cover.tsx` renders an `accent` gradient + topic `glyph`.

## Content rule

Everything in an article must be grounded in `content/profile.md` or `resume.md` — real work, real numbers. Do not invent facts.
