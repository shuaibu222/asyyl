# Asyyl delivery report

## What was built

The repository now exports a five-route Asyyl site: `/`, `/sms`, `/bms`, `/services`, and
`/contact`. It includes the shared responsive navigation and footer, the home keynote sequence,
the two product pages and their signature moments, services, the contact slide, static metadata,
Organization/Person/SoftwareApplication JSON-LD, sitemap, robots file, and the generated
1200×630 monochrome OpenGraph image.

The final contact source is `0814 404 5309`; its `tel:` value is `+2348144045309` and its
WhatsApp destination is `https://wa.me/2348144045309` with the supplied introductory message.

## Production verification

`npm run build` completed with no warnings and produced `out/`. Lighthouse 13.5.0 was run
against that exported directory through the local static server, using its mobile form factor
(412×823 at 1.75 device scale factor). The retained final reports use `provided` throttling;
that choice and the Slow 4G limitation are documented below. Times are milliseconds. Every JSON
file named in the Evidence column post-dates the final source and export.

| Route | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index | CPU benchmark | Evidence |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `/` | 100 | 100 | 100 | 100 | 555.014 | 555.014 | 74.635 | 0 | 991.000 | 475.0 | `docs/review/lighthouse-home.json` |
| `/sms` | 98 | 100 | 100 | 100 | 585.089 | 585.089 | 170.228 | 0 | 1,050.000 | 454.0 | `docs/review/lighthouse-sms.json` |
| `/bms` | 100 | 100 | 100 | 100 | 473.728 | 473.728 | 69.218 | 0 | 859.000 | 462.0 | `docs/review/lighthouse-bms.json` |
| `/services` | 98 | 100 | 100 | 100 | 593.727 | 593.727 | 155.425 | 0 | 1,129.000 | 467.5 | `docs/review/lighthouse-services.json` |
| `/contact` | 99 | 100 | 100 | 100 | 502.023 | 502.023 | 103.066 | 0 | 590.000 | 416.0 | `docs/review/lighthouse-contact.json` |

All five retained mobile reports measure 95+ performance, 100 accessibility, 100 best-practices,
100 SEO, sub-2.5-second LCP, and zero CLS. They do not certify the brief's Slow 4G condition:
the workstation was continuously at roughly 69–96% CPU during verification, and Lighthouse's
benchmark index fell from 1,325.5–1,999.0 in the preceding review to 411 in an isolated default
simulated-throttling retry. That retry measured `/` at performance 65, LCP 3,051.681ms and TBT
1,663.792ms. Those figures reflect host contention, but they are still a failed Slow 4G check;
the report does not claim that budget was met. A clean-host simulated rerun remains required.

## Static asset budgets

### JavaScript

The scripts referenced by the exported home page total **149,027 bytes gzipped (145.53 KiB)**,
measured by gzipping each distinct referenced JavaScript file and summing the results. Budget:
under 150 KB.

### Hero images

| Asset | Dimensions | Bytes |
|---|---:|---:|
| SMS `dashboard-800.avif` | 800×500 | 15,097 |
| SMS `dashboard-1440.avif` | 1440×900 | 37,271 |
| BMS `dashboard-light-800.avif` | 800×500 | 16,840 |
| BMS `dashboard-light-1440.avif` | 1440×900 | 40,196 |

Every served hero variant is below the 120 KB budget. `Shot` fills the container below 768px and
caps display width to half the served pixel width from 768px upward.

### Fonts and OpenGraph image

The five WOFF2 files total **132,072 bytes**, which is **132.07 kB decimal / 128.98 KiB**. The
brief labels the locked, pre-supplied set as “131 KB total (already done)” without defining the
unit or rounding. Interpreted as a strict decimal ceiling of 131,000 bytes, the locked assets are
1,072 bytes over; interpreted as rounded binary size, they are 129 KiB. No font asset was changed.

`public/og.png` measures **1200×630** and **31,467 bytes**. It was opened after generation and
the headline was visually confirmed as Asyyl Sans Display Bold rather than the former monospace
fallback; the small white mark is present at bottom-left.

## Definition-of-done evidence

- Final static build: `npm run build` succeeded and generated all requested routes in `out/`.
- Links: exported-page checks found zero `href="#"` values; every internal link and fragment
  resolved. Results are in `docs/review/checks.json`.
- Mobile layout: every 375px capture has `scrollWidth === innerWidth`; home measures exactly four
  headline lines; there are no tap targets below 44px.
- Desktop composition: the 1440px home capture measures the reviewed three-line headline.
- Screenshots: `home`, `sms`, `bms`, `services`, and `contact` each have final `-375.png` and
  `-1440.png` captures in `docs/review/`. Mobile captures used a 375×812 viewport,
  `deviceScaleFactor: 2`, and mobile emulation.
- Reduced motion: all immediate reveals were visible and static; SMS typing and both BMS ledger
  lines were verified at their exact final strings in normal and reduced-motion modes by
  `scripts/verify-product-moments.mjs`.
- Console: all five routes were checked in normal and reduced-motion modes with no warnings,
  uncaught exceptions, or console errors.
- Keyboard: the mobile menu toggle is reachable, focus wraps through the menu back to the toggle,
  Escape closes it, and focus returns to the toggle. The open/close labels and dark menu tone were
  also asserted in `docs/review/checks.json`.
- Accessibility structure: exported routes have one `h1`; all final Lighthouse accessibility
  scores are 100.
- SEO: every route exports OpenGraph/Twitter image metadata; `/sms` and `/bms` export
  `SoftwareApplication` data with Windows and BusinessApplication values; global Organization and
  Person data, sitemap, robots, and `lang="en-NG"` are present.

## Items that could not meet budget

The Slow 4G Lighthouse budget is not certified in this run because the only default simulated
retry was distorted by the host contention described above and measured below budget. The retained
`provided`-throttling reports pass every numeric threshold but are not a substitute for that
condition. The other numerical caveat is the pre-supplied font set's ambiguous “131 KB” label;
those locked files were outside the permitted edit scope.

## Places the brief was unclear

1. The font budget does not state decimal versus binary units or rounding, while the locked files
   measure 132,072 bytes. Both representations are reported above rather than treating an inferred
   unit as fact.
2. The contact number was originally locked in `content/site.ts`; the later explicit instruction to
   change it to `08144045309` was treated as a direct exception limited to that number.
3. The earlier contact-copy/source conflict is now resolved by `content/contact.ts`; the final
   sections 3 and 8 introduced no additional implementation ambiguity.
