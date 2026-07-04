"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const ABOUT_HEADING =
  "I’m Alfara. I build things that serve a purpose and evoke delight. I simplify the complex, craft memorability, and ship products that last.";

const BELIEF_TITLE = "What I Believe";

const BELIEF_PARAGRAPHS = [
  "The greatest work is the one we’re inspired by and passionate for. The greatest ideas are built by people who are aligned with their vision and desire to create. Freelancing truly allows this by letting you choose projects you want to work on with the people that inspire you, on a schedule that fits your lifestyle.",
  "It lets you grow as a professional, having full control over the direction of your career and your personal brand. There’s never been a better time to explore our passions and creative freedom, and build a career doing so.",
  "With Portal, I aim to make it easier for creatives like you to handle the essential parts of freelancing with ease and style. From collecting payments globally and on time to sending proposals or invoices without messing with PDFs, all while showcasing your unique persona brand, Portal simplifies the business side so you can focus on what you love.",
  "It’s the beginning of the journey for Portal, so I’d love to hear how Portal could make freelancing even better for you. Join me on this journey, and let’s build something amazing together.",
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
          Know Alfara Deeper
          <ArrowRight size={16} strokeWidth={2.2} />
        </motion.a>
      </motion.div>
    </div>
  );
}
