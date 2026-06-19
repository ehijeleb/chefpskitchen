import { Container, ButtonLink, Eyebrow } from "@/components/ui";
import { SwooshDivider } from "@/components/brand";

export default function NotFound() {
  return (
    <section className="py-28 sm:py-36">
      <Container size="narrow">
        <div className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>Page not found</Eyebrow>
          <h1 className="text-4xl sm:text-5xl">This plate's empty</h1>
          <SwooshDivider width={130} />
          <p className="max-w-md text-lg leading-relaxed text-ink-muted">
            We couldn't find that page. Let's get you back to the good stuff.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/menu" variant="outline">
              See the menu
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
