"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export type ExperienceItem = {
  company: string;
  type: string;
  role: string;
  date: string;
  logo: string;
  bullets: string[];
};

export function Experiences({ experiences }: { experiences: ExperienceItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="mt-20 space-y-10">
      {experiences.map((experience, index) => (
        <ExperienceRow
          experience={experience}
          isOpen={openIndex === index}
          key={experience.company}
          onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          shouldReduceMotion={Boolean(shouldReduceMotion)}
        />
      ))}
    </ul>
  );
}

function ExperienceRow({
  experience,
  isOpen,
  onToggle,
  shouldReduceMotion,
}: {
  experience: ExperienceItem;
  isOpen: boolean;
  onToggle: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <li className="rounded-[20px]">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_auto] sm:gap-8">
        <div className="flex items-center gap-5">
          <div className="grid h-[60px] w-[60px] shrink-0 place-items-center overflow-hidden rounded-[16px] bg-white">
            <Image
              alt={`${experience.company} logo`}
              className="h-full w-full object-cover"
              height={160}
              sizes="60px"
              src={experience.logo}
              width={160}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-mono text-[22px] font-semibold tracking-[-0.04em] text-[#09090b]">
                {experience.company}
              </h3>
              <span className="rounded-md border border-[#bfcfe6] bg-white px-2 py-0.5 text-[13px] text-[#52525c]">
                {experience.type}
              </span>
            </div>
            <p className="mt-1.5 font-hanken text-[18px] text-[#0044a7]">{experience.role}</p>
          </div>
        </div>

        <p className="font-hanken text-[16px] text-[#333] sm:text-right">{experience.date}</p>

        <button
          aria-controls={`experience-detail-${experience.company}`}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${experience.company} details`}
          className="focus-ring group grid h-10 w-10 shrink-0 place-items-center justify-self-start rounded-full bg-[#e2f0ff] text-[#0044a7] transition-colors hover:bg-[#cfe3ff] sm:justify-self-end"
          onClick={onToggle}
          type="button"
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="flex items-center justify-center"
            transition={{ duration: 0.32, ease: PREMIUM_EASE }}
          >
            <ChevronDown size={18} strokeWidth={2.2} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={`experience-detail-${experience.company}`}
            initial={{ height: 0, opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.42, ease: PREMIUM_EASE }
            }
          >
            <motion.ul
              animate="show"
              className="ml-[86px] mt-5 list-disc space-y-2.5 pr-4 text-[15.5px] leading-[1.55] text-[#2e353f] marker:text-[#0044a7]"
              exit="hidden"
              initial="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {experience.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.34, ease: PREMIUM_EASE },
                    },
                  }}
                >
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
