import { Variants } from 'framer-motion';

export const parentVariants: Variants = {
  hidden: {
    x: '100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      staggerChildren: 0.125,
      when: 'beforeChildren',
    },
  },
  exit: {
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};

export const childrenVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 8,
      when: 'beforeChildren',
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 7,
      stiffness: 200,
    },
  },
  tap: { scale: 0.9 },
};

export const buttonContainerVariant: Variants = {
  // To allow group animation, `visible` prop here is to align with the parentVariants' animation state
  // not really the "visible" state of this specific variant.
  visible: {
    opacity: 0,
    display: 'hidden',
  },
  hover: {
    opacity: 1,
    display: 'flex',
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};

export const buttonVariant: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      mass: 0.8,
      damping: 2,
    },
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1.1,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 7,
      stiffness: 200,
    },
  },
};
