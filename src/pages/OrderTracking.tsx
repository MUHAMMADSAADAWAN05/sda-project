import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChefHat, Truck, Home, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrders } from '@/data/mockData';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/lib/animations';

const steps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check, description: 'Your order has been received' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, description: 'The restaurant is making your food' },
  { key: 'picked_up', label: 'On the Way', icon: Truck, description: 'Your driver is heading to you' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockOrders[0];
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageWrapper>
      <div className="container py-8 max-w-3xl">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-heading font-extrabold mb-2">
          Order #{orderId || 'ORD-001'}
        </motion.h1>
        <p className="text-muted-foreground mb-8">Estimated delivery: <span className="font-semibold text-primary">{order.estimatedDelivery}</span></p>

        {/* Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-card p-6 mb-8 shadow-card">
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
            <motion.div
              className="absolute left-5 top-5 w-0.5 gradient-warm rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
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
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isComplete ? 'border-transparent gradient-warm text-primary-foreground shadow-glow' : 'border-border bg-card text-muted-foreground'
                      }`}
                    >
                      <StepIcon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className={`font-semibold ${isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
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
          className="rounded-2xl border bg-muted/50 h-48 flex items-center justify-center mb-8 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="text-center relative z-10">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-primary animate-float" />
            <p className="font-heading font-bold">Live Map Tracking</p>
            <p className="text-sm text-muted-foreground">Map integration coming soon</p>
          </div>
        </motion.div>

        {/* Driver info */}
        {order.driver && currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-primary/20 bg-card p-6 mb-8 shadow-card"
          >
            <h2 className="font-heading font-bold mb-4">Your Driver</h2>
            <div className="flex items-center gap-4">
              <img src={order.driver.photo} alt={order.driver.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20" />
              <div className="flex-1">
                <p className="font-semibold">{order.driver.name}</p>
                <p className="text-sm text-muted-foreground">{order.driver.vehicle}</p>
              </div>
              <Button variant="outline" size="icon" className="rounded-full"><Phone className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        )}

        {/* Order details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="font-heading font-bold mb-3">Order Details</h2>
          <p className="text-sm font-semibold text-primary mb-3">{order.restaurantName}</p>
          <div className="space-y-2 text-sm border-t pt-3">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium">${order.deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-medium">${order.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-heading font-bold text-lg border-t pt-2"><span>Total</span><span className="text-gradient">${order.total.toFixed(2)}</span></div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="rounded-xl" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderTracking;
