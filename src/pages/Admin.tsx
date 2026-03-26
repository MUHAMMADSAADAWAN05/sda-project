import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Store, ShoppingBag, DollarSign, Search, Check, X, Tag, Plus } from 'lucide-react';

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
  <div className="container py-8">
    <h1 className="text-3xl font-heading font-bold mb-8">Admin Panel</h1>

    {/* Stats */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {platformStats.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-heading font-bold">{stat.value}</p>
            <p className="text-xs text-success mt-1">{stat.change} this month</p>
          </div>
        );
      })}
    </div>

    <Tabs defaultValue="restaurants" className="space-y-6">
      <TabsList>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="promos">Promo Codes</TabsTrigger>
      </TabsList>

      <TabsContent value="restaurants">
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search restaurants..." className="pl-10" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-muted-foreground">
                <th className="p-4 font-medium">Restaurant</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Orders</th>
                <th className="p-4 font-medium">Revenue</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {mockRestaurants.map(r => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="p-4 font-medium">{r.name}</td>
                    <td className="p-4"><Badge variant={r.status === 'active' ? 'default' : 'secondary'}>{r.status}</Badge></td>
                    <td className="p-4">{r.orders.toLocaleString()}</td>
                    <td className="p-4">{r.revenue}</td>
                    <td className="p-4">{r.rating > 0 ? r.rating : '—'}</td>
                    <td className="p-4">
                      {r.status === 'pending' ? (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7 gap-1"><Check className="h-3 w-3" /> Approve</Button>
                          <Button size="sm" variant="ghost" className="h-7 text-destructive"><X className="h-3 w-3" /></Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" className="h-7">Manage</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="users">
        <div className="rounded-xl border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Actions</th>
            </tr></thead>
            <tbody>
              {mockUsers.map(u => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4 text-muted-foreground">{u.email}</td>
                  <td className="p-4"><Badge variant="secondary">{u.role}</Badge></td>
                  <td className="p-4">{u.orders}</td>
                  <td className="p-4 text-muted-foreground">{u.joined}</td>
                  <td className="p-4"><Button size="sm" variant="ghost" className="h-7">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="promos">
        <div className="rounded-xl border bg-card">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-heading font-semibold">Promo Codes</h3>
            <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" /> Create Code</Button>
          </div>
          <div className="divide-y">
            {promoCodes.map(promo => (
              <div key={promo.code} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-mono font-medium">{promo.code}</p>
                    <p className="text-sm text-muted-foreground">{promo.discount} • Expires {promo.expires}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{promo.usage}</span>
                  <Badge variant={promo.status === 'active' ? 'default' : 'secondary'}>{promo.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

export default Admin;
