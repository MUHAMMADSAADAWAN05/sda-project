import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Navigation, Check, MapPin, Phone, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const availableOrders = [
  { id: 'ORD-201', restaurant: "Mario's Pizzeria", pickup: '123 Main St', dropoff: '742 Evergreen Terrace', distance: '2.3 mi', payout: 8.50, items: 3 },
  { id: 'ORD-202', restaurant: 'Burger Republic', pickup: '456 Oak Ave', dropoff: '1600 Pennsylvania Ave', distance: '4.1 mi', payout: 12.00, items: 2 },
  { id: 'ORD-203', restaurant: 'Sakura Sushi', pickup: '789 Cherry Ln', dropoff: '221B Baker St', distance: '1.8 mi', payout: 7.25, items: 5 },
];

const Driver = () => {
  const [activeDelivery, setActiveDelivery] = useState<typeof availableOrders[0] | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<'accepted' | 'picked_up' | 'delivering'>('accepted');
  const [earnings] = useState({ today: 67.50, week: 423.75, deliveries: 8 });

  const acceptOrder = (order: typeof availableOrders[0]) => {
    setActiveDelivery(order);
    setDeliveryStatus('accepted');
  };

  const advanceStatus = () => {
    if (deliveryStatus === 'accepted') setDeliveryStatus('picked_up');
    else if (deliveryStatus === 'picked_up') setDeliveryStatus('delivering');
    else { setActiveDelivery(null); setDeliveryStatus('accepted'); }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <div className="container py-8 max-w-3xl">
          {/* Header bar - Parkify style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-liquid neon-border-teal p-5 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-extrabold text-foreground">CRAVIX DRIVER</h1>
                <p className="text-muted-foreground text-sm">Alex Rivera</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10">
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
              <Badge variant="outline" className="gap-1 text-success border-success/30 rounded-full px-4 py-2 bg-success/10">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Online
              </Badge>
            </div>
          </motion.div>

          {/* Earnings - Parkify style stat cards */}
          <div className="grid gap-4 grid-cols-3 mb-8">
            {[
              { icon: DollarSign, value: `$${earnings.today.toFixed(2)}`, label: 'Today', color: 'from-primary to-accent' },
              { icon: DollarSign, value: `$${earnings.week.toFixed(2)}`, label: 'This Week', color: 'from-accent to-[hsl(45,90%,55%)]' },
              { icon: Package, value: earnings.deliveries.toString(), label: 'Deliveries', color: 'from-success to-[hsl(180,60%,45%)]' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass-liquid neon-border-teal p-4 text-center transition-all hover:bg-white/5"
              >
                <div className={`h-10 w-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 shadow-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-2xl font-heading font-extrabold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Delivery */}
          {activeDelivery && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="rounded-2xl glass-liquid neon-border p-6 mb-8 space-y-4 shadow-[0_0_40px_-10px_hsl(25,95%,53%/0.3)]"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg text-foreground">Active Delivery</h2>
                <Badge className="gradient-warm border-0 rounded-full">{deliveryStatus === 'accepted' ? 'Head to Restaurant' : deliveryStatus === 'picked_up' ? 'Delivering' : 'Complete'}</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-warm neon-glow-primary"><MapPin className="h-4 w-4 text-white" /></div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-foreground">Pickup: {activeDelivery.restaurant}</p>
                    <p className="text-sm text-muted-foreground">{activeDelivery.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/20"><Navigation className="h-4 w-4 text-success" /></div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-foreground">Dropoff</p>
                    <p className="text-sm text-muted-foreground">{activeDelivery.dropoff}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-white/10 pt-3">
                <span className="text-muted-foreground">{activeDelivery.distance} • {activeDelivery.items} items</span>
                <span className="font-heading font-extrabold text-lg text-gradient">${activeDelivery.payout.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gradient-warm rounded-xl neon-glow-primary border-0" onClick={advanceStatus}>
                  {deliveryStatus === 'accepted' ? 'Picked Up' : deliveryStatus === 'picked_up' ? 'Delivered' : 'Complete'}
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10"><Phone className="h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {/* Available Orders */}
          <div>
            <h2 className="font-heading font-bold text-lg mb-4 text-foreground">Available Orders</h2>
            <div className="space-y-3">
              {availableOrders.filter(o => o.id !== activeDelivery?.id).map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="rounded-2xl glass-liquid neon-border-teal p-5 flex items-center justify-between transition-all hover:bg-white/5"
                >
                  <div>
                    <p className="font-heading font-bold text-foreground">{order.restaurant}</p>
                    <p className="text-sm text-muted-foreground">{order.distance} • {order.items} items</p>
                    <p className="text-sm text-muted-foreground">{order.pickup} → {order.dropoff}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-heading font-extrabold text-gradient text-lg">${order.payout.toFixed(2)}</p>
                    <Button size="sm" className="gradient-warm rounded-xl neon-glow-primary border-0" onClick={() => acceptOrder(order)} disabled={!!activeDelivery}>Accept</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Driver;
