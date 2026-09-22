import type { ReactNode } from "react";

type SlideProps = {
  children: ReactNode;
  tone: "light" | "dark";
  id?: string;
  defer?: boolean;
  className?: string;
};

export function Slide({ children, tone, id, defer = true, className = "" }: SlideProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`${defer ? "content-auto [contain-intrinsic-size:auto_1000px]" : ""} py-24 md:py-32 lg:py-40 ${className}`}
    >
      {children}
    </section>
  );
}
