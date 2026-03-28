import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, ShoppingBag, DollarSign, Search, Check, X, Tag, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const platformStats = [
  { label: 'Total Orders', value: '12,847', icon: ShoppingBag, change: '+23%' },
  { label: 'Revenue', value: '$284,930', icon: DollarSign, change: '+18%' },
  { label: 'Active Users', value: '3,421', icon: Users, change: '+12%' },
  { label: 'Restaurants', value: '156', icon: Store, change: '+8' },
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
    <div className="container py-8">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8">Admin Panel</motion.h1>

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
              className="rounded-2xl glass-card neon-border p-5 shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-heading font-extrabold">{stat.value}</p>
              <p className="text-xs text-success mt-1 font-semibold">{stat.change} this month</p>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="restaurants" className="space-y-6">
        <TabsList className="glass-card rounded-2xl p-1">
          <TabsTrigger value="restaurants" className="rounded-xl">Restaurants</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl">Users</TabsTrigger>
          <TabsTrigger value="promos" className="rounded-xl">Promo Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card neon-border shadow-card-hover overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search restaurants..." className="pl-10 rounded-xl glass-card border-border/50 focus:neon-border" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border/30 text-left text-muted-foreground">
                  <th className="p-4 font-heading font-semibold">Restaurant</th>
                  <th className="p-4 font-heading font-semibold">Status</th>
                  <th className="p-4 font-heading font-semibold">Orders</th>
                  <th className="p-4 font-heading font-semibold">Revenue</th>
                  <th className="p-4 font-heading font-semibold">Rating</th>
                  <th className="p-4 font-heading font-semibold">Actions</th>
                </tr></thead>
                <tbody>
                  {mockRestaurants.map(r => (
                    <tr key={r.id} className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-heading font-semibold">{r.name}</td>
                      <td className="p-4"><Badge variant={r.status === 'active' ? 'default' : 'secondary'} className={`rounded-full ${r.status === 'active' ? 'gradient-warm border-0' : ''}`}>{r.status}</Badge></td>
                      <td className="p-4">{r.orders.toLocaleString()}</td>
                      <td className="p-4 font-heading font-semibold">{r.revenue}</td>
                      <td className="p-4">{r.rating > 0 ? <span className="text-accent font-bold">{r.rating}</span> : '—'}</td>
                      <td className="p-4">
                        {r.status === 'pending' ? (
                          <div className="flex gap-1">
                            <Button size="sm" className="h-7 gap-1 gradient-warm rounded-lg"><Check className="h-3 w-3" /> Approve</Button>
                            <Button size="sm" variant="ghost" className="h-7 text-destructive rounded-lg"><X className="h-3 w-3" /></Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" className="h-7 rounded-lg">Manage</Button>
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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card neon-border overflow-x-auto shadow-card-hover">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/30 text-left text-muted-foreground">
                <th className="p-4 font-heading font-semibold">Name</th>
                <th className="p-4 font-heading font-semibold">Email</th>
                <th className="p-4 font-heading font-semibold">Role</th>
                <th className="p-4 font-heading font-semibold">Orders</th>
                <th className="p-4 font-heading font-semibold">Joined</th>
                <th className="p-4 font-heading font-semibold">Actions</th>
              </tr></thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-heading font-semibold">{u.name}</td>
                    <td className="p-4 text-muted-foreground">{u.email}</td>
                    <td className="p-4"><Badge variant="secondary" className="rounded-full">{u.role}</Badge></td>
                    <td className="p-4">{u.orders}</td>
                    <td className="p-4 text-muted-foreground">{u.joined}</td>
                    <td className="p-4"><Button size="sm" variant="ghost" className="h-7 rounded-lg">View</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </TabsContent>

        <TabsContent value="promos">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card neon-border shadow-card-hover overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <h3 className="font-heading font-bold">Promo Codes</h3>
              <Button size="sm" className="gap-1 gradient-warm rounded-xl neon-glow-primary"><Plus className="h-3.5 w-3.5" /> Create Code</Button>
            </div>
            <div className="divide-y divide-border/30">
              {promoCodes.map(promo => (
                <motion.div key={promo.code} whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.3)' }} className="flex items-center justify-between p-4 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Tag className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-mono font-bold">{promo.code}</p>
                      <p className="text-sm text-muted-foreground">{promo.discount} • Expires {promo.expires}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{promo.usage}</span>
                    <Badge variant={promo.status === 'active' ? 'default' : 'secondary'} className={`rounded-full ${promo.status === 'active' ? 'gradient-warm border-0' : ''}`}>{promo.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  </PageWrapper>
);

export default Admin;
