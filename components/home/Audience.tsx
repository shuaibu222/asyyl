import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

export function Audience() {
  return (
    <Slide tone="dark">
      <Container>
        <Reveal className="mx-auto mb-14 grid max-w-4xl justify-items-center gap-5 text-center md:mb-20">
          <Eyebrow>{home.audience.eyebrow}</Eyebrow>
          <Headline level={2}>{home.audience.headline}</Headline>
        </Reveal>
        <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2">
          {home.audience.items.map((item) => (
            <article key={item.href} className="grid h-full min-h-72 content-between gap-10 border border-[var(--line)] p-7 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-brand)] hover:border-[var(--ink)] md:p-10">
              <div className="grid gap-4">
                <Headline level={3}>{item.title}</Headline>
                <p className="text-[var(--ink-2)]">{item.body}</p>
              </div>
              <a href={item.href} className="flex min-h-11 items-center font-semibold underline">{item.linkLabel}</a>
            </article>
          ))}
        </Reveal>
      </Container>
    </Slide>
  );
}
