import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { itemCount, setIsOpen } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Browse' },
    { to: '/orders', label: 'Orders' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">F</span>
            </div>
            <span className="hidden text-xl font-heading font-bold sm:inline-block">
              Food<span className="text-primary">Dash</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
            <Link to="/search">
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="relative gap-2"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/account">
              <User className="h-4 w-4" />
            </Link>
          </Button>

          <Button size="sm" className="gap-2" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.to) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2" />
                <Link to="/account" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted">
                  Account
                </Link>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted">
                  Restaurant Dashboard
                </Link>
                <Link to="/driver" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted">
                  Driver View
                </Link>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-muted">
                  Admin Panel
                </Link>
                <hr className="my-2" />
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign In</Button>
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
