import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mockData';
import { Package, RotateCcw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const statusColors: Record<string, string> = {
  confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  preparing: 'bg-accent/10 text-accent border-accent/20',
  picked_up: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  picked_up: 'On the Way',
  delivered: 'Delivered',
};

const Orders = () => (
  <PageWrapper>
    <div className="container py-8 max-w-3xl">
      <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8 text-foreground">Order History</motion.h1>

      <div className="space-y-4">
        {mockOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
            className="rounded-[22px] glass-ios-card p-6 transition-all hover:bg-white/5 specular-shimmer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-heading font-bold text-foreground">{order.restaurantName}</p>
                <p className="text-sm text-muted-foreground">Order {order.id} • {new Date(order.placedAt).toLocaleDateString()}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}>
                {statusLabels[order.status]}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <p className="font-heading font-bold text-lg text-gradient">${order.total.toFixed(2)}</p>
              <div className="flex gap-2">
                {order.status !== 'delivered' && (
                  <Button size="sm" variant="outline" className="gap-1 rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10 transition-all" asChild>
                    <Link to={`/tracking/${order.id}`}><Eye className="h-3.5 w-3.5" /> Track</Link>
                  </Button>
                )}
                <Button size="sm" variant="outline" className="gap-1 rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10 transition-all">
                  <RotateCcw className="h-3.5 w-3.5" /> Reorder
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
          <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-3xl glass-liquid neon-border-teal mb-4">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-xl font-heading font-bold text-foreground">No orders yet</p>
          <p className="text-muted-foreground mt-1">Your order history will appear here</p>
          <Button className="mt-4 gradient-warm rounded-xl neon-glow-primary" asChild><Link to="/">Browse Restaurants</Link></Button>
        </motion.div>
      )}
    </div>
  </PageWrapper>
);

export default Orders;
