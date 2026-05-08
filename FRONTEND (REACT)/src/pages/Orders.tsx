import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, RotateCcw, Eye, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { useState, useEffect } from 'react';
import { fetchOrders } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const statusColors: Record<string, string> = {
  PLACED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  PREPARING: 'bg-accent/10 text-accent border-accent/20',
  DELIVERED: 'bg-success/10 text-success border-success/20',
};

const statusLabels: Record<string, string> = {
  PLACED: 'Confirmed',
  PREPARING: 'Preparing',
  DELIVERED: 'Delivered',
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        // If the API returns all orders, filter for the current user if needed
        // For now, the backend /api/orders returns all orders
        setOrders(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <PageWrapper>
      <div className="container py-8 max-w-3xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8 text-foreground">Order History</motion.h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium">Error loading orders: {error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className="rounded-2xl glass-ultra p-6 transition-all hover:bg-white/5 liquid-shimmer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-heading font-bold text-foreground">{order.restaurantName || 'Order'}</p>
                    <p className="text-sm text-muted-foreground">Order #{order.id} • {new Date(order.createdAt || order.placedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-muted text-muted-foreground'}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <p className="font-heading font-bold text-lg text-gradient">${(order.totalAmount || order.total || 0).toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1 rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10 transition-all" asChild>
                      <Link to={`/tracking/${order.id}`}><Eye className="h-3.5 w-3.5" /> Track</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10 transition-all">
                      <RotateCcw className="h-3.5 w-3.5" /> Reorder
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {orders.length === 0 && (
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
        )}
      </div>
    </PageWrapper>
  );
};

export default Orders;
