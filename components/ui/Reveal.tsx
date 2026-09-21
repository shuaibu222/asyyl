"use client";

import { Children, Fragment, type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { animate } from "motion/mini";
import { useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  fade?: boolean;
  immediate?: boolean;
  as?: "div" | "span";
  className?: string;
};

const easeBrand = [0.4, 0, 0.2, 1] as const;

export function Reveal({
  children,
  delay = 0,
  stagger,
  y = 24,
  duration = 0.45,
  fade = true,
  immediate = false,
  as = "div",
  className = "",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const setRoot = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || immediate) return;

    const targets = stagger === undefined ? [root] : Array.from(root.children);
    targets.forEach((target) => {
      const element = target as HTMLElement;
      if (fade) element.style.opacity = "0";
      element.style.transform = `translateY(${y}px)`;
    });

    let controls: ReturnType<typeof animate>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        controls = targets.map((target, index) =>
          animate(
            target,
            {
              opacity: fade ? [0, 1] : 1,
              transform: [`translateY(${y}px)`, "translateY(0px)"],
            },
            {
              duration,
              delay: delay + (stagger ?? 0) * index,
              ease: easeBrand,
            },
          ),
        );
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      controls.forEach((control) => control.stop());
    };
  }, [delay, duration, fade, immediate, reducedMotion, stagger, y]);

  const revealStyle = (itemDelay: number) => ({
    "--reveal-delay": `${itemDelay}s`,
    "--reveal-duration": `${duration}s`,
    "--reveal-y": `${y}px`,
  }) as CSSProperties;

  const childArray = Children.toArray(children);
  const content = stagger === undefined
    ? children
    : childArray.map((child, index) => {
        const props = immediate
          ? { className: "reveal-immediate", "data-reveal-fade": fade, style: revealStyle(delay + stagger * index) }
          : {};
        return as === "span"
          ? <Fragment key={index}><span {...props}>{child}</span>{index < childArray.length - 1 ? " " : null}</Fragment>
          : <div key={index} {...props}>{child}</div>;
      });

  const rootProps = immediate && stagger === undefined
    ? { className: `reveal-immediate ${className}`, "data-reveal-fade": fade, style: revealStyle(delay) }
    : { className };

  if (as === "span") {
    return <span ref={setRoot} {...rootProps}>{content}</span>;
  }

  return <div ref={setRoot} {...rootProps}>{content}</div>;
}
