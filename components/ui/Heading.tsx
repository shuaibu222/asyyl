import type { ReactNode } from "react";

type HeadlineProps = {
  children: ReactNode;
  level: 1 | 2 | 3;
  className?: string;
};

const classes = {
  1: "text-hero",
  2: "text-h2",
  3: "text-h3",
} as const;

export function Headline({ children, level, className = "" }: HeadlineProps) {
  const mergedClassName = `${classes[level]} ${className}`;

  if (level === 1) return <h1 className={mergedClassName}>{children}</h1>;
  if (level === 2) return <h2 className={mergedClassName}>{children}</h2>;
  return <h3 className={mergedClassName}>{children}</h3>;
}
