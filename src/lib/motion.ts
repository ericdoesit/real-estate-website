// Motion animation library — abstracted so the underlying package can be swapped in one place.
// Import from here instead of directly from 'framer-motion'.
export {
  motion,
  m,
  AnimatePresence,
  useInView,
  useAnimate,
  animate,
  LazyMotion,
  domAnimation,
} from 'framer-motion'
export type { Variants, Transition, MotionProps } from 'framer-motion'
