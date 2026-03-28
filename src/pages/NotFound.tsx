import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => (
  <div className="relative flex min-h-[80vh] items-center justify-center px-4">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-accent/6 blur-[120px]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="text-center glass-card rounded-3xl neon-border p-12 shadow-card-hover max-w-md"
    >
      <motion.p
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-8xl font-heading font-extrabold text-gradient mb-4"
      >
        404
      </motion.p>
      <h1 className="text-2xl font-heading font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Button className="gradient-warm rounded-xl neon-glow-primary gap-2" size="lg" asChild>
        <Link to="/"><Home className="h-4 w-4" /> Back to Home</Link>
      </Button>
    </motion.div>
  </div>
);

export default NotFound;
