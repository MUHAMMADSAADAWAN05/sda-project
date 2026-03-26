import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Navigation, Check, MapPin, Phone } from 'lucide-react';

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
    <div className="container py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground">Alex Rivera</p>
        </div>
        <Badge variant="outline" className="gap-1 text-success border-success"><span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Online</Badge>
      </div>

      {/* Earnings */}
      <div className="grid gap-4 grid-cols-3 mb-8">
        <div className="rounded-xl border bg-card p-4 text-center">
          <DollarSign className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-2xl font-heading font-bold">${earnings.today.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <DollarSign className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-2xl font-heading font-bold">${earnings.week.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">This Week</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Package className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-2xl font-heading font-bold">{earnings.deliveries}</p>
          <p className="text-xs text-muted-foreground">Deliveries</p>
        </div>
      </div>

      {/* Active Delivery */}
      {activeDelivery && (
        <div className="rounded-xl border-2 border-primary bg-card p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg">Active Delivery</h2>
            <Badge>{deliveryStatus === 'accepted' ? 'Head to Restaurant' : deliveryStatus === 'picked_up' ? 'Delivering' : 'Complete'}</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10"><MapPin className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">Pickup: {activeDelivery.restaurant}</p>
                <p className="text-sm text-muted-foreground">{activeDelivery.pickup}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10"><Navigation className="h-4 w-4 text-success" /></div>
              <div>
                <p className="text-sm font-medium">Dropoff</p>
                <p className="text-sm text-muted-foreground">{activeDelivery.dropoff}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm border-t pt-3">
            <span className="text-muted-foreground">{activeDelivery.distance} • {activeDelivery.items} items</span>
            <span className="font-heading font-bold text-lg text-primary">${activeDelivery.payout.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={advanceStatus}>
              {deliveryStatus === 'accepted' ? 'Picked Up' : deliveryStatus === 'picked_up' ? 'Delivered' : 'Complete'}
            </Button>
            <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Available Orders */}
      <div>
        <h2 className="font-heading font-semibold text-lg mb-4">Available Orders</h2>
        <div className="space-y-3">
          {availableOrders.filter(o => o.id !== activeDelivery?.id).map(order => (
            <div key={order.id} className="rounded-xl border bg-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{order.restaurant}</p>
                <p className="text-sm text-muted-foreground">{order.distance} • {order.items} items</p>
                <p className="text-sm text-muted-foreground">{order.pickup} → {order.dropoff}</p>
              </div>
              <div className="text-right space-y-2">
                <p className="font-heading font-bold text-primary">${order.payout.toFixed(2)}</p>
                <Button size="sm" onClick={() => acceptOrder(order)} disabled={!!activeDelivery}>Accept</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Driver;
