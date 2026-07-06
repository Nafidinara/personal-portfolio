"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const PLACEHOLDER_AVATAR_BG = [
  "bg-[#f9fecd]",
  "bg-[#e2f0ff]",
  "bg-[#cfe3ff]",
  "bg-[#fde68a]",
  "bg-[#c7f9cc]",
  "bg-[#fca5a5]",
];

export type Testimonial = {
  id: string;
  text: string;
  name: string;
  role: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "faraz",
    text: "Attention to detail and quality work truly commendable.",
    name: "Faraz Mahmood",
    role: "Founder @tomOnly",
  },
  {
    id: "fitreps",
    text: "Redesigned our UI from boring to modern. Even created dark mode from scratch!",
    name: "Fitreps Team",
    role: "Fitness Platform",
  },
  {
    id: "pymology",
    text: "Built our entire onboarding flow. Solved the retention challenge we faced for months.",
    name: "Pymology",
    role: "Startup Founder",
  },
  {
    id: "webshapers",
    text: "Delivered on tight deadline without a single missed spec. Rare craft.",
    name: "WebShapers",
    role: "Agency Lead",
  },
  {
    id: "calculator",
    text: "Made complex calculations simple. HTML/CSS/JS. Fully responsive.",
    name: "Calculator Client",
    role: "Financial SaaS",
  },
  {
    id: "edtech",
    text: "Refactored our auth flow with Redux. Made registration much cleaner.",
    name: "EdTech Platform Team",
    role: "Learning Management System",
  },
  {
    id: "lead-smart",
    text: "Cleaned up our messy codebase. Dashboard is now much more maintainable.",
    name: "Lead Smart Team",
    role: "Affiliate Marketing",
  },
  {
    id: "greenlab",
    text: "Turned our prototype into a real product. Clear communication throughout.",
    name: "Greenlab",
    role: "Sustainability Startup",
  },
];

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const avatarBg = PLACEHOLDER_AVATAR_BG[index % PLACEHOLDER_AVATAR_BG.length];
  const initial = item.name.charAt(0).toUpperCase();

  return (
    <article className="flex w-[320px] shrink-0 flex-col border-r border-[#cfd8e3]">
      <p className="flex-1 px-6 py-5 font-hanken text-[15px] italic leading-[1.45] tracking-[-0.01em] text-[#0f2646]">
        {item.text}
      </p>
      <div className="flex items-center gap-3 border-t border-dashed border-[#cfd8e3] px-6 py-4">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`${item.name} avatar`}
            className="h-9 w-9 rounded-full object-cover"
            src={item.avatar}
          />
        ) : (
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 place-items-center rounded-full font-hanken text-[14px] font-bold text-[#0f2646] ${avatarBg}`}
          >
            {initial}
          </span>
        )}
        <div>
          <p className="font-hanken text-[14px] font-bold tracking-[-0.01em] text-[#0f2646]">
            {item.name}
          </p>
          <p className="text-[12px] text-[#71717b]">{item.role}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  offset = 0,
  duration = 44,
}: {
  items: Testimonial[];
  reverse?: boolean;
  offset?: number;
  duration?: number;
}) {
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const loop = [...items, ...items];
  const xFrom = reverse ? "-50%" : "0%";
  const xTo = reverse ? "0%" : "-50%";

  return (
    <div
      className="relative overflow-hidden border-y border-[#cfd8e3]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[80px] bg-gradient-to-r from-[#fafdff] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[80px] bg-gradient-to-l from-[#fafdff] to-transparent"
      />
      <motion.div
        animate={shouldReduceMotion || paused ? undefined : { x: [xFrom, xTo] }}
        className="flex w-max will-change-transform"
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((item, index) => (
          <TestimonialCard
            index={(index + offset) % PLACEHOLDER_AVATAR_BG.length}
            item={item}
            key={`${item.id}-${index}`}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  return (
    <div className="mt-16 space-y-8">
      <MarqueeRow duration={44} items={row1} />
      <MarqueeRow duration={48} items={row2} offset={2} reverse />
    </div>
  );
}
