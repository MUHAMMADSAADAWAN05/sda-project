import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { DollarSign, ShoppingBag, Star, Clock, Check, X, ChefHat, Edit, Trash2, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const stats = [
  { label: "Today's Orders", value: '47', icon: ShoppingBag, change: '+12%', color: 'from-primary to-accent' },
  { label: "Today's Revenue", value: '$1,284', icon: DollarSign, change: '+8%', color: 'from-accent to-[hsl(45,90%,55%)]' },
  { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.1', color: 'from-[hsl(280,60%,55%)] to-primary' },
  { label: 'Avg Prep Time', value: '18 min', icon: Clock, change: '-2 min', color: 'from-success to-[hsl(180,60%,45%)]' },
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
      <div className="min-h-screen">
        <div className="container py-8">
          {/* Header bar - Parkify style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-liquid neon-border-teal p-5 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-foreground">CRAVIX RESTAURANT</h1>
                <p className="text-muted-foreground text-sm">Mario's Authentic Pizzeria</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10">
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
              <Badge variant="outline" className="gap-1 text-success border-success/30 rounded-full px-4 py-2 bg-success/10">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Open
              </Badge>
            </div>
          </motion.div>

          {/* Stats - Parkify style with icon circles */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, i) => {
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
                  <p className="text-xs text-success mt-2 font-semibold">{stat.change} from yesterday</p>
                </motion.div>
              );
            })}
          </div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="glass-liquid rounded-2xl p-1.5 neon-border-teal">
              <TabsTrigger value="orders" className="gap-2 rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">
                Orders <Badge className="h-5 text-[10px] gradient-warm border-0">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="menu" className="rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">Menu</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl text-foreground data-[state=active]:gradient-warm data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  { status: 'incoming', label: 'Incoming', dotColor: 'bg-accent', animate: true },
                  { status: 'preparing', label: 'Preparing', dotColor: 'bg-primary', animate: false },
                  { status: 'ready', label: 'Ready', dotColor: 'bg-success', animate: false },
                ].map(col => (
                  <div key={col.status}>
                    <h3 className="font-heading font-bold mb-3 flex items-center gap-2 text-foreground">
                      <span className={`h-2 w-2 rounded-full ${col.dotColor} ${col.animate ? 'animate-pulse-dot' : ''}`} /> {col.label} ({ordersByStatus(col.status).length})
                    </h3>
                    <div className="space-y-3">
                      {ordersByStatus(col.status).map(order => (
                        <motion.div key={order.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -2 }}
                          className="rounded-2xl glass-liquid neon-border-teal p-4 space-y-3 transition-all hover:bg-white/5"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="font-heading font-semibold text-foreground">{order.id}</span>
                            <span className="text-muted-foreground">{order.time}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground/80">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.items}</p>
                          <p className="font-heading font-bold text-gradient">${order.total.toFixed(2)}</p>
                          {col.status === 'incoming' && (
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 gap-1 gradient-warm rounded-xl neon-glow-primary border-0" onClick={() => updateOrderStatus(order.id, 'preparing')}><Check className="h-3.5 w-3.5" /> Accept</Button>
                              <Button size="sm" variant="destructive" className="gap-1 rounded-xl" onClick={() => updateOrderStatus(order.id, 'rejected')}><X className="h-3.5 w-3.5" /></Button>
                            </div>
                          )}
                          {col.status === 'preparing' && (
                            <Button size="sm" className="w-full gap-1 rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10" variant="outline" onClick={() => updateOrderStatus(order.id, 'ready')}>
                              <ChefHat className="h-3.5 w-3.5" /> Mark Ready
                            </Button>
                          )}
                          {col.status === 'ready' && (
                            <Badge variant="secondary" className="w-full justify-center rounded-xl glass-deep text-muted-foreground">Waiting for pickup</Badge>
                          )}
                        </motion.div>
                      ))}
                      {ordersByStatus(col.status).length === 0 && <p className="text-sm text-muted-foreground text-center py-8 glass-liquid rounded-2xl neon-border-teal">No {col.label.toLowerCase()} orders</p>}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="menu">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-liquid neon-border-teal overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="font-heading font-bold text-foreground">Menu Items</h3>
                  <Button size="sm" className="gap-1 gradient-warm rounded-xl neon-glow-primary border-0"><Plus className="h-3.5 w-3.5" /> Add Item</Button>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-heading font-semibold text-muted-foreground table-header-purple">
                  <span>Item Name</span><span>Price</span><span>Orders</span><span className="text-right">Actions</span>
                </div>
                <div className="divide-y divide-white/5">
                  {menu.map(item => (
                    <motion.div key={item.id} whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }} className="grid grid-cols-4 gap-4 items-center p-4 transition-colors">
                      <p className="font-heading font-semibold text-foreground">{item.name}</p>
                      <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                      <p className="text-muted-foreground">{item.orders}</p>
                      <div className="flex items-center gap-3 justify-end">
                        <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10"><Edit className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/20"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="settings">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-liquid neon-border-teal p-6 space-y-6 max-w-2xl">
                <h3 className="font-heading font-bold text-foreground">Business Profile</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Restaurant Name', value: "Mario's Authentic Pizzeria" },
                    { label: 'Cuisine Type', value: 'Pizza, Italian' },
                    { label: 'Phone', value: '(555) 987-6543' },
                    { label: 'Delivery Radius', value: '5 miles' },
                  ].map(field => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-sm font-heading font-semibold text-muted-foreground">{field.label}</label>
                      <Input defaultValue={field.value} className="rounded-xl glass-deep border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50" />
                    </div>
                  ))}
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-heading font-semibold text-muted-foreground">Address</label>
                    <Input defaultValue="123 Main St, Springfield" className="rounded-xl glass-deep border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50" />
                  </div>
                </div>
                <Button className="gradient-warm rounded-xl neon-glow-primary border-0">Save Changes</Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
