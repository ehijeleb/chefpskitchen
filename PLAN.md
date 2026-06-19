# Chef P's Kitchen — Build Plan

> Status: **awaiting approval.** No application code will be written until you sign off on this.
> Skills installed and used, brand assets extracted from the PDF (see §0 + §8).

---

## 0. What's already done (setup + extraction)

**Skills installed into `.claude/skills/`:**
- `ui-ux-pro-max/` — cloned from `github.com/nextlevelbuilder/ui-ux-pro-max-skill` (canonical `src/ui-ux-pro-max/`, including `scripts/search.py` + the CSV data). Runs via the `py` launcher (the `python3` alias on this box is a dead Windows Store stub; Python 3.14 is present as `py`).
- `emil-design-eng/` + `review-animations/` — cloned from `github.com/emilkowalski/skill`. The page at `emilkowal.ski/skill` only advertises `npx skills add emilkowalski/skill`; the real `SKILL.md` / `STANDARDS.md` came from the GitHub repo and are now local.

**Queries actually run (results folded into this plan):**
- `search.py "restaurant catering food service warm heritage" --design-system -p "Chef P's Kitchen"` → returned the *Hero-Centric + Conversion* pattern, a *Restaurant Menu (Playfair/Karla)* type pairing, "animate 1–2 elements", and the pre-delivery checklist.
- `search.py "editorial warm humanist heritage display serif body sans …" --domain typography` and a `--domain google-fonts` Fraunces lookup → drove the type decision below (I rejected the default Playfair suggestion — see §1).
- `search.py "animation motion scroll reveal accessibility prefers-reduced-motion …" --domain ux` → ease-out enter / ease-in exit, <300ms UI, no scroll-jacking, respect reduced-motion (High severity), animate 1–2 key elements per view.
- Emil skill read in full → custom easing curves, never `scale(0)`, exit faster than enter, `clip-path: inset()` reveals, stagger 30–80ms, transform/opacity only, `:active` scale(0.97).

**Brand PDF:** present and readable. It was at the repo root as `Chef P's - MAIN.pdf`; I copied it to `brand-source/Chef_P_s_-_MAIN.pdf` as the brief specifies. All 11 pages rendered and inspected.

---

## 1. Design system

### 1.1 Colour tokens (semantic, per-theme)

Raw brand colours (corrected, verified against page 1 of the PDF):
`Rich Black #0F0F0F` · `Golden Yellow #F2C230` · `Terracotta #C85C3A` · `Warm Cream #FBF2E3`.

These are **primitives**. Components only ever touch the *semantic* tokens below — no per-component hex anywhere.

| Semantic token | Light mode | Dark mode | Notes / contrast |
| --- | --- | --- | --- |
| `--bg` | `#FBF2E3` cream | `#0F0F0F` black | page background |
| `--bg-raised` | `#FFFBF3` (cream +) | `#1A1714` (warm near-black) | cards, header on scroll |
| `--text` | `#0F0F0F` | `#FBF2E3` | body. **16.9:1** both ways ✓ |
| `--text-muted` | `#5A5048` | `#C9BEAD` | secondary. ≥ 4.7:1 ✓ |
| `--accent` (gold) | `#F2C230` | `#F2C230` | decorative + large only |
| `--accent-strong` (terracotta) | `#C85C3A` | `#C85C3A` | large UI, borders, hovers |
| `--accent-text` | `#A8472A` deep terracotta | `#F2C230` gold | accessible accent **text** (cream 5.2:1; black 11.1:1) ✓ |
| `--on-accent` | `#0F0F0F` | `#0F0F0F` | text on a gold button (gold→black 11:1) ✓ |
| `--border` | `#E7D8BE` | `#2C2620` | hairlines, inputs |
| `--ring` (focus) | `#A8472A` | `#F2C230` | visible focus, ≥3:1 vs bg |

**Contrast rules baked in (the trap to avoid):** gold on cream is only **1.5:1** — so gold is *never* body text in light mode; it is brush strokes, fills, large display flourishes, and button backgrounds (with black text) only. Terracotta on cream is **3.7:1** (large/decorative OK, body NO) → body-weight accent text uses the deeper `#A8472A`. Every token pair above was computed, not eyeballed.

### 1.2 Typography — Fraunces (display) + Hanken Grotesk (body)

The skill's first suggestion was **Playfair Display / Karla**. I'm **not** taking it: Playfair is one of the most over-used "elegant restaurant" defaults and its high-contrast Didone tone reads cold and corporate, the opposite of a warm family kitchen. (Inter/Poppins/Montserrat are ruled out by the brief; Playfair is the serif-equivalent cliché.)

**Chosen pairing:**
- **Display — Fraunces** (variable: `opsz`, `wght`, `SOFT`, `WONK`, italics). A "wonky", soft-serif old-style face built explicitly for warmth and character. The `SOFT` axis rounds the terminals so it sits naturally beside a hand-painted brush wordmark; optical sizing keeps big headings characterful and small ones legible; real weight range gives hierarchy the single-weight alternatives (e.g. Calistoga) can't. Editorial, humanist, unmistakably not an AI default. Used for h1–h3 and pull quotes, occasional italic for editorial emphasis.
- **Body / UI — Hanken Grotesk** (variable weight). Warm, low-contrast, highly legible grotesque tuned for screen text. Quietly friendly without being cute, so the personality stays with Fraunces + the logo while body copy stays calm and readable. Also does double duty as the **letter-spaced uppercase eyebrow/label** face (`tracking ~0.2em`) echoing the geometric "KITCHEN" lockup.

Two families total → lean bundle. Self-hosted via `next/font/google` (`display: swap`, subset latin, only the weights used).

### 1.3 Spacing, radius, type scale

- **Spacing:** 4px base, t-shirt scale `4 8 12 16 24 32 48 64 96 128`. Section vertical rhythm `96–128px` desktop / `64px` mobile (the skill flagged "large sections, 48px+ gaps").
- **Radius:** restrained and warm, not pill-everything. `--r-sm 6px` (inputs, chips), `--r-md 12px` (cards), `--r-lg 20px` (feature panels). No fully-rounded cards-with-shadow grids.
- **Type scale** (clamped, fluid): Hero `clamp(2.75rem, 6vw, 5rem)` · H2 `clamp(2rem, 4vw, 3rem)` · H3 `1.5rem` · body `1.0625rem/1.7` · eyebrow `0.8125rem` uppercase tracked.
- **Elevation:** depth comes from cream/raised surface shifts + a single soft warm shadow token, not drop-shadow on everything.

### 1.4 Recurring brand motifs (used sparingly)

1. **Golden swoosh** (`swoosh.png`) — the hero signature; also a thin section-divider flourish under eyebrows.
2. **Terracotta hearts + dotted/dripped accents** — the "made with love" marks; used where an icon-as-bullet would normally go, and on the enquiry success state.
3. **Adinkra/leaf line-art** (`texture-leaves.png`) — very low-opacity corner texture on the About hero and footer only. Never behind body text.
4. **Stamp mark** (`stamp-light/dark.png`) — footer, favicon, OG, loading mark.
5. **Letter-spaced small-caps eyebrows** — the "KITCHEN" treatment as a system-wide label style.

---

## 2. The signature moment (hero brush-stroke)

**Execution.** The hero stacks: eyebrow → Fraunces headline → **the real golden brush stroke draws itself in** → sub-line + enquiry CTA. The swoosh is the genuine extracted `swoosh.png` (authentic brush texture preserved), revealed left-to-right with a **`clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` wipe** — Emil's image-reveal technique — over ~900ms on `--ease-drawer` `cubic-bezier(0.32,0.72,0,1)`, starting ~150ms after the headline settles so it reads as one orchestrated beat. The three terracotta dots/hearts pop in (opacity + scale 0.9→1) ~200ms after the stroke completes. One deliberate flourish; everything else around it stays still.

**Why not trace an SVG path:** tracing would throw away the dry-brush edge that makes it unmistakably Chef P's. The clip wipe keeps the real artwork and still "draws in".

**Reduced-motion fallback:** `prefers-reduced-motion: reduce` → swoosh renders at its final `inset(0 0 0 0)` state immediately (no wipe), dots/headline fade in with a 200ms opacity only, no transforms. Implemented by gating the keyframe/transition behind the media query, so the *content* is identical — only the motion is removed. No layout shift either way (the swoosh occupies its box from first paint; we animate the clip, not the size).

---

## 3. Sitemap & per-page sections

**Global chrome**
- **Header:** wordmark (theme-swapped asset) · nav (Home, Menu, Events, About) · theme toggle · always-visible **Enquire** button (gold, black text). Condenses on scroll (height + raised bg + border fade) via a single transform/opacity transition — not a hide-on-scroll gimmick. Mobile: slide-down sheet.
- **Footer:** stamp mark · tagline (rotates between the three brand lines, static per render) · contact (`hello@chefpskitchen.co.uk`, `@chefpskitchen`, placeholder phone) · nav · low-opacity leaf texture corner.

**`/` Home** — hero (signature) → warm intro (who Chef P's is, family recipes + cooked fresh) → four event types (asymmetric layout, not a 4-card row) → 3–4 signature dishes preview → "How it works" (Enquire → We design your menu → We cook fresh → We serve) → testimonials (clearly-marked placeholders) → closing enquiry CTA band.

**`/menu`** — intro framing it as **inspiration, fully customisable, built bespoke per event** (this message repeats at top, middle, and near the CTA). Groups from the PDF: Small Plates · Starters · Signature Mains · Sides · Drinks · Desserts. Each dish = name + the italic description. **Pricing: open question — see §8.** Closing "every menu is built around you → Enquire" CTA.

**`/events`** — hero uses `catering-lockup.png` on a dark band. Four full sections (Private dining & dinner parties · Corporate catering · Weddings & celebrations · Pop-ups & markets), each: what it is, what's included, who it suits. Then a "what's included / how booking works" strip and *family recipes + cooked fresh* reinforcement → enquiry CTA.

**`/about`** — the heart: family recipes, made with love, the Afrofusion philosophy (traditional roots, elevated plating — name real dishes), why events not a restaurant. First-person-plural, warm. Leaf-texture hero. Real `// TODO:` markers where personal facts (names, the founding story specifics) are needed.

**`/enquire`** — the form (§5) + contact details + reassurance ("real person reads every enquiry"). Honeypot + structure ready for captcha.

**System:** `sitemap.ts`, `robots.ts`, per-route metadata + OG, `manifest.ts` (PWA icons), domain-agnostic base URL via env so `chefpskitchen.co.uk` drops in later.

---

## 4. Component inventory

Primitives: `Button` (gold/terracotta/ghost variants, `:active` scale 0.97), `Eyebrow`, `SectionHeading`, `Container`, `Reveal` (IntersectionObserver wrapper, once, reduced-motion aware), `BrandImage` (theme-swapped `next/image`), `Swoosh`, `ThemeToggle`.

Composed: `Header`, `Footer`, `Hero` (+`HeroSwoosh`), `IntroBlock`, `EventTypeCard` / `EventTypeSection`, `DishCard`, `MenuGroup`, `HowItWorks` (numbered, hand-mark bullets), `TestimonialSlot` (placeholder-flagged), `CtaBand`, `EnquiryForm` (+ `Field`, `FieldError`, `SubmitState`).

Theme: `ThemeProvider` — inline pre-hydration script sets `data-theme` from `localStorage` then `prefers-color-scheme` (no flash), toggle persists to `localStorage`.

---

## 5. Enquiry form + data model

> **Update (post-approval, 2026-06-19):** the client chose **email-only delivery via
> Web3Forms** instead of a database. Supabase/Resend were removed; the route handler still
> validates server-side (honeypot included) but now forwards to Web3Forms, which emails the
> enquiry to the business inbox. The Supabase schema/RLS design below is kept for history in
> case a persisted store is wanted later. See `README.md` → "Enquiry delivery".

**Fields:** name* · email* (validated) · phone (tel) · event type (select: Private dining / Corporate / Wedding-celebration / Pop-up-market / Other) · event date (optional) · guest count (number) · location/postcode · message* (textarea) · `company` honeypot (hidden).

**Behaviour:** labels above inputs; inline validation **on blur**, error beneath field, first invalid field focused after a failed submit; loading → success/error; success confirms next step ("Thanks, we'll be in touch within `// TODO: lead time` — your enquiry's in."); inputs ≥44px; correct `inputmode`/`autocomplete`/keyboard types. Client validation with `zod`, **re-validated server-side** (never trust the client).

**Backend:** Next.js **Server Action / Route Handler** using the Supabase **service-role key, server-side only** (never shipped to the client). Resend email notification scaffolded behind `ENQUIRY_NOTIFICATIONS_ENABLED` + `RESEND_API_KEY` — absent ⇒ silently skipped, never blocks a submit, never emails without an explicit key.

**Supabase schema (migration provided):**

```sql
create table public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  phone        text,
  event_type   text not null,
  event_date   date,
  guest_count  integer,
  location     text,
  message      text not null,
  status       text not null default 'new',   -- new | contacted | quoted | booked | closed
  source       text default 'website'
);
alter table public.enquiries enable row level security;
-- No anon/auth policies → public anon client cannot SELECT/INSERT/UPDATE/DELETE.
-- Inserts happen only through the server action using the service role (bypasses RLS).
```

**RLS approach:** RLS on, **zero public policies**. The public client key can't read or write enquiries at all; the only writer is the server action holding the service-role key. This is the safest default for a write-only public form.

---

## 6. Motion plan

**Tokens** (from the Emil skill, global CSS vars):
`--ease-out: cubic-bezier(0.23,1,0.32,1)` · `--ease-in-out: cubic-bezier(0.77,0,0.175,1)` · `--ease-drawer: cubic-bezier(0.32,0.72,0,1)`. Durations: press 120ms · hover 160ms · reveal 320–400ms · hero swoosh ~900ms.

| Where | Motion | Easing / timing |
| --- | --- | --- |
| Hero swoosh | clip-path wipe (real PNG) | `--ease-drawer`, ~900ms, once |
| Hero text + dots | opacity + translateY 8px, slight stagger | `--ease-out`, 360ms, 60ms after prior |
| Section reveals | opacity + translateY 12px on enter (IntersectionObserver, `once`, `margin:-80px`) | `--ease-out`, 360ms |
| Dish / event cards | stagger in (40ms apart); hover = lift `translateY(-4px)` + image `scale(1.03)` | enter `--ease-out`; hover 160ms; gated `@media (hover:hover) and (pointer:fine)` |
| Buttons | `:active { transform: scale(0.97) }` | `--ease-out` 120ms |
| Theme toggle | icon cross-fade + 200ms colour transition on tokens | `ease` |
| Header condense | height + bg + border | `--ease-out` 200ms |

**Rules enforced:** transform/opacity only (no width/height/top/left); exits faster than enters; **one signature moment per view**, reveals are quiet; no scroll-jacking/parallax; `prefers-reduced-motion` ⇒ transforms dropped, opacity/colour kept, final states shown instantly. CSS transitions/`@starting-style` for interruptible UI; the hero may use WAAPI on `clip-path` for hardware-accelerated control.

---

## 7. Anti-slop self-check (Section 5, point by point)

- **Default centred-hero-over-dim-stock-photo + two buttons** → Avoided. Hero is type-led on a textured cream/black field with the *drawing* brush stroke as the focal moment and a single primary CTA. No stock photo, no gradient scrim, no button pair.
- **Purple/blue SaaS gradients, glassmorphism, neon** → None. Palette is strictly the four brand colours; surfaces are flat warm fills + one soft shadow token.
- **Wall of identical rounded shadow-cards (icon-title-paragraph ×N)** → Avoided. Event types use an asymmetric editorial layout; "how it works" is a numbered horizontal flow with hand-marks; dish cards are a distinct treatment from event sections. No repeated 4-up icon grid.
- **Emoji as icons** → None. Lucide (consistent stroke) where a functional icon is needed; brand hearts/dots/swoosh where a decorative mark fits.
- **Filler copy** → All copy hand-written, en-GB, warm, naming real dishes/spices (suya, ayamase, scotch bonnet, jollof). Unknown facts become visible `// TODO:` markers, never invented.
- **Over-animation** → One signature (the swoosh). Everything else is a quiet reveal/hover. Reduced-motion fully honoured.
- **"Lazy cream + serif" execution** (the subtle trap) → Earned, not phoned-in: real extracted brand texture, an asymmetric structured layout, Fraunces' wonk/soft character instead of default Playfair, and a genuine signature moment. If any section starts looking like "centred serif + hairline rule + nothing else", it gets restructured.

**Honest flag:** the closing "CTA band" is the one pattern that risks reading generic on any catering site. Mitigation: it carries the swoosh divider + a specific warm line ("Tell us about your event, we'll cook something worth remembering"), not "Get started today".

---

## 8. Open questions / TODOs for you

1. **Menu pricing — DECIDED ✓ (2026-06-19): bespoke, no prices.** `/menu` is framed purely as inspiration with no figures; messaging "every menu is priced bespoke per event" repeats at top/middle/CTA. The PDF's sample prices are not shown.
2. **Lead time** for the form success message + Events page ("we'll be in touch within ___").
3. **Delivery / service radius** (London only? Home-counties? for copy + later local SEO).
4. **Real testimonials** — currently placeholder slots. Send 2–3 with attribution when ready.
5. **About story specifics** — the founder's name(s) and the family-recipe origin. I'll write around `// TODO:` until you provide them; I won't invent a backstory.
6. **Phone number** — the PDF shows the placeholder `07XXX XXX XXX`; confirm the real number or I'll keep it clearly marked as placeholder.
7. **Supabase + Vercel** — do you want me to provision the Supabase project/table now via the connected Supabase tooling, or just ship the migration SQL + `.env.example` for you to run? Same question for the Vercel project.

**Brand PDF confirmation:** present at `brand-source/Chef_P_s_-_MAIN.pdf`. **Successfully extracted** to `public/brand/` (all verified by compositing onto target backgrounds — no halos): `wordmark-light`, `wordmark-dark`, `stamp-light`, `stamp-dark`, `swoosh` (isolated gold), `catering-lockup`, `texture-leaves`, `icon-512/192`, `apple-icon`, `favicon-32`, `og-image`. Extraction is documented and reproducible in `public/brand/README.md`. No page failed to render; the only minor artefact is a small authentic notch in `swoosh.png` where the original "P's" tail crossed the stroke (noted, unobtrusive).

---

## Proposed build order (after approval)

1. Scaffold Next.js (App Router, TS) + Tailwind wired to the CSS-variable tokens + fonts + theme provider. 2. Global chrome (Header, Footer, ThemeToggle). 3. Primitives + motion utilities (`Reveal`, `Button`, `Swoosh`). 4. Home (incl. signature). 5. Menu. 6. Events. 7. About. 8. Enquiry form + Supabase + migration. 9. SEO/metadata/manifest/sitemap. 10. Acceptance checklist (§12) + ui-ux-pro-max §1–§3 pre-delivery review, fix, README. Logical commits throughout.

**Tech:** Next.js (App Router, TS) · Tailwind + CSS-var tokens · Supabase (Postgres) · optional Resend (flagged) · Vercel-ready, domain-agnostic · secrets in `.env.local`, committed `.env.example`, `.gitignore` covers `.env*`.
