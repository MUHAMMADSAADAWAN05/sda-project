import { motion, Transition } from 'framer-motion';
import { ReactNode } from 'react';

const pageTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.975, filter: 'blur(6px)', y: 18 }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', y: -10 }}
    transition={pageTransition}
    style={{ willChange: 'transform, opacity, filter' }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
