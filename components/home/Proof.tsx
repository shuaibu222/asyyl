import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

export function Proof() {
  return (
    <Slide tone="dark">
      <Container>
        <Reveal className="mx-auto mb-14 grid max-w-5xl justify-items-center gap-5 text-center md:mb-20">
          <Eyebrow>{home.proof.eyebrow}</Eyebrow>
          <Headline level={2}>{home.proof.headline}</Headline>
        </Reveal>
        <Reveal stagger={0.06} className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {home.proof.stats.map((stat) => (
            <article key={stat.value} className="grid h-full content-start gap-4 bg-[var(--bg)] p-7 md:p-9">
              <p className="font-display text-h3 font-semibold">{stat.value}</p>
              <p className="text-small text-[var(--ink-2)]">{stat.label}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Slide>
  );
}
