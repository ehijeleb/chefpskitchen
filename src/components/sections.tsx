import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { SwooshDivider } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { HOW_IT_WORKS } from "@/data/events";
import { ArrowRight } from "lucide-react";

/* ---------------------------------------------------------------------------
   Closing call-to-action band — warm + specific, not "get started today"
   --------------------------------------------------------------------------- */
export function CtaBand({
  eyebrow = "Let's talk",
  title = "Tell us about your event, we'll cook something worth remembering.",
  body = "Send a few details and a real person, not a bot, will come back to you with ideas built around your day.",
  cta = "Start an enquiry",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-xl border border-border bg-surface-raised px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <SwooshDivider width={120} />
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">{body}</p>
            <ButtonLink href="/enquire" size="lg" className="mt-2">
              {cta}
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   How it works — numbered flow, brand hand-marks instead of generic icons
   --------------------------------------------------------------------------- */
export function HowItWorks() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {HOW_IT_WORKS.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 60} className="bg-surface-raised">
          <div className="flex h-full flex-col gap-3 p-7">
            <span
              aria-hidden
              className="font-display text-3xl text-accent-text"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl leading-tight">{step.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------------------
   Testimonial slot — clearly a placeholder until real quotes arrive
   --------------------------------------------------------------------------- */
export function TestimonialSlot({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-lg border border-dashed border-border-strong bg-surface-raised p-7">
      <blockquote className="font-display text-xl leading-snug text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="text-sm text-ink-muted">
        {attribution}
        {/* TODO: replace with real, attributed testimonials from Chef P. */}
        <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-xs uppercase tracking-wide text-ink-muted/80">
          Placeholder
        </span>
      </figcaption>
    </figure>
  );
}
