import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChefHat, Truck, Home, Phone, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { fetchOrders } from '@/lib/api';

const steps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check, description: 'Your order has been received' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, description: 'The restaurant is making your food' },
  { key: 'picked_up', label: 'On the Way', icon: Truck, description: 'Your driver is heading to you' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orders = await fetchOrders() as any[];
        const found = orders.find(o => String(o.id) === String(orderId));
        setOrder(found);
      } catch (err) {
        console.error('Failed to load order:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();

    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(timer);
  }, [orderId]);

  if (loading) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-white/60">Loading tracking information...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-20 text-center">
        <p className="text-xl font-heading font-bold text-white">Order not found</p>
        <Button className="mt-4 gradient-warm rounded-xl neon-glow-primary" onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="container py-8 max-w-3xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-heading font-extrabold mb-2 text-white">
          Order #{orderId || order.id}
        </motion.h1>
        <p className="text-white/60 mb-8">Estimated delivery: <span className="font-bold text-gradient">{order.estimatedDelivery || '30-45 mins'}</span></p>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-frost p-6 mb-8 liquid-shimmer">
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/10" />
            <motion.div
              className="absolute left-5 top-5 w-0.5 gradient-warm rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 12px hsl(var(--primary) / 0.5)' }}
            />
            <div className="space-y-8">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isComplete = i <= currentStep;
                const isCurrent = i === currentStep;
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4 relative"
                  >
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                      transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${
                        isComplete ? 'border-transparent gradient-warm text-primary-foreground neon-glow-primary' : 'border-white/10 glass-deep text-white/40'
                      }`}
                    >
                      <StepIcon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className={`font-heading font-semibold ${isComplete ? 'text-white' : 'text-white/40'}`}>{step.label}</p>
                      <p className="text-sm text-white/40">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl glass-ultra h-48 flex items-center justify-center mb-8 overflow-hidden relative liquid-shimmer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="text-center relative z-10 text-white">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-primary animate-float" />
            <p className="font-heading font-bold">Live Map Tracking</p>
            <p className="text-sm text-white/50">Map integration coming soon</p>
          </div>
        </motion.div>

        {/* Driver info */}
        {order.driver && currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-liquid neon-border p-6 mb-8 neon-glow-primary"
          >
            <h2 className="font-heading font-bold mb-4 text-white">Your Driver</h2>
            <div className="flex items-center gap-4">
              <img src={order.driver.photo} alt={order.driver.name} className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary/30" />
              <div className="flex-1">
                <p className="font-heading font-bold text-white">{order.driver.name}</p>
                <p className="text-sm text-white/50">{order.driver.vehicle}</p>
              </div>
              <Button variant="outline" size="icon" className="rounded-xl glass-deep border-white/10 text-white hover:bg-white/10"><Phone className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        )}

        {/* Order details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl glass-liquid neon-border-teal p-6">
          <h2 className="font-heading font-bold mb-3 text-white">Order Details</h2>
          <p className="text-sm font-semibold text-primary mb-3">{order.restaurantName || 'CraviX Order'}</p>
          <div className="space-y-2 text-sm border-t border-white/10 pt-3">
            <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span className="font-medium text-white">${(order.subtotal || (order.totalAmount * 0.8)).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Delivery</span><span className="font-medium text-white">${(order.deliveryFee || 2.99).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Tax</span><span className="font-medium text-white">${(order.tax || (order.totalAmount * 0.1)).toFixed(2)}</span></div>
            <div className="flex justify-between font-heading font-extrabold text-lg border-t border-white/10 pt-2 text-white"><span>Total</span><span className="text-gradient">${(order.totalAmount || order.total).toFixed(2)}</span></div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="rounded-xl glass-deep border-white/10 text-white hover:bg-white/10" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderTracking;
