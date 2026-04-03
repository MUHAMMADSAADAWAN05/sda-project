<<<<<<< HEAD
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Store, ShoppingBag, DollarSign, Check, X, Shield, RefreshCw, LayoutDashboard, Settings, History, LogOut, CheckCircle2, Clock } from 'lucide-react';
=======
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, ShoppingBag, DollarSign, Search, Check, X, Tag, Plus, Shield, RefreshCw } from 'lucide-react';
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const platformStats = [
<<<<<<< HEAD
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, color: 'bg-white/10 text-white' },
  { label: 'Active Users', value: '3,421', icon: Users, color: 'bg-white/10 text-white' },
  { label: 'Restaurants', value: '156', icon: Store, color: 'bg-white/10 text-white' },
=======
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, change: '+23%', color: 'from-primary to-accent' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, change: '+18%', color: 'from-accent to-[hsl(45,90%,55%)]' },
  { label: 'Active Users', value: '3,421', icon: Users, change: '+12%', color: 'from-[hsl(280,60%,55%)] to-primary' },
  { label: 'Restaurants', value: '156', icon: Store, change: '+8', color: 'from-success to-[hsl(180,60%,45%)]' },
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
];

const mockRestaurants = [
  { id: '1', name: "Mario's Pizzeria", status: 'active', orders: 2340, revenue: '$34,200', rating: 4.8 },
  { id: '2', name: 'Burger Republic', status: 'active', orders: 1870, revenue: '$28,400', rating: 4.6 },
  { id: '3', name: 'Sakura Sushi', status: 'active', orders: 3120, revenue: '$52,100', rating: 4.9 },
  { id: '4', name: 'New Restaurant', status: 'pending', orders: 0, revenue: '$0', rating: 0 },
];

<<<<<<< HEAD
const Admin = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px]">
          
          {/* Top App Bar - Matching Reference Structure */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-strong p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-extrabold text-white tracking-wide uppercase">CraviX Admin</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button className="gradient-warm rounded-lg neon-glow-primary border-0 text-white gap-2 font-semibold">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <Settings className="h-4 w-4 text-white/70" /> Platform Configure
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <History className="h-4 w-4 text-white/70" /> Audit Logs
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <LogOut className="h-4 w-4 text-white/70" /> Logout
              </Button>
            </div>
          </motion.div>

          <div className="glass-deep rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-heading font-bold text-white">Platform Overview</h2>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>

            {/* Stats row - matching reference layout (icon left, text right, subtle cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {platformStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl glass-card border-white/10 p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                    <p className="text-2xl font-bold font-heading text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Table Area - matching the dark glass style with orange accents */}
            <div className="rounded-xl overflow-hidden glass-card border-white/10">
              <div className="flex items-center gap-2 p-4 table-header-dark border-b border-white/10">
                <div className="h-6 w-6 rounded bg-[hsl(25,95%,53%)] text-white flex items-center justify-center text-xs font-bold">R</div>
                <h3 className="font-heading font-bold text-white">Active Restaurants</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="table-header-dark text-white/70">
                    <tr>
                      <th className="p-4 font-heading font-semibold">Restaurant ID</th>
                      <th className="p-4 font-heading font-semibold">Name</th>
                      <th className="p-4 font-heading font-semibold">Orders</th>
                      <th className="p-4 font-heading font-semibold">Revenue</th>
                      <th className="p-4 font-heading font-semibold">Rating</th>
                      <th className="p-4 font-heading font-semibold">Status</th>
                      <th className="p-4 font-heading font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.map(r => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-heading font-semibold text-white/60">RES-{r.id.padStart(3, '0')}</td>
                        <td className="p-4 text-white font-bold">{r.name}</td>
                        <td className="p-4 text-white/80">{r.orders.toLocaleString()}</td>
                        <td className="p-4 text-white/80">{r.revenue}</td>
                        <td className="p-4 text-white/80">{r.rating > 0 ? `${r.rating} ⭐` : '—'}</td>
                        <td className="p-4">
                          <Badge 
                            variant="outline" 
                            className={`rounded-full px-3 py-1 text-xs border-0 flex w-fit items-center gap-1 ${
                              r.status === 'active' 
                                ? 'bg-emerald-500/20 text-emerald-300' 
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {r.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                            {r.status === 'active' ? 'Active' : 'Pending'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {r.status === 'pending' ? (
                            <div className="flex gap-2">
                              <Button size="sm" className="h-7 px-2 gradient-warm rounded-lg border-0 text-white"><Check className="h-3 w-3" /></Button>
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-white/50 hover:text-white rounded-lg"><X className="h-3 w-3" /></Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost" className="h-7 text-white/70 hover:text-white hover:bg-white/10">Manage</Button>
=======
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@email.com', role: 'customer', orders: 23, joined: 'Jan 2024' },
  { id: '2', name: 'Sarah M.', email: 'sarah@email.com', role: 'customer', orders: 45, joined: 'Dec 2023' },
  { id: '3', name: 'Alex Rivera', email: 'alex@email.com', role: 'driver', orders: 312, joined: 'Nov 2023' },
  { id: '4', name: 'Mario Rossi', email: 'mario@email.com', role: 'restaurant', orders: 0, joined: 'Oct 2023' },
];

const promoCodes = [
  { code: 'WELCOME20', discount: '20%', usage: '1,234 / 5,000', status: 'active', expires: 'Mar 2024' },
  { code: 'FREEDEL', discount: 'Free Delivery', usage: '567 / 1,000', status: 'active', expires: 'Feb 2024' },
  { code: 'SUMMER10', discount: '10%', usage: '2,000 / 2,000', status: 'expired', expires: 'Jan 2024' },
];

const Admin = () => (
  <PageWrapper>
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Header bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl glass-liquid neon-border-teal p-5 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(280,60%,55%)] to-primary flex items-center justify-center shadow-lg neon-glow-primary">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-extrabold text-foreground">CRAVIX ADMIN</h1>
              <p className="text-muted-foreground text-sm">Platform Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10 gap-1">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {platformStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass-liquid neon-border-teal p-5 transition-all hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <p className="text-2xl font-heading font-extrabold text-foreground">{stat.value}</p>
                  </div>
                </div>
                <p className="text-xs text-success mt-2 font-semibold">{stat.change} this month</p>
              </motion.div>
            );
          })}
        </div>

        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList className="glass-liquid rounded-2xl p-1.5 neon-border-teal">
            <TabsTrigger value="restaurants" className="rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">Restaurants</TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">Users</TabsTrigger>
            <TabsTrigger value="promos" className="rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">Promo Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-liquid neon-border-teal overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search restaurants..." className="pl-10 rounded-xl glass-deep border-white/10 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="table-header-purple text-muted-foreground">
                      <th className="p-4 text-left font-heading font-semibold">Restaurant</th>
                      <th className="p-4 text-left font-heading font-semibold">Status</th>
                      <th className="p-4 text-left font-heading font-semibold">Orders</th>
                      <th className="p-4 text-left font-heading font-semibold">Revenue</th>
                      <th className="p-4 text-left font-heading font-semibold">Rating</th>
                      <th className="p-4 text-left font-heading font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRestaurants.map(r => (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="p-4 font-heading font-semibold text-foreground">{r.name}</td>
                        <td className="p-4">
                          <Badge className={`rounded-full ${r.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-accent/20 text-accent border-accent/30'}`}>{r.status}</Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{r.orders.toLocaleString()}</td>
                        <td className="p-4 font-heading font-semibold text-foreground">{r.revenue}</td>
                        <td className="p-4">{r.rating > 0 ? <span className="text-accent font-bold">{r.rating}</span> : <span className="text-muted-foreground">—</span>}</td>
                        <td className="p-4">
                          {r.status === 'pending' ? (
                            <div className="flex gap-1">
                              <Button size="sm" className="h-7 gap-1 gradient-warm rounded-lg border-0"><Check className="h-3 w-3" /> Approve</Button>
                              <Button size="sm" variant="ghost" className="h-7 text-destructive rounded-lg"><X className="h-3 w-3" /></Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost" className="h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10">Manage</Button>
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
<<<<<<< HEAD
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
=======
            </motion.div>
          </TabsContent>

          <TabsContent value="users">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-liquid neon-border-teal overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="table-header-purple text-muted-foreground">
                    <th className="p-4 text-left font-heading font-semibold">Name</th>
                    <th className="p-4 text-left font-heading font-semibold">Email</th>
                    <th className="p-4 text-left font-heading font-semibold">Role</th>
                    <th className="p-4 text-left font-heading font-semibold">Orders</th>
                    <th className="p-4 text-left font-heading font-semibold">Joined</th>
                    <th className="p-4 text-left font-heading font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(u => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="p-4 font-heading font-semibold text-foreground">{u.name}</td>
                      <td className="p-4 text-muted-foreground">{u.email}</td>
                      <td className="p-4"><Badge className="rounded-full bg-primary/20 text-primary border-primary/30">{u.role}</Badge></td>
                      <td className="p-4 text-muted-foreground">{u.orders}</td>
                      <td className="p-4 text-muted-foreground">{u.joined}</td>
                      <td className="p-4"><Button size="sm" variant="ghost" className="h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10">View</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </TabsContent>

          <TabsContent value="promos">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-liquid neon-border-teal overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-heading font-bold text-foreground">Promo Codes</h3>
                <Button size="sm" className="gap-1 gradient-warm rounded-xl neon-glow-primary border-0"><Plus className="h-3.5 w-3.5" /> Create Code</Button>
              </div>
              <div className="divide-y divide-white/5">
                {promoCodes.map(promo => (
                  <motion.div key={promo.code} whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} className="flex items-center justify-between p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Tag className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-foreground">{promo.code}</p>
                        <p className="text-sm text-muted-foreground">{promo.discount} • Expires {promo.expires}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{promo.usage}</span>
                      <Badge className={`rounded-full ${promo.status === 'active' ? 'bg-success/20 text-success border-success/30' : 'bg-white/10 text-muted-foreground border-white/10'}`}>{promo.status}</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </PageWrapper>
);
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55

export default Admin;
