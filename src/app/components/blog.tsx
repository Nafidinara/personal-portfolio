"use client";

import { motion, useReducedMotion } from "motion/react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  url?: string;
};

function BlogRow({ post, index }: { post: BlogPost; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="rounded-[20px] border border-[#dae9f8] bg-white p-7 shadow-[0_12px_36px_rgba(0,68,167,0.05)]"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      transition={{
        delay: 0.08 + index * 0.1,
        duration: 0.5,
        ease: PREMIUM_EASE,
      }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-hanken text-[20px] font-bold tracking-[-0.02em] text-[#09090b] sm:text-[22px]">
          {post.title}
        </h3>
        <span className="shrink-0 font-mono text-[13px] text-[#71717b]">
          {post.date}
        </span>
      </div>
      <p className="mt-2 max-w-[680px] text-[15px] leading-[1.5] text-[#52525c]">
        {post.description}
      </p>
      <a
        className="focus-ring mt-3 inline-block font-hanken text-[15px] font-semibold text-[#09090b] underline decoration-[#cfd8e3] underline-offset-[3px] transition-colors hover:text-[#0044a7] hover:decoration-[#0044a7]"
        href={post.url ?? "#"}
      >
        Read Blog
      </a>
    </motion.article>
  );
}

export function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="mt-12 space-y-6">
      {posts.map((post, index) => (
        <BlogRow index={index} key={index} post={post} />
      ))}
    </div>
  );
}
