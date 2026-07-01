import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EnquiryForm } from "@/components/enquiry-form";
import { SwooshDivider } from "@/components/brand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Tell us about your event and we'll come back with bespoke menu ideas and a quote. Afrofusion home catering for private dining, weddings, corporate events and pop-ups.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Start an enquiry"
              title="Tell us about your event"
              intro="The more you tell us, the better we can help. There are no silly questions and no obligation, just the start of a good conversation about food."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <Reveal>
              <EnquiryForm />
            </Reveal>

            <Reveal delay={80}>
              <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:h-fit">
                <div className="rounded-xl border border-border bg-surface-raised p-7">
                  <Eyebrow>What happens next</Eyebrow>
                  <SwooshDivider width={96} className="mt-3" />
                  <ol className="mt-5 flex flex-col gap-4 text-ink-muted">
                    <li className="flex gap-3">
                      <span className="font-display text-accent-text">01</span>
                      <span>A real person reads your enquiry, every one of them.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-accent-text">02</span>
                      <span>
                        We come back with menu ideas and a quote built around your event
                        {/* TODO: confirm real response lead time */} within a couple of days.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display text-accent-text">03</span>
                      <span>We refine it together until it feels just right.</span>
                    </li>
                  </ol>
                </div>

                <div className="rounded-xl border border-border bg-surface-raised p-7">
                  <Eyebrow>Prefer to reach us directly</Eyebrow>
                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-3 text-ink transition-colors hover:text-accent-text"
                    >
                      <Mail className="size-4 shrink-0 text-accent-text" aria-hidden />
                      {SITE.email}
                    </a>
                    <a
                      href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-3 text-ink transition-colors hover:text-accent-text"
                    >
                      <Phone className="size-4 shrink-0 text-accent-text" aria-hidden />
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
