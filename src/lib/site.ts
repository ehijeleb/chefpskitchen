/** Single source of truth for site-wide constants: identity, contact, nav.
 *  Domain-agnostic — the base URL comes from env so chefpskitchen.co.uk drops
 *  in later without code changes. */

export const SITE = {
  name: "Chef P's Kitchen",
  shortName: "Chef P's",
  tagline: "Afrofusion. Made with love.",
  // interchangeable secondary lines from the packaging
  taglineAlt: "Made with heart.",
  taglineTriad: "Flavour. Heritage. Heart.",
  description:
    "Nigerian and Caribbean home catering. Afrofusion food cooked fresh from family recipes for private dining, corporate events, weddings and pop-ups.",
  email: "eat@chefpkitchen.com",
  phone: "+44 7815 600961",
} as const;

/** Public base URL, no trailing slash. Falls back to localhost for dev. */
export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
] as const;
