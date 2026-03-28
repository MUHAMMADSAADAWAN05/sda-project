import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Navigation, Check, MapPin, Phone } from 'lucide-react';
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
      <div className="container py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold">Driver Dashboard</motion.h1>
            <p className="text-muted-foreground">Alex Rivera</p>
          </div>
          <Badge variant="outline" className="gap-1 text-success border-success/30 glass-card rounded-full px-4 py-2 neon-glow-success"><span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Online</Badge>
        </div>

        {/* Earnings */}
        <div className="grid gap-4 grid-cols-3 mb-8">
          {[
            { icon: DollarSign, value: `$${earnings.today.toFixed(2)}`, label: 'Today', glow: 'neon-glow-primary' },
            { icon: DollarSign, value: `$${earnings.week.toFixed(2)}`, label: 'This Week', glow: 'neon-glow-accent' },
            { icon: Package, value: earnings.deliveries.toString(), label: 'Deliveries', glow: 'neon-glow-success' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl glass-card neon-border p-4 text-center shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="h-8 w-8 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-heading font-extrabold text-gradient">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Active Delivery */}
        {activeDelivery && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="rounded-2xl glass-card border-2 border-primary/30 p-6 mb-8 space-y-4 neon-glow-primary shadow-card-hover"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg">Active Delivery</h2>
              <Badge className="gradient-warm border-0 rounded-full">{deliveryStatus === 'accepted' ? 'Head to Restaurant' : deliveryStatus === 'picked_up' ? 'Delivering' : 'Complete'}</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-warm neon-glow-primary"><MapPin className="h-4 w-4 text-primary-foreground" /></div>
                <div>
                  <p className="text-sm font-heading font-semibold">Pickup: {activeDelivery.restaurant}</p>
                  <p className="text-sm text-muted-foreground">{activeDelivery.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/20 neon-glow-success"><Navigation className="h-4 w-4 text-success" /></div>
                <div>
                  <p className="text-sm font-heading font-semibold">Dropoff</p>
                  <p className="text-sm text-muted-foreground">{activeDelivery.dropoff}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-border/30 pt-3">
              <span className="text-muted-foreground">{activeDelivery.distance} • {activeDelivery.items} items</span>
              <span className="font-heading font-extrabold text-lg text-gradient">${activeDelivery.payout.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gradient-warm rounded-xl neon-glow-primary" onClick={advanceStatus}>
                {deliveryStatus === 'accepted' ? 'Picked Up' : deliveryStatus === 'picked_up' ? 'Delivered' : 'Complete'}
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl glass-card neon-border"><Phone className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        )}

        {/* Available Orders */}
        <div>
          <h2 className="font-heading font-bold text-lg mb-4">Available Orders</h2>
          <div className="space-y-3">
            {availableOrders.filter(o => o.id !== activeDelivery?.id).map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className="rounded-2xl glass-card neon-border p-5 flex items-center justify-between shadow-card hover:shadow-card-hover transition-all"
              >
                <div>
                  <p className="font-heading font-bold">{order.restaurant}</p>
                  <p className="text-sm text-muted-foreground">{order.distance} • {order.items} items</p>
                  <p className="text-sm text-muted-foreground">{order.pickup} → {order.dropoff}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-heading font-extrabold text-gradient text-lg">${order.payout.toFixed(2)}</p>
                  <Button size="sm" className="gradient-warm rounded-xl neon-glow-primary" onClick={() => acceptOrder(order)} disabled={!!activeDelivery}>Accept</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Driver;
