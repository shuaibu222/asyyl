import type { ReactNode } from "react";

type SlideProps = {
  children: ReactNode;
  tone: "light" | "dark";
  id?: string;
  className?: string;
};

export function Slide({ children, tone, id, className = "" }: SlideProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`py-24 md:py-32 lg:py-40 ${className}`}
    >
      {children}
    </section>
  );
}
