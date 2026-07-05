"use client";

import { Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";

import { MessageBubble, ThinkingDots } from "./message-bubble";
import { STARTER_QUESTIONS, StarterChips } from "./starter-chips";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_HREF = "#contact";

export function AskAlfaraSidebar({
  isOpen,
  onClose,
  seedQuestion,
}: {
  isOpen: boolean;
  onClose: () => void;
  seedQuestion: string | null;
}) {
  const reducedMotion = useReducedMotion();
  const [input, setInput] = useState("");
  const streamRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLInputElement>(null);
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat/" }));
  const { messages, sendMessage, status, error, stop } = useChat({ transport });

  const isStreaming = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;
  const lastMessage = messages[messages.length - 1];
  const showThinkingDots =
    status === "submitted" || (isStreaming && lastMessage?.role !== "assistant");

  // Seed the first message when the sidebar is opened with a question.
  const seededRef = useRef<string | null>(null);
  useEffect(() => {
    if (!isOpen || !seedQuestion || seededRef.current === seedQuestion) return;
    seededRef.current = seedQuestion;
    void sendMessage({ text: seedQuestion });
  }, [isOpen, seedQuestion, sendMessage]);

  // Focus composer on open, auto-scroll on new messages.
  useEffect(() => {
    if (isOpen) composerRef.current?.focus();
  }, [isOpen]);
  useEffect(() => {
    const node = streamRef.current;
    if (!node) return;
    if (typeof node.scrollTo === "function") {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    } else {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, showThinkingDots]);

  // Esc closes.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stop();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, stop]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim().slice(0, 500);
    if (!trimmed || isStreaming) return;
    setInput("");
    void sendMessage({ text: trimmed });
  }

  function handlePickStarter(question: string) {
    if (isStreaming) return;
    void sendMessage({ text: question });
  }

  const panelInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, x: 32 };
  const panelAnimate = reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 };
  const panelExit = reducedMotion ? { opacity: 0 } : { opacity: 0, x: 32 };

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-[rgba(9,9,11,0.06)] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
            onClick={onClose}
          />
          <motion.aside
            aria-label="Ask Alfara chat"
            className="project-browser-shadow fixed inset-x-3 bottom-3 top-16 z-50 flex flex-col overflow-hidden rounded-[28px] border border-[#bfcfe6] bg-white/80 backdrop-blur-2xl sm:inset-auto sm:right-4 sm:top-4 sm:bottom-4 sm:w-[420px]"
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={{ duration: 0.5, ease: PREMIUM_EASE }}
            role="dialog"
          >
            <header className="flex items-center gap-3 border-b border-[#dae9f8] px-4 py-3">
              <div
                aria-hidden="true"
                className="h-[38px] w-[38px] flex-none rounded-full shadow-[0_0_24px_rgba(35,136,255,0.3)]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 34%, #fff, #2388ff 78%)",
                }}
              />
              <div>
                <div className="text-[16px] font-semibold leading-none text-[#0d1b2e]">
                  Ask Alfara
                </div>
                <div className="mt-1 text-[12px] text-[#0044a7]">
                  AI · grounded in real profile
                </div>
              </div>
              <button
                aria-label="Close chat"
                className="focus-ring ml-auto grid h-8 w-8 place-items-center rounded-full text-[#6d7684] transition-colors hover:bg-[rgba(35,136,255,0.10)]"
                onClick={onClose}
                type="button"
              >
                <X size={18} />
              </button>
            </header>

            <div
              aria-live="polite"
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
              ref={streamRef}
            >
              {!hasMessages ? (
                <>
                  <div className="max-w-[86%] self-start rounded-[18px] rounded-bl-[6px] border border-[#dae9f8] bg-white/70 px-3.5 py-2.5 text-[14.5px] leading-[1.5] text-[#333] backdrop-blur-md">
                    Hi — I&apos;m Alfara&apos;s assistant. Ask about his work, stack, or
                    availability. I only answer from his real profile.
                  </div>
                  <StarterChips onPick={handlePickStarter} disabled={isStreaming} />
                </>
              ) : null}

              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  streaming={isStreaming && message.id === lastMessage?.id}
                />
              ))}

              {showThinkingDots ? <ThinkingDots /> : null}

              {error ? (
                <div className="self-start max-w-[86%] rounded-[18px] rounded-bl-[6px] border border-[#f0c9c9] bg-[#fff6f6] px-3.5 py-2.5 text-[14px] text-[#7a2020]">
                  I glitched mid-answer. You can reach Alfara directly at{" "}
                  <a className="underline" href="mailto:nafidinara@gmail.com">
                    nafidinara@gmail.com
                  </a>
                  .
                </div>
              ) : null}
            </div>

            <footer className="border-t border-[#dae9f8] p-3">
              <form
                className={`flex h-12 items-center gap-2 rounded-full border bg-white/72 px-3 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
                  input
                    ? "border-[#69aefc] shadow-[0_8px_24px_rgba(35,136,255,0.14)]"
                    : "border-[#bfcfe6]"
                }`}
                onSubmit={handleSubmit}
              >
                <input
                  aria-label="Ask a question"
                  className="min-w-0 flex-1 bg-transparent text-[14.5px] text-[#333] outline-none placeholder:text-[#71717b]"
                  maxLength={500}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    isStreaming ? "Alfara is typing…" : "Ask anything…"
                  }
                  disabled={isStreaming}
                  value={input}
                />
                <button
                  aria-label="Send"
                  className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[rgba(35,136,255,0.25)] text-[#0044a7] shadow-[0_0_0_1px_rgba(35,136,255,0.12)] transition-transform active:scale-95 disabled:opacity-50"
                  disabled={isStreaming || !input.trim()}
                  type="submit"
                >
                  <Send size={17} />
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-[#71717b]">
                <a className="hover:text-[#0044a7]" href={CONTACT_HREF}>
                  Get in touch →
                </a>
                <span>{STARTER_QUESTIONS.length} suggestions above</span>
              </div>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
