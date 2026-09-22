import type { Product } from "@/content/products";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Heading";
import { headlineGroups } from "@/components/ui/headline";
import { Lead } from "@/components/ui/Lead";
import { Reveal } from "@/components/ui/Reveal";
import { Shot, shotSizes } from "@/components/ui/Shot";
import { Slide } from "@/components/ui/Slide";
import { LedgerCount } from "@/components/product/LedgerCount";
import { TypedSearch } from "@/components/product/TypedSearch";

type ProductPageProps = {
  product: Product;
};

function Signature({ product }: ProductPageProps) {
  if (product.id === "bms") return <LedgerCount />;
  return <TypedSearch label={product.moments[0].title} />;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={`${product.hero.shot.base}-800.avif`}
        type="image/avif"
        fetchPriority="high"
        imageSrcSet={`${product.hero.shot.base}-800.avif 800w, ${product.hero.shot.base}-1440.avif 1440w`}
        imageSizes={shotSizes(product.hero.shot)}
      />
      <main>
        <Slide tone="light" className="flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden">
          <Container className="grid gap-12 pt-6 text-center md:gap-16">
            <div className="mx-auto grid w-full min-w-0 max-w-5xl justify-items-center gap-7">
              <Eyebrow>{product.kicker}</Eyebrow>
              <h1 className="text-hero -mx-gutter w-screen min-w-0 md:mx-0 md:w-full lg:max-w-4xl">
                <Reveal as="span" stagger={0.08} duration={0.9} immediate className="inline">
                  {headlineGroups(product.hero.headline).map((group) => (
                    <span key={group} className="inline-block">{group}</span>
                  ))}
                </Reveal>
              </h1>
              <Reveal delay={0.3} y={0} immediate>
                <Lead className="mx-auto">{product.hero.lead}</Lead>
              </Reveal>
              <Reveal delay={0.42} y={24} immediate>
                <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
              </Reveal>
            </div>
            <div className="flex justify-center">
              <Shot shot={product.hero.shot} loading="eager" fetchPriority="high" />
            </div>
          </Container>
        </Slide>

        {product.moments.map((moment, index) => {
          const textOrder = index % 2 === 0 ? "lg:order-1" : "lg:order-2";
          const visualOrder = index % 2 === 0 ? "lg:order-2" : "lg:order-1";
          return (
            <Slide key={moment.title} tone={index % 2 === 0 ? "dark" : "light"}>
              <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
                <Reveal className={`grid gap-5 lg:col-span-5 ${textOrder}`}>
                  <Headline level={2}>{moment.title}</Headline>
                  <p className="text-[var(--ink-2)]">{moment.body}</p>
                </Reveal>
                <Reveal delay={0.06} className={`grid gap-5 lg:col-span-7 ${visualOrder}`}>
                  {index === 0 ? <Signature product={product} /> : null}
                  <Shot shot={moment.shot} />
                </Reveal>
              </Container>
            </Slide>
          );
        })}

        <Slide tone="dark">
          <Container>
            <Reveal stagger={0.06} className="grid gap-px bg-[var(--line)] md:grid-cols-2 lg:grid-cols-5">
              {product.modules.map((module) => (
                <article key={module.title} className="grid h-full content-start gap-6 bg-[var(--bg)] p-7">
                  <Headline level={3}>{module.title}</Headline>
                  <ul className="grid gap-3 text-small text-[var(--ink-2)]">
                    {module.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </Reveal>
          </Container>
        </Slide>

        <Slide tone="light">
          <Container>
            <Reveal stagger={0.06} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {product.delivery.map((item) => (
                <article key={item.title} className="grid h-full content-start gap-4 border border-[var(--line)] p-7 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-brand)] hover:border-[var(--ink)]">
                  <Headline level={3}>{item.title}</Headline>
                  <p className="text-[var(--ink-2)]">{item.body}</p>
                </article>
              ))}
            </Reveal>
          </Container>
        </Slide>

        <Slide tone="dark">
          <Container className="max-w-4xl">
            <Reveal className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {product.faq.map((item) => (
                <details key={item.q} className="group py-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-h3 font-semibold marker:hidden">
                    {item.q}
                    <span aria-hidden="true" className="text-[var(--ink-2)] group-open:hidden">+</span>
                    <span aria-hidden="true" className="hidden text-[var(--ink-2)] group-open:inline">−</span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-[var(--ink-2)]">{item.a}</p>
                </details>
              ))}
            </Reveal>
          </Container>
        </Slide>

        <Slide tone="light">
          <Container>
            <Reveal className="mx-auto grid max-w-4xl justify-items-center gap-7 text-center">
              <Headline level={2}>{product.cta.headline}</Headline>
              <Lead>{product.cta.body}</Lead>
              <Button variant="primary" href={site.cta.primary.href}>{site.cta.primary.label}</Button>
            </Reveal>
          </Container>
        </Slide>
      </main>
    </>
  );
}
