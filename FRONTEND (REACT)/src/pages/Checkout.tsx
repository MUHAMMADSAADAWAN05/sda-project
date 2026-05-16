import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Tag, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { placeOrder } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userAddress = (user as any)?.address;
  const userCard = (user as any)?.cardNumber;

  const [selectedAddress, setSelectedAddress] = useState('db');
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('db');
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) return (
    <div className="container py-20 text-center">
      <p className="text-xl font-heading font-bold">Your cart is empty</p>
      <Button className="mt-4 gradient-warm rounded-xl neon-glow-primary" onClick={() => navigate('/')}>Browse Restaurants</Button>
    </div>
  );

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    setError(null);
    
    try {
      const finalAddress = selectedAddress === 'db' ? userAddress : "Selected Address";
      if (!finalAddress || finalAddress.trim() === '') {
        throw new Error("Please set a delivery address in your profile first.");
      }
      
      const orderData = {
        user: { id: user?.id },
        restaurant: { id: items[0].restaurantId },
        deliveryAddress: finalAddress,
        paymentMethod: paymentMethod === 'db' ? 'CREDIT_CARD' : 'PAYPAL',
        totalAmount: total,
        items: items.map(item => ({
          menuItem: { id: (item.menuItem as any).id },
          quantity: item.quantity,
          unitPrice: item.menuItem.price,
        }))
      };

      const result = await placeOrder(orderData);
      clearCart();
      navigate(`/tracking/${(result as any).id  || 'ORD-001'}`);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Is the backend running?');
      setIsPlacing(false);
    }
  };

  return (
    <PageWrapper>
      <div className="container py-8 max-w-4xl text-white">
        <Button variant="ghost" className="gap-2 mb-6 rounded-xl text-white hover:bg-white/10" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-heading font-extrabold mb-8">Checkout</motion.h1>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Address */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl glass-ultra p-6 space-y-4 liquid-shimmer">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold flex items-center gap-2"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><MapPin className="h-4 w-4 text-white" /></div> Delivery Address</h2>
                <Button variant="link" size="sm" className="text-primary p-0" onClick={() => navigate('/account')}>Update Profile</Button>
              </div>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                <div className="flex items-center gap-3 rounded-xl glass-deep border border-white/10 p-3.5 cursor-pointer hover:neon-border transition-all">
                  <RadioGroupItem value="db" id="db-addr" className="border-white/20 data-[state=checked]:bg-primary" />
                  <Label htmlFor="db-addr" className="cursor-pointer flex-1">
                    <p className="font-heading font-semibold">Saved Address</p>
                    <p className="text-sm text-white/50">{userAddress || 'No address set in profile'}</p>
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl glass-strong p-6 space-y-4 liquid-shimmer">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold flex items-center gap-2"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><CreditCard className="h-4 w-4 text-white" /></div> Payment Method</h2>
                <Button variant="link" size="sm" className="text-primary p-0" onClick={() => navigate('/account')}>Manage Cards</Button>
              </div>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center gap-3 rounded-xl glass-deep border border-white/10 p-3.5 cursor-pointer hover:neon-border transition-all">
                  <RadioGroupItem value="db" id="db-card" className="border-white/20 data-[state=checked]:bg-primary" />
                  <Label htmlFor="db-card" className="cursor-pointer flex-1">
                    <p className="font-heading font-semibold">
                      {userCard ? `•••• •••• •••• ${userCard.slice(-4)}` : 'No card saved'}
                    </p>
                    <p className="text-sm text-white/50">{userCard ? 'Primary Card' : 'Add a card in your profile settings'}</p>
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>

            {/* Promo */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl glass-liquid neon-border-teal p-6 space-y-4">
              <h2 className="font-heading font-bold flex items-center gap-2"><div className="h-8 w-8 rounded-lg gradient-warm neon-glow-primary flex items-center justify-center"><Tag className="h-4 w-4 text-white" /></div> Promo Code</h2>
              <div className="flex gap-2">
                <Input placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="rounded-xl glass-deep border-white/10 focus:neon-border text-white placeholder:text-white/20" />
                <Button variant="outline" className="rounded-xl glass-deep border-white/10 text-white hover:bg-white/10">Apply</Button>
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="rounded-2xl glass-ultra p-6 space-y-4 sticky top-24 liquid-shimmer">
              <h2 className="font-heading font-bold">Order Summary</h2>
              <p className="text-sm font-semibold text-primary">{items[0]?.restaurantName}</p>
              <div className="space-y-2 border-t border-white/10 pt-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/70">{item.quantity}x {item.menuItem.name}</span>
                    <span className="font-medium text-white">${((item.menuItem.price + item.selectedModifiers.reduce((s, m) => s + m.price, 0)) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-white/10 pt-3 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="font-medium text-white">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Delivery</span><span className="font-medium text-white">${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Tax</span><span className="font-medium text-white">${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between font-heading font-extrabold text-xl border-t border-white/10 pt-3">
                <span>Total</span><span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              
              {error && <p className="text-red-500 text-xs text-center font-medium animate-pulse">{error}</p>}
              
              <Button className="w-full gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all gap-2 h-12" size="lg" onClick={handlePlaceOrder} disabled={isPlacing}>
                {isPlacing ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>Placing Order...</motion.span>
                ) : (
                  <>Place Order • ${total.toFixed(2)} <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-white/40">
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
