import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Heading";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const contactTitle = site.nav.find((item) => item.href === "/contact")!.label;

export const metadata: Metadata = {
  title: contactTitle,
  description: site.description,
};

export default function ContactPage() {
  return (
    <main>
      <Slide tone="dark" className="flex min-h-[calc(100svh-3.5rem)] items-center">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal duration={0.9} immediate className="grid content-start gap-6 lg:col-span-7">
            <Headline level={1}>{contact.headline}</Headline>
            <Lead>{contact.lead}</Lead>
          </Reveal>
          <div className="grid content-start gap-10 lg:col-span-5">
            <Reveal delay={0.3} y={0} immediate>
              <a
                className="btn btn-primary min-h-11 justify-center whitespace-nowrap text-body sm:text-h3"
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener"
              >
                {contact.whatsappLabel}
              </a>
            </Reveal>
            <Reveal className="grid gap-2">
              <a className="flex min-h-11 items-center gap-3 text-h3 underline" href={`tel:${site.contact.phone}`}>
                <span>{contact.callLabel}</span>
                <span>{site.contact.phoneDisplay}</span>
              </a>
              <a className="flex min-h-11 items-center gap-3 text-h3 underline" href={`mailto:${site.contact.email}`}>
                <span>{contact.emailLabel}</span>
                <span>{site.contact.email}</span>
              </a>
              <p className="flex min-h-11 items-center text-[var(--ink-2)]">{contact.place}</p>
            </Reveal>
            <Reveal className="grid gap-5 border-t border-[var(--line)] pt-8">
              <Headline level={2}>{contact.next.heading}</Headline>
              <ol className="grid gap-3 text-[var(--ink-2)]">
                {contact.next.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Slide>
    </main>
  );
}
