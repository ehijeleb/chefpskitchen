# Chef P's Kitchen

Marketing and enquiry website for **Chef P's Kitchen**, a Nigerian-and-Caribbean
Afrofusion home-catering business (events-first, no dine-in venue).

Two jobs: showcase the food and credibility, and generate catering enquiries.

- **Stack:** Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 (CSS-variable design
  tokens) · Supabase (Postgres) for enquiries · optional Resend for notifications ·
  built for Vercel, domain-agnostic.
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

The site runs without any backend config. Until Supabase is set up, the enquiry form
validates and shows a graceful "service not configured" message instead of saving.

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
| `NEXT_PUBLIC_SUPABASE_URL` | for the form | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | optional | Publishable key (not used to read enquiries; RLS blocks that). |
| `SUPABASE_SERVICE_ROLE_KEY` | for the form | **Server-only.** Never prefix with `NEXT_PUBLIC_`. Used only in the route handler to insert enquiries. |
| `ENQUIRY_NOTIFICATIONS_ENABLED` | no | `true` to enable new-enquiry emails (needs a Resend key too). |
| `RESEND_API_KEY` | no | Only if notifications are enabled. No key = no email, ever. |
| `ENQUIRY_NOTIFICATION_TO` / `_FROM` | no | Notification addresses. |

Secrets live in `.env.local` (gitignored). `.env*` is covered by `.gitignore`; only
`.env.example` is committed.

---

## Supabase setup

1. Create a Supabase project.
2. Run the migration in `supabase/migrations/0001_enquiries.sql` (SQL editor, or
   `supabase db push` with the CLI). It creates the `enquiries` table and enables Row
   Level Security **with no public policies**.
3. Copy the project URL + keys into `.env.local`.

**Security model:** RLS is on with zero policies, so the public/anon client cannot read or
write enquiries at all. The website writes only through the server route handler
(`src/app/api/enquiry/route.ts`) using the service-role key, which bypasses RLS. Read
submissions from the Supabase dashboard. Never expose the service-role key to the client
(the `src/lib/supabase-server.ts` module imports `server-only` so a build fails if it is
ever pulled into client code).

### Optional: email notifications

Set `ENQUIRY_NOTIFICATIONS_ENABLED=true` and `RESEND_API_KEY=...` to email
`ENQUIRY_NOTIFICATION_TO` on each new enquiry. It is fully optional and never blocks or
fails a submission. With no key, nothing is sent.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel (framework auto-detected as Next.js).
3. Add the environment variables from `.env.example` in the Vercel project settings.
   Set `NEXT_PUBLIC_SITE_URL` to your deployment URL.
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
    api/enquiry/route.ts  POST handler -> validate -> Supabase insert -> optional email
    sitemap.ts robots.ts manifest.ts
  components/             Header, Footer, Hero, ThemeToggle, Reveal, DishCard, EnquiryForm, ...
  data/                   menu.ts, events.ts, dishes.ts (content)
  lib/                    site config, enquiry schema (zod), supabase-server, notify, cn
public/brand/             extracted brand assets (+ README on how they were made)
supabase/migrations/      enquiries table + RLS
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
