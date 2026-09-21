# Asyyl website brief

This is the design contract for asyylsms.com. Design, copy and tokens are owned by Shuaibu and
Claude. Codex builds to this brief. When something here is unclear, ask; do not invent.

## 1. What this site is

Asyyl is a software studio in Kano, Nigeria. Two products are in production: **Asyyl SMS**
(school management) and **Asyyl BMS** (point of sale and accounting). Both are offline Windows
desktop apps, installed and supported in person by the founder, Shuaibu Abdulkadir.

The site sells **a consultant who ships software**, not a software download. The buyer is a
school proprietor, a pharmacist, an agrovet owner, in Kano, Abuja, Kaduna, on a phone, probably
on 4G. They decide by messaging WhatsApp.

The one idea, stated in the hero: **Software that works when the internet doesn't.**

## 2. Non-negotiables

1. **Monochrome.** Black, white and grey only. No accent colour anywhere. No gradients. No shadows.
   The only colour on the page is inside product screenshots.
2. **Keynote slides.** Every section is a slide with its own tone, `data-tone="light"` or
   `data-tone="dark"`. Sections alternate. The site does not follow OS dark mode.
3. **Big type, few words.** One headline per section in Asyyl Sans Display. One short lead in
   Asyyl Sans Text. Copy comes from `content/*.ts` verbatim. No component hardcodes words.
4. **Every interactive element works.** No `href="#"`. No button without an action. Ever.
5. **WhatsApp is the primary action** on every page. `site.contact.whatsappUrl`.
6. **Nigerian phone budget.** See section 7. Budget failures are bugs.
7. **Static export.** `output: 'export'`, deployed to Cloudflare Pages. No server code.
8. **Tokens live in `app/globals.css`.** Do not add colours, fonts, radii or easings anywhere else.

## 3. Brand assets (already in `public/`)

| Asset | Path | Use |
|---|---|---|
| Asyyl mark, ink | `/brand/asyyl-mark.svg` | Nav on light slides, favicon source |
| Asyyl mark, white | `/brand/asyyl-mark-white.svg` | Nav on dark slides, footer |
| SMS symbol | `/brand/asyyl-sms-symbol.svg`, `-white.svg` | Product card icon only |
| Fonts | `/fonts/*.woff2` (5 files, 131 KB total) | Loaded by `globals.css` |
| Portrait | `/people/shuaibu.jpg` | Founder section. 640px square, B&W, plus `shuaibu.avif`. Serve at 320 CSS px max; never enlarge. |
| SMS screenshots | `/screens/sms/{name}-{width}.{avif,webp}` | See `content/*.ts` for which name goes where |
| BMS screenshots | `/screens/bms/{name}-{width}.{avif,webp}` | Same |

Screenshot rule: render with `<picture>` (AVIF then WebP), explicit `width`/`height` from the
content file, `loading="lazy"` except the hero, `decoding="async"`, inside a `.shot` frame.
SMS captures are 1x: display them at **no more than half their pixel width** in CSS pixels
(a 1440px capture displays at 720px max) so they stay sharp on 2x phones. BMS captures are true 2x
(2880px source, served at 1440 and 800): they may display at up to 1440 CSS px.

## 4. Type

| Role | Family | Weight | Token |
|---|---|---|---|
| Hero headline | Asyyl Sans Display | 700 | `text-hero` |
| Section headline | Asyyl Sans Display | 600 | `text-h2` |
| Card title | Asyyl Sans Display | 600 | `text-h3` |
| Lead paragraph | Asyyl Sans Text | 400 | `text-lead` |
| Body | Asyyl Sans Text | 400 | `text-body` |
| Small, captions | Asyyl Sans Text | 400 | `text-small` |
| Eyebrow | Asyyl Sans Text | 600, uppercase | `.eyebrow` |
| Button | Asyyl Sans Text | 600 | `.btn` |

Headlines are `text-wrap: balance`. Paragraphs max 65ch. The naira sign is a real glyph in the
font: write `₦`, never "N" or "NGN".

## 5. Layout

- Container: `max-w-[var(--container-page)]`, gutter `px-gutter` (24px) on phones, 48px from `md`.
- Section padding: 96px phone, 128px tablet, 160px desktop. Hero is `min-h-[100svh]`.
- Grid: 12 columns from `lg`. Text columns never exceed 7 of 12.
- Keynote composition: headline centred at the top of the slide, screenshot below it, rising.
  Alternate with left-text / right-screenshot on product moments.
- Nav: 56px tall, mark + wordmark "Asyyl" left, four links right, WhatsApp pill far right using
  `.btn .btn-primary .btn-sm` (36px tall) so it sits inside the bar instead of filling it.
  Sticky, tone follows the slide under it (use IntersectionObserver to flip `data-tone` on the nav).
  Mobile: hamburger opens a full-screen dark slide with the four links in `text-h2` size.
- Footer: dark slide. Mark, one line of coming-soon products, links, copyright.

## 6. Motion (Premium personality)

One curve: `var(--ease-brand)` = `cubic-bezier(0.4, 0, 0.2, 1)`. Zero overshoot. Three durations:

| Token | ms | Use |
|---|---|---|
| `--duration-quick` | 200 | hover, focus, button invert |
| `--duration-enter` | 450 | anything entering on scroll |
| `--duration-hero` | 900 | hero headline and hero screenshot only |

**One entrance pattern everywhere:** opacity 0 → 1 and translateY 24px → 0. Triggered once when
20% of the element is in view. Stagger children 60ms, total under 400ms. Implement as one
`<Reveal>` component with the `motion` package. It must render children visible and static when
`prefers-reduced-motion: reduce` (use `useReducedMotion`).

**Secondary layer:** in every reveal, the screenshot rises first, its caption fades in 100ms later.
Cards: 1px border goes from `--line` to `--ink` on hover over 200ms. That is the whole hover.

**Hero choreography (900ms total):** headline words rise in three groups 80ms apart; lead fades
at 300ms; buttons at 420ms. **The hero screenshot does not animate.** It is the LCP element and
Chrome will not count it as painted until any entrance animation on it ends (measured: 1,125ms of
render delay). The product is simply there, sharp, from the first frame. Nothing else moves.

Hero-only exception: the hero's own reveals may run as pre-hydration CSS keyframes
(`.reveal-immediate` in `globals.css`) so they never wait for JavaScript. Every other reveal uses
the `<Reveal>` component.

**Signature moment, `/bms` ledger:** when the "The ledger reconciles" block enters view, two
numbers count from 0 to `₦427,763,462.00` over 1,200ms with the brand ease, then a third line
"Difference ₦0.00" fades in. Runs once. Under reduced motion, final values render immediately.

**Signature moment, `/sms` search:** the search screenshot is static. Above it, a fake input
types "abdullahi" one letter per 60ms then stops. Runs once on view. Reduced motion: shows typed.

Do not add: parallax, cursor effects, marquees, page transitions, loaders, particle backgrounds,
scroll hijacking, Lottie. If it is not listed above, it does not move.

## 7. Performance and quality budget

Measured with Lighthouse mobile (Moto G Power, Slow 4G) on the production build:

| Metric | Budget |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best practices, SEO | 100 |
| LCP | under 2.5s |
| JS shipped, gzipped, home page | under 150 KB |
| Hero image | under 120 KB per served variant |
| Fonts | 5 files, 131 KB total (already done) |
| Cumulative layout shift | 0 (every image has width and height) |

Accessibility: one `h1` per page, landmarks (`header`, `main`, `nav`, `footer`), hamburger has
`aria-label` and `aria-expanded`, mobile menu traps focus and closes on Escape, every screenshot
has the `alt` from content, focus ring visible on every interactive element, contrast on grey
text is at least 4.5:1 (the tokens already are).

SEO: `metadataBase`, title template `%s · Asyyl`, per-page description, OpenGraph and Twitter
cards with `/og.png` (1200x630, generated once from the hero, monochrome), `sitemap.xml`,
`robots.txt`, JSON-LD: `Organization` (site), `Person` (Shuaibu), `SoftwareApplication` on `/sms`
and `/bms` with `operatingSystem: Windows`, `applicationCategory: BusinessApplication`.
`<html lang="en-NG">`.

## 8. Pages

Content is in `content/`. Section order is the order in those files. Summary:

**`/`** hero → audience (2 cards) → products (2 slides, SMS light, BMS dark) → process (4 steps)
→ proof (4 stats) → clients (logo-less list of names and cities, grouped by product) → founder
(portrait left, two paragraphs right) → CTA → footer.

**`/sms`, `/bms`** one `ProductPage` template: hero (headline, lead, screenshot) → moments
(4, alternating sides) → modules (grid of 5 lists) → delivery (4 cards) → FAQ (native `<details>`,
styled) → CTA. Both have the signature moment named in section 6.

**`/services`** hero → offers (5, each with title, body, outcome line) → cases (2) → CTA.

**`/contact`** dark slide. Headline "Talk to Shuaibu." WhatsApp button (huge), call link, email
link, "Kano, Nigeria", and three lines under "What happens next": I reply myself · We agree a visit
date · You see it running on your data before you decide.

## 9. Proof: where every number comes from

| Claim | Source in the product repos |
|---|---|
| 1,120 students, 60 staff, 14 classes, 24 subjects, three terms | sms-system `CONTINUATION_HANDOFF_2026-09-20.md` |
| Upgrade rehearsed on 863 students, 31,419 results | sms-system `qa/upgrade-rehearsal/FINDINGS.md` |
| 285 SMS tests, 141 BMS tests (426 total) | sms-system handoff 2026-09-21; asyyl-bms `CLAUDE.md` |
| ₦427,763,462.00 Dr = Cr over 4,275 entries | asyyl-bms `PROJECT_HANDOFF.md` L236 |
| 376 invoices, six months, every month reconciled | asyyl-bms `qa/SIX-MONTH-BROWSER-ACCEPTANCE-LOG.md` |
| Nightly 22:00 verified backup, catch-up on launch | asyyl-bms `CLAUDE.md` L187-191 |
| 155 MB installer, no admin, no Java, no internet | asyyl-bms `ASYYL-BMS-ANSWERS.md` L92-95 |
| Excel result import for 80 students in about 1.2s | sms-system handoff 2026-09-20 |

Never publish anything from: `sms-system/qa/upgrade-rehearsal`, `qa/visual-audit/fresh-capture-*`,
`qa/design-analysis-*/sheets`, `qa/client-day/13-imports`, `asyyl-bms/qa/runtime/*/evidence`,
`asyyl-bms/_archive`. They contain real client data.

## 10. Definition of done

- `npm run build` succeeds with zero warnings and exports to `out/`.
- Every link resolves. Grep the build for `href="#"`: zero results.
- Lighthouse mobile on every route meets section 7.
- 375px wide: no horizontal scroll, hero headline fits in 4 lines, all tap targets 44px.
- Screenshots at 375px fill the container width; the half-pixel-width cap applies from `md` up.
- `prefers-reduced-motion: reduce`: every page renders complete and still.
- Keyboard only: can reach and use every link and the mobile menu.
- Screenshots of every route at 375px and 1440px saved to `docs/review/`.
