import { home } from "@/content/home";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

export function Cta() {
  return (
    <Slide tone="light">
      <Container>
        <Reveal className="mx-auto grid max-w-4xl justify-items-center gap-7 text-center">
          <Headline level={2}>{home.cta.headline}</Headline>
          <p className="text-lead text-[var(--ink-2)]">{home.cta.body}</p>
          <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
        </Reveal>
      </Container>
    </Slide>
  );
}
