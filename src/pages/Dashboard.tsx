import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { DollarSign, ShoppingBag, Star, Clock, Check, X, ChefHat, Edit, Trash2, Plus } from 'lucide-react';

const stats = [
  { label: "Today's Orders", value: '47', icon: ShoppingBag, change: '+12%' },
  { label: "Today's Revenue", value: '$1,284', icon: DollarSign, change: '+8%' },
  { label: 'Avg Rating', value: '4.8', icon: Star, change: '+0.1' },
  { label: 'Avg Prep Time', value: '18 min', icon: Clock, change: '-2 min' },
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
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Restaurant Dashboard</h1>
          <p className="text-muted-foreground">Mario's Authentic Pizzeria</p>
        </div>
        <Badge variant="outline" className="gap-1 text-success border-success"><span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Open</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-heading font-bold">{stat.value}</p>
              <p className="text-xs text-success mt-1">{stat.change} from yesterday</p>
            </div>
          );
        })}
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders" className="gap-2">Orders <Badge className="h-5 text-[10px]">{orders.length}</Badge></TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Incoming */}
            <div>
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse-dot" /> Incoming ({ordersByStatus('incoming').length})
              </h3>
              <div className="space-y-3">
                {ordersByStatus('incoming').map(order => (
                  <div key={order.id} className="rounded-xl border bg-card p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{order.id}</span>
                      <span className="text-muted-foreground">{order.time}</span>
                    </div>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="font-heading font-semibold">${order.total.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-1" onClick={() => updateOrderStatus(order.id, 'preparing')}><Check className="h-3.5 w-3.5" /> Accept</Button>
                      <Button size="sm" variant="destructive" className="gap-1" onClick={() => updateOrderStatus(order.id, 'rejected')}><X className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                {ordersByStatus('incoming').length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No incoming orders</p>}
              </div>
            </div>

            {/* Preparing */}
            <div>
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Preparing ({ordersByStatus('preparing').length})
              </h3>
              <div className="space-y-3">
                {ordersByStatus('preparing').map(order => (
                  <div key={order.id} className="rounded-xl border bg-card p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{order.id}</span>
                      <span className="text-muted-foreground">{order.time}</span>
                    </div>
                    <p className="text-sm">{order.customer} — {order.items}</p>
                    <p className="font-heading font-semibold">${order.total.toFixed(2)}</p>
                    <Button size="sm" className="w-full gap-1" variant="outline" onClick={() => updateOrderStatus(order.id, 'ready')}>
                      <ChefHat className="h-3.5 w-3.5" /> Mark Ready
                    </Button>
                  </div>
                ))}
                {ordersByStatus('preparing').length === 0 && <p className="text-sm text-muted-foreground text-center py-8">None preparing</p>}
              </div>
            </div>

            {/* Ready */}
            <div>
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Ready ({ordersByStatus('ready').length})
              </h3>
              <div className="space-y-3">
                {ordersByStatus('ready').map(order => (
                  <div key={order.id} className="rounded-xl border bg-card p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{order.id}</span>
                      <span className="text-muted-foreground">{order.time}</span>
                    </div>
                    <p className="text-sm">{order.customer} — {order.items}</p>
                    <p className="font-heading font-semibold">${order.total.toFixed(2)}</p>
                    <Badge variant="secondary" className="w-full justify-center">Waiting for pickup</Badge>
                  </div>
                ))}
                {ordersByStatus('ready').length === 0 && <p className="text-sm text-muted-foreground text-center py-8">None ready</p>}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="menu">
          <div className="rounded-xl border bg-card">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-heading font-semibold">Menu Items</h3>
              <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" /> Add Item</Button>
            </div>
            <div className="divide-y">
              {menu.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} • {item.orders} orders</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-xl border bg-card p-6 space-y-6 max-w-2xl">
            <h3 className="font-heading font-semibold">Business Profile</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><label className="text-sm font-medium">Restaurant Name</label><Input defaultValue="Mario's Authentic Pizzeria" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Cuisine Type</label><Input defaultValue="Pizza, Italian" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Phone</label><Input defaultValue="(555) 987-6543" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Delivery Radius</label><Input defaultValue="5 miles" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-sm font-medium">Address</label><Input defaultValue="123 Main St, Springfield" /></div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
