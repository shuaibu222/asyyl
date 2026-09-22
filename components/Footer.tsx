import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer data-tone="dark" className="content-auto border-t border-[var(--line)] py-16 [contain-intrinsic-size:auto_500px] md:py-20">
      <Container className="grid gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex min-h-11 items-center gap-3 font-display text-h3 font-semibold">
            <img src="/brand/asyyl-mark-white.svg" alt="" width="32" height="27" className="h-[27px] w-8" />
            <span>{site.name}</span>
          </a>
          <p className="text-small text-[var(--ink-2)]">{site.footer.comingSoon}</p>
        </div>
        <div className="flex flex-col gap-8 border-t border-[var(--line)] pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label={site.name}>
            {site.footer.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={"external" in item && item.external ? "_blank" : undefined}
                rel={"external" in item && item.external ? "noopener" : undefined}
                className="flex min-h-11 items-center text-small"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-small text-[var(--ink-2)]">{site.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
