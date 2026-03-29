import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BackToWelcome = () => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/welcome')}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl glass-card neon-border px-4 py-3 text-sm font-heading font-bold shadow-card-hover hover:neon-glow-primary transition-all"
    >
      <Sparkles className="h-4 w-4 text-primary" />
      <span>Switch Role</span>
    </motion.button>
  );
};

export default BackToWelcome;
