import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, ShoppingBag, DollarSign, Search, Check, X, Tag, Plus, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const platformStats = [
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, change: '+23%', color: 'from-primary to-accent' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, change: '+18%', color: 'from-accent to-[hsl(45,90%,55%)]' },
  { label: 'Active Users', value: '3,421', icon: Users, change: '+12%', color: 'from-[hsl(280,60%,55%)] to-primary' },
  { label: 'Restaurants', value: '156', icon: Store, change: '+8', color: 'from-success to-[hsl(180,60%,45%)]' },
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

export default Admin;
