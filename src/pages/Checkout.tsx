import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Tag, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { savedAddresses } from '@/data/mockData';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card1');
  const [isPlacing, setIsPlacing] = useState(false);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) return (
    <div className="container py-20 text-center">
      <p className="text-xl font-heading font-bold">Your cart is empty</p>
      <Button className="mt-4 gradient-warm rounded-xl neon-glow-primary" onClick={() => navigate('/')}>Browse Restaurants</Button>
    </div>
  );

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => { clearCart(); navigate('/tracking/ORD-001'); }, 1500);
  };

  return (
    <PageWrapper>
      <div className="container py-8 max-w-4xl">
        <Button variant="ghost" className="gap-2 mb-6 rounded-xl" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8">Checkout</motion.h1>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Address */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[22px] glass-ios-card p-6 space-y-4 specular-shimmer">
              <h2 className="font-heading font-bold flex items-center gap-2 text-foreground"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><MapPin className="h-4 w-4 text-primary-foreground" /></div> Delivery Address</h2>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {savedAddresses.map(addr => (
                  <div key={addr.id} className="flex items-center gap-3 rounded-xl glass-deep border border-white/10 p-3.5 cursor-pointer hover:neon-border transition-all">
                    <RadioGroupItem value={addr.id} id={addr.id} />
                    <Label htmlFor={addr.id} className="cursor-pointer flex-1">
                      <p className="font-heading font-semibold">{addr.label}</p>
                      <p className="text-sm text-muted-foreground">{addr.street}, {addr.city} {addr.zip}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-[22px] glass-ios-card p-6 space-y-4 specular-shimmer">
              <h2 className="font-heading font-bold flex items-center gap-2 text-foreground"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><CreditCard className="h-4 w-4 text-primary-foreground" /></div> Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {[
                  { id: 'card1', number: '•••• •••• •••• 4242', type: 'Visa • Expires 12/25' },
                  { id: 'card2', number: '•••• •••• •••• 8888', type: 'Mastercard • Expires 06/26' },
                ].map(card => (
                  <div key={card.id} className="flex items-center gap-3 rounded-xl glass-deep border border-white/10 p-3.5 cursor-pointer hover:neon-border transition-all">
                    <RadioGroupItem value={card.id} id={card.id} />
                    <Label htmlFor={card.id} className="cursor-pointer flex-1">
                      <p className="font-heading font-semibold">{card.number}</p>
                      <p className="text-sm text-muted-foreground">{card.type}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            {/* Promo */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl glass-liquid neon-border-teal p-6 space-y-4">
              <h2 className="font-heading font-bold flex items-center gap-2 text-foreground"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><Tag className="h-4 w-4 text-primary-foreground" /></div> Promo Code</h2>
              <div className="flex gap-2">
                <Input placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="rounded-xl glass-deep border-white/10 focus:neon-border text-foreground placeholder:text-muted-foreground" />
                <Button variant="outline" className="rounded-xl glass-deep border-white/10 text-foreground hover:bg-white/10">Apply</Button>
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="rounded-[22px] glass-ios-card p-6 space-y-4 sticky top-24 specular-shimmer">
              <h2 className="font-heading font-bold">Order Summary</h2>
              <p className="text-sm font-semibold text-primary">{items[0]?.restaurantName}</p>
              <div className="space-y-2 border-t border-white/10 pt-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.menuItem.name}</span>
                    <span className="font-medium">${((item.menuItem.price + item.selectedModifiers.reduce((s, m) => s + m.price, 0)) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-white/10 pt-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium">${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between font-heading font-extrabold text-xl border-t border-white/10 pt-3 text-foreground">
                <span>Total</span><span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all gap-2" size="lg" onClick={handlePlaceOrder} disabled={isPlacing}>
                {isPlacing ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>Placing Order...</motion.span>
                ) : (
                  <>Place Order • ${total.toFixed(2)} <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-success" />
                <span>Secure checkout • 256-bit encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
