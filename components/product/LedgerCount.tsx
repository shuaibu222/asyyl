"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const total = 427_763_462;
const numberFormat = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function cubicBezier(progress: number) {
  const sampleX = (value: number) => 3 * 0.4 * (1 - value) ** 2 * value + 3 * 0.2 * (1 - value) * value ** 2 + value ** 3;
  const sampleY = (value: number) => 3 * (1 - value) * value ** 2 + value ** 3;
  let low = 0;
  let high = 1;

  for (let index = 0; index < 12; index += 1) {
    const midpoint = (low + high) / 2;
    if (sampleX(midpoint) < progress) low = midpoint;
    else high = midpoint;
  }

  return sampleY((low + high) / 2);
}

export function LedgerCount() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);
  const [value, setValue] = useState(reducedMotion ? total : 0);
  const [complete, setComplete] = useState(Boolean(reducedMotion));

  useEffect(() => {
    if (reducedMotion) {
      setValue(total);
      setComplete(true);
      return;
    }

    const root = rootRef.current;
    if (!root) return;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || ranRef.current) return;
        ranRef.current = true;
        observer.disconnect();
        const startedAt = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / 1200, 1);
          setValue(total * cubicBezier(progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setComplete(true);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const formatted = numberFormat.format(value);

  return (
    <div ref={rootRef} data-signature="ledger-count" className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
      <p className="whitespace-nowrap bg-[var(--bg)] p-5 font-display text-lead font-semibold tabular-nums">{formatted} Dr</p>
      <p className="whitespace-nowrap bg-[var(--bg)] p-5 font-display text-lead font-semibold tabular-nums">{formatted} Cr</p>
      <p className={`bg-[var(--bg)] p-5 font-semibold transition-opacity duration-200 sm:col-span-2 ${complete ? "opacity-100" : "opacity-0"}`}>
        Difference {numberFormat.format(0)}
      </p>
    </div>
  );
}
