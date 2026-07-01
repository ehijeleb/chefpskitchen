import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Stamp } from "@/components/brand";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-surface-raised">
      {/* botanical texture, low opacity, bottom-right corner */}
      <Image
        src="/brand/texture-leaves.png"
        alt=""
        aria-hidden
        width={420}
        height={500}
        className="pointer-events-none absolute -bottom-12 -right-10 w-[min(40vw,320px)] -scale-x-100 select-none opacity-25 dark:opacity-[0.1]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Stamp size={64} />
          <p className="mt-5 max-w-xs font-display text-xl leading-snug">
            Flavour. Heritage. Heart.
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            Nigerian and Caribbean home catering, cooked fresh from family recipes for the days
            that matter.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="eyebrow mb-1">Explore</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-ink-muted transition-colors hover:text-accent-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/enquire"
            className="w-fit text-ink-muted transition-colors hover:text-accent-text"
          >
            Enquire
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="eyebrow mb-1">Get in touch</p>
          <a
            href={`mailto:${SITE.email}`}
            className="flex w-fit items-center gap-2 text-ink-muted transition-colors hover:text-accent-text"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
            className="flex w-fit items-center gap-2 text-ink-muted transition-colors hover:text-accent-text"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {SITE.phone}
          </a>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Made with love, served with pride.
          </p>
          <p>Afrofusion. Made with love.</p>
        </div>
      </div>
    </footer>
  );
}
