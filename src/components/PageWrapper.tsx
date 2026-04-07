import { motion, Transition } from 'framer-motion';
import { ReactNode } from 'react';

const pageTransition: Transition = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.975, filter: 'blur(6px)', y: 16 }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', y: -8 }}
    transition={pageTransition}
    style={{ willChange: 'transform, opacity, filter' }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
