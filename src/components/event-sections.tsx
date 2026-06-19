import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { EVENT_TYPES } from "@/data/events";
import { Reveal } from "@/components/reveal";
import { SwooshDivider } from "@/components/brand";

/* ---------------------------------------------------------------------------
   Home preview — a "menu board" of the four event types. Shared hairlines, not
   a row of identical shadowed cards. Each links to its full section.
   --------------------------------------------------------------------------- */
export function EventTypeBoard() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
      {EVENT_TYPES.map((event, i) => (
        <Reveal key={event.id} delay={i * 50} className="bg-surface">
          <Link
            href={`/events#${event.id}`}
            className="group flex h-full items-start justify-between gap-4 p-7 transition-colors duration-150 [transition-timing-function:var(--ease-out)] hover:bg-surface-raised"
          >
            <div className="flex flex-col gap-2">
              <span className="eyebrow">{event.tagline}</span>
              <h3 className="font-display text-2xl leading-tight">{event.title}</h3>
            </div>
            <ArrowUpRight
              className="size-5 shrink-0 text-ink-muted transition-[transform,color] duration-200 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
              aria-hidden
            />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Full event sections (/events). Alternating two-column rows.
   --------------------------------------------------------------------------- */
export function EventTypeSections() {
  return (
    <div className="flex flex-col">
      {EVENT_TYPES.map((event, i) => {
        const flip = i % 2 === 1;
        return (
          <Reveal
            as="section"
            key={event.id}
            id={event.id}
            className="scroll-mt-28 border-t border-border py-14 first:border-t-0 sm:py-20"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={flip ? "lg:order-2" : ""}>
                <span className="eyebrow">{event.tagline}</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">{event.title}</h2>
                <SwooshDivider width={110} className="mt-4" />
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
                  {event.description}
                </p>
              </div>

              <div className={flip ? "lg:order-1" : ""}>
                <div className="rounded-xl border border-border bg-surface-raised p-7 sm:p-9">
                  <p className="eyebrow mb-5">What's included</p>
                  <ul className="flex flex-col gap-4">
                    {event.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-grid size-6 shrink-0 place-items-center rounded-full bg-gold/20 text-accent-text"
                        >
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="leading-relaxed text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
