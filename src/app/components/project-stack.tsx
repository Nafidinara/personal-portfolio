"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const BAR_PEEK = 56;

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

export function ProjectStack({ projects }: { projects: ProjectStackItem[] }) {
  const n = projects.length;
  const [active, setActive] = useState(n - 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Progress 0..1 across the tall section. Map so cards swap gradually.
    // Active window: 0.28..0.78 → step through n slots.
    const window = 0.5;
    const start = 0.28;
    const normalized = Math.max(0, Math.min(1, (progress - start) / window));
    const step = Math.min(n - 1, Math.floor(normalized * n));
    const nextActive = n - 1 - step;
    if (nextActive !== active) setActive(nextActive);
  });

  function advance() {
    setActive((current) => (current - 1 + n) % n);
  }

  return (
    <div
      className="relative mt-[95px]"
      ref={containerRef}
      style={{ height: `${100 + n * 45}vh` }}
    >
      <div className="sticky top-24">
        <div className="mx-auto max-w-[720px] px-6 lg:px-0">
          <div className="max-w-[620px]">
            <p className="mb-4 font-mono text-[16px] font-bold tracking-[-0.01em] text-[#0044a7]">
              PROJECTS
            </p>
            <h2 className="font-hanken text-[30px] font-semibold leading-[1.16] tracking-[-0.02em] text-[#09090b] sm:text-[34px]">
              A software engineer that turn messy problems into products people actually use — across
              software, blockchain, and AI.
            </h2>
          </div>

          <div className="relative mx-auto mt-[168px] h-[620px] w-full max-w-[560px]">
            {projects.map((project, index) => {
              const slot = (active - index + n) % n;
              const isFront = slot === 0;

              return (
                <motion.article
                  key={project.name}
                  aria-current={isFront ? "true" : undefined}
                  className="absolute inset-x-0 top-0 origin-top cursor-pointer overflow-hidden rounded-[18px] border border-[#dae9f8] bg-white shadow-[0_28px_70px_rgba(0,68,167,0.14)]"
                  onClick={advance}
                  animate={
                    shouldReduceMotion
                      ? { y: -slot * BAR_PEEK, opacity: 1, scale: 1 }
                      : {
                          y: -slot * BAR_PEEK,
                          scale: 1 - slot * 0.025,
                          opacity: 1,
                        }
                  }
                  style={{ zIndex: n - slot }}
                  transition={{ duration: 0.56, ease: PREMIUM_EASE }}
                  whileHover={
                    shouldReduceMotion || !isFront ? undefined : { y: -4, scale: 1.005 }
                  }
                >
                  <h3 className="sr-only">{project.name}</h3>
                  <BrowserBar file={project.file} category={project.category} />

                  <motion.div
                    animate={{
                      opacity: isFront ? 1 : 0,
                      height: isFront ? "auto" : 0,
                    }}
                    className="overflow-hidden"
                    initial={false}
                    transition={{ duration: 0.42, ease: PREMIUM_EASE }}
                  >
                    <div className="p-5">
                      <ProjectPreview project={project} priority={index === n - 1} />

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
                              onClick={(event) => event.stopPropagation()}
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
                              onClick={(event) => event.stopPropagation()}
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
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
          sizes="(min-width: 768px) 640px, 100vw"
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
