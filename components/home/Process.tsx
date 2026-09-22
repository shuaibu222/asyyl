import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

export function Process() {
  return (
    <Slide tone="light">
      <Container>
        <Reveal className="mx-auto mb-14 grid max-w-4xl justify-items-center gap-5 text-center md:mb-20">
          <Eyebrow>{home.process.eyebrow}</Eyebrow>
          <Headline level={2}>{home.process.headline}</Headline>
        </Reveal>
        <Reveal stagger={0.06} className="grid border-t border-[var(--line)] md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[var(--line)]">
          {home.process.steps.map((step) => (
            <article key={step.n} className="grid content-start gap-5 py-8 md:px-6">
              <p className="eyebrow">{step.n}</p>
              <Headline level={3}>{step.title}</Headline>
              <p className="text-[var(--ink-2)]">{step.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Slide>
  );
}
