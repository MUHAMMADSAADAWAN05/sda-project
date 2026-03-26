import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChefHat, Truck, Home, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrders } from '@/data/mockData';
import { useState, useEffect } from 'react';

const steps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check, description: 'Your order has been received' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, description: 'The restaurant is making your food' },
  { key: 'picked_up', label: 'On the Way', icon: Truck, description: 'Your driver is heading to you' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = mockOrders[0]; // Always use first mock for demo
  const [currentStep, setCurrentStep] = useState(1);

  // Auto-advance steps for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const stepIndex = currentStep;

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-heading font-bold mb-2">Order #{orderId || 'ORD-001'}</h1>
      <p className="text-muted-foreground mb-8">Estimated delivery: {order.estimatedDelivery}</p>

      {/* Progress */}
      <div className="rounded-xl border bg-card p-6 mb-8">
        <div className="relative">
          {/* Line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
          <div className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-1000" style={{ height: `${(stepIndex / (steps.length - 1)) * 100}%` }} />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isComplete = i <= stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <div key={step.key} className="flex items-start gap-4 relative">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isComplete ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground'
                  } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse-dot' : ''}`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`font-medium ${isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="rounded-xl border bg-muted h-48 flex items-center justify-center mb-8">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p className="font-medium">Live Map Tracking</p>
          <p className="text-sm">Map integration coming soon</p>
        </div>
      </div>

      {/* Driver info */}
      {order.driver && stepIndex >= 2 && (
        <div className="rounded-xl border bg-card p-6 mb-8">
          <h2 className="font-heading font-semibold mb-4">Your Driver</h2>
          <div className="flex items-center gap-4">
            <img src={order.driver.photo} alt={order.driver.name} className="h-14 w-14 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-medium">{order.driver.name}</p>
              <p className="text-sm text-muted-foreground">{order.driver.vehicle}</p>
            </div>
            <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
          </div>
        </div>
      )}

      {/* Order details */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-heading font-semibold mb-3">Order Details</h2>
        <p className="text-sm text-muted-foreground mb-3">{order.restaurantName}</p>
        <div className="space-y-2 text-sm border-t pt-3">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${order.deliveryFee.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${order.tax.toFixed(2)}</span></div>
          <div className="flex justify-between font-heading font-semibold text-base border-t pt-2"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};

export default OrderTracking;
