import Image from "next/image";
import { Brain, Coins, Link2, Sparkles, Trophy, Workflow, type LucideIcon } from "lucide-react";
import type { CoverGlyph } from "@/lib/blog-data";

const GLYPHS: Record<CoverGlyph, LucideIcon> = {
  lending: Coins,
  llm: Brain,
  chain: Link2,
  automation: Workflow,
  ai: Sparkles,
  trophy: Trophy,
};

// Same diamond field used on the site body, as an inline background.
const DIAMOND =
  "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M22 18.5 25.5 22 22 25.5 18.5 22z' fill='%232388ff' fill-opacity='0.12'/%3E%3C/svg%3E\")";

export type BlogCoverProps = {
  tag: string;
  accent: string;
  glyph: CoverGlyph;
  coverImage?: string;
  coverAlt?: string;
  priority?: boolean;
  /** Larger glyph + tag for the article hero. */
  large?: boolean;
};

// The card thumbnail / article hero banner. Uses a real screenshot when the
// article has one, otherwise renders a branded gradient cover with a topic glyph.
export function BlogCover({
  tag,
  accent,
  glyph,
  coverImage,
  coverAlt,
  priority = false,
  large = false,
}: BlogCoverProps) {
  const Glyph = GLYPHS[glyph];

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#eef5ff]">
      {coverImage ? (
        <>
          <Image
            alt={coverAlt ?? ""}
            className="object-cover"
            fill
            priority={priority}
            sizes={large ? "(max-width: 680px) 100vw, 680px" : "(max-width: 680px) 100vw, 640px"}
            src={coverImage}
          />
          {/* Legibility scrim so the tag pill reads on any screenshot. */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/45 via-transparent to-[#0b1220]/20" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`}>
          <div className="absolute inset-0" style={{ backgroundImage: DIAMOND }} />
          {/* Soft brand orb */}
          <div className="mesh-orb absolute -right-10 -top-12 h-56 w-56 rounded-full opacity-70 blur-[2px]" />
          <Glyph
            aria-hidden
            className="absolute bottom-[-14%] right-[-6%] text-white/70 drop-shadow-[0_8px_24px_rgba(0,68,167,0.25)]"
            size={large ? 320 : 190}
            strokeWidth={1.25}
          />
        </div>
      )}

      <span
        className={`absolute left-4 top-4 rounded-full bg-[#0b1220]/80 px-3 py-1 font-mono font-bold uppercase tracking-[0.06em] text-[#e2f0ff] backdrop-blur-sm ${
          large ? "text-[12px]" : "text-[11px]"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}
