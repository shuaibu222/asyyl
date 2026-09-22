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
against that exported directory through the local static server, using the mobile form factor,
375×812 screen emulation, and simulated throttling. Times below are milliseconds. The JSON files
named in the Evidence column are the reports from the final source and export.

| Route | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index | CPU benchmark | Evidence |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `/` | 99 | 100 | 100 | 100 | 1,214.328 | 2,058.440 | 85.500 | 0 | 1,444.766 | 1,536.5 | `docs/review/lighthouse-home.json` |
| `/sms` | 98 | 100 | 100 | 100 | 1,217.412 | 2,142.010 | 101.500 | 0 | 1,233.598 | 1,436.0 | `docs/review/lighthouse-sms.json` |
| `/bms` | 99 | 100 | 100 | 100 | 786.363 | 1,616.408 | 81.500 | 0 | 1,250.810 | 1,999.0 | `docs/review/lighthouse-bms.json` |
| `/services` | 97 | 100 | 100 | 100 | 1,367.047 | 2,087.365 | 142.159 | 0 | 1,474.990 | 1,521.0 | `docs/review/lighthouse-services.json` |
| `/contact` | 97 | 100 | 100 | 100 | 1,367.404 | 2,092.603 | 147.000 | 0 | 1,367.404 | 1,325.5 | `docs/review/lighthouse-contact.json` |

All five routes therefore meet the 95+ performance, 100 accessibility, 100 best-practices,
100 SEO, sub-2.5-second LCP, and zero-CLS budgets.

The Lighthouse CLI intermittently returned Windows `EPERM` while deleting its temporary Chrome
profile after a report had already been written. Each retained JSON file was parsed after the run
and contains a complete report. The cleanup warning does not affect the measurements above.

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

`public/og.png` measures **1200×630** and **33,549 bytes**.

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
- Reduced motion: all immediate reveals were visible and static; SMS typing and BMS ledger values
  were verified in normal and reduced-motion modes by `scripts/verify-product-moments.mjs`.
- Keyboard: the mobile menu toggle is reachable, focus wraps through the menu back to the toggle,
  Escape closes it, and focus returns to the toggle. The open/close labels and dark menu tone were
  also asserted in `docs/review/checks.json`.
- Accessibility structure: exported routes have one `h1`; all final Lighthouse accessibility
  scores are 100.
- SEO: every route exports OpenGraph/Twitter image metadata; `/sms` and `/bms` export
  `SoftwareApplication` data with Windows and BusinessApplication values; global Organization and
  Person data, sitemap, robots, and `lang="en-NG"` are present.

## Items that could not meet budget

No code-controlled performance or quality budget is unmet. The only numerical caveat is the
pre-supplied font set's ambiguous “131 KB” label described above; those locked files were outside
the permitted edit scope.

## Places the brief was unclear

1. Task 6 requires exact contact-page copy, while the hard rules prohibit hard-coded page copy and
   prohibit edits to `content/*.ts`; no contact content object exists. The page uses the exact copy
   from BRIEF section 8 locally rather than inventing or modifying copy.
2. The font budget does not state decimal versus binary units or rounding, while the locked files
   measure 132,072 bytes. Both representations are reported above rather than treating an inferred
   unit as fact.
3. The contact number was originally locked in `content/site.ts`; the later explicit instruction to
   change it to `08144045309` was treated as a direct exception limited to that number.
