"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { CoverGlyph } from "@/lib/blog-data";
import { BlogCover } from "./blog-cover";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  tag: string;
  minutes: number;
  accent: string;
  glyph: CoverGlyph;
  coverImage?: string;
  coverAlt?: string;
};

function Card({ post, index }: { post: BlogListItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      transition={{ delay: 0.05 + index * 0.08, duration: 0.5, ease: PREMIUM_EASE }}
      viewport={{ once: true, margin: "-40px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link
        className="focus-ring group block overflow-hidden rounded-[24px] border border-[#dae9f8] bg-white shadow-[0_12px_36px_rgba(0,68,167,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd6f5] hover:shadow-[0_24px_60px_rgba(0,68,167,0.12)]"
        href={`/blogs/${post.slug}`}
      >
        <BlogCover
          accent={post.accent}
          coverAlt={post.coverAlt}
          coverImage={post.coverImage}
          glyph={post.glyph}
          priority={index === 0}
          tag={post.tag}
        />
        <div className="p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-[#71717b]">
            <time dateTime={post.dateISO}>{post.date}</time>
            <span aria-hidden>·</span>
            <span>{post.minutes} min read</span>
          </div>
          <h2 className="mt-3 flex items-start justify-between gap-4 font-hanken text-[23px] font-bold leading-[1.22] tracking-[-0.02em] text-[#09090b] sm:text-[26px]">
            <span className="transition-colors group-hover:text-[#0044a7]">{post.title}</span>
            <ArrowUpRight
              className="mt-1 shrink-0 text-[#bfcfe6] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0044a7]"
              size={22}
            />
          </h2>
          <p className="mt-3 max-w-[640px] text-[16px] leading-[1.6] text-[#52525c]">
            {post.description}
          </p>
          <span className="focus-ring mt-5 inline-flex items-center gap-1.5 font-hanken text-[15px] font-semibold text-[#0044a7]">
            Read article
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5" size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogList({ posts }: { posts: BlogListItem[] }) {
  return (
    <div className="mt-12 grid gap-6">
      {posts.map((post, index) => (
        <Card index={index} key={post.slug} post={post} />
      ))}
    </div>
  );
}
