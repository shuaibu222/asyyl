import { home } from "@/content/home";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { Slide } from "@/components/ui/Slide";

function headlineGroups(headline: string) {
  const words = headline.split(" ");
  const size = Math.ceil(words.length / 3);
  return [words.slice(0, size), words.slice(size, size * 2), words.slice(size * 2)]
    .filter((group) => group.length > 0)
    .map((group) => group.join(" "));
}

export function Hero() {
  return (
    <Slide tone="light" className="flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden">
      <Container className="grid gap-12 pt-6 text-center md:gap-16">
        <div className="mx-auto grid max-w-5xl justify-items-center gap-7">
          <h1 className="text-hero w-full min-w-0 max-w-[8ch]">
            <Reveal as="span" stagger={0.08} duration={0.9} immediate className="inline">
              {headlineGroups(home.hero.headline).map((group) => (
                <span key={group} className="inline-block">{group}</span>
              ))}
            </Reveal>
          </h1>
          <Reveal delay={0.3} y={0} immediate>
            <Lead className="mx-auto">{home.hero.lead}</Lead>
          </Reveal>
          <Reveal delay={0.42} y={24} immediate>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
              <Button variant="secondary" href={site.cta.secondary.href}>{site.cta.secondary.label}</Button>
            </div>
          </Reveal>
        </div>
        <div className="flex justify-center">
          <Shot shot={home.hero.shot} loading="eager" fetchPriority="high" />
        </div>
      </Container>
    </Slide>
  );
}
