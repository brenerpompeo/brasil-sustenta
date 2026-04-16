import type { TargetAndTransition, Variants } from "framer-motion";

export const editorialEase: [number, number, number, number] = [
  0.22, 0.61, 0.36, 1,
];
export const editorialEaseGentle: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const editorialViewport = { once: true, margin: "-80px" } as const;

export function fadeUpTarget(
  delay = 0,
  distance = 20,
  duration = 0.55
): TargetAndTransition {
  return {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: editorialEase },
  };
}

export function fadeInTarget(delay = 0, duration = 0.55): TargetAndTransition {
  return {
    opacity: 1,
    transition: { delay, duration, ease: editorialEase },
  };
}

export function staggerContainer(stagger = 0.12): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
}

export function fadeUpVariants(distance = 20, duration = 0.55): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: editorialEase },
    },
  };
}

export function scaleInVariants(scale = 0.95, duration = 0.4): Variants {
  return {
    hidden: { opacity: 0, scale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, ease: editorialEase },
    },
  };
}

export function staggeredFadeUp(
  step = 0.08,
  distance = 20,
  duration = 0.5
): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    show: (index = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * step,
        duration,
        ease: editorialEase,
      },
    }),
  };
}
