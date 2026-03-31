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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(25,80%,8%)] via-[hsl(20,60%,12%)] to-[hsl(30,70%,6%)]">
      {/* Animated background orbs - orange themed */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[hsl(25,95%,53%/0.15)] blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[hsl(38,95%,55%/0.12)] blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 60, -80, 0],
            y: [0, -60, 80, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-[hsl(15,90%,50%/0.1)] blur-[80px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(25,95%,53%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(25,95%,53%/0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <AnimatePresence mode="wait">
        {!showRoles ? (
          <motion.div
            key="logo"
            className="relative flex flex-col items-center gap-6"
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating CraviX Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full border border-[hsl(25,95%,53%/0.2)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-12 rounded-full border border-[hsl(38,95%,55%/0.1)]"
              />

              {/* Floating animation */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative h-40 w-40 md:h-52 md:w-52 rounded-3xl overflow-hidden shadow-[0_0_60px_-10px_hsl(25,95%,53%/0.5),0_0_100px_-20px_hsl(38,95%,55%/0.3)]">
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
              <h1 className="text-5xl font-heading font-extrabold tracking-tight md:text-7xl text-white">
                CRAVI<span className="text-gradient">X</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 text-xl font-medium text-[hsl(25,95%,70%)]"
              >
                Welcome to CraviX
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-1 text-sm text-white/50"
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
                className="mt-4 rounded-2xl px-10 py-6 text-lg font-bold gradient-warm neon-glow-primary hover:shadow-xl transition-all group border-0"
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
              className="flex gap-2 mt-4"
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="h-2 w-2 rounded-full bg-primary"
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
              <h2 className="text-3xl font-heading font-extrabold md:text-5xl text-white">
                How will you use <span className="text-gradient">CraviX</span>?
              </h2>
              <p className="mt-3 text-white/60 text-lg">Choose your role to get started</p>
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
                  className="group relative flex flex-col items-center gap-4 rounded-3xl p-8 text-center transition-all cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl"
                  style={{
                    boxShadow: hoveredRole === role.id
                      ? `0 0 50px -10px ${role.neonColor}, 0 20px 60px -15px rgba(0,0,0,0.5)`
                      : '0 4px 24px -4px rgba(0,0,0,0.3)',
                  }}
                >
                  <motion.div
                    animate={{ opacity: hoveredRole === role.id ? 0.1 : 0 }}
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
                    <p className="mt-1 text-sm font-medium text-primary">{role.subtitle}</p>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">{role.description}</p>
                  </div>

                  <motion.div
                    animate={{ opacity: hoveredRole === role.id ? 1 : 0, y: hoveredRole === role.id ? 0 : 8 }}
                    className="flex items-center gap-1 text-sm font-semibold text-primary"
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
