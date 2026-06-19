# Chef P's Kitchen

Marketing and enquiry website for **Chef P's Kitchen**, a Nigerian-and-Caribbean
Afrofusion home-catering business (events-first, no dine-in venue).

Two jobs: showcase the food and credibility, and generate catering enquiries.

- **Stack:** Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 (CSS-variable design
  tokens) · enquiries emailed via **Web3Forms** (no database) · built for Vercel,
  domain-agnostic.
- **Design:** light + dark mode (both first-class), Fraunces + Hanken Grotesk type system,
  the brand's golden brush-stroke as a signature hero animation, motion that respects
  `prefers-reduced-motion`.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

The site runs without any backend config. Until the Web3Forms key is set, the enquiry
form validates and shows a graceful "service not configured" message instead of sending.

### Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next lint |

---

## Environment variables

See `.env.example` for the full list. Summary:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | No trailing slash. Drives canonical URLs, OG, sitemap. Use the `*.vercel.app` URL for now, swap to `chefpskitchen.co.uk` later. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | for the form | Free access key from [web3forms.com](https://web3forms.com). Enquiries are emailed to the address you used to create the key. Public by design (Web3Forms' free plan submits from the browser). |

Secrets live in `.env.local` (gitignored). `.env*` is covered by `.gitignore`; only
`.env.example` is committed.

---

## Enquiry delivery (Web3Forms)

The form emails each enquiry straight to your inbox. No database.

1. Go to [web3forms.com](https://web3forms.com), enter the email you want enquiries sent
   to, and they email you a free **access key**. (On first use Web3Forms sends a one-time
   verification email — confirm it so enquiries start arriving.)
2. Put it in `.env.local` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...` (and in Vercel's env
   settings for production).

**How it flows:** the browser validates with `zod`, then posts directly to Web3Forms.
Web3Forms' free plan only accepts browser submissions, so the access key is `NEXT_PUBLIC_`
(public by design — it just names which inbox to email). Spam is handled by two honeypots
(`company` + Web3Forms' `botcheck`) and any captcha you enable in the Web3Forms dashboard.
With no key, the form still validates but shows a friendly "please email us" message
instead of sending.

> Note: this is email-only, so there is no saved record if an email ever bounces or is
> spam-filtered (Web3Forms keeps a copy in its own dashboard). For a few enquiries a week
> that's fine. If you later want enquiries persisted to a database too, that's a small
> addition.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel (framework auto-detected as Next.js).
3. Add the environment variables from `.env.example` in the Vercel project settings
   (`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`). Set
   `NEXT_PUBLIC_SITE_URL` to your deployment URL.
4. Deploy. No custom domain is required; everything is domain-agnostic. When
   `chefpskitchen.co.uk` is ready, point it at the Vercel project and update
   `NEXT_PUBLIC_SITE_URL`.

---

## Project structure

```
src/
  app/
    layout.tsx            root layout: fonts, theme, metadata, header/footer
    globals.css           design tokens (light/dark), motion tokens, reveal + hero CSS
    page.tsx              home (signature hero, intro, events, dishes, how-it-works, CTA)
    menu/ events/ about/ enquire/   the inner pages
    sitemap.ts robots.ts manifest.ts
  components/             Header, Footer, Hero, ThemeToggle, Reveal, DishCard, EnquiryForm, ...
  data/                   menu.ts, events.ts, dishes.ts (content)
  lib/                    site config, enquiry schema (zod), cn
public/brand/             extracted brand assets (+ README on how they were made)
brand-source/             the source brand PDF
PLAN.md                   the approved design/build plan
.claude/skills/           ui-ux-pro-max + Emil Kowalski animation skills used in the build
```

## Theming, motion, accessibility

- **Theme:** semantic CSS variables mapped per theme; a pre-hydration script sets
  `data-theme` from `localStorage` then `prefers-color-scheme` (no flash). The visible
  toggle persists the choice. Contrast verified ≥4.5:1 for body text in both modes.
- **Motion:** custom easing tokens; the hero brush-stroke draws in via a `clip-path` wipe;
  scroll reveals use IntersectionObserver. Everything degrades to its final state under
  `prefers-reduced-motion`, and reveals stay visible without JS.
- **A11y:** semantic landmarks, skip link, visible focus rings, labelled icon-only buttons,
  alt text on meaningful images (empty alt on decorative), no horizontal scroll at
  375/768/1024/1440.

## Brand assets

Everything in `public/brand/` was extracted programmatically from
`brand-source/Chef_P_s_-_MAIN.pdf`. The how and why (and how to regenerate) is in
`public/brand/README.md`.

## Outstanding (need real info — marked with `// TODO:` in code)

- Real phone number (PDF shows a placeholder).
- Lead times, minimum numbers, deposit terms, service area (Events + form copy).
- Real, attributed testimonials (home page currently uses clearly-marked placeholders).
- Chef P's founding story specifics and name(s) (About page).
