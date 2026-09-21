import { home } from "@/content/home";

export default function HomePage() {
  return (
    <main>
      <section data-tone="light" className="flex min-h-[100svh] items-center px-gutter py-24 md:px-12 md:py-32 lg:py-40">
        <h1 className="font-display text-hero max-w-[12ch]">{home.hero.headline}</h1>
      </section>
    </main>
  );
}
