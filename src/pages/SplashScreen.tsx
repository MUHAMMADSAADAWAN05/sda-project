import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Truck, Store, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import cravixLogo from '@/assets/cravix-logo.jpeg';

const roles = [
  {
    id: 'customer',
    title: 'Customer',
    subtitle: 'Order delicious food',
    description: 'Browse restaurants, customize meals & track delivery in real-time',
    icon: UtensilsCrossed,
    route: '/login?role=customer',
    gradient: 'from-[hsl(25,95%,53%)] to-[hsl(38,95%,55%)]',
    neonColor: 'hsl(25, 95%, 53%)',
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    subtitle: 'Manage your business',
    description: 'Handle orders, update menus & grow your customer base',
    icon: Store,
    route: '/login?role=restaurant',
    gradient: 'from-[hsl(38,95%,55%)] to-[hsl(152,60%,42%)]',
    neonColor: 'hsl(38, 95%, 55%)',
  },
  {
    id: 'driver',
    title: 'Driver',
    subtitle: 'Deliver & earn',
    description: 'Accept deliveries, navigate routes & maximize your earnings',
    icon: Truck,
    route: '/login?role=driver',
    gradient: 'from-[hsl(15,90%,50%)] to-[hsl(35,95%,50%)]',
    neonColor: 'hsl(15, 90%, 50%)',
  },
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [showRoles, setShowRoles] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(25 80% 45%), hsl(25 95% 53%), hsl(30 90% 50%))' }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(0_0%_100%/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(0_0%_0%/0.15),transparent_50%)]" />

      <AnimatePresence mode="wait">
        {!showRoles ? (
          <motion.div
            key="logo"
            className="relative flex flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            {/* Large floating CraviX Logo - Parkify style big logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative h-56 w-56 md:h-72 md:w-72 lg:h-80 lg:w-80 rounded-3xl overflow-hidden shadow-[0_20px_80px_-10px_rgba(0,0,0,0.4),0_0_60px_-10px_hsl(0_0%_100%/0.2)]">
                  <img
                    src={cravixLogo}
                    alt="CraviX Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-heading font-extrabold tracking-tight md:text-7xl text-white drop-shadow-lg">
                CRAVIX
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 text-xl font-medium text-white/90"
              >
                Welcome to CraviX
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-1 text-sm text-white/60"
              >
                crave it · order it · enjoy it
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                size="lg"
                onClick={() => setShowRoles(true)}
                className="mt-2 rounded-2xl px-10 py-6 text-lg font-bold bg-white text-[hsl(25,95%,45%)] hover:bg-white/90 hover:shadow-xl transition-all group border-0 shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Pulsing dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex gap-2 mt-2"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="h-2 w-2 rounded-full bg-white"
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="roles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-8 px-4 w-full max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-heading font-extrabold md:text-5xl text-white drop-shadow-lg">
                How will you use <span className="text-white underline decoration-white/30 underline-offset-4">CraviX</span>?
              </h2>
              <p className="mt-3 text-white/70 text-lg">Choose your role to get started</p>
            </motion.div>

            <div className="grid w-full gap-5 sm:grid-cols-3 mt-4">
              {roles.map((role, i) => (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredRole(role.id)}
                  onHoverEnd={() => setHoveredRole(null)}
                  onClick={() => navigate(role.route)}
                  className="group relative flex flex-col items-center gap-4 rounded-3xl p-8 text-center transition-all cursor-pointer border border-white/20 bg-white/10 backdrop-blur-xl"
                  style={{
                    boxShadow: hoveredRole === role.id
                      ? `0 0 50px -10px ${role.neonColor}, 0 20px 60px -15px rgba(0,0,0,0.3)`
                      : '0 4px 24px -4px rgba(0,0,0,0.2)',
                  }}
                >
                  <motion.div
                    animate={{ opacity: hoveredRole === role.id ? 0.15 : 0 }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient}`}
                  />

                  <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient} transition-shadow`}
                    style={{
                      boxShadow: hoveredRole === role.id
                        ? `0 0 30px -5px ${role.neonColor}`
                        : 'none',
                    }}
                  >
                    <role.icon className="h-10 w-10 text-white" />
                  </div>

                  <div className="relative">
                    <h3 className="text-xl font-heading font-bold text-white">{role.title}</h3>
                    <p className="mt-1 text-sm font-medium text-white/80">{role.subtitle}</p>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">{role.description}</p>
                  </div>

                  <motion.div
                    animate={{ opacity: hoveredRole === role.id ? 1 : 0, y: hoveredRole === role.id ? 0 : 8 }}
                    className="flex items-center gap-1 text-sm font-semibold text-white"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
