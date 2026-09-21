import { Audience } from "@/components/home/Audience";
import { Clients } from "@/components/home/Clients";
import { Cta } from "@/components/home/Cta";
import { Founder } from "@/components/home/Founder";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ProductSlides } from "@/components/home/ProductSlides";
import { Proof } from "@/components/home/Proof";
import { shotSizes } from "@/components/ui/Shot";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={`${home.hero.shot.base}-800.avif`}
        type="image/avif"
        fetchPriority="high"
        imageSrcSet={`${home.hero.shot.base}-800.avif 800w, ${home.hero.shot.base}-1440.avif 1440w`}
        imageSizes={shotSizes(home.hero.shot)}
      />
      <main>
        <Hero />
        <Audience />
        <ProductSlides />
        <Process />
        <Proof />
        <Clients />
        <Founder />
        <Cta />
      </main>
    </>
  );
}
