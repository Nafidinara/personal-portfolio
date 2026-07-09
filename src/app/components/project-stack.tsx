"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import type { MotionValue } from "motion/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// Left edge respects the outer margin; the right side bleeds slightly past it.
const PAD_LEFT = "var(--page-margin)";
const PAD_RIGHT = "calc(var(--page-margin) - 2vw)";

export type ProjectStackItem = {
  name: string;
  file: string;
  category: string;
  description: string;
  tags: string[];
  preview: string;
  previewSize: { width: number; height: number };
  previewBg: string;
  liveUrl: string;
  repoUrl: string;
};

// The scroll-jacked pin only makes sense on pointer/desktop widths. Below this
// we fall back to a native horizontally-scrollable, snap row (no pinning).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function ProjectStack({ projects }: { projects: ProjectStackItem[] }) {
  const outerRef = useRef<HTMLDivElement>(null); // owns the vertical scroll distance
  const trackRef = useRef<HTMLDivElement>(null); // the wide flex row of cards
  const [distance, setDistance] = useState(0); // px of horizontal overflow to travel

  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const enabled = !shouldReduceMotion && isDesktop;

  // Measure the real overflow width so horizontal travel is exact per screen.
  useEffect(() => {
    if (!enabled) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track || track.children.length === 0) return;
      // Translate so the LAST card's left edge lands on the same margin line
      // the FIRST card started on (offsetLeft is relative to the positioned track).
      const marginPx = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const lastCard = track.children[track.children.length - 1] as HTMLElement;
      setDistance(Math.max(0, lastCard.offsetLeft - marginPx));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects, enabled]);

  // Scroll-linked, scrubs both ways with scroll direction.
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <section className="relative mt-[95px]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-0">
        <div className="max-w-[704px]">
          <p className="mb-4 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
            PROJECTS
          </p>
          <h2 className="font-hanken text-[30px] font-semibold leading-[1.16] tracking-[-0.02em] text-[#09090b] sm:text-[34px]">
            I turn messy problems into products people actually use, across web, AI, and
            blockchain.
          </h2>
        </div>
      </div>

      {/* Outer height controls scroll length: one viewport + the overflow width
          means ~1px vertical scroll per 1px horizontal travel. */}
      <div
        className="relative mt-[64px]"
        ref={outerRef}
        style={enabled ? { height: `calc(100vh + ${distance}px)` } : undefined}
      >
        <div
          className={
            enabled
              ? "sticky top-0 flex h-screen items-center overflow-hidden [perspective:1600px]"
              : "relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6"
          }
        >
          <motion.div
            className={
              enabled ? "flex items-center gap-[4vw] [transform-style:preserve-3d]" : "flex gap-6"
            }
            ref={trackRef}
            style={
              enabled
                ? { x, position: "relative", paddingLeft: PAD_LEFT, paddingRight: PAD_RIGHT }
                : undefined
            }
          >
            {projects.map((project, index) =>
              enabled ? (
                <ProjectSlide key={project.name} x={x}>
                  <ProjectCard priority={index === 0} project={project} />
                </ProjectSlide>
              ) : (
                <div
                  className="w-[clamp(280px,80vw,420px)] flex-none snap-center"
                  key={project.name}
                >
                  <ProjectCard priority={index === 0} project={project} />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Fade/scale/tilt each card from its LIVE distance to viewport center. The
// falloff comes entirely from the card's own opacity (light bg, no overlay).
function ProjectSlide({ x, children }: { x: MotionValue<number>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // -1 ≈ left edge, 0 = centered, 1 ≈ right edge. Derived from LAYOUT position
  // (offsetLeft/offsetWidth, transform-independent) + the live track x, so the
  // card's own scale/rotateY can't feed back into its measured position.
  const pos = useTransform(x, (xv) => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return 0;
    const cardCenter = el.offsetLeft + el.offsetWidth / 2 + xv;
    const vw = window.innerWidth;
    return (cardCenter - vw / 2) / (vw / 2);
  });

  // Wide flat middle, ghost out only near the edges → smooth, no banding.
  const opacity = useTransform(pos, [-1, -0.7, -0.4, 0.4, 0.7, 1], [0, 0.4, 1, 1, 0.4, 0]);
  const scale = useTransform(pos, [-1, 0, 1], [0.9, 1.02, 0.9]);
  const rotateY = useTransform(pos, [-1, 0, 1], [7, 0, -7]);

  return (
    <motion.div
      className="w-[clamp(320px,44vw,560px)] flex-none [transform-style:preserve-3d]"
      ref={ref}
      style={{ opacity, scale, rotateY, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({
  project,
  priority,
}: {
  project: ProjectStackItem;
  priority: boolean;
}) {
  return (
    <article className="relative origin-top overflow-hidden rounded-[18px] border border-[#dae9f8] bg-white shadow-[0_28px_70px_rgba(0,68,167,0.14)]">
      <h3 className="sr-only">{project.name}</h3>
      <BrowserBar category={project.category} file={project.file} />

      <div className="p-5">
        <ProjectPreview priority={priority} project={project} />

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-hanken text-[26px] font-semibold tracking-[-0.03em] text-[#09090b]">
            {project.name}
          </p>
          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                aria-label={`${project.name} live site`}
                className="focus-ring rounded-full p-1.5 text-[#0044a7] transition-colors hover:bg-[#e2f0ff]"
                href={project.liveUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink size={18} strokeWidth={1.9} />
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                aria-label={`${project.name} source code`}
                className="focus-ring rounded-full p-1.5 text-[#0044a7] transition-colors hover:bg-[#e2f0ff]"
                href={project.repoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitBranch size={18} strokeWidth={1.9} />
              </a>
            ) : null}
          </div>
        </div>

        <p className="mt-3 text-[15px] leading-[1.55] text-[#52525c]">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              className="rounded-[10px] border border-[#dae9f8] bg-white px-3 py-1 font-mono text-[13px] font-semibold text-[#0044a7]"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectPreview({
  project,
  priority,
}: {
  project: ProjectStackItem;
  priority: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative aspect-[1395/766] w-full overflow-hidden rounded-[14px]"
      style={{ backgroundColor: project.previewBg }}
    >
      {failed ? (
        <span aria-hidden="true" className="sr-only">
          {project.name} project preview
        </span>
      ) : (
        <Image
          alt={`${project.name} project preview`}
          className="h-full w-full object-cover"
          height={project.previewSize.height}
          onError={() => setFailed(true)}
          priority={priority}
          sizes="(min-width: 1024px) 44vw, 80vw"
          src={project.preview}
          width={project.previewSize.width}
        />
      )}
    </div>
  );
}

function BrowserBar({ file, category }: { file: string; category: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#e6effb] bg-white px-4 py-3">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </span>
      <span className="ml-1 font-mono text-[13px] text-[#52525c]">{file}</span>
      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#f9fecd] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#655c00]">
        <ArrowUpRight size={12} strokeWidth={2.2} />
        {category}
      </span>
    </div>
  );
}
