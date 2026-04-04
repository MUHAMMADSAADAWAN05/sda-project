import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { DollarSign, ShoppingBag, Star, Clock, Check, X, ChefHat, Edit, Trash2, Plus, RefreshCw, LayoutDashboard, Settings, History, LogOut } from 'lucide-react';
import { motion, useMotionValue, animate, useInView, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Link } from 'react-router-dom';

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
  { label: "Today's Orders", value: 47, icon: ShoppingBag, color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]', isCounter: true, suffix: '' },
  { label: "Today's Revenue", value: 1284, icon: DollarSign, color: 'bg-white/10 text-white', isCounter: true, prefix: '$', suffix: '' },
  { label: 'Avg Rating', value: 4.8, icon: Star, color: 'bg-white/10 text-white', isCounter: true, isFloat: true, suffix: '', showRing: true, ringColor: 'hsl(38 95% 55%)' },
  { label: 'Avg Prep Time', value: 18, icon: Clock, color: 'bg-white/10 text-white', isCounter: true, suffix: ' min' },
];

const mockOrders = [
  { id: 'ORD-101', customer: 'Sarah M.', items: '2x Margherita, 1x Caesar Salad', total: 38.97, time: '2 min ago', status: 'incoming' },
  { id: 'ORD-102', customer: 'Mike T.', items: '1x Pepperoni, 1x Garlic Bread', total: 23.98, time: '5 min ago', status: 'incoming' },
  { id: 'ORD-103', customer: 'Anna L.', items: '1x Truffle Mushroom', total: 19.99, time: '12 min ago', status: 'preparing' },
  { id: 'ORD-104', customer: 'James K.', items: '3x BBQ Chicken', total: 53.97, time: '20 min ago', status: 'ready' },
];

const menuItems = [
  { id: '1', name: 'Margherita Pizza', price: 14.99, available: true, orders: 142 },
  { id: '2', name: 'Pepperoni Pizza', price: 16.99, available: true, orders: 98 },
  { id: '3', name: 'Truffle Mushroom', price: 19.99, available: true, orders: 67 },
  { id: '4', name: 'BBQ Chicken', price: 17.99, available: false, orders: 45 },
  { id: '5', name: 'Garlic Breadsticks', price: 6.99, available: true, orders: 210 },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [menu, setMenu] = useState(menuItems);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const toggleAvailability = (id: string) => {
    setMenu(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const ordersByStatus = (status: string) => orders.filter(o => o.status === status);

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px]">
          {/* Header bar - Premium style */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl glass-strong p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
              <div className="h-12 w-12 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg shimmer-effect group-hover:scale-105 transition-transform">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight group-hover:text-[hsl(25,95%,60%)] transition-colors">CRAVIX RESTAURANT</h1>
                <p className="text-white/60 text-sm">Mario's Authentic Pizzeria</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4" /> Refresh
              </Button>
              <Badge variant="outline" className="gap-2 text-white border-white/20 rounded-full px-4 py-2 glass-card">
                <span className="live-dot" /> Open
              </Badge>
            </div>
          </motion.div>

          {/* Stats - Premium cards with animation */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl glass-card border-white/10 p-5 flex items-center gap-4 hover:bg-white/5 transition-colors card-shine cursor-default"
              >
                <div className={`relative h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${stat.color} shadow-lg`}>
                  {stat.showRing && (
                    <ProgressRing value={stat.value} max={5} color={stat.ringColor} />
                  )}
                  <stat.icon className="h-7 w-7 relative z-10" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                  <AnimCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isFloat={stat.isFloat}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="glass-strong rounded-2xl p-1.5 border-white/10">
              <TabsTrigger value="orders" className="gap-2 rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:neon-glow-primary">
                Orders <Badge className="h-5 text-[10px] gradient-warm border-0 text-white">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="menu" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:neon-glow-primary">Menu</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:neon-glow-primary">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  { status: 'incoming', label: 'Incoming', dotColor: 'bg-amber-400', animate: true },
                  { status: 'preparing', label: 'Preparing', dotColor: 'bg-primary', animate: false },
                  { status: 'ready', label: 'Ready', dotColor: 'bg-emerald-400', animate: false },
                ].map(col => (
                  <div key={col.status}>
                    <h3 className="font-heading font-bold mb-4 flex items-center gap-2 text-white/90">
                      <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor} ${col.animate ? 'animate-pulse' : ''} shadow-[0_0_8px_rgba(255,255,255,0.5)]`} /> {col.label} ({ordersByStatus(col.status).length})
                    </h3>
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {ordersByStatus(col.status).map(order => (
                          <motion.div
                            key={order.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            className="rounded-2xl glass-liquid neon-border-teal p-5 space-y-4 transition-all card-shine"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-heading font-bold text-primary">{order.id}</span>
                              <span className="text-white/40 flex items-center gap-1"><Clock className="h-3 w-3" /> {order.time}</span>
                            </div>
                            <div>
                              <p className="text-base font-bold text-white">{order.customer}</p>
                              <p className="text-sm text-white/50 line-clamp-1">{order.items}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="font-heading font-black text-xl text-white">${order.total.toFixed(2)}</p>
                              {col.status === 'incoming' && (
                                <div className="flex gap-2">
                                  <Button size="sm" className="h-9 px-4 gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold" onClick={() => updateOrderStatus(order.id, 'preparing')}>Accept</Button>
                                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0 rounded-xl bg-white/5 text-white/40 hover:bg-red-500/20 hover:text-red-400" onClick={() => updateOrderStatus(order.id, 'rejected')}><X className="h-4 w-4" /></Button>
                                </div>
                              )}
                              {col.status === 'preparing' && (
                                <Button size="sm" className="h-9 w-full gap-2 rounded-xl glass-card border-white/10 text-white hover:bg-white/10 btn-premiere" onClick={() => updateOrderStatus(order.id, 'ready')}>
                                  <ChefHat className="h-4 w-4" /> Ready for Pickup
                                </Button>
                              )}
                              {col.status === 'ready' && (
                                <Badge variant="secondary" className="h-9 w-full justify-center rounded-xl glass-deep text-white/40 border-white/5">Waiting for pickup</Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {ordersByStatus(col.status).length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 glass-card rounded-2xl border-dashed border-white/10">
                          <p className="text-sm text-white/30 font-medium">No {col.label.toLowerCase()} orders</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="menu">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-strong border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h3 className="font-heading font-bold text-white text-lg">Menu Management</h3>
                  <Button size="sm" className="gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold px-6 py-5 btn-premiere"><Plus className="h-4 w-4 mr-2" /> Add New Item</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-white/40 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-heading font-bold">Item Name</th>
                        <th className="px-6 py-4 font-heading font-bold">Price</th>
                        <th className="px-6 py-4 font-heading font-bold">Total Orders</th>
                        <th className="px-6 py-4 font-heading font-bold">Availability</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {menu.map(item => (
                        <motion.tr key={item.id} whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }} className="transition-colors group">
                          <td className="px-6 py-4">
                            <p className="font-heading font-bold text-white group-hover:text-primary transition-colors">{item.name}</p>
                          </td>
                          <td className="px-6 py-4 text-white/70 font-mono">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-white/70">{item.orders}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} className="data-[state=checked]:bg-primary" />
                              <Badge className={`rounded-full px-2 py-0.5 text-[10px] ${item.available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} border-0`}>
                                {item.available ? 'Available' : 'Sold Out'}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-white/30 hover:text-white hover:bg-white/10"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-400/30 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-strong border-white/10 p-8 space-y-8 max-w-3xl shadow-2xl">
                <div>
                  <h3 className="font-heading font-bold text-white text-xl">Restaurant Settings</h3>
                  <p className="text-white/40 text-sm mt-1">Manage your business profile and delivery preferences</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    { label: 'Restaurant Name', value: "Mario's Authentic Pizzeria" },
                    { label: 'Cuisine Type', value: 'Pizza, Italian' },
                    { label: 'Phone', value: '(555) 987-6543' },
                    { label: 'Delivery Radius (miles)', value: '5' },
                  ].map(field => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{field.label}</label>
                      <Input defaultValue={field.value} className="h-12 rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 transition-all font-medium" />
                    </div>
                  ))}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Business Address</label>
                    <Input defaultValue="123 Main St, Springfield" className="h-12 rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 transition-all font-medium" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button className="gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold h-12 px-8 btn-premiere shadow-xl">Update Profile</Button>
                  <Button variant="ghost" className="rounded-xl text-white/40 hover:bg-white/5 h-12 px-8">Reset Changes</Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
