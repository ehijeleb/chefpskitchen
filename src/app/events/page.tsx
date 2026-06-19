import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EventTypeSections } from "@/components/event-sections";
import { CtaBand, HowItWorks } from "@/components/sections";

export const metadata: Metadata = {
  title: "Events & catering",
  description:
    "Private dining, corporate catering, weddings and pop-ups. Afrofusion food cooked fresh from family recipes and brought to your event.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      {/* dark lockup hero band — the catering lockup is self-contained dark art */}
      <section className="bg-[#0f0f0f]">
        <Container className="py-14 sm:py-16">
          <Image
            src="/brand/catering-lockup.png"
            alt="Chef P's Kitchen — Catering & Events"
            width={2000}
            height={840}
            priority
            className="mx-auto h-auto w-full max-w-3xl"
          />
        </Container>
      </section>

      <section className="pt-16 sm:pt-20">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Events & catering"
              title="Family recipes, cooked fresh, brought to your event"
              intro="We cook everything by hand from recipes passed down in our family, fresh to order in our home kitchen, then bring it to you. Here is how we cater, whatever the occasion."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <EventTypeSections />
        </Container>
      </section>

      {/* booking process */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The process"
              title="Booking us, step by step"
              intro="No faceless ordering system. Real conversations, a bespoke menu, food cooked fresh on the day."
            />
          </Reveal>
          <div className="mt-10">
            <HowItWorks />
          </div>
          <Reveal className="mt-10">
            <p className="max-w-2xl text-ink-muted">
              <Eyebrow className="mb-2">Good to know</Eyebrow>
              {/* TODO: confirm real lead times, minimum numbers, deposit terms and service radius. */}
              Lead times, minimum guest numbers and our service area depend on the event. Tell us
              what you have in mind and we'll be straight with you about what's possible.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Let's cook for you"
        title="Got a date in mind? Let's talk."
        body="Share the occasion, the date and rough numbers. We'll come back with ideas and a quote built around your event."
        cta="Enquire now"
      />
    </>
  );
}
