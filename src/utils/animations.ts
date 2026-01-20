// Framer Motion animation presets

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6 },
};

export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
};

export const slideDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5 },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.4 },
};

export const cardFlip = {
    front: {
        rotateY: 0,
        transition: { duration: 0.6 },
    },
    back: {
        rotateY: 180,
        transition: { duration: 0.6 },
    },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export const hoverScale = {
    scale: 1.02,
    transition: { duration: 0.2 },
};

export const tapScale = {
    scale: 0.98,
    transition: { duration: 0.1 },
};

// Spring configurations
export const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

export const springBouncy = {
    type: 'spring',
    stiffness: 400,
    damping: 15,
};
