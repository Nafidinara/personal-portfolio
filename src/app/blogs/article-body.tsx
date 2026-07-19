import Image from "next/image";
import { Info, Lightbulb, TriangleAlert, CircleCheck } from "lucide-react";
import type { ArticleBlock } from "@/lib/blog-data";
import { RichText } from "./rich-text";
import { CodeBlock } from "./code-block";

const CALLOUT_STYLES = {
  info: {
    wrap: "border-[#bcd6f5] bg-[#eef6ff]",
    icon: "text-[#0044a7]",
    title: "text-[#0044a7]",
    Icon: Info,
  },
  tip: {
    wrap: "border-[#cbe7cf] bg-[#eefaf0]",
    icon: "text-[#1a7f37]",
    title: "text-[#1a7f37]",
    Icon: Lightbulb,
  },
  warning: {
    wrap: "border-[#f2dcae] bg-[#fdf6e6]",
    icon: "text-[#a86500]",
    title: "text-[#a86500]",
    Icon: TriangleAlert,
  },
  success: {
    wrap: "border-[#bfe3c9] bg-[#edfaf0]",
    icon: "text-[#1a7f37]",
    title: "text-[#1a7f37]",
    Icon: CircleCheck,
  },
} as const;

// Renders the structured article body with comfortable, homepage-consistent
// typography plus rich media: images, animated diagrams, video, code, callouts,
// stat grids, and galleries.
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                className="pt-4 font-hanken text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#09090b] sm:text-[27px]"
                key={index}
              >
                <RichText text={block.text} />
              </h2>
            );

          case "ul":
            return (
              <ul className="space-y-3 pl-1" key={index}>
                {block.items.map((item, i) => (
                  <li className="flex gap-3 text-[18px] leading-[1.7] text-[#3f3f46]" key={i}>
                    <span
                      aria-hidden
                      className="mt-[13px] h-[6px] w-[6px] shrink-0 rotate-45 rounded-[1px] bg-[#2388ff]"
                    />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol className="space-y-3" key={index}>
                {block.items.map((item, i) => (
                  <li className="flex gap-4 text-[18px] leading-[1.7] text-[#3f3f46]" key={i}>
                    <span className="mt-[3px] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e2f0ff] font-mono text-[13px] font-bold text-[#0044a7]">
                      {i + 1}
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                className="my-8 border-l-[3px] border-[#2388ff] bg-white/60 py-2 pl-6 font-hanken text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-[#09090b] sm:text-[23px]"
                key={index}
              >
                <RichText text={block.text} />
              </blockquote>
            );

          case "code":
            return (
              <div className="my-8" key={index}>
                <CodeBlock code={block.code} lang={block.lang} />
              </div>
            );

          case "image":
            return (
              <figure className="my-9" key={index}>
                <div className="overflow-hidden rounded-[18px] border border-[#dae9f8] bg-white shadow-[0_18px_50px_rgba(0,68,167,0.12)]">
                  <Image
                    alt={block.alt}
                    className="h-auto w-full"
                    height={block.height}
                    sizes="(max-width: 680px) 100vw, 680px"
                    src={block.src}
                    width={block.width}
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-[#71717b]">
                    <RichText text={block.caption} />
                  </figcaption>
                ) : null}
              </figure>
            );

          case "gif":
            return (
              <figure className="my-9" key={index}>
                <div className="relative overflow-hidden rounded-[18px] border border-[#dae9f8] bg-white shadow-[0_18px_50px_rgba(0,68,167,0.12)]">
                  {block.label ? (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-[#0b1220]/85 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#e2f0ff] backdrop-blur-sm">
                      {block.label}
                    </span>
                  ) : null}
                  {/* Animated SVG loaded as an <img> so its CSS keyframes play like a gif. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={block.alt} className="h-auto w-full" loading="lazy" src={block.src} />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-[#71717b]">
                    <RichText text={block.caption} />
                  </figcaption>
                ) : null}
              </figure>
            );

          case "video":
            return (
              <figure className="my-9" key={index}>
                <div className="overflow-hidden rounded-[18px] border border-[#1d2b45] bg-[#0b1220] shadow-[0_18px_50px_rgba(0,68,167,0.14)]">
                  <video
                    autoPlay
                    className="h-auto w-full"
                    controls
                    loop
                    muted
                    playsInline
                    poster={block.poster}
                    preload="metadata"
                  >
                    <source src={block.src} type="video/mp4" />
                  </video>
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-[#71717b]">
                    <RichText text={block.caption} />
                  </figcaption>
                ) : null}
              </figure>
            );

          case "gallery":
            return (
              <figure className="my-9" key={index}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.images.map((img, i) => (
                    <div
                      className="overflow-hidden rounded-[16px] border border-[#dae9f8] bg-white shadow-[0_14px_40px_rgba(0,68,167,0.1)]"
                      key={i}
                    >
                      <Image
                        alt={img.alt}
                        className="h-full w-full object-cover"
                        height={img.height}
                        sizes="(max-width: 680px) 100vw, 340px"
                        src={img.src}
                        width={img.width}
                      />
                    </div>
                  ))}
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-[#71717b]">
                    <RichText text={block.caption} />
                  </figcaption>
                ) : null}
              </figure>
            );

          case "callout": {
            const style = CALLOUT_STYLES[block.variant];
            const { Icon } = style;
            return (
              <div
                className={`my-8 flex gap-4 rounded-[16px] border p-5 ${style.wrap}`}
                key={index}
              >
                <Icon className={`mt-0.5 shrink-0 ${style.icon}`} size={20} />
                <div>
                  {block.title ? (
                    <p className={`font-hanken text-[16px] font-bold tracking-[-0.01em] ${style.title}`}>
                      {block.title}
                    </p>
                  ) : null}
                  <p className={`text-[16px] leading-[1.6] text-[#3f3f46] ${block.title ? "mt-1" : ""}`}>
                    <RichText text={block.text} />
                  </p>
                </div>
              </div>
            );
          }

          case "stats":
            return (
              <div
                className="my-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
                key={index}
              >
                {block.items.map((stat, i) => (
                  <div
                    className="rounded-[16px] border border-[#dae9f8] bg-white p-5 text-center shadow-[0_12px_36px_rgba(0,68,167,0.05)]"
                    key={i}
                  >
                    <p className="font-hanken text-[28px] font-bold tracking-[-0.03em] text-[#0044a7]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[13px] leading-[1.35] text-[#71717b]">{stat.label}</p>
                  </div>
                ))}
              </div>
            );

          case "divider":
            return (
              <div
                className="my-12 flex items-center justify-center gap-2 text-[#bcd6f5]"
                key={index}
              >
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#cfe0f5]" />
                <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-[#2388ff]" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#cfe0f5]" />
              </div>
            );

          default:
            return (
              <p className="text-[18px] leading-[1.75] text-[#3f3f46]" key={index}>
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
