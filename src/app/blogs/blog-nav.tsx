import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Lightweight top bar for the blog pages. The homepage PillNav is scroll-spy
// driven and only works on the single-page layout, so blog pages get their own
// simple, consistent header instead.
export function BlogNav({ backHref = "/", backLabel = "Back to portfolio" }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="mx-auto flex max-w-[760px] items-center justify-between px-4 pt-8 sm:px-6">
      <Link
        className="focus-ring group inline-flex items-center gap-2 rounded-full border border-[#bfcfe6] bg-white/70 px-4 py-2 font-hanken text-[14px] font-semibold text-[#09090b] shadow-[0_8px_24px_rgba(0,68,167,0.05)] backdrop-blur-sm transition-colors hover:border-[#0044a7] hover:text-[#0044a7]"
        href={backHref}
      >
        <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" size={16} />
        {backLabel}
      </Link>
      <Link
        aria-label="Home"
        className="focus-ring rounded-full transition-opacity hover:opacity-80"
        href="/"
      >
        <Image
          alt="Alfara"
          className="h-10 w-10 rounded-full object-contain"
          height={80}
          sizes="40px"
          src="/avatar/profile.png"
          width={80}
        />
      </Link>
    </header>
  );
}
