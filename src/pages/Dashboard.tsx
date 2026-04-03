import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ShoppingBag, Star, Clock, ChefHat, Edit, Trash2, Plus, RefreshCw, LayoutDashboard, Settings, History, LogOut } from 'lucide-react';
import { motion, useMotionValue, animate, useInView } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

/* ── Animated counter ──────────────────────────── */
function AnimCounter({ to, prefix = '', suffix = '', isFloat = false }: {
  to: number; prefix?: string; suffix?: string; isFloat?: boolean;
}) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: v => setDisplay(isFloat ? v.toFixed(1) : Math.floor(v).toString()),
    });
    return controls.stop;
  }, [inView, to, isFloat, count]);

  return (
    <p ref={ref} className="text-2xl font-bold font-heading text-white stat-shimmer">
      {prefix}{display}{suffix}
    </p>
  );
}

/* ── SVG Progress Ring ─────────────────────────── */
function ProgressRing({ value, max, color }: { value: number; max: number; color: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const progress = (value / max) * circ;

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0">
      <circle cx="28" cy="28" r={r} stroke="hsl(0 0% 100% / 0.08)" strokeWidth="4" fill="none" />
      <motion.circle
        cx="28" cy="28" r={r}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - progress }}
        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '28px 28px' }}
      />
    </svg>
  );
}

const stats = [
  { label: "Today's Orders", value: 47, rawValue: '47', icon: ShoppingBag, color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]', isCounter: true, suffix: '' },
  { label: 'Revenue', value: 1284, rawValue: '$1,284', icon: DollarSign, color: 'bg-white/10 text-white', isCounter: true, prefix: '$', suffix: '' },
  { label: 'Avg Rating', value: 4.8, rawValue: '4.8', icon: Star, color: 'bg-white/10 text-white', isCounter: true, isFloat: true, suffix: '', showRing: true, ringColor: 'hsl(38 95% 55%)' },
  { label: 'Prep Time', value: 18, rawValue: '18 min', icon: Clock, color: 'bg-white/10 text-white', isCounter: true, suffix: ' min' },
];

const mockOrders = [
  { id: 'ORD-101', customer: 'Sarah M.', items: '2x Margherita', total: 38.97, time: '2 min ago', status: 'preparing' },
  { id: 'ORD-102', customer: 'Mike T.',  items: '1x Pepperoni',  total: 23.98, time: '5 min ago', status: 'preparing' },
  { id: 'ORD-103', customer: 'Anna L.',  items: '1x Truffle Mushroom', total: 19.99, time: '12 min ago', status: 'ready' },
  { id: 'ORD-104', customer: 'James K.', items: '3x BBQ Chicken', total: 53.97, time: '20 min ago', status: 'ready' },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(mockOrders);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px]">

          {/* Top App Bar */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl glass-strong p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
              <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg group-hover:scale-105 transition-transform shimmer-effect">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-extrabold text-white tracking-wide uppercase group-hover:text-[hsl(25,95%,60%)] transition-colors">
                CraviX Restaurant
              </h1>
            </Link>

            <div className="flex items-center gap-2">
              <Button className="gradient-warm rounded-lg neon-glow-primary border-0 text-white gap-2 font-semibold btn-premiere">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <Settings className="h-4 w-4 text-white/70" /> Settings
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <History className="h-4 w-4 text-white/70" /> History
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <LogOut className="h-4 w-4 text-white/70" /> Logout
              </Button>
            </div>
          </motion.div>

          <div className="glass-deep rounded-3xl p-6">
            {/* Dashboard header with live dot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-heading font-bold text-white">Restaurant Dashboard</h2>
                <span className="live-dot" title="Live data" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>

            {/* Stats row with animated counters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-xl glass-card border-white/10 p-4 flex items-center gap-4 hover:bg-white/5 transition-colors card-shine cursor-default"
                >
                  <div className={`relative h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}>
                    {(stat as any).showRing && (
                      <ProgressRing value={(stat as any).value} max={5} color={(stat as any).ringColor} />
                    )}
                    <stat.icon className="h-6 w-6 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                    <AnimCounter
                      to={stat.value}
                      prefix={(stat as any).prefix}
                      suffix={stat.suffix}
                      isFloat={(stat as any).isFloat}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Orders table with staggered row entrance */}
            <div className="rounded-xl overflow-hidden glass-card border-white/10">
              <div className="flex items-center gap-2 p-4 table-header-dark border-b border-white/10">
                <div className="h-6 w-6 rounded bg-[hsl(25,95%,53%)] text-white flex items-center justify-center text-xs font-bold">O</div>
                <h3 className="font-heading font-bold text-white">Active Orders</h3>
                <span className="live-dot ml-1" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="table-header-dark text-white/70">
                    <tr>
                      <th className="p-4 font-heading font-semibold">Order ID</th>
                      <th className="p-4 font-heading font-semibold">Customer</th>
                      <th className="p-4 font-heading font-semibold">Items</th>
                      <th className="p-4 font-heading font-semibold">Time</th>
                      <th className="p-4 font-heading font-semibold">Status</th>
                      <th className="p-4 font-heading font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-heading font-semibold text-white">{order.id}</td>
                        <td className="p-4 text-white/80">{order.customer}</td>
                        <td className="p-4 text-white/80">{order.items}</td>
                        <td className="p-4 text-white/80">{order.time}</td>
                        <td className="p-4">
                          <motion.div
                            animate={order.status === 'preparing'
                              ? { boxShadow: ['0 0 0 0 hsl(245 95% 63% / 0.4)', '0 0 0 6px hsl(245 95% 63% / 0)', '0 0 0 0 hsl(245 95% 63% / 0)'] }
                              : {}
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block"
                          >
                            <Badge
                              variant="outline"
                              className={`rounded-full px-3 py-1 text-xs border-0 ${
                                order.status === 'preparing'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              {order.status === 'preparing' ? 'Preparing' : 'Ready'}
                            </Badge>
                          </motion.div>
                        </td>
                        <td className="p-4 text-white font-bold">${order.total.toFixed(2)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
