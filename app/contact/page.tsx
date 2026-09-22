import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.description,
};

const contactCopy = {
  headline: "Talk to Shuaibu.",
  next: "What happens next",
  steps: [
    "I reply myself",
    "We agree a visit date",
    "You see it running on your data before you decide.",
  ],
} as const;

export default function ContactPage() {
  const largeButton = { fontSize: "var(--text-h3)" } as CSSProperties;

  return (
    <main>
      <Slide tone="dark" defer={false} className="flex min-h-[calc(100svh-3.5rem)] items-center">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal duration={0.9} immediate className="lg:col-span-7">
            <Headline level={1}>{contactCopy.headline}</Headline>
          </Reveal>
          <div className="grid content-start gap-10 lg:col-span-5">
            <Reveal delay={0.3} y={0} immediate>
              <a
                className="btn btn-primary min-h-11 justify-center"
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener"
                style={largeButton}
              >
                {site.cta.primary.label}
              </a>
            </Reveal>
            <Reveal className="grid gap-2">
              <a className="flex h-11 items-center text-h3 underline" href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
              <a className="flex h-11 items-center text-h3 underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <p className="flex h-11 items-center text-[var(--ink-2)]">{site.city}, {site.country}</p>
            </Reveal>
            <Reveal className="grid gap-5 border-t border-[var(--line)] pt-8">
              <Headline level={2}>{contactCopy.next}</Headline>
              <ol className="grid gap-3 text-[var(--ink-2)]">
                {contactCopy.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Slide>
    </main>
  );
}
