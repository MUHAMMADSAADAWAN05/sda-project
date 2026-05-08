import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, TrendingUp, Flame, Zap, Shield, Clock as ClockIcon, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import { categories } from '@/lib/constants';
import { fetchRestaurants } from '@/lib/api';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate, useMotionValue, Variants, Transition } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/* ── Animated counter ──────────────────────────── */
function AnimCounter({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to, duration, count]);

  return <span ref={ref}>{display}</span>;
}

/* ── Cycling hero text ─────────────────────────── */
const CYCLE_WORDS = ['Order it', 'Track it', 'Love it', 'Enjoy it'];

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % CYCLE_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className="text-gradient inline-block"
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {CYCLE_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

const faqs = [
  { q: 'How does CraviX delivery work?', a: 'Simply browse restaurants near you, add items to your cart, and place your order. A nearby driver will pick up your food and deliver it to your doorstep in real-time with GPS tracking.' },
  { q: 'What are the delivery hours?', a: 'Most restaurants on CraviX operate between 8 AM and 11 PM. Some 24-hour restaurants are available around the clock. Check each restaurant\'s page for their specific hours.' },
  { q: 'How can I track my order?', a: 'Once your order is confirmed, you\'ll see a live tracking page with real-time GPS updates showing your driver\'s location, estimated arrival time, and delivery progress steps.' },
  { q: 'Is there a minimum order amount?', a: 'Minimum order amounts vary by restaurant, typically ranging from $10-$15. You can see the minimum for each restaurant on their detail page.' },
  { q: 'How do I apply a promo code?', a: 'During checkout, you\'ll find a "Promo Code" section where you can enter your code and click "Apply" to see the discount reflected in your order total.' },
  { q: 'Can I schedule an order for later?', a: 'Yes! When placing your order, you can choose "Schedule for Later" and pick a date and time that works best for you. Orders can be scheduled up to 7 days in advance.' },
];

/* ── Main Page ─────────────────────────────────── */
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const featured = restaurants.filter(r => r.featured);
  const topRated = [...restaurants].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  useEffect(() => {
    fetchRestaurants()
      .then(data => setRestaurants(data))
      .catch(err => console.error('Error fetching restaurants:', err));
  }, []);

  // Parallax refs
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen">
        {/* ── HERO ─────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden py-20 md:py-32">
          {/* Parallax orbs */}
          <motion.div
            style={{ y: orb1Y, willChange: 'transform' }}
            className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-blob"
          />
          <motion.div
            style={{ y: orb2Y, willChange: 'transform' }}
            className="absolute -right-32 top-12 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[100px] pointer-events-none animate-blob"
          />
          <motion.div
            style={{ y: orb3Y, willChange: 'transform' }}
            className="absolute left-1/2 bottom-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/8 blur-[80px] pointer-events-none"
          />

          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full glass-ultra neon-border px-5 py-2.5 text-sm font-semibold text-primary liquid-shimmer"
              >
                <Sparkles className="h-4 w-4" />
                Free delivery on your first order!
              </motion.div>

              {/* Hero heading */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-4xl font-heading font-extrabold tracking-tight md:text-6xl lg:text-7xl text-white"
              >
                Crave it,{' '}
                <span className="inline-block min-w-[7ch]">
                   <CyclingWord />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="mt-5 text-lg text-white/70 md:text-xl"
              >
                Order from the best local restaurants with easy, on-demand delivery.
              </motion.p>

              {/* Search bar */}
              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="mt-10 flex gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                  <Input
                    id="hero-search"
                    placeholder="What are you craving?"
                    className="h-14 rounded-2xl glass-ultra pl-12 text-base transition-all focus:neon-border text-white placeholder:text-white/30 glass-input"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" size="lg" className="h-14 rounded-2xl px-8 gradient-warm neon-glow-primary hover:shadow-xl transition-all border-0 btn-premiere text-white font-bold">
                    Search
                  </Button>
                </motion.div>
              </motion.form>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>742 Evergreen Terrace, Springfield</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-primary font-semibold">Change</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BANNER ─────────────────────── */}
        <section className="container -mt-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 rounded-2xl glass-ultra p-6 liquid-shimmer"
          >
            {[
              { icon: Zap, label: 'Lightning Fast', value: '15-30 min avg', color: 'text-accent', live: false },
              { icon: Shield, label: 'Secure Payments', value: '100% Protected', color: 'text-success', live: false },
              { icon: ClockIcon, label: 'Live Tracking', value: 'Real-time GPS', color: 'text-primary', live: true },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.11 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-2">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  {stat.live && (
                    <span className="absolute -right-3 -top-1">
                      <span className="live-dot" />
                    </span>
                  )}
                </div>
                <p className="font-heading font-bold text-sm text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CATEGORIES ───────────────────────── */}
        <section className="container py-12">
          <motion.h2
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-heading font-bold mb-6 text-white"
          >
            Explore Categories
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                transition={itemTransition}
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
              >
                <Link to={`/search?category=${cat.name}`} className="flex flex-col items-center gap-2.5 min-w-[88px] group">
                  <motion.div
                    className="flex items-center justify-center rounded-2xl glass-ultra text-3xl transition-all group-hover:neon-glow-primary group-hover:neon-border card-shine"
                    style={{ height: '72px', width: '72px' }}
                  >
                    {cat.icon}
                  </motion.div>
                  <span className="text-xs font-semibold text-white/60 group-hover:text-primary transition-colors">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURED RESTAURANTS ─────────────── */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm neon-glow-primary shimmer-effect">
                <Flame className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">Featured Restaurants</h2>
            </motion.div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary font-semibold group" asChild>
              <Link to="/search">See all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </motion.div>
        </section>

        {/* ── TOP RATED ────────────────────────── */}
        <section className="container py-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20 neon-glow-success">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">Top Rated Near You</h2>
            </motion.div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary font-semibold group" asChild>
              <Link to="/search">See all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {topRated.slice(0, 6).map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </motion.div>
        </section>

        {/* ── ANIMATED STATS ROW ───────────────── */}
        <section className="container pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6 rounded-2xl glass-ultra p-8 text-center liquid-shimmer"
          >
            {[
              { label: 'Restaurants', to: 350 },
              { label: 'Deliveries Today', to: 1240 },
              { label: 'Happy Customers', to: 52000 },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
              >
                <p className="text-3xl font-heading font-black text-white md:text-4xl">
                  <AnimCounter to={s.to} />+
                </p>
                <p className="text-sm text-white/65 mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FAQs ─────────────────────────────── */}
        <section className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm neon-glow-primary">
                <HelpCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="rounded-2xl glass-ultra p-6 liquid-shimmer">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-white/10 rounded-xl overflow-hidden">
                    <AccordionTrigger className="px-4 py-4 text-left text-white hover:text-primary hover:no-underline transition-colors font-heading font-semibold text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-white/70 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </section>

        {/* ── CTA BANNER ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="gradient-warm relative">
            <div className="absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 shimmer-effect" />
            <div className="container relative py-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-heading font-bold text-white md:text-4xl"
              >
                Own a restaurant? Partner with CraviX
              </motion.h2>
              <p className="mt-3 text-white/80 text-lg">Reach thousands of new customers and grow your business</p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button variant="secondary" size="lg" className="mt-8 rounded-2xl px-8 font-bold shadow-lg hover:shadow-xl transition-all glass text-white" asChild>
                  <Link to="/login?role=restaurant">Get Started</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

      </div>
    </PageWrapper>
  );
};

export default Index;
