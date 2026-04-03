<<<<<<< HEAD
import { motion, Transition } from 'framer-motion';
import { ReactNode } from 'react';

const pageTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.975, filter: 'blur(6px)', y: 18 }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', y: -10 }}
    transition={pageTransition}
=======
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
  >
    {children}
  </motion.div>
);

export default PageWrapper;
