import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mockData';
import { Package, RotateCcw, Eye } from 'lucide-react';

const statusColors: Record<string, string> = {
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-amber-100 text-amber-700',
  picked_up: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  picked_up: 'On the Way',
  delivered: 'Delivered',
};

const Orders = () => (
  <div className="container py-8 max-w-3xl">
    <h1 className="text-3xl font-heading font-bold mb-8">Order History</h1>

    <div className="space-y-4">
      {mockOrders.map(order => (
        <div key={order.id} className="rounded-xl border bg-card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-heading font-semibold">{order.restaurantName}</p>
              <p className="text-sm text-muted-foreground">Order {order.id} • {new Date(order.placedAt).toLocaleDateString()}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <p className="font-heading font-semibold">${order.total.toFixed(2)}</p>
            <div className="flex gap-2">
              {order.status !== 'delivered' && (
                <Button size="sm" variant="outline" className="gap-1" asChild>
                  <Link to={`/tracking/${order.id}`}><Eye className="h-3.5 w-3.5" /> Track</Link>
                </Button>
              )}
              <Button size="sm" variant="outline" className="gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Reorder
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {mockOrders.length === 0 && (
      <div className="py-20 text-center">
        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-xl font-heading font-semibold">No orders yet</p>
        <p className="text-muted-foreground mt-1">Your order history will appear here</p>
        <Button className="mt-4" asChild><Link to="/">Browse Restaurants</Link></Button>
      </div>
    )}
  </div>
);

export default Orders;
