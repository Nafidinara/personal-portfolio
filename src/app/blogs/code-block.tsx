"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked — no-op, the code is still selectable
    }
  }

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#1d2b45] bg-[#0b1220] shadow-[0_18px_50px_rgba(0,68,167,0.14)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          {lang ? (
            <span className="ml-2 font-mono text-[12px] font-semibold uppercase tracking-[0.06em] text-[#8ba3c7]">
              {lang}
            </span>
          ) : null}
        </div>
        <button
          className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[12px] text-[#8ba3c7] transition-colors hover:text-white"
          onClick={copy}
          type="button"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.65] text-[#e2f0ff]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
