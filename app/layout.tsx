import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: { icon: "/brand/asyyl-mark.svg" },
  openGraph: {
    type: "website",
    locale: site.locale.replace("-", "_"),
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "NG",
    },
    founder: { "@id": `${site.url}/#shuaibu-abdulkadir` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#shuaibu-abdulkadir`,
    name: site.founder.name,
    jobTitle: site.founder.role,
    url: site.url,
    sameAs: [site.founder.github],
  },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-NG">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
