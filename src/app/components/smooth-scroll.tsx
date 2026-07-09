"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Global Lenis smooth scroll. Drives the native scroll position, so Motion's
// useScroll keeps tracking correctly. Disabled under reduced motion so the
// browser's native (instant) scrolling is preserved.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
