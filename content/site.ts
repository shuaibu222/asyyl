// Single source of truth for brand, contact and global copy.
// Every page reads from here. Nothing in components is hardcoded.

export const site = {
  name: "Asyyl",
  legalName: "Asyyl",
  tagline: "Software that works when the internet doesn't.",
  description:
    "Asyyl builds offline school and business systems for Nigeria. Installed on your own computer, trained by the person who built it.",
  url: "https://asyylsms.com",
  locale: "en-NG",
  city: "Kano",
  country: "Nigeria",
  founder: {
    name: "Shuaibu Abdulkadir",
    role: "Founder and consultant",
    photo: "/people/shuaibu.jpg",
    github: "https://github.com/shuaibu222",
  },
  contact: {
    whatsapp: "2347034333530",
    whatsappDisplay: "0703 433 3530",
    whatsappUrl:
      "https://wa.me/2347034333530?text=" +
      encodeURIComponent("Hello Shuaibu, I saw asyylsms.com and I want to talk about "),
    phone: "+2347034333530",
    phoneDisplay: "0703 433 3530",
    email: "asyylsms@gmail.com",
  },
  nav: [
    { label: "Asyyl SMS", href: "/sms" },
    { label: "Asyyl BMS", href: "/bms" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  cta: {
    primary: { label: "Message me on WhatsApp", href: "whatsapp" as const },
    secondary: { label: "See the products", href: "/#products" },
  },
  footer: {
    comingSoon: "Also in the workshop: Asyyl Equity, Asyyl Books, Asyyl Property.",
    copyright: `© ${new Date().getFullYear()} Asyyl, Kano, Nigeria.`,
    links: [
      { label: "Asyyl SMS", href: "/sms" },
      { label: "Asyyl BMS", href: "/bms" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: "https://github.com/shuaibu222", external: true },
    ],
  },
} as const;
