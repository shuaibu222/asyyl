"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  className?: string;
};

const easeBrand = [0.4, 0, 0.2, 1] as const;

export function Reveal({ children, delay = 0, stagger, y = 24, className = "" }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const hidden = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const visible = { opacity: 1, y: 0 };

  if (stagger === undefined) {
    return (
      <motion.div
        className={className}
        initial={hidden}
        whileInView={visible}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, delay, ease: easeBrand }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reducedMotion ? 0 : delay,
            staggerChildren: reducedMotion ? 0 : stagger,
          },
        },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden,
            visible: {
              ...visible,
              transition: { duration: reducedMotion ? 0 : 0.45, ease: easeBrand },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
