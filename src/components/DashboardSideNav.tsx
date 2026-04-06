import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SideNavItem {
  icon: LucideIcon;
  label: string;
  to: string;
}

interface DashboardSideNavProps {
  items: SideNavItem[];
  title: string;
  brandColor?: string;
}

const DashboardSideNav = ({ items, title, brandColor = 'gradient-warm' }: DashboardSideNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col w-[220px] shrink-0 glass-ultra rounded-2xl p-4 h-fit sticky top-24 liquid-shimmer"
    >
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4 px-2">{title}</p>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = currentPath === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className={`absolute inset-0 rounded-xl ${brandColor} opacity-20`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full ${brandColor}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`h-4 w-4 relative z-10 ${active ? 'text-primary' : ''}`} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default DashboardSideNav;
