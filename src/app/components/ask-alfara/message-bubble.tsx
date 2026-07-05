"use client";

import { motion, useReducedMotion } from "motion/react";
import type { UIMessage } from "ai";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function MessageBubble({
  message,
  streaming,
}: {
  message: UIMessage;
  streaming: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const isUser = message.role === "user";
  const text = messageText(message);

  const wrapperClass = isUser
    ? "self-end bg-[rgba(35,136,255,0.12)] border border-[#bfcfe6] text-[#0d2a4d] rounded-[18px] rounded-br-[6px]"
    : "self-start bg-white/70 border border-[#dae9f8] text-[#333] rounded-[18px] rounded-bl-[6px] backdrop-blur-md";

  return (
    <motion.div
      className={`max-w-[86%] px-3.5 py-2.5 text-[14.5px] leading-[1.5] shadow-[0_2px_10px_rgba(0,68,167,0.04)] ${wrapperClass}`}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.34, ease: PREMIUM_EASE }}
    >
      <span className="whitespace-pre-wrap">{text}</span>
      {streaming && !isUser ? (
        <span
          aria-hidden="true"
          className="hero-input-cursor ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#2388ff] align-middle"
        />
      ) : null}
    </motion.div>
  );
}

export function ThinkingDots() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return (
      <div className="self-start px-3.5 py-2.5 text-[14px] text-[#71717b]">…</div>
    );
  }
  return (
    <div
      aria-label="Assistant is thinking"
      className="self-start flex gap-[5px] px-3.5 py-3"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-[7px] w-[7px] rounded-full bg-[#2388ff]"
          initial={{ opacity: 0.4, y: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
          transition={{ duration: 1.1, ease: PREMIUM_EASE, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
