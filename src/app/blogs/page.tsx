import type { Metadata } from "next";
import { readingTime, sortedArticles } from "@/lib/blog-data";
import { BlogNav } from "./blog-nav";
import { BlogList, type BlogListItem } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog · Alfara Nafi Dinara",
  description:
    "Notes on shipping software: grounded LLM apps, blockchain traceability, marketplace automation, and hard-won lessons from hackathons and client work.",
  alternates: { canonical: "/blogs" },
};

export default function BlogIndexPage() {
  const posts: BlogListItem[] = sortedArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    dateISO: article.dateISO,
    tag: article.tag,
    minutes: readingTime(article),
    accent: article.accent,
    glyph: article.glyph,
    coverImage: article.coverImage,
    coverAlt: article.coverAlt,
  }));

  return (
    <main className="relative min-h-screen pb-28">
      {/* Same decorative wash as the homepage so the page feels of a piece. */}
      <div className="hero-abstract pointer-events-none absolute left-1/2 top-0 -z-0 h-[720px] w-[1920px] -translate-x-1/2" />
      <div className="pointer-events-none absolute right-[-160px] top-[520px] -z-0 h-[440px] w-[440px] rounded-full bg-[#f9fecd]/70 blur-3xl" />

      <div className="relative z-10">
        <BlogNav />

        <div className="mx-auto mt-16 max-w-[760px] px-4 sm:px-6">
          <p className="mb-5 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
            BLOG
          </p>
          <h1 className="max-w-[640px] font-hanken text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-[#09090b] sm:text-[52px]">
            Notes I write down so I don&apos;t pay for the same lesson twice.
          </h1>
          <p className="mt-6 max-w-[600px] text-[19px] leading-[1.6] text-[#52525c]">
            Field notes from real builds — grounded LLM apps, on-chain systems, automation at
            scale, and what winning a 48-hour hackathon actually teaches you. No fluff, no theory
            I haven&apos;t shipped.
          </p>

          <BlogList posts={posts} />
        </div>
      </div>
    </main>
  );
}
