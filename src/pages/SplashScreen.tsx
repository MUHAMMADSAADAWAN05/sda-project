import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Truck, Store, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import cravixLogo from '@/assets/cravix-logo.jpeg';

/* ─── Data ─────────────────────────────────────── */
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

const FOOD_ICONS = ['🍕', '🍔', '🌮', '🍜', '🍣', '🧁'];

const STATS = [
  { value: 500, suffix: '+', label: 'Restaurants' },
  { value: 50,  suffix: 'K+', label: 'Happy Orders' },
  { value: 4.9, suffix: '★', label: 'Avg Rating', isDecimal: true },
];

/* ─── Animated Counter ─────────────────────────── */
function AnimatedCounter({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: 'easeOut',
      delay: 0.3,
      onUpdate: (v) => setDisplay(isDecimal ? v.toFixed(1) : Math.floor(v).toString()),
    });
    return controls.stop;
  }, [target, isDecimal, count]);

  return (
    <span className="stat-shimmer text-2xl font-heading font-black md:text-3xl">
      {display}{suffix}
    </span>
  );
}

/* ─── Particle ─────────────────────────────────── */
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-white/30 pointer-events-none"
      style={{ left: `${x}%`, width: size, height: size }}
      animate={{ y: [0, -140], opacity: [0, 0.7, 0.7, 0] }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

/* ─── 3D Tilt Role Card ────────────────────────── */
function RoleCard({ role, index, hoveredRole, setHoveredRole, onClick }: {
  role: typeof roles[0];
  index: number;
  hoveredRole: string | null;
  setHoveredRole: (id: string | null) => void;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 10);
    rotateY.set(dx * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHoveredRole(null);
  };

  return (
    <motion.button
      ref={cardRef}
      key={role.id}
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.18 + index * 0.14, type: 'spring', stiffness: 180, damping: 18 }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredRole(role.id)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800, willChange: 'transform' }}
      className="group relative flex flex-col items-center gap-4 rounded-3xl p-8 text-center cursor-pointer glass-ultra card-shine glow-border-hover liquid-shimmer"
      tabIndex={0}
      aria-label={`Continue as ${role.title}`}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        animate={{ opacity: hoveredRole === role.id ? 0.14 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient}`}
      />

      {/* Icon */}
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${role.gradient}`}
        style={{
          boxShadow: hoveredRole === role.id
            ? `0 0 35px -5px ${role.neonColor}, 0 0 70px -15px ${role.neonColor}`
            : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <role.icon className="h-10 w-10 text-white" />
      </div>

      {/* Text */}
      <div className="relative" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-heading font-bold text-white">{role.title}</h3>
        <p className="mt-1 text-sm font-medium text-white/80">{role.subtitle}</p>
        <p className="mt-2 text-sm text-white/50 leading-relaxed">{role.description}</p>
      </div>

      {/* CTA arrow */}
      <motion.div
        animate={{
          opacity: hoveredRole === role.id ? 1 : 0,
          y: hoveredRole === role.id ? 0 : 8,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1 text-sm font-semibold text-white relative"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </motion.div>
    </motion.button>
  );
}

/* ─── Main SplashScreen ────────────────────────── */
const SplashScreen = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [showRoles, setShowRoles] = useState(false);

  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    delay: i * 0.28,
    x: 5 + (i * 4.3) % 90,
    size: 3 + (i % 4) * 2,
  }));

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden">

      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(0_0%_100%/0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(0_0%_0%/0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(25_95%_53%/0.12),transparent_60%)]" />

      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <Particle key={p.id} delay={p.delay} x={p.x} size={p.size} />
        ))}
      </div>

      {/* Floating blob orbs */}
      <motion.div
        className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-primary/10 blur-[80px] pointer-events-none animate-blob"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 bottom-24 h-64 w-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none animate-blob"
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ animationDelay: '3s' }}
      />

      <AnimatePresence mode="wait">
        {/* ── LOGO SCREEN ── */}
        {!showRoles ? (
          <motion.div
            key="logo"
            className="relative flex flex-col items-center gap-6 px-4"
            exit={{ opacity: 0, scale: 0.82, filter: 'blur(12px)' }}
            transition={{ duration: 0.5 }}
          >
            {/* Ambient light rays */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(25_95%_53%/0.15)_0%,transparent_70%)]" />
            </div>

            {/* Logo with pulsing rings */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, type: 'spring', stiffness: 190, damping: 14 }}
              className="pulse-ring-wrap rounded-full"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
                style={{ willChange: 'transform' }}
              >
                {/* Spinning glow ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 60%, hsl(25 95% 53% / 0.6) 100%)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <img
                  src={cravixLogo}
                  alt="CraviX Logo"
                  className="relative h-44 md:h-52 lg:h-64 w-auto object-contain mx-auto drop-shadow-2xl rounded-xl z-10"
                />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="text-center mt-2"
            >
              <h1 className="text-glow text-[3.2rem] leading-none font-heading font-black tracking-widest md:text-[5.5rem] lg:text-[6.5rem] text-white drop-shadow-xl uppercase">
                CRAVI<span className="text-[#E63900]">X</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm md:text-base font-bold tracking-[0.25em] text-white/85 uppercase mt-1"
              >
                Online Food Ordering System
              </motion.p>
            </motion.div>

            {/* Floating food icons orbiting around */}
            <div className="absolute inset-0 pointer-events-none">
              {FOOD_ICONS.map((icon, i) => {
                const angle = (i / FOOD_ICONS.length) * 360;
                const radius = 200;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={i}
                    className="absolute text-2xl md:text-3xl select-none"
                    style={{ left: '50%', top: '42%' }}
                    animate={{
                      x: [x, x * 0.85, x],
                      y: [y, y * 1.1, y],
                      rotate: [0, 360],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 8 + i * 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                  >
                    {icon}
                  </motion.div>
                );
              })}
            </div>

            {/* Animated stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-center gap-6 md:gap-10 mt-2"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12 }}
                  className="text-center"
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  <p className="text-xs text-white/60 font-medium tracking-wide mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-2"
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  id="splash-get-started"
                  onClick={() => setShowRoles(true)}
                  className="btn-premiere rounded-full px-12 py-7 text-xl font-bold bg-[#E63900] text-white border-2 border-white/20 hover:bg-[#FF3D00] hover:border-white/50 transition-all shadow-[0_0_40px_-8px_rgba(230,57,0,0.7)]"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Welcome to CraviX
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

        ) : (
          /* ── ROLES SCREEN ── */
          <motion.div
            key="roles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="relative flex flex-col items-center gap-8 px-4 w-full max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full glass-ultra neon-border px-4 py-1.5 text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
                <Star className="h-3.5 w-3.5 text-accent" />
                Choose your role
              </div>
              <h2 className="text-3xl font-heading font-extrabold md:text-5xl text-white drop-shadow-lg">
                How will you use{' '}
                <span className="text-gradient">CraviX</span>?
              </h2>
              <p className="mt-3 text-white/65 text-base">Select your role to get started on the platform</p>
            </motion.div>

            <div className="grid w-full gap-5 sm:grid-cols-3 mt-2" style={{ perspective: '1200px' }}>
              {roles.map((role, i) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  index={i}
                  hoveredRole={hoveredRole}
                  setHoveredRole={setHoveredRole}
                  onClick={() => navigate(role.route)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
