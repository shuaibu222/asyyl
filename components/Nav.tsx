"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Tone = "light" | "dark";

const focusableSelector = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function Nav() {
  const [tone, setTone] = useState<Tone>("light");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone], footer[data-tone]"));
    const bottomMargin = Math.max(0, window.innerHeight - 56);
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        const nextTone = active?.target.getAttribute("data-tone");
        if (nextTone === "light" || nextTone === "dark") setTone(nextTone);
      },
      { rootMargin: "-55px 0px -" + bottomMargin + "px 0px", threshold: 0 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusable = menu ? Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector)) : [];
    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header
      data-tone={tone}
      className="sticky top-0 z-50 h-14 border-b border-line bg-bg"
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <a href="/" className="flex min-h-11 items-center gap-3 font-display font-semibold">
          <img
            src={tone === "dark" ? "/brand/asyyl-mark-white.svg" : "/brand/asyyl-mark.svg"}
            alt=""
            width="28"
            height="28"
          />
          <span>{site.name}</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={site.name}>
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="flex min-h-11 items-center text-small">
              {item.label}
            </a>
          ))}
          <Button variant="primary" href={site.cta.primary.href} className="py-2.5 text-small">
            {site.cta.primary.label}
          </Button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label={site.name}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
          className="relative z-[60] flex size-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{site.name}</span>
          <span aria-hidden="true" className="grid gap-1.5">
            <span className={`block h-px w-6 bg-ink transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-ink transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-navigation"
          data-tone="dark"
          className="fixed inset-0 z-[55] flex min-h-[100svh] items-center bg-bg px-gutter pt-14"
        >
          <nav className="w-full" aria-label={site.name}>
            <ul className="grid gap-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center py-2 font-display text-h2 font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <Button variant="primary" href={site.cta.primary.href}>
                  {site.cta.primary.label}
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
