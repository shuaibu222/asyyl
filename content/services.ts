// Services page: the consulting offer. Products are proof; this is the pitch.

export const services = {
  hero: {
    headline: "I don't sell software. I fix how your office runs.",
    lead:
      "Every Asyyl engagement starts with a visit and ends with your staff working faster on their own data. The software is how I get there.",
  },
  offers: [
    {
      title: "Discovery visit",
      body: "Half a day at your school or shop. I sit with the people who do the work, look at the registers, the Excel files, the receipt book, and tell you plainly what software will fix and what it will not.",
      outcome: "A one-page plan and a fixed price for the whole engagement.",
    },
    {
      title: "Installation and data migration",
      body: "One installer on your computer. Your existing students, staff, stock or customers come in from Excel with a preview before anything is saved. I rehearse upgrades on a copy of your database before touching the real one.",
      outcome: "Your office running on day one, with last term already inside.",
    },
    {
      title: "Staff training",
      body: "The bursar, the exam officer, the cashier: each trained on their own screen, with their own data. Printed one-page guides stay on the desk.",
      outcome: "Nobody waits for me to enter a payment.",
    },
    {
      title: "Upgrades and support",
      body: "Upgrades are one file. Support is a WhatsApp message to the person who built it. Backups are checked, not assumed.",
      outcome: "Software that is still working in year three.",
    },
    {
      title: "Custom systems",
      body: "When a standard product is not the answer, I design and build one. Web platforms, admissions portals, e-learning, transcripts with public verification.",
      outcome: "See the case studies below.",
    },
  ],
  cases: {
    eyebrow: "Custom work",
    items: [
      {
        client: "Jamo College of Health Science and Technology",
        place: "Gezawa, Kano",
        summary: "Admissions, academic registry, results, student portal, fee records and transcripts with public verification. Web platform with 357 automated tests.",
        stack: "React, NestJS, PostgreSQL",
      },
      {
        client: "DHTN Academy",
        place: "dhtnacademy.com",
        summary: "An e-learning platform for Islamic and conventional knowledge: classes, lessons, certificates, Paystack checkout, Android app. Built and run by Asyyl.",
        stack: "Spring Boot, React, Flutter",
      },
    ],
  },
  cta: {
    headline: "Start with the visit.",
    body: "Tell me where you are and what is slowing you down. I will tell you honestly whether I can help.",
  },
} as const;
