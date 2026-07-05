"use client";

import { motion, useReducedMotion } from "motion/react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export const STARTER_QUESTIONS = [
  "Is Alfara available for freelance?",
  "Has he done blockchain work?",
  "What's his strongest stack?",
  "How can I reach him?",
] as const;

export function StarterChips({
  onPick,
  disabled,
}: {
  onPick: (question: string) => void;
  disabled: boolean;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reducedMotion ? 0 : 0.05 } },
      }}
    >
      {STARTER_QUESTIONS.map((question) => (
        <motion.button
          key={question}
          className="focus-ring h-9 rounded-full border border-[#bfcfe6] bg-white/70 px-3.5 text-[13px] tracking-[-0.01em] text-[#333] shadow-[0_1px_1.5px_rgba(0,0,0,0.05)] backdrop-blur-md transition-colors hover:border-[#7dbbff] hover:text-[#0044a7] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled}
          onClick={() => onPick(question)}
          type="button"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.28, ease: PREMIUM_EASE }}
          whileHover={
            reducedMotion || disabled
              ? undefined
              : { y: -3, boxShadow: "0 10px 28px rgba(35,136,255,0.13)" }
          }
          whileTap={reducedMotion || disabled ? undefined : { scale: 0.98 }}
        >
          {question}
        </motion.button>
      ))}
    </motion.div>
  );
}
