"use client";

import { Box, type LucideIcon, Monitor, Server, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { IconType } from "react-icons";
import { LuCloud, LuLayers, LuZap } from "react-icons/lu";
import {
  SiAnthropic,
  SiDocker,
  SiGithubactions,
  SiGo,
  SiInternetcomputer,
  SiLangchain,
  SiNextdotjs,
  SiNuxt,
  SiPython,
  SiReact,
  SiRust,
  SiSolana,
  SiSolidity,
} from "react-icons/si";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type Tech = {
  name: string;
  Icon: IconType;
  tint: string;
};

type ToolCategory = {
  id: string;
  label: string;
  CategoryIcon: LucideIcon | IconType;
  iconBg: string;
  techs: Tech[];
};

const toolCategories: ToolCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    CategoryIcon: Monitor,
    iconBg: "bg-[#22c55e]",
    techs: [
      { name: "Next.js", Icon: SiNextdotjs, tint: "text-[#0f172a]" },
      { name: "React", Icon: SiReact, tint: "text-[#22d3ee]" },
      { name: "Nuxt.js", Icon: SiNuxt, tint: "text-[#00c58e]" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    CategoryIcon: Server,
    iconBg: "bg-[#3b82f6]",
    techs: [
      { name: "Next.js", Icon: SiNextdotjs, tint: "text-[#0f172a]" },
      { name: "Golang", Icon: SiGo, tint: "text-[#00add8]" },
      { name: "Python", Icon: SiPython, tint: "text-[#eab308]" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    CategoryIcon: LuLayers,
    iconBg: "bg-[#ec4899]",
    techs: [
      { name: "Docker", Icon: SiDocker, tint: "text-[#2496ed]" },
      { name: "AWS", Icon: LuCloud, tint: "text-[#ff9900]" },
      { name: "CI/CD", Icon: SiGithubactions, tint: "text-[#2088ff]" },
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    CategoryIcon: Sparkles,
    iconBg: "bg-[#f97316]",
    techs: [
      { name: "OpenAI", Icon: LuZap, tint: "text-[#10a37f]" },
      { name: "Claude", Icon: SiAnthropic, tint: "text-[#d97706]" },
      { name: "Langchain", Icon: SiLangchain, tint: "text-[#1c3c3c]" },
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    CategoryIcon: Box,
    iconBg: "bg-[#14b8a6]",
    techs: [
      { name: "Solidity", Icon: SiSolidity, tint: "text-[#0f172a]" },
      { name: "Rust", Icon: SiRust, tint: "text-[#ce4e2e]" },
      { name: "ICP", Icon: SiInternetcomputer, tint: "text-[#8b5cf6]" },
      { name: "Solana", Icon: SiSolana, tint: "text-[#7c3aed]" },
    ],
  },
];

export function Tools() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col justify-center px-2 pt-2">
        <p className="mb-4 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
          TOOLS
        </p>
        <h2 className="font-hanken text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#09090b] sm:text-[38px]">
          What I<br />
          Work With
        </h2>
      </div>

      {toolCategories.map((category, index) => (
        <ToolCard
          category={category}
          index={index}
          key={category.id}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      ))}
    </div>
  );
}

function ToolCard({
  category,
  index,
  shouldReduceMotion,
}: {
  category: ToolCategory;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const { CategoryIcon } = category;

  return (
    <motion.div
      className="group relative px-2 pt-2"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      transition={{
        delay: 0.05 + index * 0.06,
        duration: 0.44,
        ease: PREMIUM_EASE,
      }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        aria-hidden="true"
        className={`grid h-11 w-11 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(0,68,167,0.14)] ${category.iconBg}`}
        transition={{ duration: 0.24, ease: PREMIUM_EASE }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
      >
        <CategoryIcon size={22} strokeWidth={2.2} />
      </motion.div>

      <p className="mt-5 font-hanken text-[19px] font-semibold tracking-[-0.02em] text-[#0f2646]">
        {category.label}
      </p>

      <motion.ul
        animate="show"
        className="mt-3 flex flex-wrap gap-x-2 gap-y-2"
        initial="hidden"
        transition={{ staggerChildren: 0.04, delayChildren: 0.12 + index * 0.06 }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="show"
      >
        {category.techs.map((tech) => (
          <TechPill key={tech.name} shouldReduceMotion={shouldReduceMotion} tech={tech} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

function TechPill({
  tech,
  shouldReduceMotion,
}: {
  tech: Tech;
  shouldReduceMotion: boolean;
}) {
  const { Icon } = tech;

  return (
    <motion.li
      className="inline-flex items-center gap-1.5 rounded-full border border-[#dae9f8] bg-white px-3 py-1.5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#2e353f] shadow-[0_4px_10px_rgba(0,68,167,0.04)]"
      transition={{ duration: 0.24, ease: PREMIUM_EASE }}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.32, ease: PREMIUM_EASE },
        },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
    >
      <Icon aria-hidden="true" className={tech.tint} size={14} />
      {tech.name}
    </motion.li>
  );
}
