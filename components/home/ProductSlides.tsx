import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Headline } from "@/components/ui/Headline";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { Slide } from "@/components/ui/Slide";

export function ProductSlides() {
  return (
    <>
      {home.products.items.map((product, index) => (
        <Slide key={product.id} id={index === 0 ? "products" : product.id} tone={product.id === "sms" ? "light" : "dark"}>
          <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="grid gap-5 lg:col-span-5">
              <Eyebrow>{home.products.eyebrow} · {product.kicker}</Eyebrow>
              <Headline level={2}>{product.headline}</Headline>
              <p className="text-[var(--ink-2)]">{product.body}</p>
              <a href={product.href} className="flex min-h-11 items-center font-semibold underline">{product.name}</a>
            </Reveal>
            <Reveal delay={0.06} className="flex justify-center lg:col-span-7">
              <Shot shot={product.shot} />
            </Reveal>
          </Container>
        </Slide>
      ))}
    </>
  );
}
