import { Variants } from 'framer-motion';

export const parentVariants: Variants = {
  initial: {
    y: '100vh',
  },
  animate: {
    y: 0,
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
  initial: {
    y: 0,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.125,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 8,
      duration: 2,
    },
  },
  hover: {
    y: -10,
    scale: 1.025,
    transition: {
      type: 'spring',
      mass: 0.3,
      damping: 5,
      stiffness: 200,
    },
  },
  tap: { scale: 0.9 },
};

export const buttonGroupVariants: Variants = {
  // To allow group animation, `animate` is the prop here is the `default` variant to align with the parentVariants' animation state not really the "animate" state of this specific variant.
  animate: {
    opacity: 0,
    display: 'hidden',
    transition: {
      ease: 'easeInOut',
      duration: 0.125,
      staggerChildren: 0.125,
      when: 'beforeChildren',
    },
  },
  hover: {
    opacity: 1,
    display: 'flex',
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
      staggerChildren: 0.125,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    display: 'hidden',
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};

export const buttonVariants: Variants = {
  initial: {
    y: 1,
    transition: {
      ease: 'backInOut',
    },
  },
  animate: {
    y: 10,
    transition: {
      ease: 'backInOut',
      duration: 0.1,
    },
  },
  hover: {
    y: 0,
    transition: {
      ease: 'backInOut',
      duration: 0.1,
    },
  },
  exit: {
    y: 10,
    transition: {
      ease: 'backInOut',
    },
  },
};
