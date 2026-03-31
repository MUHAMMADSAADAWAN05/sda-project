import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import cravixLogo from '@/assets/cravix-logo.jpeg';

const Header = () => {
  const { itemCount, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Browse' },
    { to: '/orders', label: 'Orders' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b glass-strong neon-border">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
              className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-glow"
            >
              <img src={cravixLogo} alt="CraviX" className="h-full w-full object-cover" />
            </motion.div>
            <span className="hidden text-xl font-heading font-bold sm:inline-block">
              CRAVI<span className="text-gradient">X</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground rounded-xl" asChild>
            <Link to="/search">
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </Link>
          </Button>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" className="relative gap-2 rounded-xl" onClick={() => setIsOpen(true)}>
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

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="sm" className="rounded-xl" onClick={toggleTheme}>
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <Link to="/account"><User className="h-4 w-4" /></Link>
          </Button>

          <Button size="sm" className="rounded-xl gradient-warm neon-glow-primary hover:shadow-xl transition-all font-semibold border-0" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
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
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                  >{link.label}</Link>
                ))}
                <hr className="my-2" />
                <Link to="/account" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted">Account</Link>
                <hr className="my-2" />
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-warm rounded-xl border-0">Sign In</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
