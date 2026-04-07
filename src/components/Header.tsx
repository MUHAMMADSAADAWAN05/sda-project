import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import cravixLogo from '@/assets/cravix-logo.jpeg';

const Header = () => {
  const { itemCount, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/customer', label: 'Home' },
    { to: '/search', label: 'Browse' },
    { to: '/orders', label: 'Orders' },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 glass-ios transition-all duration-300"
      animate={{
        backdropFilter: scrolled ? 'blur(80px) saturate(200%)' : 'blur(60px) saturate(190%)',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 glass-divider" />

      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group" aria-label="CraviX home">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -4, 0], transition: { duration: 0.45 } }}
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-glow relative"
            >
              <img src={cravixLogo} alt="CraviX" className="h-full w-full object-cover relative z-10" />
            </motion.div>
            <motion.span
              className="hidden text-xl font-heading font-bold sm:inline-block text-foreground"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.2 }}
            >
              CRAVI<span className="text-gradient">X</span>
            </motion.span>
          </Link>

          {!['/dashboard', '/driver', '/login', '/signup'].includes(location.pathname) && (
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full glass-ios-pill"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Desktop right actions */}
        {!['/dashboard', '/driver', '/login', '/signup'].includes(location.pathname) && (
          <div className="hidden items-center gap-2 md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground rounded-full hover:text-foreground hover:bg-white/5" asChild>
                <Link to="/search">
                  <Search className="h-4 w-4" />
                  <span className="hidden lg:inline">Search</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button variant="ghost" size="sm" className="relative gap-2 rounded-full hover:bg-white/5" onClick={() => setIsOpen(true)} aria-label="Open cart">
                <ShoppingCart className="h-4 w-4" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key="cart-count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full gradient-warm text-[10px] font-bold text-primary-foreground shadow-glow"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/5" onClick={toggleTheme} aria-label="Toggle theme">
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}>
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/5" asChild>
                <Link to="/account" aria-label="Account"><User className="h-4 w-4" /></Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button size="sm" className="rounded-full gradient-warm neon-glow-primary hover:shadow-xl transition-all font-semibold border-0 btn-premiere" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </motion.div>
          </div>
        )}

        {/* Mobile */}
        {!['/dashboard', '/driver', '/login', '/signup'].includes(location.pathname) ? (
          <div className="flex items-center gap-2 md:hidden">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)} aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span key="cart-count-mobile" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full gradient-warm text-[10px] font-bold text-primary-foreground"
                    >{itemCount}</motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glass-ios-sheet border-l border-white/10">
                <nav className="mt-8 flex flex-col gap-2">
                  {navLinks.map(link => (
                    <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                      className={`rounded-[22px] px-4 py-3 text-sm font-medium transition-colors ${isActive(link.to) ? 'glass-ios-pill text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                    >{link.label}</Link>
                  ))}
                  <div className="glass-divider my-2" />
                  <Link to="/account" onClick={() => setMobileOpen(false)} className="rounded-[22px] px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5">Account</Link>
                  <div className="glass-divider my-2" />
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gradient-warm rounded-full border-0">Sign In</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:hidden">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/5" onClick={toggleTheme} aria-label="Toggle theme">
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}>
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
