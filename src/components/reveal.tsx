"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** stagger: each item delays by index * step (ms). Keep small (30-80ms). */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** optional id, e.g. for in-page anchor targets */
  id?: string;
};

/** Reveals children on scroll-into-view, once. The hidden->visible CSS lives in
 *  globals (gated on `.js` + no reduced-motion), so this only toggles a class.
 *  IntersectionObserver, fires once, with a small bottom margin. */
export function Reveal({ children, delay = 0, as, className, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reveal styling isn't active (reduced motion / no support), bail visible.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
