import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Store, ShoppingBag, DollarSign, Check, X, Shield, RefreshCw, LayoutDashboard, Settings, History, LogOut, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const platformStats = [
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, color: 'bg-[hsl(25,95%,53%)]/20 text-[hsl(25,95%,53%)]' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, color: 'bg-white/10 text-white' },
  { label: 'Active Users', value: '3,421', icon: Users, color: 'bg-white/10 text-white' },
  { label: 'Restaurants', value: '156', icon: Store, color: 'bg-white/10 text-white' },
];

const mockRestaurants = [
  { id: '1', name: "Mario's Pizzeria", status: 'active', orders: 2340, revenue: '$34,200', rating: 4.8 },
  { id: '2', name: 'Burger Republic', status: 'active', orders: 1870, revenue: '$28,400', rating: 4.6 },
  { id: '3', name: 'Sakura Sushi', status: 'active', orders: 3120, revenue: '$52,100', rating: 4.9 },
  { id: '4', name: 'New Restaurant', status: 'pending', orders: 0, revenue: '$0', rating: 0 },
];

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
                          )}
                        </td>
                      </tr>
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

export default Admin;
