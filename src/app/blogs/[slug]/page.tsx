import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { articles, getArticle, readingTime, sortedArticles } from "@/lib/blog-data";
import { ArticleBody } from "../article-body";
import { BlogNav } from "../blog-nav";
import { BlogCover } from "../blog-cover";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found · Alfara" };

  return {
    title: `${article.title} · Alfara`,
    description: article.description,
    alternates: { canonical: `/blogs/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.dateISO,
      ...(article.coverImage ? { images: [{ url: article.coverImage }] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const minutes = readingTime(article);
  const currentIndex = sortedArticles.findIndex((a) => a.slug === article.slug);
  const next = sortedArticles[(currentIndex + 1) % sortedArticles.length];

  return (
    <main className="relative min-h-screen pb-28">
      <div className="hero-abstract pointer-events-none absolute left-1/2 top-0 -z-0 h-[560px] w-[1920px] -translate-x-1/2" />

      <div className="relative z-10">
        <BlogNav backHref="/blogs" backLabel="All articles" />

        <article className="mx-auto mt-14 max-w-[680px] px-4 sm:px-6">
          <header>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[13px] font-semibold uppercase tracking-[0.04em] text-[#0044a7]">
              <span>{article.tag}</span>
              <span aria-hidden className="text-[#bfcfe6]">/</span>
              <time className="font-normal text-[#71717b]" dateTime={article.dateISO}>
                {article.date}
              </time>
              <span aria-hidden className="text-[#bfcfe6]">·</span>
              <span className="font-normal text-[#71717b]">{minutes} min read</span>
            </div>
            <h1 className="mt-6 font-hanken text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#09090b] sm:text-[46px]">
              {article.title}
            </h1>
            <p className="mt-6 text-[20px] leading-[1.6] text-[#52525c]">{article.intro}</p>
          </header>

          {/* Hero cover */}
          <div className="my-10 overflow-hidden rounded-[22px] border border-[#dae9f8] shadow-[0_24px_60px_rgba(0,68,167,0.12)]">
            <BlogCover
              accent={article.accent}
              coverAlt={article.coverAlt}
              coverImage={article.coverImage}
              glyph={article.glyph}
              large
              priority
              tag={article.tag}
            />
          </div>

          <ArticleBody blocks={article.body} />

          {/* Byline / signature footer */}
          <div className="mt-14 rounded-[20px] border border-[#dae9f8] bg-white/70 p-7 shadow-[0_12px_36px_rgba(0,68,167,0.05)]">
            <p className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#0044a7]">
              Written by
            </p>
            <p className="mt-2 font-hanken text-[20px] font-bold tracking-[-0.02em] text-[#09090b]">
              Alfara Nafi Dinara
            </p>
            <p className="mt-2 text-[16px] leading-[1.6] text-[#52525c]">
              Full-stack, blockchain, and LLM engineer. Building something and want a hand? Tell me
              what you&apos;re building and where you&apos;re stuck — I usually reply within minutes.
            </p>
            <a
              className="focus-ring mt-5 inline-flex h-12 items-center justify-center rounded-full border border-[#005fc6] bg-[#007aff] px-7 font-hanken text-[16px] font-semibold text-white shadow-[inset_0_1px_0_#8cc2ff,0_12px_32px_rgba(0,122,255,0.25)]"
              href="mailto:nafidinara@gmail.com?subject=Project%20inquiry"
            >
              Start a project
            </a>
          </div>

          {/* Next article */}
          {next && next.slug !== article.slug ? (
            <Link
              className="focus-ring group mt-8 flex items-center justify-between gap-6 rounded-[20px] border border-[#dae9f8] bg-white p-7 shadow-[0_12px_36px_rgba(0,68,167,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#bcd6f5] hover:shadow-[0_20px_50px_rgba(0,68,167,0.1)]"
              href={`/blogs/${next.slug}`}
            >
              <span>
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#71717b]">
                  Read next
                </span>
                <span className="mt-2 block font-hanken text-[19px] font-bold leading-[1.25] tracking-[-0.02em] text-[#09090b] transition-colors group-hover:text-[#0044a7]">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                className="shrink-0 text-[#bfcfe6] transition-all group-hover:translate-x-1 group-hover:text-[#0044a7]"
                size={24}
              />
            </Link>
          ) : null}
        </article>
      </div>
    </main>
  );
}
