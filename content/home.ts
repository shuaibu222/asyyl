// Home page copy, section by section, in render order.
// Every number here is sourced from repo QA docs (see docs/BRIEF.md "Proof").

export const home = {
  hero: {
    headline: "Software that works when the internet doesn't.",
    lead:
      "Asyyl builds offline school and business systems for Nigeria. I install them on your own computer, train your staff, and stay.",
    shot: { base: "/screens/sms/dashboard", alt: "Asyyl SMS dashboard showing a school's term position", width: 1440, height: 900 },
  },

  audience: {
    eyebrow: "Who this is for",
    headline: "Schools. Shops. Anyone tired of software that stops.",
    items: [
      {
        title: "Schools",
        body: "Nursery to secondary. Fees, results, report sheets, payroll. One computer, or a whole office on LAN.",
        href: "/sms",
        linkLabel: "Asyyl SMS",
      },
      {
        title: "Pharmacies, agrovets and shops",
        body: "Sales, stock, customers, and a ledger that balances to the naira. Every night, a verified backup.",
        href: "/bms",
        linkLabel: "Asyyl BMS",
      },
    ],
  },

  products: {
    eyebrow: "Products",
    items: [
      {
        id: "sms",
        name: "Asyyl SMS",
        kicker: "School management",
        headline: "Every student, every fee, every result. On your computer.",
        body:
          "Certified with 1,120 students, 60 staff, 14 classes and three terms in one database. Report sheets on A4, receipts on thermal paper, results imported from Excel in about a second.",
        href: "/sms",
        shot: { base: "/screens/sms/students", alt: "Asyyl SMS student directory", width: 1440, height: 900 },
      },
      {
        id: "bms",
        name: "Asyyl BMS",
        kicker: "Business management",
        headline: "A shop system whose books balance.",
        body:
          "Point of sale and full double-entry accounting in one offline installer. Six months of trading, 376 invoices, every month reconciled exactly.",
        href: "/bms",
        shot: { base: "/screens/bms/ledger-light", alt: "Asyyl BMS main ledger", width: 1440, height: 900 },
      },
    ],
  },

  process: {
    eyebrow: "How I work",
    headline: "Visit. Install. Train. Stay.",
    steps: [
      {
        n: "01",
        title: "Visit",
        body: "I come to your school or shop, sit with the people who will use it, and look at your current registers and Excel files.",
      },
      {
        n: "02",
        title: "Install",
        body: "One installer on your own computer. No internet needed. Your existing records come in from Excel, with a preview before anything is saved.",
      },
      {
        n: "03",
        title: "Train",
        body: "I train the bursar, the exam officer, the cashier: whoever does the work. On their own data, not a demo.",
      },
      {
        n: "04",
        title: "Stay",
        body: "Upgrades are one file. When you call, you reach the person who built it.",
      },
    ],
  },

  proof: {
    eyebrow: "Proof",
    headline: "Tested like money depends on it. Because it does.",
    stats: [
      { value: "1,120", label: "students certified in one school database" },
      { value: "₦427,763,462", label: "reconciled to the kobo: debits equal credits across 4,275 ledger entries" },
      { value: "426", label: "automated tests across both products" },
      { value: "0", label: "internet connections required" },
    ],
  },

  clients: {
    eyebrow: "In use today",
    headline: "Running in real schools and shops.",
    // Populated from content/clients.ts
  },

  founder: {
    eyebrow: "Who builds it",
    headline: "Built in Kano. Installed by hand.",
    body: [
      "I'm Shuaibu Abdulkadir. I design and build every Asyyl product, and I install each one myself.",
      "I have sat with bursars who keep three ledgers by hand, and with pharmacists who close the shop at ten and still balance the day. Asyyl exists because their software should not stop when the data finishes.",
    ],
  },

  cta: {
    headline: "Tell me what is slowing you down.",
    body: "One message. I reply myself, usually the same day.",
  },
} as const;
