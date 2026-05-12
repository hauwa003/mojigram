import type { Transition, Variants } from "framer-motion";

// Spring presets
export const spring = {
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as Transition,
  gentle: { type: "spring", stiffness: 200, damping: 20 } as Transition,
  stiff: { type: "spring", stiffness: 500, damping: 25 } as Transition,
  slow: { type: "spring", stiffness: 100, damping: 20 } as Transition,
};

// Reusable variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: spring.bouncy },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: spring.gentle },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
};
