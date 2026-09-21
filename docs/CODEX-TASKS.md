# Codex tasks

Do these in order. Each task has a done-check. Do not start the next task until the current
one's check passes. Read `docs/BRIEF.md` fully before task 1. Read the `content/` files before
task 4. Ask when the brief is silent; do not guess.

Rules that apply to every task:
- Do not edit `app/globals.css` tokens, `content/*.ts`, or anything in `public/` except `og.png`.
  If a token or copy line is missing, say so in your report instead of adding one.
- TypeScript strict. No `any`. Server components by default; `"use client"` only where `motion`
  or state is needed (Reveal, Nav, the two signature moments).
- No new dependencies beyond `motion`, `sharp` (dev), `@types/*`, `typescript`, Tailwind 4.
- Commit after every task with a one-line message `task N: <what>`.

## Task 1: Scaffold

- Remove `app/page.js`, `app/layout.js`, `.eslintrc.json`, `jsconfig.json`, `postcss.config.mjs`,
  `tailwind.config.js`, `public/vercel.svg`, `public/logo.png`, `app/favicon.ico`.
- Add TypeScript (`tsconfig.json` strict, `paths: {"@/*": ["./*"]}`), Tailwind 4 via
  `@tailwindcss/postcss`, `motion`. Remove `react-icons`. Remove the `export` script from
  `package.json`; rename package to `asyyl`.
- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`.
- `app/layout.tsx`: `<html lang="en-NG">`, imports `globals.css`, `metadataBase` from `site.url`,
  title template, description, OpenGraph and Twitter defaults, favicon from
  `/brand/asyyl-mark.svg` (`icons: { icon: '/brand/asyyl-mark.svg' }`), JSON-LD `Organization`
  and `Person`.
- `app/sitemap.ts` and `app/robots.ts` for the five routes.
- README.md: replace content with the project name, stack, `npm run dev`, `npm run build`.

Done-check: `npm run build` succeeds; `out/index.html` exists; `git status` shows no leftover JS files.

## Task 2: Primitives

Create `components/ui/`:

- `Slide.tsx`: `<section data-tone="light"|"dark" id?>` with the padding scale from BRIEF section 5.
- `Container.tsx`: max width and gutters.
- `Eyebrow.tsx`, `Headline.tsx` (levels 1-3, maps to `text-hero|h2|h3`), `Lead.tsx`.
- `Button.tsx`: `variant: "primary"|"secondary"`, `href`, renders `<a>`; `href="whatsapp"`
  resolves to `site.contact.whatsappUrl` and opens in a new tab with `rel="noopener"`.
- `Shot.tsx`: takes a `Shot` from `content/products.ts`; renders `<picture>` with AVIF and WebP
  `srcset` for the widths that exist (`-1440`, `-800`, or the single width for receipts and
  mobile), `sizes` capped at half the pixel width, explicit `width`/`height`, `loading` prop.
- `Reveal.tsx` (`"use client"`): wraps children with the BRIEF section 6 entrance using `motion`.
  Props: `delay?`, `stagger?` (applies to direct children), `y?` (default 24). Honors
  `useReducedMotion`. Triggers once at `amount: 0.2`.

Done-check: a scratch route `app/_kit/page.tsx` renders every primitive in both tones; screenshot
it at 375 and 1440, save to `docs/review/kit-*.png`, then delete the route.

## Task 3: Nav and footer

- `components/Nav.tsx` (`"use client"`): per BRIEF section 5. Tone flips with the slide beneath
  (IntersectionObserver on `[data-tone]` sections, threshold at nav height). Mobile menu: full
  screen dark, links at `text-h2`, focus trapped, Escape closes, `aria-expanded` on the button,
  body scroll locked while open.
- `components/Footer.tsx`: dark slide from `site.footer`.
- Both mounted in `layout.tsx`.

Done-check: keyboard-only, open and close the mobile menu at 375px; Tab never escapes it while open.

## Task 4: Home

`app/page.tsx` composed of one component per section in `components/home/`, each reading only
from `content/home.ts`, `content/clients.ts`, `content/site.ts`:

`Hero`, `Audience`, `ProductSlides`, `Process`, `Proof`, `Clients`, `Founder`, `Cta`.

- Hero choreography exactly as BRIEF section 6. The hero screenshot is the LCP element: not
  lazy, `fetchPriority="high"`, preload its AVIF in `<head>`.
- `Clients`: names grouped by product, city in `--ink-2`, no logos. Entries with `confirm: true`
  render normally (Shuaibu edits the file, not the component).
- `Founder`: portrait in a 1px `.shot` frame at 320px, `object-fit: cover`, square.

Done-check: Lighthouse mobile on `/` meets BRIEF section 7. Save the report JSON to `docs/review/`.

## Task 5: Product pages

- `components/product/ProductPage.tsx` renders a `Product` from `content/products.ts`:
  hero → moments → modules → delivery → FAQ → CTA. Moments alternate text left / shot right.
  FAQ uses `<details>`/`<summary>` styled with tokens; no JS.
- `app/sms/page.tsx` and `app/bms/page.tsx` pass the product and set page metadata and
  `SoftwareApplication` JSON-LD.
- Signature moments (`"use client"`, small): `LedgerCount.tsx` for BMS moment 1;
  `TypedSearch.tsx` for SMS moment 1. Both honor reduced motion. Both run once.

Done-check: both routes build; both signature moments verified in a browser; Lighthouse mobile
on `/bms` meets budget (it carries the most client JS).

## Task 6: Services and contact

- `app/services/page.tsx` from `content/services.ts`: hero → offers (title, body, outcome as a
  small line in `--ink-2`) → cases → CTA.
- `app/contact/page.tsx`: dark slide per BRIEF section 8. WhatsApp button is `text-h3` sized.
  `tel:` and `mailto:` links. No form.

Done-check: every nav and footer link resolves in the exported `out/` folder.

## Task 7: OG image and final pass

- Generate `public/og.png` 1200x630: black background, hero headline in Asyyl Sans Display white,
  small mark bottom-left. Use `sharp` + SVG in a one-off script `scripts/og.mjs`.
- Run Lighthouse mobile on all five routes. Fix anything under budget.
- Run the done-list in BRIEF section 10. Save all evidence to `docs/review/`.
- Write `docs/REPORT.md`: what was built, every budget number measured, anything you could not
  meet and why, and any place the brief was unclear.

Done-check: `docs/REPORT.md` exists and every item in BRIEF section 10 has evidence.

## Not your job (Claude or Shuaibu will do these)

- Replacing 1x placeholder screenshots with curated 2x captures.
- Confirming client names in `content/clients.ts`.
- Any copy change.
- Deploy to Cloudflare Pages.
