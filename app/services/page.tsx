import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Heading";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: services.hero.lead,
};

export default function ServicesPage() {
  return (
    <main>
      <Slide tone="light" className="flex min-h-[calc(100svh-3.5rem)] items-center">
        <Container className="grid justify-items-center gap-7 text-center">
          <Reveal duration={0.9} immediate className="w-full">
            <h1 className="text-hero mx-auto max-w-5xl">{services.hero.headline}</h1>
          </Reveal>
          <Reveal delay={0.3} y={0} immediate>
            <Lead className="mx-auto">{services.hero.lead}</Lead>
          </Reveal>
          <Reveal delay={0.42} y={24} immediate>
            <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
          </Reveal>
        </Container>
      </Slide>

      <Slide tone="dark">
        <Container>
          <Reveal stagger={0.06} className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.offers.map((offer, index) => (
              <article key={offer.title} className="grid gap-6 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="grid content-start gap-4 md:col-span-4">
                  <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="font-display text-h3 font-semibold">{offer.title}</h2>
                </div>
                <div className="grid content-start gap-5 md:col-span-8">
                  <p>{offer.body}</p>
                  <p className="text-[var(--ink-2)]">{offer.outcome}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </Container>
      </Slide>

      <Slide tone="light">
        <Container>
          <Reveal className="mb-14 md:mb-20">
            <Eyebrow>{services.cases.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal stagger={0.06} className="grid gap-4 lg:grid-cols-2">
            {services.cases.items.map((item) => (
              <article key={item.client} className="grid h-full content-between gap-10 border border-[var(--line)] p-7 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-brand)] hover:border-[var(--ink)] md:p-10">
                <div className="grid gap-5">
                  <Headline level={2}>{item.client}</Headline>
                  <p className="text-[var(--ink-2)]">{item.place}</p>
                  <p>{item.summary}</p>
                </div>
                <p className="text-small text-[var(--ink-2)]">{item.stack}</p>
              </article>
            ))}
          </Reveal>
        </Container>
      </Slide>

      <Slide tone="dark">
        <Container>
          <Reveal className="mx-auto grid max-w-4xl justify-items-center gap-7 text-center">
            <Headline level={2}>{services.cta.headline}</Headline>
            <Lead>{services.cta.body}</Lead>
            <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
          </Reveal>
        </Container>
      </Slide>
    </main>
  );
}
