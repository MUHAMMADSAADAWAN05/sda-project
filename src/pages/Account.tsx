import { User, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { savedAddresses, restaurants } from '@/data/mockData';
import RestaurantCard from '@/components/RestaurantCard';

const Account = () => {
  const favorites = restaurants.slice(0, 3);

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-heading font-bold mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">JD</div>
              <div>
                <h2 className="text-xl font-heading font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>First Name</Label><Input defaultValue="John" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="john.doe@email.com" type="email" /></div>
              <div className="space-y-2"><Label>Phone</Label><Input defaultValue="(555) 123-4567" /></div>
            </div>
            <Button>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="space-y-4">
            {savedAddresses.map(addr => (
              <div key={addr.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{addr.label}</p>
                    <p className="text-sm text-muted-foreground">{addr.street}, {addr.city} {addr.zip}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">+ Add New Address</Button>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
          {favorites.length === 0 && <p className="text-center py-10 text-muted-foreground">No favorites yet</p>}
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h2 className="font-heading font-semibold">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between"><span>Push Notifications</span><Button variant="outline" size="sm">Enabled</Button></div>
              <div className="flex items-center justify-between"><span>Email Notifications</span><Button variant="outline" size="sm">Enabled</Button></div>
              <div className="flex items-center justify-between"><span>SMS Notifications</span><Button variant="outline" size="sm">Disabled</Button></div>
            </div>
            <hr />
            <Button variant="destructive" className="gap-2"><LogOut className="h-4 w-4" /> Sign Out</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
