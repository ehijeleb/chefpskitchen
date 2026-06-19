"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { Wordmark } from "@/components/brand";
import { ButtonLink } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-200 [transition-timing-function:var(--ease-out)]",
          scrolled || open
            ? "border-border bg-surface/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Chef P's Kitchen, home"
            className={cn(
              "flex items-center rounded-sm py-3 transition-[padding] duration-200 [transition-timing-function:var(--ease-out)]",
              scrolled ? "py-2.5" : "py-4",
            )}
          >
            <Wordmark width={scrolled ? 132 : 150} priority className="transition-[width] duration-200" />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 [transition-timing-function:var(--ease-out)]",
                    active ? "text-accent-text" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ButtonLink href="/enquire" className="hidden sm:inline-flex">
              Enquire
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-grid size-10 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-surface-raised md:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile sheet */}
      {open ? (
        <div className="border-b border-border bg-surface md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3 sm:px-8" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-lg font-medium transition-colors",
                    active ? "text-accent-text" : "text-ink hover:bg-surface-raised",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <ButtonLink href="/enquire" size="lg" className="mt-3 w-full">
              Enquire
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
