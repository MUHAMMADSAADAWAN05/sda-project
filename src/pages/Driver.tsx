import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Navigation, MapPin, Phone, Truck, RefreshCw, LayoutDashboard, Settings, History, LogOut, CheckCircle2, Circle, Home, Car, BarChart3 } from 'lucide-react';
import { motion, useMotionValue, animate, useInView, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import DashboardSideNav from '@/components/DashboardSideNav';

/* ── Animated Counter ──────────────────────────── */
function AnimCounter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.floor(v).toString()),
    });
    return controls.stop;
  }, [inView, to, count]);

  return (
    <p ref={ref} className="text-2xl font-bold font-heading text-white stat-shimmer">
      {prefix}{display}{suffix}
    </p>
  );
}

/* ── Delivery Timeline Step ────────────────────── */
const STEPS = ['accepted', 'picked_up', 'delivering'] as const;
type DeliveryStatus = typeof STEPS[number];

const STEP_LABELS: Record<DeliveryStatus, string> = {
  accepted:   'En Route to Restaurant',
  picked_up:  'Order Picked Up',
  delivering: 'Out for Delivery',
};

function DeliveryTimeline({ status }: { status: DeliveryStatus }) {
  const currentIdx = STEPS.indexOf(status);

  return (
    <div className="flex flex-col gap-0 mt-2">
      {STEPS.map((step, i) => {
        const done    = i < currentIdx;
        const active  = i === currentIdx;
        const pending = i > currentIdx;
        return (
          <div key={step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <motion.div
                animate={
                  active
                    ? { scale: [1, 1.2, 1], boxShadow: ['0 0 0 0 hsl(25 95% 53% / 0.6)', '0 0 0 8px hsl(25 95% 53% / 0)', '0 0 0 0 hsl(25 95% 53% / 0)'] }
                    : {}
                }
                transition={{ duration: 1.8, repeat: Infinity }}
                className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                  done    ? 'bg-success neon-glow-success'
                  : active ? 'bg-primary neon-glow-primary'
                  : 'bg-white/10 border border-white/20'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                ) : active ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    <Circle className="h-3 w-3 text-white fill-white/50" />
                  </motion.div>
                ) : (
                  <Circle className="h-3 w-3 text-white/30" />
                )}
              </motion.div>

              {/* Animated connector line */}
              {i < STEPS.length - 1 && (
                <div className="relative w-0.5 h-8 bg-white/10 my-0.5">
                  {done && (
                    <motion.div
                      className="absolute top-0 left-0 w-full bg-success rounded-full"
                      initial={{ height: '0%' }}
                      animate={{ height: '100%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="pb-6">
              <p className={`text-sm font-heading font-bold ${active ? 'text-white' : done ? 'text-white/70' : 'text-white/30'}`}>
                {STEP_LABELS[step]}
              </p>
              {active && <span className="text-xs text-primary font-medium">In progress...</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Available Orders ──────────────────────────── */
const availableOrders = [
  { id: 'ORD-201', restaurant: "Mario's Pizzeria", pickup: '123 Main St',    dropoff: '742 Evergreen Terrace', distance: '2.3 mi', payout: 8.50,  items: 3 },
  { id: 'ORD-202', restaurant: 'Burger Republic',  pickup: '456 Oak Ave',    dropoff: '1600 Pennsylvania Ave', distance: '4.1 mi', payout: 12.00, items: 2 },
  { id: 'ORD-203', restaurant: 'Sakura Sushi',     pickup: '789 Cherry Ln',  dropoff: '221B Baker St',         distance: '1.8 mi', payout: 7.25,  items: 5 },
];

const driverNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/driver' },
  { icon: Package, label: 'Deliveries', to: '/driver' },
  { icon: BarChart3, label: 'Earnings', to: '/driver' },
  { icon: Car, label: 'Vehicle', to: '/driver' },
  { icon: Settings, label: 'Settings', to: '/driver' },
  { icon: Home, label: 'Home', to: '/' },
];

const Driver = () => {
  const [activeDelivery, setActiveDelivery] = useState<typeof availableOrders[0] | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('accepted');
  const [earnings] = useState({ today: 67.50, week: 423.75, deliveries: 8 });

  const acceptOrder = (order: typeof availableOrders[0]) => {
    setActiveDelivery(order);
    setDeliveryStatus('accepted');
  };

  const advanceStatus = () => {
    if (deliveryStatus === 'accepted')   setDeliveryStatus('picked_up');
    else if (deliveryStatus === 'picked_up') setDeliveryStatus('delivering');
    else { setActiveDelivery(null); setDeliveryStatus('accepted'); }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px] flex gap-6">
          <DashboardSideNav items={driverNavItems} title="Driver" />
          <div className="flex-1 min-w-0">

          {/* Top App Bar */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[22px] glass-ios p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
              <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg group-hover:scale-105 transition-transform shimmer-effect">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-extrabold text-white tracking-wide uppercase group-hover:text-[hsl(25,95%,60%)] transition-colors">
                CraviX Driver
              </h1>
            </Link>

            <div className="flex items-center gap-2">
              <Button className="gradient-warm rounded-lg neon-glow-primary border-0 text-white gap-2 font-semibold btn-premiere">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <Settings className="h-4 w-4 text-white/70" /> Vehicle
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <History className="h-4 w-4 text-white/70" /> Earnings
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105">
                <LogOut className="h-4 w-4 text-white/70" /> Logout
              </Button>
            </div>
          </motion.div>

          <div className="glass-ios rounded-[28px] p-6 specular-shimmer">
            {/* Dashboard header with LIVE dot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-heading font-bold text-white">Driver Dashboard</h2>
                <span className="live-dot" title="Online" />
                <span className="text-xs font-medium text-success/80 mt-0.5">Online</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: DollarSign, to: 67,  prefix: '$', suffix: '.50', label: "Today's Earnings", color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
                { icon: DollarSign, to: 423, prefix: '$', suffix: '.75', label: 'This Week',        color: 'bg-white/10 text-white' },
                { icon: Package,    to: 8,   prefix: '',  suffix: '',    label: 'Deliveries',       color: 'bg-white/10 text-white' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-[22px] glass-ios-card border-white/10 p-4 flex items-center gap-4 hover:bg-white/5 transition-colors specular-shimmer cursor-default ios-breathe"
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                    <AnimCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Active Delivery Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl overflow-hidden glass-card border-white/10">
                  <div className="flex items-center justify-between p-4 table-header-dark border-b border-white/10">
                    <div className="flex items-center gap-2 text-white">
                      <div className="h-6 w-6 rounded bg-[hsl(25,95%,53%)] text-white flex items-center justify-center text-xs font-bold">A</div>
                      <h3 className="font-heading font-bold">Active Delivery</h3>
                    </div>
                    <AnimatePresence>
                      {activeDelivery && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <Badge className="gradient-warm border-0 rounded-full font-bold">
                            {deliveryStatus === 'accepted' ? 'En Route' : deliveryStatus === 'picked_up' ? 'Delivering' : 'Complete'}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {activeDelivery ? (
                        <motion.div
                          key="active"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          className="space-y-4"
                        >
                          {/* Route display */}
                          <div className="space-y-1 bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <MapPin className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-white/50 font-medium">Pickup</p>
                                <p className="text-sm font-heading font-bold text-white">{activeDelivery.restaurant}</p>
                                <p className="text-xs text-white/50">{activeDelivery.pickup}</p>
                              </div>
                            </div>
                            {/* Animated dashed connector */}
                            <div className="ml-4 my-1 w-0.5 h-5 border-l-2 border-dashed border-white/20" />
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0 neon-glow-primary">
                                <Navigation className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-white/50 font-medium">Dropoff</p>
                                <p className="text-sm font-heading font-bold text-white">{activeDelivery.dropoff}</p>
                              </div>
                            </div>
                          </div>

                          {/* Delivery progress timeline */}
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Delivery Progress</p>
                            <DeliveryTimeline status={deliveryStatus} />
                          </div>

                          <div className="flex items-center justify-between text-sm py-3 border-y border-white/10">
                            <span className="text-white/70 font-medium">{activeDelivery.distance} • {activeDelivery.items} items</span>
                            <span className="font-heading font-extrabold text-xl text-white stat-shimmer">${activeDelivery.payout.toFixed(2)}</span>
                          </div>

                          <div className="flex gap-3">
                            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                              <Button size="lg" className="w-full gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold btn-premiere" onClick={advanceStatus}>
                                <CheckCircle2 className="h-5 w-5 mr-2" />
                                {deliveryStatus === 'accepted'   ? 'Confirm Pickup'
                                : deliveryStatus === 'picked_up'  ? 'Confirm Delivery'
                                : 'Finish Dropoff'}
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}>
                              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-xl glass-card border-white/20 text-white hover:bg-white/10">
                                <Phone className="h-5 w-5" />
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-12 text-center text-white/50"
                        >
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Truck className="h-12 w-12 mx-auto mb-4 opacity-25" />
                          </motion.div>
                          <p className="font-semibold">No active delivery</p>
                          <p className="text-sm mt-1">Accept an order from the list →</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Available Orders Column */}
              <div className="lg:col-span-3">
                <div className="rounded-xl overflow-hidden glass-card border-white/10 h-full">
                  <div className="flex items-center gap-2 p-4 table-header-dark border-b border-white/10">
                    <div className="h-6 w-6 rounded bg-white/20 text-white flex items-center justify-center text-xs font-bold">N</div>
                    <h3 className="font-heading font-bold text-white">Available Orders</h3>
                    <span className="live-dot ml-1" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="table-header-dark text-white/70">
                        <tr>
                          <th className="p-4 font-heading font-semibold">Restaurant</th>
                          <th className="p-4 font-heading font-semibold hidden md:table-cell">Route</th>
                          <th className="p-4 font-heading font-semibold">Dist / Items</th>
                          <th className="p-4 font-heading font-semibold">Est. Payout</th>
                          <th className="p-4 font-heading font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {availableOrders.filter(o => o.id !== activeDelivery?.id).map((order, i) => (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: 0.2 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="p-4 text-white font-bold">{order.restaurant}</td>
                              <td className="p-4 text-white/70 hidden md:table-cell text-xs">
                                {order.pickup}<br />
                                <span className="text-white/30">↓</span><br />
                                {order.dropoff}
                              </td>
                              <td className="p-4 text-white/80">{order.distance}<br />{order.items} items</td>
                              <td className="p-4 text-white font-bold text-lg stat-shimmer">${order.payout.toFixed(2)}</td>
                              <td className="p-4">
                                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    className="gradient-warm rounded-lg neon-glow-primary border-0 text-white font-semibold shadow-md btn-premiere"
                                    onClick={() => acceptOrder(order)}
                                    disabled={!!activeDelivery}
                                  >
                                    Accept
                                  </Button>
                                </motion.div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                        {availableOrders.filter(o => o.id !== activeDelivery?.id).length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-white/50">
                              <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Looking for nearby orders...
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Driver;
