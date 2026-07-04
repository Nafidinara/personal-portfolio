"use client";

import { ChevronRight, Infinity as InfinityIcon, Layers, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { SiRust, SiSolana } from "react-icons/si";
import type { IconType } from "react-icons";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type Tech = { name: string; dot: string };

export type AchievementItem = {
  id: string;
  status: string;
  accent: string;
  subtitle: string;
  title: string;
  date: string;
  location: string;
  tags: string[];
  project: { name: string; techs: Tech[] };
  description: string[];
  images: string[];
};

const techIcon: Record<string, IconType | typeof Layers> = {
  Rust: SiRust,
  ICP: InfinityIcon as unknown as IconType,
  Solana: SiSolana,
};

function StatusBadge({ status, accent }: { status: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.02em] text-white"
      style={{ backgroundColor: accent }}
    >
      {status}
    </span>
  );
}

export function Achievements({ items }: { items: AchievementItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  const open = items.find((item) => item.id === openId) ?? null;

  return (
    <>
      <ul className="mt-16 space-y-6">
        {items.map((item, index) => (
          <AchievementCard
            index={index}
            item={item}
            key={item.id}
            onOpen={() => setOpenId(item.id)}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        ))}
      </ul>

      <AnimatePresence>
        {open ? (
          <AchievementModal
            item={open}
            onClose={close}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function AchievementCard({
  item,
  index,
  onOpen,
  shouldReduceMotion,
}: {
  item: AchievementItem;
  index: number;
  onOpen: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.li
      className="relative overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-[0_18px_45px_rgba(0,68,167,0.06)]"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.4, ease: PREMIUM_EASE }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[6px] rounded-l-[16px]"
        style={{ backgroundColor: item.accent }}
      />

      <button
        aria-label={`View ${item.title} details`}
        className="focus-ring group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-5 pl-8 pr-5 text-left"
        onClick={onOpen}
        type="button"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge accent={item.accent} status={item.status} />
            <p className="font-hanken text-[19px] font-bold tracking-[-0.02em] text-[#0f2646]">
              {item.title}
            </p>
          </div>
          <p className="mt-1.5 text-[14px] text-[#71717b]">
            {item.date} · {item.location}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                className="rounded-full border border-[#dae9f8] bg-white px-3 py-1 font-mono text-[12.5px] text-[#0044a7]"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <motion.span
          className="grid h-10 w-10 place-items-center rounded-full bg-[#e2f0ff] text-[#0044a7] transition-colors group-hover:bg-[#cfe3ff]"
          transition={{ duration: 0.24, ease: PREMIUM_EASE }}
          whileHover={shouldReduceMotion ? undefined : { x: 3 }}
        >
          <ChevronRight size={18} strokeWidth={2.2} />
        </motion.span>
      </button>
    </motion.li>
  );
}

function AchievementModal({
  item,
  onClose,
  shouldReduceMotion,
}: {
  item: AchievementItem;
  onClose: () => void;
  shouldReduceMotion: boolean;
}) {
  const paragraph = (text: string, index: number) => {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return (
      <p className="mt-4 text-[14.5px] leading-[1.65] text-[#0f2646]" key={index}>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong className="font-semibold text-[#0f2646]" key={i}>
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </p>
    );
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-labelledby={`achievement-title-${item.id}`}
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-4 py-10 sm:items-center"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      role="dialog"
      transition={{ duration: 0.24, ease: PREMIUM_EASE }}
    >
      <motion.button
        aria-label="Close overlay"
        className="absolute inset-0 bg-[#0f172a]/45 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />

      <motion.div
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-[18px] border border-[#dae9f8] bg-white shadow-[0_36px_100px_rgba(0,68,167,0.28)]"
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
        transition={{ duration: 0.34, ease: PREMIUM_EASE }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[6px]"
          style={{ backgroundColor: item.accent }}
        />

        <button
          aria-label="Close"
          className="focus-ring absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-[#71717b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f2646]"
          onClick={onClose}
          type="button"
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        <div className="pb-8 pl-10 pr-8 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge accent={item.accent} status={item.status} />
            <p className="font-mono text-[13px] text-[#0f2646]">{item.subtitle}</p>
          </div>

          <h3
            className="mt-4 font-hanken text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0f2646] sm:text-[32px]"
            id={`achievement-title-${item.id}`}
          >
            {item.title}
          </h3>

          <p className="mt-3 text-[14px] text-[#71717b]">
            {item.date} · {item.location}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#71717b]">
              PROJECT
            </span>
            <span className="font-hanken text-[15px] font-semibold text-[#0f2646]">
              {item.project.name}
            </span>
            <ul className="ml-auto flex flex-wrap gap-1.5">
              {item.project.techs.map((tech) => {
                const Icon = techIcon[tech.name];
                return (
                  <li
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#dae9f8] bg-white px-2.5 py-0.5 font-mono text-[12px] font-semibold text-[#0f2646]"
                    key={tech.name}
                  >
                    {Icon ? (
                      <Icon aria-hidden="true" size={12} style={{ color: tech.dot }} />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: tech.dot }}
                      />
                    )}
                    {tech.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {item.images.map((src, index) => (
              <div
                aria-label={`${item.title} image ${index + 1} placeholder`}
                className="grid aspect-[16/10] w-full place-items-center rounded-[10px] bg-[#e5e7eb] text-[13px] font-mono text-[#94a3b8]"
                key={index}
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={`${item.title} image ${index + 1}`}
                    className="h-full w-full rounded-[10px] object-cover"
                    src={src}
                  />
                ) : (
                  "image placeholder"
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">{item.description.map(paragraph)}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
