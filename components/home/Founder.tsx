import { home } from "@/content/home";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";

export function Founder() {
  const avifPhoto = site.founder.photo.replace(/\.jpg$/, ".avif");

  return (
    <Slide tone="dark">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="shot max-w-80">
            <picture>
              <source type="image/avif" srcSet={avifPhoto} />
              <img src={site.founder.photo} alt={site.founder.name} width="640" height="640" loading="lazy" decoding="async" className="aspect-square object-cover" />
            </picture>
          </div>
        </Reveal>
        <Reveal className="grid gap-6 lg:col-span-7">
          <Eyebrow>{home.founder.eyebrow}</Eyebrow>
          <Headline level={2}>{home.founder.headline}</Headline>
          <div className="grid gap-5 text-[var(--ink-2)]">
            {home.founder.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Reveal>
      </Container>
    </Slide>
  );
}
