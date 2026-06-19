import type { Metadata } from "next";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { MenuGroup } from "@/components/menu-group";
import { CtaBand } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { MENU } from "@/data/menu";

export const metadata: Metadata = {
  title: "Sample menu",
  description:
    "A taste of Chef P's Kitchen: Afrofusion small plates, signature mains, sides, drinks and desserts. Every menu is built bespoke for your event.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      {/* page header */}
      <section className="pt-16 sm:pt-20">
        <Container size="narrow">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Sample menu"
              title="A starting point, not a set menu"
              intro="This is a taste of what we do. Every event menu is built bespoke around you, your guests and the occasion, so treat these as inspiration rather than a fixed list."
            />
          </Reveal>
        </Container>
      </section>

      {/* menu groups */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col gap-16">
            {MENU.map((group, i) => (
              <div key={group.id}>
                <MenuGroup group={group} />
                {/* mid-page reminder that menus are bespoke */}
                {i === 2 ? (
                  <Reveal className="mt-16">
                    <div className="rounded-xl border border-border bg-surface-raised px-6 py-8 text-center sm:px-10">
                      <Eyebrow>Made for you</Eyebrow>
                      <p className="mx-auto mt-3 max-w-2xl font-display text-xl leading-snug sm:text-2xl">
                        Love something here, or fancy something that isn't? We build every menu
                        from scratch for your event. Dietary needs, favourite dishes, a theme to
                        hit, just tell us.
                      </p>
                      <ButtonLink href="/enquire" className="mt-6">
                        Build your menu with us
                      </ButtonLink>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Hungry yet?"
        title="Let's build a menu around your event."
        body="Tell us the occasion and roughly how many, and we'll come back with a bespoke menu and a quote made for your day."
        cta="Start an enquiry"
      />
    </>
  );
}
