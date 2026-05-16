import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DollarSign, Package, Navigation, MapPin, Phone, Truck, RefreshCw, LayoutDashboard, Settings, History, LogOut, CheckCircle2, Circle, Home, Car, BarChart3, Loader2, Save } from 'lucide-react';
import { motion, useMotionValue, animate, useInView, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import DashboardSideNav from '@/components/DashboardSideNav';
import { fetchOrders, acceptOrder as apiAcceptOrder, updateOrderStatus } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

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
const STEPS = ['ACCEPTED', 'PICKED_UP', 'DELIVERED'] as const;
type DeliveryStatus = typeof STEPS[number];

const STEP_LABELS: Record<string, string> = {
  ACCEPTED:   'En Route to Restaurant',
  PICKED_UP:  'Order Picked Up',
  DELIVERED: 'Delivered',
};

function DeliveryTimeline({ status }: { status: string }) {
  const currentIdx = STEPS.indexOf(status as DeliveryStatus);

  return (
    <div className="flex flex-col gap-0 mt-2">
      {STEPS.map((step, i) => {
        const done    = i < currentIdx || status === 'DELIVERED';
        const active  = i === currentIdx && status !== 'DELIVERED';
        const pending = i > currentIdx && status !== 'DELIVERED';
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
                  {(done || (active && status !== 'DELIVERED')) && (
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

// driverNavItems moved inside component to use handleSideNavClick

const Driver = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);
  const [activeDelivery, setActiveDelivery] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState({ today: 0, week: 0, deliveries: 0 });
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Profile settings state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSideNavClick = (label: string) => {
    const tabMap: Record<string, string> = {
      'Dashboard': 'dashboard',
      'Deliveries': 'deliveries',
      'Earnings': 'earnings',
      'Settings': 'settings'
    };
    if (tabMap[label]) setActiveTab(tabMap[label]);
  };

  const driverNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', onClick: () => handleSideNavClick('Dashboard') },
    { icon: Package, label: 'Deliveries', onClick: () => handleSideNavClick('Deliveries') },
    { icon: BarChart3, label: 'Earnings', onClick: () => handleSideNavClick('Earnings') },
    { icon: Settings, label: 'Settings', onClick: () => handleSideNavClick('Settings') },
    { icon: Home, label: 'Home', to: '/' },
  ];

  const loadData = async () => {
    try {
      const allOrders = await fetchOrders() as any[];
      // Orders waiting for a driver or currently being handled by THIS driver
      const available = allOrders.filter(o => !o.driver && (o.status === 'PLACED' || o.status === 'PREPARING' || o.status === 'READY'));
      const active = allOrders.find(o => o.driver?.id === user?.id && o.status !== 'DELIVERED');
      
      setAvailableOrders(available);
      setActiveDelivery(active || null);
      
      // Calculate earnings (mock calculation from completed orders for this driver)
      const completed = allOrders.filter((o: any) => o.driver?.id === user?.id && o.status === 'DELIVERED');
      setCompletedOrders(completed);
      const todayTotal = completed.reduce((sum: number, o: any) => sum + (o.totalAmount * 0.15 + 3), 0); // 15% + $3 base
      setEarnings({
        today: todayTotal,
        week: todayTotal * 5, // Mock weekly
        deliveries: completed.length
      });
    } catch (err) {
      console.error('Failed to load driver data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [user]);

  const acceptOrder = async (order: any) => {
    try {
      setLoading(true);
      await apiAcceptOrder(order.id, user?.id);
      await loadData();
    } catch (err) {
      alert('Failed to accept order');
    } finally {
      setLoading(false);
    }
  };

  const advanceStatus = async () => {
    if (!activeDelivery) return;
    
    let nextStatus = '';
    if (activeDelivery.status === 'ACCEPTED') nextStatus = 'PICKED_UP';
    else if (activeDelivery.status === 'PICKED_UP') nextStatus = 'DELIVERED';
    else if (activeDelivery.status === 'PLACED' || activeDelivery.status === 'PREPARING' || activeDelivery.status === 'READY') nextStatus = 'ACCEPTED';

    try {
      setLoading(true);
      await updateOrderStatus(activeDelivery.id, nextStatus);
      await loadData();
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  // Sync form when user loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const { updateProfile } = await import('@/lib/api');
      const updatedUser = await updateProfile(user.id, profileForm);
      login(updatedUser as any);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px] flex gap-6">
          <DashboardSideNav items={driverNavItems} title="Driver" activeTab={activeTab} />
          <div className="flex-1 min-w-0">

          {/* Top App Bar */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl glass-strong p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
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
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105" onClick={handleLogout}>
                <LogOut className="h-4 w-4 text-white/70" /> Logout
              </Button>
            </div>
          </motion.div>

          <div className="glass-ultra rounded-3xl p-6 liquid-shimmer">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="dashboard" className="space-y-6 mt-0">
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
                onClick={loadData}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Refresh
              </Button>
            </div>

            {/* Stats row with animated counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: DollarSign, to: earnings.today,  prefix: '$', suffix: '', label: "Today's Earnings", color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
                { icon: DollarSign, to: earnings.week, prefix: '$', suffix: '', label: 'This Week (Est)',        color: 'bg-white/10 text-white' },
                { icon: Package,    to: earnings.deliveries,   prefix: '',  suffix: '',    label: 'Completed Today',       color: 'bg-white/10 text-white' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-xl glass-ultra border-white/10 p-4 flex items-center gap-4 hover:bg-white/5 transition-colors card-shine cursor-default breathing-glow"
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
                            {activeDelivery.status}
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
                                <p className="text-sm font-heading font-bold text-white">{activeDelivery.restaurantName || 'Restaurant'}</p>
                                <p className="text-xs text-white/50">Pick up items</p>
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
                                <p className="text-sm font-heading font-bold text-white">{activeDelivery.deliveryAddress}</p>
                              </div>
                            </div>
                          </div>

                          {/* Delivery progress timeline */}
                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Delivery Progress</p>
                            <DeliveryTimeline status={activeDelivery.status} />
                          </div>

                          <div className="flex items-center justify-between text-sm py-3 border-y border-white/10">
                            <span className="text-white/70 font-medium">Order #{activeDelivery.id}</span>
                            <span className="font-heading font-extrabold text-xl text-white stat-shimmer">${(activeDelivery.totalAmount * 0.15 + 3).toFixed(2)}</span>
                          </div>

                          <div className="flex gap-3">
                            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                              <Button size="lg" className="w-full gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold btn-premiere" onClick={advanceStatus} disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
                                {activeDelivery.status === 'ACCEPTED' ? 'Confirm Pickup'
                                : activeDelivery.status === 'PICKED_UP' ? 'Confirm Delivery'
                                : 'Accept Order'}
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
                          <th className="p-4 font-heading font-semibold hidden md:table-cell">Dropoff</th>
                          <th className="p-4 font-heading font-semibold">Est. Payout</th>
                          <th className="p-4 font-heading font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {availableOrders.map((order, i) => (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: 0.2 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="p-4 text-white font-bold">{order.restaurantName || 'Restaurant'}</td>
                              <td className="p-4 text-white/70 hidden md:table-cell text-xs">
                                {order.deliveryAddress}
                              </td>
                              <td className="p-4 text-white font-bold text-lg stat-shimmer">${(order.totalAmount * 0.15 + 3).toFixed(2)}</td>
                              <td className="p-4">
                                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    className="gradient-warm rounded-lg neon-glow-primary border-0 text-white font-semibold shadow-md btn-premiere"
                                    onClick={() => acceptOrder(order)}
                                    disabled={!!activeDelivery || loading}
                                  >
                                    Accept
                                  </Button>
                                </motion.div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                        {availableOrders.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-white/50">
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
            </TabsContent>

            <TabsContent value="deliveries">
              <div className="glass-card rounded-3xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-[hsl(25,95%,53%)]" />
                  <h2 className="text-xl font-heading font-bold text-white">Delivery History</h2>
                </div>
                {completedOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="table-header-dark text-white/70">
                        <tr>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Restaurant</th>
                          <th className="p-4">Dropoff</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedOrders.map((o) => (
                          <tr key={o.id} className="border-b border-white/5">
                            <td className="p-4 text-white/70">#{o.id}</td>
                            <td className="p-4 text-white font-bold">{o.restaurantName || 'Restaurant'}</td>
                            <td className="p-4 text-white/70">{o.deliveryAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-white/50 text-center py-8">No completed deliveries yet.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="earnings">
              <div className="glass-card rounded-3xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="h-6 w-6 text-success" />
                  <h2 className="text-xl font-heading font-bold text-white">Earnings Report</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                    <p className="text-white/50 text-sm font-semibold uppercase mb-1">Today's Earnings</p>
                    <p className="text-3xl font-heading font-extrabold text-success">${earnings.today.toFixed(2)}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
                    <p className="text-white/50 text-sm font-semibold uppercase mb-1">Total Deliveries</p>
                    <p className="text-3xl font-heading font-extrabold text-white">{earnings.deliveries}</p>
                  </div>
                </div>

                {completedOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="table-header-dark text-white/70">
                        <tr>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedOrders.map((o) => (
                          <tr key={o.id} className="border-b border-white/5">
                            <td className="p-4 text-white/70">#{o.id}</td>
                            <td className="p-4 text-success font-bold">${(o.totalAmount * 0.15 + 3).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-white/50 text-center py-8">No earnings data available yet.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="rounded-3xl glass-ultra border border-white/10 p-8 space-y-8 max-w-3xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-xl">Driver Profile</h3>
                    <p className="text-white/40 text-sm mt-1">Manage your personal information</p>
                  </div>
                  <Button className="gradient-warm rounded-xl h-12 px-8 flex gap-2 font-bold" onClick={handleUpdateProfile} disabled={loading}>
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <div className="h-20 w-20 rounded-full gradient-warm flex items-center justify-center border-4 border-white/20">
                    <span className="text-2xl font-heading font-black text-white">
                      {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) : 'DR'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-bold text-white">{user?.name || 'Driver'}</h4>
                    <p className="text-white/60 mb-2">{user?.email || 'No email provided'}</p>
                    <Badge className="bg-success/20 text-success border-0">Active Driver</Badge>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Full Name</label>
                    <input 
                      className="w-full h-12 rounded-xl glass-card border-white/10 text-white px-4 outline-none focus:border-primary"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Email Address</label>
                    <input 
                      type="email"
                      className="w-full h-12 rounded-xl glass-card border-white/10 text-white px-4 outline-none focus:border-primary"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            </Tabs>
          </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Driver;
