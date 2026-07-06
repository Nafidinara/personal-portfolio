"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const ABOUT_HEADING =
  "I’m Alfara. I turn ideas into working products: web apps, AI automations, and web3 systems that businesses actually run on.";

const BELIEF_TITLE = "How I Work";

const BELIEF_PARAGRAPHS = [
  "Most projects don’t fail because of bad code. They fail because of slow feedback, unclear scope, and builders who disappear mid-project. I run things the opposite way: short cycles, a working demo you can click every week, and honest updates when something turns out harder than it looked.",
  "Five years of shipping taught me to think like an owner, not a ticket-taker: freelancing for 15+ clients, backend engineering at a national telco, and founding my own funded startup. I’ll push back on a feature that won’t move your numbers, and I’ll tell you when a cheaper path gets you the same result.",
  "Whether you need a web app, an AI automation that erases hours of manual work, or a web3 product, the deal is the same: clear communication, production-quality code, and a partner who cares whether the thing actually works for your business, not just whether it compiles.",
  "If that sounds like the engineer you want on your side, tell me what you’re building. The first conversation costs nothing, and you’ll walk away with a clearer plan either way.",
];

export function About({ avatarSrc = "/figma-assets/hero-avatar.png" }: { avatarSrc?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <motion.h2
        className="max-w-[720px] font-hanken text-[30px] font-semibold leading-[1.14] tracking-[-0.02em] text-[#09090b] sm:text-[34px]"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {ABOUT_HEADING}
      </motion.h2>

      <div className="relative mt-24 flex justify-center">
        <motion.article
          className="relative h-[680px] w-[680px] max-w-[calc(100vw-32px)] rounded-[22px] bg-white p-12 shadow-[-16px_18px_0_rgba(15,38,70,0.06),0_42px_70px_rgba(15,38,70,0.12)]"
          initial={
            shouldReduceMotion
              ? { opacity: 0, rotate: -2.5 }
              : { opacity: 0, y: 28, rotate: -2.5 }
          }
          transition={{ duration: 0.65, ease: PREMIUM_EASE }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            className="absolute right-8 top-[-46px] z-10 h-[100px] w-[100px] overflow-hidden rounded-full bg-white"
            transition={{
              duration: 5.4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          >
            <Image
              alt="Alfara portrait"
              className="h-full w-full object-cover"
              height={220}
              sizes="84px"
              src={avatarSrc}
              width={220}
            />
          </motion.div>

          <h3 className="font-hanken text-[28px] font-bold tracking-[-0.02em] text-[#0f2646] sm:text-[30px]">
            {BELIEF_TITLE}
          </h3>

          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.6] text-[#334155] sm:text-[16px]">
            {BELIEF_PARAGRAPHS.map((paragraph, index) => (
              <motion.p
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                key={index}
                transition={{
                  delay: 0.12 + index * 0.08,
                  duration: 0.44,
                  ease: PREMIUM_EASE,
                }}
                viewport={{ once: true, margin: "-40px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.article>
      </div>

      <motion.div
        className="mt-8 flex justify-center"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.18, duration: 0.44, ease: PREMIUM_EASE }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <motion.a
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#0044a7] px-7 py-3 font-hanken text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_14px_32px_rgba(0,68,167,0.28)]"
          href="#contact"
          whileHover={
            shouldReduceMotion
              ? undefined
              : { y: -3, backgroundColor: "#003080" }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          Tell Me About Your Project
          <ArrowRight size={16} strokeWidth={2.2} />
        </motion.a>
      </motion.div>
    </div>
  );
}
