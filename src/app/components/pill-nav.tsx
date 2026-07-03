"use client";

import {
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Mail,
  Newspaper,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  id: string;
  Icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Home", id: "home", Icon: Home },
  { label: "Projects", id: "projects", Icon: FolderKanban },
  { label: "Experiences", id: "experiences", Icon: BriefcaseBusiness },
  { label: "Achievements", id: "achievements", Icon: Trophy },
  { label: "Blog", id: "blog", Icon: Newspaper },
  { label: "Contact", id: "contact", Icon: Mail },
];

export function PillNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextSection = visibleSections[0]?.target.id;
        if (nextSection) {
          setActiveSection(nextSection);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.12, 0.24, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const hashSync = window.setTimeout(() => {
      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    }, 0);

    return () => {
      window.clearTimeout(hashSync);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:bottom-8"
    >
      <div className="flex h-[68px] max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/65 bg-white/35 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_18px_55px_rgba(0,68,167,0.16),0_4px_16px_rgba(255,255,255,0.28)] backdrop-blur-2xl backdrop-saturate-150">
        {navItems.map(({ label, id, Icon }) => {
          const isActive = activeSection === id;

          return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={`focus-ring inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-full px-4 font-hanken text-[17px] tracking-[-0.03em] transition-all duration-200 sm:px-5 ${
                isActive
                  ? "border border-white/55 bg-[linear-gradient(135deg,rgba(35,136,255,0.95)_0%,rgba(76,161,255,0.9)_48%,rgba(249,254,205,0.92)_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_10px_26px_rgba(0,122,255,0.24)]"
                  : "border border-transparent bg-white/0 text-[#5f6b7a] hover:border-white/45 hover:bg-white/45 hover:text-[#0044a7]"
              }`}
              href={`#${id}`}
              key={id}
              onClick={() => setActiveSection(id)}
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
