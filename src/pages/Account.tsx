import { User, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { savedAddresses, restaurants } from '@/data/mockData';
import RestaurantCard from '@/components/RestaurantCard';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const Account = () => {
  const favorites = restaurants.slice(0, 3);

  return (
    <PageWrapper>
      <div className="container py-8 max-w-4xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8">My Account</motion.h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md glass-card rounded-2xl p-1">
            <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
            <TabsTrigger value="addresses" className="rounded-xl">Addresses</TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-xl">Favorites</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card neon-border p-6 space-y-6 shadow-card-hover">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-warm neon-glow-primary text-2xl font-bold text-primary-foreground">JD</div>
                <div>
                  <h2 className="text-xl font-heading font-bold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                  <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label className="font-heading font-semibold">First Name</Label><Input defaultValue="John" className="rounded-xl glass-card border-border/50 focus:neon-border" /></div>
                <div className="space-y-2"><Label className="font-heading font-semibold">Last Name</Label><Input defaultValue="Doe" className="rounded-xl glass-card border-border/50 focus:neon-border" /></div>
                <div className="space-y-2"><Label className="font-heading font-semibold">Email</Label><Input defaultValue="john.doe@email.com" type="email" className="rounded-xl glass-card border-border/50 focus:neon-border" /></div>
                <div className="space-y-2"><Label className="font-heading font-semibold">Phone</Label><Input defaultValue="(555) 123-4567" className="rounded-xl glass-card border-border/50 focus:neon-border" /></div>
              </div>
              <Button className="gradient-warm rounded-xl neon-glow-primary">Save Changes</Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="space-y-4">
              {savedAddresses.map((addr, i) => (
                <motion.div key={addr.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between rounded-2xl glass-card neon-border p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 neon-glow-primary">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold">{addr.label}</p>
                      <p className="text-sm text-muted-foreground">{addr.street}, {addr.city} {addr.zip}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="rounded-xl">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive rounded-xl">Remove</Button>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full rounded-xl glass-card neon-border">+ Add New Address</Button>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
            {favorites.length === 0 && <p className="text-center py-10 text-muted-foreground">No favorites yet</p>}
          </TabsContent>

          <TabsContent value="settings">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-card neon-border p-6 space-y-6 shadow-card-hover">
              <h2 className="font-heading font-bold">Preferences</h2>
              <div className="space-y-4">
                {['Push Notifications', 'Email Notifications', 'SMS Notifications'].map((item, i) => (
                  <div key={item} className="flex items-center justify-between rounded-xl glass-card border border-border/30 p-3">
                    <span className="font-medium">{item}</span>
                    <Button variant="outline" size="sm" className="rounded-xl">{i < 2 ? 'Enabled' : 'Disabled'}</Button>
                  </div>
                ))}
              </div>
              <hr className="border-border/30" />
              <Button variant="destructive" className="gap-2 rounded-xl"><LogOut className="h-4 w-4" /> Sign Out</Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
};

export default Account;
