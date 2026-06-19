import type { Metadata } from "next";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { SwooshDivider, Stamp } from "@/components/brand";
import { CtaBand } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Chef P's Kitchen is a family-run Afrofusion catering business. Family recipes, cooked fresh and made with love, for events of every size.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Our story"
              title="Food made by hand, with heart"
            />
            <SwooshDivider width={130} className="mt-6" />
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink-muted">
            <Reveal>
              <p className="font-display text-2xl leading-snug text-ink sm:text-[1.9rem] sm:leading-snug">
                Chef P's Kitchen started where most good food does, around a family table.
              </p>
            </Reveal>
            <Reveal delay={40}>
              <p>
                {/* TODO: replace with Chef P's real founding story and name(s). */}
                We grew up on Nigerian cooking, the kind that fills a house with the smell of
                smoked jollof and pepper and makes everyone find a reason to be in the kitchen. A
                Caribbean thread runs through it too, in the spice, the warmth, the way food is how
                we say we love you. Those recipes, and that feeling, are what we cook from today.
              </p>
            </Reveal>
            <Reveal delay={40}>
              <p>
                Afrofusion, to us, means honouring those roots while plating them with a little
                modern flair. Jollof becomes crisp arancini. Ayamase slow-cooks down over a lamb
                shank. Suya finds its way onto salmon. The flavours stay true, the presentation
                grows up a little. Traditional heart, elevated finish.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why events, not a restaurant */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <Reveal className="rounded-xl border border-border bg-surface-raised p-8 sm:p-10">
            <Eyebrow>Why events</Eyebrow>
            <h2 className="mt-3 text-2xl sm:text-3xl">Cooked fresh, for your occasion</h2>
            <div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-ink-muted">
              <p>
                We are an events and catering kitchen, not a dine-in restaurant. That is a choice,
                not a compromise. Cooking from our home kitchen means everything is made fresh, to
                order, by the people whose recipes these are, never sitting under a heat lamp,
                never mass-produced.
              </p>
              <p>
                It also means we get to cook for the moments that matter: the dinner party, the
                wedding, the launch, the pop-up. We bring the food to you, and you get to be a
                guest at your own table.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {[
              { title: "Family recipes", body: "Passed down, not bought in. Everything starts with how we were taught to cook at home." },
              { title: "Cooked fresh", body: "To order, by hand, in our own kitchen. Never reheated, never faceless." },
              { title: "Made with love", body: "Feeding people well is how we show we care. It is in every plate we send out." },
            ].map((value, i) => (
              <Reveal key={value.title} delay={i * 60} className="bg-surface-raised">
                <div className="flex h-full flex-col gap-3 p-8">
                  <h3 className="font-display text-xl">{value.title}</h3>
                  <p className="leading-relaxed text-ink-muted">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* sign-off with stamp */}
      <section className="pb-4">
        <Container size="narrow">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <Stamp size={84} />
            <p className="font-display text-2xl">Made with love. Served with pride.</p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Come hungry"
        title="Let us cook for your next gathering."
        body="Tell us about your event and we'll design a menu that tastes like home, dressed up for the occasion."
      />
    </>
  );
}
