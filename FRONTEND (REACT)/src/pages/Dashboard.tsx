import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { DollarSign, ShoppingBag, Star, Clock, Check, X, ChefHat, Edit, Trash2, Plus, RefreshCw, LayoutDashboard, Settings, History, LogOut, Home, UtensilsCrossed, BarChart3, Loader2, MapPin, Camera, Save } from 'lucide-react';
import { motion, useMotionValue, animate, useInView, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Link, useNavigate } from 'react-router-dom';
import DashboardSideNav from '@/components/DashboardSideNav';
import { useAuth } from '@/context/AuthContext';
import { fetchRestaurantByOwner, fetchRestaurantOrders, updateOrderStatus as apiUpdateOrderStatus, createRestaurant, updateRestaurant, addMenuItem, deleteMenuItem } from '@/lib/api';

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

interface RestaurantData {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  image: string;
  deliveryTime: string;
  deliveryFee: number;
  description: string;
  priceRange: string;
  rating?: number;
  menuItems?: any[];
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  
  // Creation/Edit form state
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    description: '',
    priceRange: '$$'
  });

  // New Item state
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    category: 'Main',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isAvailable: true
  });

  const loadData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const rest = await fetchRestaurantByOwner(user.id) as RestaurantData;
      if (rest) {
        setRestaurant(rest);
        setFormData({
          name: rest.name,
          cuisine: rest.cuisine,
          location: rest.location,
          image: rest.image,
          deliveryTime: rest.deliveryTime,
          deliveryFee: rest.deliveryFee,
          description: rest.description,
          priceRange: rest.priceRange
        });

        const fetchedOrders = await fetchRestaurantOrders(rest.id) as any[];
        setOrders(fetchedOrders);
        
        const todayOrders = fetchedOrders.filter((o: any) => new Date(o.createdAt).toDateString() === new Date().toDateString());
        const revenue = todayOrders.reduce((sum: number, o: any) => sum + o.totalAmount, 0);
        
        setStats([
          { label: "Today's Orders", value: todayOrders.length, icon: ShoppingBag, color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
          { label: "Today's Revenue", value: revenue, icon: DollarSign, color: 'bg-white/10 text-white', prefix: '$' },
          { label: 'Avg Rating', value: rest.rating || 4.5, icon: Star, color: 'bg-white/10 text-white', isFloat: true, showRing: true, ringColor: 'hsl(38 95% 55%)' },
          { label: 'Menu Items', value: rest.menuItems?.length || 0, icon: UtensilsCrossed, color: 'bg-white/10 text-white' },
        ]);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const newRest = await createRestaurant({
        ...formData,
        owner: { id: user?.id },
        rating: 4.5,
        reviewCount: 0,
        featured: false
      });
      setRestaurant(newRest);
      await loadData();
    } catch (err) {
      alert('Failed to create restaurant');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateRestaurant = async () => {
    try {
      setLoading(true);
      await updateRestaurant(restaurant.id, formData);
      alert('Restaurant updated successfully');
      await loadData();
    } catch (err) {
      alert('Failed to update restaurant');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    try {
      setLoading(true);
      const itemToSave = {
        ...newItem,
        isAvailable: newItem.isAvailable ?? true,
        price: newItem.price || 0,
        imageUrl: newItem.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
      };
      await addMenuItem(restaurant.id, itemToSave);
      setShowAddItem(false);
      setNewItem({
        name: '',
        price: 0,
        category: 'Main',
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        isAvailable: true
      });
      await loadData();
    } catch (err) {
      alert('Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      setLoading(true);
      await deleteMenuItem(id);
      await loadData();
    } catch (err) {
      alert('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, newStatus: string) => {
    try {
      await apiUpdateOrderStatus(id, newStatus);
      await loadData();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const ordersByStatus = (status: string) => {
    if (status === 'incoming') return orders.filter(o => o.status === 'PLACED');
    if (status === 'preparing') return orders.filter(o => o.status === 'PREPARING');
    if (status === 'ready') return orders.filter(o => o.status === 'READY');
    return [];
  };

  // Custom Sidebar Click Handler
  const handleSideNavClick = (label: string) => {
    const tabMap: Record<string, string> = {
      'Dashboard': 'dashboard',
      'Orders': 'orders',
      'Menu': 'menu',
      'Settings': 'settings',
      'Analytics': 'dashboard'
    };
    if (tabMap[label]) setActiveTab(tabMap[label]);
  };

  const restaurantNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', onClick: () => handleSideNavClick('Dashboard') },
    { icon: ShoppingBag, label: 'Orders', onClick: () => handleSideNavClick('Orders') },
    { icon: UtensilsCrossed, label: 'Menu', onClick: () => handleSideNavClick('Menu') },
    { icon: BarChart3, label: 'Analytics', onClick: () => handleSideNavClick('Analytics') },
    { icon: Settings, label: 'Settings', onClick: () => handleSideNavClick('Settings') },
    { icon: Home, label: 'Home', to: '/' },
  ];

  if (loading && !restaurant) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-white/60">Loading your restaurant dashboard...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <PageWrapper>
        <div className="container py-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl glass-ultra p-8 border border-white/10 shadow-2xl liquid-shimmer"
          >
            <div className="text-center mb-8">
              <div className="h-20 w-20 rounded-2xl gradient-warm flex items-center justify-center neon-glow-primary mx-auto mb-4">
                <ChefHat className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-heading font-black text-white mb-2">Create Your Restaurant</h2>
              <p className="text-white/60">Fill in the details to start selling on CraviX</p>
            </div>

            <form onSubmit={handleCreateRestaurant} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Restaurant Name</label>
                  <Input 
                    required 
                    placeholder="e.g. Mario's Pizzeria" 
                    className="h-12 rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:neon-border" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Cuisine Type</label>
                  <Input 
                    required 
                    placeholder="e.g. Italian, Pizza" 
                    className="h-12 rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:neon-border" 
                    value={formData.cuisine}
                    onChange={e => setFormData({...formData, cuisine: e.target.value})}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Address / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      required 
                      placeholder="Enter full address" 
                      className="h-12 rounded-xl glass-card border-white/10 pl-12 text-white placeholder:text-white/20 focus:neon-border" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Description</label>
                  <Input 
                    placeholder="A brief description of your restaurant" 
                    className="h-12 rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:neon-border" 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-warm rounded-xl neon-glow-primary text-white font-bold h-14 shadow-xl text-lg mt-4"
                disabled={isCreating}
              >
                {isCreating ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Launch Restaurant'}
              </Button>
            </form>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px] flex gap-6">
          <DashboardSideNav items={restaurantNavItems} title="Restaurant" />
          <div className="flex-1 min-w-0">
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
                <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight group-hover:text-[hsl(25,95%,60%)] transition-colors uppercase">
                  {restaurant?.name}
                </h1>
                <p className="text-white/60 text-sm">{restaurant?.cuisine}</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105" onClick={loadData} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Refresh
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2 transition-all hover:scale-105" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </motion.div>

          {/* Stats Row */}
          {activeTab === 'dashboard' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-xl glass-ultra border-white/10 p-5 flex items-center gap-4 hover:bg-white/5 transition-colors card-shine cursor-default breathing-glow"
                >
                  <div className={`relative h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${stat.color} shadow-lg`}>
                    {stat.showRing && (
                      <ProgressRing value={stat.value} max={5} color={stat.ringColor} />
                    )}
                    <stat.icon className="h-7 w-7 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                    <AnimCounter to={stat.value} prefix={stat.prefix} suffix={stat.suffix || ''} isFloat={stat.isFloat} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="glass-ultra rounded-3xl p-6 liquid-shimmer">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass-ultra rounded-2xl p-1.5 border-white/10">
              <TabsTrigger value="dashboard" className="gap-2 rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="orders" className="gap-2 rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white">Orders <Badge className="h-5 text-[10px] bg-white/20 text-white">{orders.length}</Badge></TabsTrigger>
              <TabsTrigger value="menu" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white">Menu</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
               <div className="p-8 text-center glass-card rounded-3xl border border-white/10">
                 <BarChart3 className="h-16 w-16 mx-auto mb-4 text-white/20" />
                 <h2 className="text-2xl font-heading font-bold text-white mb-2">Welcome Back, {user?.name}</h2>
                 <p className="text-white/50">Everything is looking good for {restaurant.name} today.</p>
               </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  { status: 'incoming', label: 'Incoming', dotColor: 'bg-amber-400' },
                  { status: 'preparing', label: 'Preparing', dotColor: 'bg-primary' },
                  { status: 'ready', label: 'Ready', dotColor: 'bg-emerald-400' },
                ].map(col => (
                  <div key={col.status}>
                    <h3 className="font-heading font-bold mb-4 flex items-center gap-2 text-white/90">
                      <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor} shadow-glow`} /> {col.label} ({ordersByStatus(col.status).length})
                    </h3>
                    <div className="space-y-4">
                      {ordersByStatus(col.status).map(order => (
                        <motion.div key={order.id} className="rounded-2xl glass-ultra p-5 space-y-4 transition-all border border-white/5 hover:border-white/20">
                          <div className="flex justify-between text-sm">
                            <span className="font-heading font-bold text-primary">#{order.id}</span>
                            <span className="text-white/40 flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div>
                            <p className="text-base font-bold text-white">{order.user?.name || 'Customer'}</p>
                            <p className="text-sm text-white/50">{order.items?.map((i: any) => i.name).join(', ')}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-heading font-black text-xl text-white">${order.totalAmount.toFixed(2)}</p>
                            {col.status === 'incoming' && (
                              <Button size="sm" className="gradient-warm rounded-xl" onClick={() => updateOrderStatus(order.id, 'PREPARING')}>Accept</Button>
                            )}
                            {col.status === 'preparing' && (
                              <Button size="sm" className="glass-card text-white hover:bg-white/10" onClick={() => updateOrderStatus(order.id, 'READY')}>Ready</Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="menu">
              <div className="rounded-2xl glass-ultra border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  <h3 className="font-heading font-bold text-white text-lg">Menu Management</h3>
                  
                  <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gradient-warm rounded-xl text-white font-bold"><Plus className="h-4 w-4 mr-2" /> Add New Item</Button>
                    </DialogTrigger>
                    <DialogContent className="glass-strong border-white/10 text-white">
                      <DialogHeader><DialogTitle className="font-heading text-xl">Add Menu Item</DialogTitle></DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/50 uppercase">Item Name</label>
                          <Input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="glass-card border-white/10 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase">Price ($)</label>
                            <Input type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} className="glass-card border-white/10 text-white" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-white/50 uppercase">Category</label>
                            <Input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="glass-card border-white/10 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/50 uppercase">Description</label>
                          <Input value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} className="glass-card border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-white/50 uppercase">Image URL</label>
                          <div className="relative">
                            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input placeholder="https://..." value={newItem.imageUrl} onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} className="glass-card border-white/10 pl-10 text-white" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="gradient-warm w-full rounded-xl" onClick={handleAddMenuItem}>Add to Menu</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-white/40 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Item Name</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {restaurant?.menuItems?.map((item: any) => (
                        <tr key={item.id} className="group hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'} className="h-10 w-10 rounded-lg object-cover border border-white/10" alt="" />
                            <span className="font-bold text-white">{item.name}</span>
                          </td>
                          <td className="px-6 py-4 text-white/70">${item.price.toFixed(2)}</td>
                          <td className="px-6 py-4"><Badge variant="outline" className="text-white/40 border-white/10">{item.category}</Badge></td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="icon" className="text-red-400/30 hover:text-red-400 hover:bg-red-400/10" onClick={() => handleDeleteItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="rounded-3xl glass-ultra border border-white/10 p-8 space-y-8 max-w-3xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-xl">Restaurant Profile</h3>
                    <p className="text-white/40 text-sm mt-1">Update your restaurant information</p>
                  </div>
                  <Button className="gradient-warm rounded-xl h-12 px-8 flex gap-2 font-bold" onClick={handleUpdateRestaurant}>
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Restaurant Name</label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl glass-card border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Cuisine</label>
                    <Input value={formData.cuisine} onChange={e => setFormData({...formData, cuisine: e.target.value})} className="h-12 rounded-xl glass-card border-white/10 text-white" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Location</label>
                    <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="h-12 rounded-xl glass-card border-white/10 text-white" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold text-white/40 uppercase">Description</label>
                    <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="h-12 rounded-xl glass-card border-white/10 text-white" />
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

export default Dashboard;
