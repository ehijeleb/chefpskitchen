import type { Metadata } from "next";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { MenuGroup } from "@/components/menu-group";
import { CtaBand } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { MENU, DIETARY_KEY, MENU_INTRO, MENU_DIETARY_NOTE, MENU_CLOSING } from "@/data/menu";

export const metadata: Metadata = {
  title: "Sample menu",
  description:
    "A taste of Chef P's Kitchen: small chops, party jollof, soups and swallow, Caribbean classics and more. A Nigerian kitchen with Caribbean touches. Every menu is built bespoke for your event.",
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
              intro={MENU_INTRO}
            />
            <p className="mt-6 rounded-lg border border-border bg-surface-raised px-5 py-4 font-medium text-ink">
              {MENU_DIETARY_NOTE}
            </p>

            {/* dietary key legend */}
            <div className="mt-6">
              <Eyebrow>Key</Eyebrow>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {DIETARY_KEY.map((d) => (
                  <li key={d.code} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="rounded-full border border-border-strong px-1.5 py-px text-[0.625rem] font-semibold uppercase tracking-wide text-ink-muted">
                      {d.code}
                    </span>
                    {d.label}
                  </li>
                ))}
              </ul>
            </div>
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
                        from scratch for your event. Halal meat, dietary needs, favourite dishes,
                        a theme to hit, just tell us.
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

          {/* closing note */}
          <Reveal className="mx-auto mt-16 max-w-3xl border-t border-border pt-8 text-center">
            <p className="text-lg italic leading-relaxed text-ink-muted">{MENU_CLOSING}</p>
          </Reveal>
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
