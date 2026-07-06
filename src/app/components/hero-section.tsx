"use client";

import Image from "next/image";
import { Mic, Send, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { FormEvent, KeyboardEvent, PointerEvent, useMemo, useState } from "react";

import { AskAlfaraSidebar } from "./ask-alfara/ask-alfara-sidebar";

const assetBase = "/figma-assets";

const heroRoles = [
  {
    id: "software",
    label: "Software Engineer",
    icon: `${assetBase}/software-e.png`,
    x: 24,
    y: 4,
    width: 190,
    height: 190,
  },
  {
    id: "ai",
    label: "AI Automation Builder",
    icon: `${assetBase}/ai.png`,
    x: 486,
    y: 38,
    width: 180,
    height: 180,
  },
  {
    id: "blockchain",
    label: "Blockchain Engineer",
    icon: `${assetBase}/chain.png`,
    x: 30,
    y: 222,
    width: 176,
    height: 176,
  },
  {
    id: "startup",
    label: "Startup Life",
    icon: `${assetBase}/startup.png`,
    x: 496,
    y: 220,
    width: 190,
    height: 190,
  },
] as const;

type HeroRoleId = (typeof heroRoles)[number]["id"];

type Segment =
  | { kind: "text"; value: string }
  | { kind: "pill"; label: string; tint: string; dot: string }
  | { kind: "highlight"; value: string };

const roleContent: Record<HeroRoleId, { subtitle: string; segments: Segment[] }> = {
  software: {
    subtitle: "Software Engineer",
    segments: [
      { kind: "text", value: "I build full-stack web apps, dashboards, and APIs with " },
      { kind: "pill", label: "Next.js", tint: "bg-[#0f172a] text-white", dot: "bg-white" },
      { kind: "pill", label: "TypeScript", tint: "bg-white text-[#0044a7] border border-[#bfcfe6]", dot: "bg-[#3178c6]" },
      { kind: "pill", label: "Node.js", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#5fa04e]" },
      { kind: "pill", label: "Go", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#00add8]" },
      { kind: "pill", label: "PostgreSQL", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#336791]" },
      { kind: "text", value: ", then manage them using " },
      { kind: "pill", label: "Docker", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#2496ed]" },
      { kind: "pill", label: "CI/CD", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#f472b6]" },
      { kind: "text", value: " shipping to " },
      { kind: "pill", label: "Vercel", tint: "bg-[#0f172a] text-white", dot: "bg-white" },
      { kind: "pill", label: "AWS", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#ff9900]" },
      { kind: "pill", label: "VPS", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#8b5cf6]" },
      { kind: "text", value: ". Over " },
      { kind: "highlight", value: "3 years" },
      { kind: "text", value: " I've delivered for " },
      { kind: "highlight", value: "15+ clients and collaborators" },
      {
        kind: "text",
        value:
          ": clean interfaces, solid data flows, and backend services that don't fall over. ",
      },
      { kind: "highlight", value: "90% positive feedback" },
      { kind: "text", value: " to show for it." },
    ],
  },
  ai: {
    subtitle: "AI Automation Builder",
    segments: [
      { kind: "text", value: "I build AI-powered tools and workflows with " },
      { kind: "pill", label: "Python", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#ffd43b]" },
      { kind: "pill", label: "LLMs", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#22c55e]" },
      { kind: "pill", label: "LangChain", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#0ea5e9]" },
      {
        kind: "text",
        value:
          " and model APIs (Claude, OpenAI, DeepSeek, Gemini), turning repetitive work into systems that run themselves. Recently, I helped a client manage ",
      },
      { kind: "highlight", value: "10,000+ products across 30 stores" },
      { kind: "text", value: " from one platform. Work that took days now finishes in minutes." },
    ],
  },
  blockchain: {
    subtitle: "Blockchain / Web3 Engineer",
    segments: [
      { kind: "text", value: "I build Web3 products with " },
      { kind: "pill", label: "Solidity", tint: "bg-white text-[#0f172a] border border-[#bfcfe6]", dot: "bg-[#0f172a]" },
      { kind: "pill", label: "Typescript", tint: "bg-white text-[#0044a7] border border-[#bfcfe6]", dot: "bg-[#3178c6]" },
      { kind: "text", value: ", ZK concepts, and smart contract tooling, working from " },
      { kind: "highlight", value: "contract logic" },
      { kind: "text", value: " and " },
      { kind: "highlight", value: "decentralized storage to blockchain-based applications" },
      {
        kind: "text",
        value:
          ". My work includes traceability systems, voting platforms, and product experiments that use blockchain to make data, ownership, and transactions more transparent and verifiable.",
      },
    ],
  },
  startup: {
    subtitle: "Startup Life",
    segments: [
      {
        kind: "text",
        value:
          "I build startup ideas from problem discovery to product execution, combining product strategy, team leadership, partnerships, operations, and market validation. Through Redooceit.com, we grew an early concept into a sustainability product that raised up to ",
      },
      { kind: "highlight", value: "IDR 500M" },
      { kind: "text", value: ", " },
      { kind: "highlight", value: "won 5+ competitions" },
      { kind: "text", value: ", and " },
      { kind: "highlight", value: "benefited 1,000+ residents" },
      { kind: "text", value: " through circular waste management initiatives." },
    ],
  },
};

const suggestions = [
  {
    question: "Who is Alfara?",
    response: "Alfara is a fullstack engineer building practical products across AI, web3, automation, and startup systems.",
    target: "#home",
  },
  {
    question: "What has he built?",
    response: "Opening featured projects: ShopeeLaku, Creditopia, Redooceit, and more.",
    target: "#projects",
  },
  {
    question: "How can I contact him?",
    response: "Opening contact options so you can start a conversation with Alfara.",
    target: "#contact",
  },
];

const introLines = [
  "I build web apps, AI automations, and web3 products for founders and teams.",
  "Shipped to production. Trusted by 15+ clients with 90% positive feedback.",
];

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

function scrollToSection(target: string) {
  const section = document.querySelector(target);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SegmentPill({
  segment,
  index,
  reducedMotion,
}: {
  segment: Extract<Segment, { kind: "pill" }>;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.span
      className={`mx-[3px] inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] align-middle text-[13px] font-semibold shadow-[0_4px_10px_rgba(0,68,167,0.05)] ${segment.tint}`}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.14 + index * 0.045,
        duration: 0.32,
        ease: PREMIUM_EASE,
      }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${segment.dot}`} />
      {segment.label}
    </motion.span>
  );
}

function SegmentHighlight({
  segment,
  index,
  reducedMotion,
}: {
  segment: Extract<Segment, { kind: "highlight" }>;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[-3px] bottom-[2px] top-[45%] rounded-[4px] bg-[#f4fca8]"
        initial={reducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.6 }}
        animate={{ scaleX: 1, opacity: 1 }}
        style={{ originX: 0 }}
        transition={{
          delay: 0.28 + index * 0.05,
          duration: 0.42,
          ease: PREMIUM_EASE,
        }}
      />
      <span className="relative font-semibold text-[#0f2646]">{segment.value}</span>
    </span>
  );
}

function RoleDetailPanel({
  roleId,
  reducedMotion,
}: {
  roleId: HeroRoleId;
  reducedMotion: boolean;
}) {
  const content = roleContent[roleId];

  return (
    <motion.div
      className="w-full max-w-[720px] px-4 text-center"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: PREMIUM_EASE }}
    >
      <p className="font-mono text-[15px] font-semibold tracking-[0.02em] text-[#0044a7]">
        {content.subtitle}
      </p>
      <p className="mt-3 text-[15px] leading-[1.5] text-[#2e353f]">
        {content.segments.map((segment, index) => {
          if (segment.kind === "text") {
            return <span key={`t-${index}`}>{segment.value}</span>;
          }
          if (segment.kind === "pill") {
            return (
              <SegmentPill
                index={index}
                key={`p-${index}-${segment.label}`}
                reducedMotion={reducedMotion}
                segment={segment}
              />
            );
          }
          return (
            <SegmentHighlight
              index={index}
              key={`h-${index}-${segment.value}`}
              reducedMotion={reducedMotion}
              segment={segment}
            />
          );
        })}
      </p>
    </motion.div>
  );
}

export function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [assistantMessage, setAssistantMessage] = useState("Ask Alfara anything · answers come straight from his profile");
  const [isFocused, setIsFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seedQuestion, setSeedQuestion] = useState<string | null>(null);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [activeRole, setActiveRole] = useState<HeroRoleId>("software");
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const patternX = useTransform(pointerX, [-1, 1], [-9, 9]);
  const patternY = useTransform(pointerY, [-1, 1], [-7, 7]);
  const lineX = useTransform(pointerX, [-1, 1], [12, -12]);
  const lineY = useTransform(pointerY, [-1, 1], [8, -8]);
  const auraX = useTransform(pointerX, [-1, 1], [-28, 28]);
  const auraY = useTransform(pointerY, [-1, 1], [-20, 20]);
  const ringX = useTransform(pointerX, [-1, 1], [18, -18]);
  const ringY = useTransform(pointerY, [-1, 1], [12, -12]);
  const particleX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const particleY = useTransform(pointerY, [-1, 1], [8, -8]);

  const particles = useMemo(
    () => [
      { left: "18%", top: "34%", size: 4, delay: 0.1 },
      { left: "31%", top: "18%", size: 5, delay: 0.8 },
      { left: "43%", top: "40%", size: 3, delay: 1.4 },
      { left: "58%", top: "22%", size: 4, delay: 0.4 },
      { left: "71%", top: "38%", size: 5, delay: 1.1 },
      { left: "82%", top: "27%", size: 3, delay: 1.8 },
    ],
    [],
  );

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion || window.innerWidth < 768) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(Math.max(-1, Math.min(1, x)));
    pointerY.set(Math.max(-1, Math.min(1, y)));
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleSuggestionClick(suggestion: (typeof suggestions)[number]) {
    setAssistantMessage(suggestion.response);
    openSidebarWith(suggestion.question);
  }

  function openSidebarWith(query: string) {
    setSeedQuestion(query);
    setSidebarOpen(true);
    setAssistantMessage("Chatting with Alfara · answers come straight from his profile");
  }

  function closeSidebar() {
    setSidebarOpen(false);
    setSeedQuestion(null);
    setInputValue("");
    setAssistantMessage("Ask Alfara anything · answers come straight from his profile");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = inputValue.trim();

    if (!query) {
      setAssistantMessage("Ask anything about Alfara’s work, background, or contact details.");
      return;
    }

    openSidebarWith(query);
    setInputValue("");
  }

  function handleAvatarKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsAvatarHovered((current) => !current);
    }

    if (event.key === "Escape") {
      setIsAvatarHovered(false);
      setActiveRole("software");
    }
  }

  function handleAvatarLeave() {
    setIsAvatarHovered(false);
    setActiveRole("software");
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[820px] flex-col items-center overflow-hidden px-4 pb-[140px] pt-[70px] text-center sm:pt-[84px]"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        aria-hidden="true"
        className="hero-pattern-field pointer-events-none absolute inset-x-[-120px] top-0 -z-10 h-full"
        style={shouldReduceMotion ? undefined : { x: patternX, y: patternY }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-depth-lines pointer-events-none absolute inset-x-[-80px] top-0 -z-10 h-full"
        style={shouldReduceMotion ? undefined : { x: lineX, y: lineY }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-glow-rings pointer-events-none absolute left-1/2 top-0 -z-10 h-[760px] w-[min(1240px,136vw)] -translate-x-1/2"
        style={shouldReduceMotion ? undefined : { x: ringX, y: ringY }}
      />
      <motion.div
        aria-hidden="true"
        className="hero-living-aura pointer-events-none absolute left-1/2 top-[-16px] -z-10 h-[820px] w-[min(1180px,132vw)] -translate-x-1/2 rounded-full blur-2xl"
        style={shouldReduceMotion ? undefined : { x: auraX, y: auraY }}
      />
      <div aria-hidden="true" className="hero-center-vignette pointer-events-none absolute left-1/2 top-[126px] -z-10 h-[520px] w-[min(820px,116vw)] -translate-x-1/2 rounded-full" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[94px] -z-10 h-[500px] w-[min(760px,105vw)] -translate-x-1/2"
        style={shouldReduceMotion ? undefined : { x: particleX, y: particleY }}
      >
        {particles.map((particle) => (
          <motion.span
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.25, 0.72, 0.25], y: [0, -8, 0], scale: [1, 1.18, 1] }
            }
            className="absolute rounded-full bg-[#2388ff]/35 shadow-[0_0_20px_rgba(35,136,255,0.35)]"
            key={`${particle.left}-${particle.top}`}
            style={{ left: particle.left, top: particle.top, height: particle.size, width: particle.size }}
            transition={{ delay: particle.delay, duration: 4.8, ease: "easeInOut", repeat: Infinity }}
          />
        ))}
      </motion.div>

      <motion.div
        animate={{
          height: isAvatarHovered ? 440 : 198,
          opacity: 1,
          scale: 1,
          width: isAvatarHovered ? 710 : 198,
          y: 0,
        }}
        aria-label="Alfara profile portrait"
        className="relative z-20 max-w-[calc(100vw-32px)] outline-none"
        initial={{ height: 198, opacity: 0, scale: 0.96, width: 198, y: 18 }}
        onBlur={handleAvatarLeave}
        onFocus={() => setIsAvatarHovered(true)}
        onKeyDown={handleAvatarKeyDown}
        onMouseEnter={() => setIsAvatarHovered(true)}
        onMouseLeave={handleAvatarLeave}
        role="button"
        tabIndex={0}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: PREMIUM_EASE }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 -translate-x-1/2"
            exit={{ opacity: 0, scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.98 }}
            key={isAvatarHovered ? "hero-avatar-hover" : "hero-avatar-idle"}
            style={
              isAvatarHovered
                ? { top: 22, height: 350, width: 276 }
                : { top: 0, height: 169, width: 169 }
            }
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.32, ease: PREMIUM_EASE }}
          >
            <Image
              alt="Alfara profile portrait"
              className="relative h-full w-full object-contain drop-shadow-[0_28px_70px_rgba(0,68,167,0.16)]"
              height={isAvatarHovered ? 350 : 320}
              priority
              sizes={isAvatarHovered ? "276px" : "169px"}
              src={isAvatarHovered ? `${assetBase}/hero-avatar-hover.png` : `${assetBase}/hero-avatar.png`}
              width={isAvatarHovered ? 276 : 320}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isAvatarHovered ? (
            <motion.div
              animate="show"
              className="pointer-events-none absolute inset-0 z-30 hidden sm:block"
              exit="hidden"
              initial="hidden"
              variants={{
                hidden: { opacity: 0, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {heroRoles.map((role) => {
                const isActive = activeRole === role.id;

                return (
                  <motion.button
                    aria-label={role.label}
                    aria-pressed={isActive}
                    className={`focus-ring pointer-events-auto absolute transition-[filter] ${
                      isActive ? "z-10" : "z-0"
                    }`}
                    key={role.id}
                    onFocus={() => setActiveRole(role.id)}
                    onMouseEnter={() => setActiveRole(role.id)}
                    style={{ height: role.height, left: role.x, top: role.y, width: role.width }}
                    type="button"
                    variants={{
                      hidden: { opacity: 0, scale: 0.72, y: 24, filter: "blur(10px)" },
                      show: {
                        opacity: isActive ? 1 : 0.82,
                        scale: isActive ? 1.04 : 0.94,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.46, ease: PREMIUM_EASE },
                      },
                    }}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -6, opacity: 1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Image
                      alt=""
                      className="h-full w-full object-contain drop-shadow-[0_16px_30px_rgba(0,68,167,0.18)]"
                      height={role.height}
                      src={role.icon}
                      width={role.width}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 font-hanken text-[34px] font-bold leading-[0.94] tracking-[-0.05em] text-[#0f2646] sm:text-[36px]"
        initial={{ opacity: 0, y: 16 }}
        transition={{ delay: 0.18, duration: 0.7, ease: PREMIUM_EASE }}
      >
        Alfara Nafi Dinara
      </motion.h1>

      <div className="relative mt-5 flex w-full max-w-[959px] flex-col items-center">
        <AnimatePresence initial={false} mode="wait">
          {isAvatarHovered ? (
            <RoleDetailPanel
              key={`role-${activeRole}`}
              reducedMotion={Boolean(shouldReduceMotion)}
              roleId={activeRole}
            />
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full flex-col items-center"
              exit={{ opacity: 0, y: -6 }}
              initial={{ opacity: 0, y: 6 }}
              key="hero-default"
              transition={{ duration: 0.3, ease: PREMIUM_EASE }}
            >
              <motion.p
                animate="show"
                className="max-w-[650px] text-[18px] leading-[1.45] tracking-[-0.01em] text-[#0f2646] sm:text-[20px] sm:leading-[1.4]"
                initial="hidden"
                variants={{ show: { transition: { delayChildren: 0.34, staggerChildren: 0.14 } } }}
              >
                {introLines.map((line, index) => (
                  <motion.span
                    className="block"
                    key={line}
                    variants={{
                      hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.62, ease: PREMIUM_EASE }}
                  >
                    {line}
                    {index === 0 ? <br className="hidden sm:block" /> : null}
                  </motion.span>
                ))}
              </motion.p>

              <motion.button
                animate={{ opacity: 1, y: 0 }}
                className="focus-ring hero-cta-shine relative mt-8 inline-flex h-14 overflow-hidden rounded-full border border-[#005fc6] bg-[#007aff] px-8 font-hanken text-[20px] font-semibold text-white shadow-[inset_0_1px_0_#8cc2ff,0_12px_32px_rgba(0,122,255,0.25)]"
                initial={{ opacity: 0, y: 14 }}
                onClick={() => scrollToSection("#projects")}
                transition={{ delay: 0.62, duration: 0.58, ease: PREMIUM_EASE }}
                type="button"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, boxShadow: "inset 0 1px 0 #b7d9ff, 0 16px 40px rgba(0,122,255,0.34)" }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  See What I&apos;ve Shipped
                  <Sparkles size={17} strokeWidth={1.8} />
                </span>
              </motion.button>

              <motion.div
                animate="show"
                className="mt-20 flex flex-wrap justify-center gap-3 px-4 sm:mt-24"
                initial="hidden"
                variants={{ hidden: {}, show: { transition: { delayChildren: 0.82, staggerChildren: 0.09 } } }}
              >
                {suggestions.map((suggestion) => (
                  <motion.button
                    className="focus-ring h-9 rounded-full border border-[#bfcfe6] bg-white/70 px-5 text-[15px] tracking-[-0.01em] text-[#333] shadow-[0_1px_1.5px_rgba(0,0,0,0.05)] backdrop-blur-md transition-colors hover:border-[#7dbbff] hover:text-[#0044a7]"
                    key={suggestion.question}
                    onClick={() => handleSuggestionClick(suggestion)}
                    type="button"
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, boxShadow: "0 10px 28px rgba(35,136,255,0.13)" }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    {suggestion.question}
                  </motion.button>
                ))}
              </motion.div>

              <motion.form
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 flex h-16 w-full max-w-[959px] items-center rounded-full border bg-white/72 px-4 shadow-[0_8px_30px_rgba(0,68,167,0.06)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 sm:px-5 ${
                  isFocused
                    ? "border-[#69aefc] bg-white shadow-[0_10px_42px_rgba(35,136,255,0.16)]"
                    : "border-[#bfcfe6]"
                }`}
                initial={{ opacity: 0, y: 16 }}
                onSubmit={handleSubmit}
                transition={{ delay: 1.02, duration: 0.58, ease: PREMIUM_EASE }}
              >
                <div className="relative min-w-0 flex-1 text-left">
                  {!inputValue && !isFocused ? (
                    <span className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 items-center text-[17px] text-[#71717b] sm:inline-flex">
                      What do you want to know about Alfara? Type it here
                      <span className="hero-input-cursor ml-1 h-5 w-px bg-[#2388ff]" />
                    </span>
                  ) : null}
                  <input
                    aria-label="Ask about Alfara"
                    className="relative z-10 block w-full min-w-0 bg-transparent text-[16px] text-[#333] outline-none placeholder:text-[#71717b] sm:text-[17px]"
                    onBlur={() => setIsFocused(false)}
                    onChange={(event) => {
                      setInputValue(event.target.value);
                      setAssistantMessage(
                        event.target.value
                          ? "Press send to ask Alfara"
                          : "Ask Alfara anything · answers come straight from his profile",
                      );
                    }}
                    onFocus={() => setIsFocused(true)}
                    type="text"
                    value={inputValue}
                  />
                </div>
                <motion.button
                  aria-label="Use voice"
                  className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#6d7684]"
                  type="button"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08, color: "#0044a7" }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                >
                  <Mic size={24} />
                </motion.button>
                <motion.button
                  animate={inputValue && !shouldReduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  aria-label="Send question"
                  className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2388ff]/25 text-[#0044a7] shadow-[0_0_0_1px_rgba(35,136,255,0.12)]"
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                    repeat: inputValue && !shouldReduceMotion ? Infinity : 0,
                  }}
                  type="submit"
                  whileHover={shouldReduceMotion ? undefined : { backgroundColor: "rgba(35,136,255,0.34)" }}
                >
                  <Send size={19} />
                </motion.button>
              </motion.form>

              <motion.p
                animate={{ opacity: 1, y: 0 }}
                aria-live="polite"
                className="mt-4 min-h-6 rounded-full border border-[#dae9f8] bg-white/60 px-4 py-1.5 text-[13px] text-[#0044a7] shadow-[0_8px_24px_rgba(0,68,167,0.05)] backdrop-blur-md"
                initial={{ opacity: 0, y: 8 }}
                transition={{ delay: 1.16, duration: 0.45 }}
              >
                {assistantMessage}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AskAlfaraSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        seedQuestion={seedQuestion}
      />
    </section>
  );
}
