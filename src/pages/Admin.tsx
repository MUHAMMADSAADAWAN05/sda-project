import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, ShoppingBag, DollarSign, Search, Check, X, Tag, Plus, Shield, RefreshCw, LayoutDashboard, Settings, History, LogOut, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const platformStats = [
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, change: '+23%', color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, change: '+18%', color: 'bg-white/10 text-white' },
  { label: 'Active Users', value: '3,421', icon: Users, change: '+12%', color: 'bg-white/10 text-white' },
  { label: 'Restaurants', value: '156', icon: Store, change: '+8', color: 'bg-white/10 text-white' },
];

const mockRestaurants = [
  { id: '1', name: "Mario's Pizzeria", status: 'active', orders: 2340, revenue: '$34,200', rating: 4.8 },
  { id: '2', name: 'Burger Republic', status: 'active', orders: 1870, revenue: '$28,400', rating: 4.6 },
  { id: '3', name: 'Sakura Sushi', status: 'active', orders: 3120, revenue: '$52,100', rating: 4.9 },
  { id: '4', name: 'New Restaurant', status: 'pending', orders: 0, revenue: '$0', rating: 0 },
];

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

const Admin = () => {
  const [restaurants] = useState(mockRestaurants);

  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px]">
          
          {/* Top App Bar */}
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-heading font-bold text-white">Platform Overview</h2>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {platformStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-xl glass-card border-white/10 p-5 flex items-center gap-4 hover:bg-white/5 transition-all shadow-lg"
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70">{stat.label}</h3>
                    <p className="text-2xl font-bold font-heading text-white">{stat.value}</p>
                    <p className="text-[10px] text-success mt-1 font-bold">{stat.change} ↑</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Tabs defaultValue="restaurants" className="space-y-6">
              <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                <TabsTrigger value="restaurants" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:shadow-lg px-6">Restaurants</TabsTrigger>
                <TabsTrigger value="users" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:shadow-lg px-6">Users</TabsTrigger>
                <TabsTrigger value="promos" className="rounded-xl text-white/70 data-[state=active]:gradient-warm data-[state=active]:text-white data-[state=active]:shadow-lg px-6">Promo Codes</TabsTrigger>
              </TabsList>

              <TabsContent value="restaurants">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                    <div className="relative max-w-sm flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <Input placeholder="Search restaurants..." className="pl-10 rounded-xl glass-deep border-white/10 text-white placeholder:text-white/20" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-white/5 text-white/50">
                        <tr>
                          <th className="p-4 text-left font-heading font-semibold">Restaurant</th>
                          <th className="p-4 text-left font-heading font-semibold">Status</th>
                          <th className="p-4 text-left font-heading font-semibold">Orders</th>
                          <th className="p-4 text-left font-heading font-semibold">Revenue</th>
                          <th className="p-4 text-left font-heading font-semibold">Rating</th>
                          <th className="p-4 text-left font-heading font-semibold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restaurants.map(r => (
                          <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-heading font-semibold text-white">{r.name}</td>
                            <td className="p-4">
                              <Badge className={`rounded-full border-0 px-3 py-1 ${r.status === 'active' ? 'bg-success/20 text-success' : 'bg-orange-500/20 text-orange-400'}`}>
                                {r.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-white/70">{r.orders.toLocaleString()}</td>
                            <td className="p-4 font-heading font-semibold text-white">{r.revenue}</td>
                            <td className="p-4">{r.rating > 0 ? <span className="text-primary font-bold">{r.rating} ⭐</span> : <span className="text-white/30">—</span>}</td>
                            <td className="p-4 text-center">
                              {r.status === 'pending' ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Button size="sm" className="h-8 px-3 gradient-warm rounded-lg border-0 text-white font-bold">Approve</Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white/50 hover:text-white rounded-lg"><X className="h-4 w-4" /></Button>
                                </div>
                              ) : (
                                <Button size="sm" variant="ghost" className="h-8 px-4 rounded-lg text-white/50 hover:text-white hover:bg-white/10 uppercase font-black tracking-widest text-[10px]">Manage</Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="users">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-white/5 text-white/50">
                        <tr>
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
                          <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 font-heading font-semibold text-white">{u.name}</td>
                            <td className="p-4 text-white/60">{u.email}</td>
                            <td className="p-4"><Badge className="rounded-full bg-white/10 text-white/70 border-white/20 capitalize px-3">{u.role}</Badge></td>
                            <td className="p-4 text-white/60">{u.orders}</td>
                            <td className="p-4 text-white/60">{u.joined}</td>
                            <td className="p-4"><Button size="sm" variant="ghost" className="h-8 px-4 rounded-lg text-white/50 hover:text-white hover:bg-white/10">View Profile</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="promos">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Promo Codes</h3>
                      <p className="text-white/40 text-xs mt-1">Manage platform-wide discounts and coupons</p>
                    </div>
                    <Button size="sm" className="gap-1 gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold h-10 px-6">
                      <Plus className="h-4 w-4" /> Create Code
                    </Button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {promoCodes.map(promo => (
                      <motion.div 
                        key={promo.code} 
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} 
                        className="flex items-center justify-between p-6 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center neon-glow-primary">
                            <Tag className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-mono font-bold text-white tracking-widest">{promo.code}</p>
                            <p className="text-xs text-white/50">{promo.discount} • Expires {promo.expires}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-white/30 uppercase font-bold tracking-tight">Usage</p>
                            <span className="text-sm text-white/70 font-semibold">{promo.usage}</span>
                          </div>
                          <Badge className={`rounded-full border-0 px-4 py-1 ${promo.status === 'active' ? 'bg-success/20 text-success' : 'bg-white/10 text-white/30'}`}>
                            {promo.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Admin;
