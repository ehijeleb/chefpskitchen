import { Hero } from "@/components/hero";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { EventTypeBoard } from "@/components/event-sections";
import { DishCard } from "@/components/dish-card";
import { CtaBand, HowItWorks, TestimonialSlot } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { SIGNATURE_DISHES } from "@/data/dishes";
import { SITE, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": `${siteUrl()}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: siteUrl(),
  servesCuisine: ["Nigerian", "Caribbean", "Afrofusion"],
  email: SITE.email,
  image: `${siteUrl()}/brand/og-image.png`,
  // Events-first, cooked from a home kitchen — no public dine-in address.
  areaServed: "United Kingdom",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Warm intro */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Who we are</Eyebrow>
            <p className="font-display text-2xl leading-snug sm:text-[1.9rem] sm:leading-snug">
              We are a family that loves feeding people. Chef P's Kitchen is Afrofusion cooking,
              Nigerian roots with a Caribbean accent, made by hand from recipes passed down through
              our family.
            </p>
            <p className="text-lg leading-relaxed text-ink-muted">
              We cook everything fresh, to order, from our home kitchen, then bring it to your
              event. Jollof with real smoke, ayamase that takes its time, suya you can smell before
              you see it. Traditional flavours, plated with a bit of love and a bit of flair. No
              restaurant, no shortcuts, just proper food for the days that matter.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Event types */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we cook for you"
              title="Four ways to bring us in"
              intro="From an intimate dinner party to a wedding for the whole family, we cook to suit the occasion."
            />
          </Reveal>
          <div className="mt-10">
            <EventTypeBoard />
          </div>
        </Container>
      </section>

      {/* Signature dishes */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="A taste of it"
              title="Dishes we are known for"
              intro="A sample of the Afrofusion menu. Everything is built bespoke for your event."
            />
            <ButtonLink href="/menu" variant="outline" className="shrink-0">
              See the full menu
            </ButtonLink>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNATURE_DISHES.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 50}>
                <DishCard dish={dish} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From hello to served"
              intro="Booking us is simple. You bring the occasion, we bring the food."
            />
          </Reveal>
          <div className="mt-10">
            <HowItWorks />
          </div>
        </Container>
      </section>

      {/* Testimonials (placeholders) */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Kind words" title="What people say" align="center" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal delay={0}>
              <TestimonialSlot
                quote="The jollof alone had everyone asking who catered. Genuinely the best food we've had at an event."
                attribution="Awaiting a real client quote"
              />
            </Reveal>
            <Reveal delay={60}>
              <TestimonialSlot
                quote="Warm, professional, and the food was unreal. They made our day feel effortless."
                attribution="Awaiting a real client quote"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
