"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { ArrowRight } from "lucide-react";

/** Home hero — the one signature moment. The real golden brush stroke draws
 *  itself in beneath the headline (clip-path wipe). Everything else stays quiet.
 *  Reduced motion + no-JS show the final state instantly (handled in CSS). */
export function Hero() {
  const swooshRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = swooshRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // CSS keeps it fully drawn; nothing to do
    // Kick the draw on the next frame so it reads as a deliberate beat after paint.
    const id = requestAnimationFrame(() => el.classList.add("is-drawing"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* low-opacity botanical texture, top-left, decorative only */}
      <Image
        src="/brand/texture-leaves.png"
        alt=""
        aria-hidden
        width={520}
        height={620}
        priority
        className="pointer-events-none absolute -left-16 -top-10 w-[min(46vw,420px)] select-none opacity-[0.35] dark:opacity-[0.12]"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <div className="hero-rise" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
            <Eyebrow>Afrofusion · Made with love</Eyebrow>
          </div>

          <h1 className="mt-5 text-[clamp(2.75rem,7vw,5rem)] leading-[1.02]">
            Afrofusion food,
            <br />
            cooked fresh{" "}
            <span className="relative inline-block">
              <span className="relative z-10">with love</span>
              {/* the drawing brush stroke sits under "with love" */}
              <span
                ref={swooshRef}
                className="hero-swoosh pointer-events-none absolute -bottom-3 left-0 z-0 block w-[112%] sm:-bottom-4"
                aria-hidden
              >
                <Image
                  src="/brand/swoosh.png"
                  alt=""
                  width={1200}
                  height={277}
                  priority
                  className="h-auto w-full select-none"
                />
              </span>
            </span>
            .
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"
            style={{ "--rise-delay": "140ms" } as React.CSSProperties}
          >
            Nigerian and Caribbean home catering, made by hand from family recipes. Private
            dining, weddings, corporate events and pop-ups, with every menu built bespoke for
            your day.
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ "--rise-delay": "240ms" } as React.CSSProperties}
          >
            <ButtonLink href="/enquire" size="lg">
              Start an enquiry
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/menu" size="lg" variant="outline">
              See the menu
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
