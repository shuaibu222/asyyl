import type { ReactNode } from "react";

type LeadProps = {
  children: ReactNode;
  className?: string;
};

export function Lead({ children, className = "" }: LeadProps) {
  return <p className={`text-lead text-[var(--ink-2)] ${className}`}>{children}</p>;
}
