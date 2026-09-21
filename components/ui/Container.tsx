import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-page)] px-gutter md:px-12 ${className}`}>
      {children}
    </div>
  );
}
