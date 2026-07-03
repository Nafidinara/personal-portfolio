"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export type MoreProjectItem = {
  name: string;
  viewLabel: string;
  description: string;
  logo: string;
  logoSize: { width: number; height: number };
  hover: string;
  hoverSize: { width: number; height: number };
  viewUrl: string;
};

export function MoreProjects({ projects }: { projects: MoreProjectItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-24 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-3">
      {projects.map((project, index) => (
        <MoreProjectCard
          index={index}
          isDimmed={hoveredIndex !== null && hoveredIndex !== index}
          isHovered={hoveredIndex === index}
          key={project.name}
          onLeave={() => setHoveredIndex(null)}
          onOver={() => setHoveredIndex(index)}
          project={project}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      ))}
    </div>
  );
}

function MoreProjectCard({
  project,
  isHovered,
  isDimmed,
  onOver,
  onLeave,
  shouldReduceMotion,
}: {
  project: MoreProjectItem;
  isHovered: boolean;
  isDimmed: boolean;
  onOver: () => void;
  onLeave: () => void;
  index: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? { opacity: isDimmed ? 0.4 : 1 }
          : {
              opacity: isDimmed ? 0.42 : 1,
              filter: isDimmed ? "blur(4px)" : "blur(0px)",
              scale: isDimmed ? 0.94 : 1,
            }
      }
      className="relative flex flex-col items-center px-4"
      onFocus={onOver}
      onBlur={onLeave}
      onMouseEnter={onOver}
      onMouseLeave={onLeave}
      transition={{ duration: 0.32, ease: PREMIUM_EASE }}
    >
      <div className="pointer-events-none relative h-[320px] w-full">
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -20,
            scale: isHovered ? 1 : 0.94,
          }}
          className="absolute inset-x-0 bottom-2 flex justify-center"
          initial={false}
          transition={{ duration: 0.46, ease: PREMIUM_EASE }}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-[300px] w-auto max-w-none object-contain drop-shadow-[0_36px_60px_rgba(0,68,167,0.18)]"
            height={project.hoverSize.height}
            sizes="360px"
            src={project.hover}
            width={project.hoverSize.width}
          />
        </motion.div>
      </div>

      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: isHovered ? 1.04 : 1, y: isHovered ? -4 : 0 }
        }
        className="relative h-[140px] w-[140px]"
        transition={{ duration: 0.35, ease: PREMIUM_EASE }}
      >
        <Image
          alt={`${project.name} logo`}
          className="h-full w-full object-contain drop-shadow-[0_16px_28px_rgba(0,68,167,0.14)]"
          height={project.logoSize.height}
          sizes="140px"
          src={project.logo}
          width={project.logoSize.width}
        />
      </motion.div>

      <div className="relative mt-6 w-full">
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -6 : 0,
          }}
          className="flex justify-center"
          initial={false}
          transition={{ duration: 0.22, ease: PREMIUM_EASE }}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-[#e2f0ff] px-6 py-2.5 font-mono text-[15px] font-bold tracking-[-0.01em] text-[#2e353f]">
            {project.name}
          </span>
        </motion.div>

        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            pointerEvents: isHovered ? "auto" : "none",
          }}
          className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
          initial={false}
          transition={{ duration: 0.4, ease: PREMIUM_EASE }}
        >
          <p className="font-mono text-[26px] font-bold tracking-[-0.02em] text-[#0f2646]">
            {project.name}
          </p>
          <p className="mt-3 max-w-[240px] text-[13px] leading-[1.55] text-[#52525c]">
            {project.description}
          </p>
          <motion.a
            aria-label={`View ${project.viewLabel}`}
            className="focus-ring mt-5 inline-flex items-center rounded-full bg-[#e2f0ff] px-6 py-2.5 font-mono text-[15px] font-bold tracking-[-0.01em] text-[#0044a7] shadow-[0_6px_16px_rgba(0,68,167,0.08)]"
            href={project.viewUrl}
            rel="noopener noreferrer"
            target="_blank"
            whileHover={shouldReduceMotion ? undefined : { y: -2, backgroundColor: "#cfe3ff" }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          >
            View {project.viewLabel}
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
