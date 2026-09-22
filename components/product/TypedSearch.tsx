"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const query = "Habibu";

type TypedSearchProps = {
  label: string;
};

export function TypedSearch({ label }: TypedSearchProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (reducedMotion) {
      setValue(query);
      return;
    }

    const root = rootRef.current;
    if (!root) return;
    let timer = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || ranRef.current) return;
        ranRef.current = true;
        observer.disconnect();
        let index = 0;
        timer = window.setInterval(() => {
          index += 1;
          setValue(query.slice(0, index));
          if (index === query.length) window.clearInterval(timer);
        }, 60);
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} data-signature="typed-search" className="flex min-h-14 items-center border border-[var(--line)] bg-[var(--bg)] px-5 font-semibold">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{value}</span>
    </div>
  );
}
