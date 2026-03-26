import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { savedAddresses } from '@/data/mockData';
import { useState } from 'react';

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
      <p className="text-xl font-heading font-semibold">Your cart is empty</p>
      <Button className="mt-4" onClick={() => navigate('/')}>Browse Restaurants</Button>
    </div>
  );

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      clearCart();
      navigate('/tracking/ORD-001');
    }, 1500);
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" className="gap-2 mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
      <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
          {/* Delivery Address */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Delivery Address</h2>
            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
              {savedAddresses.map(addr => (
                <div key={addr.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-primary/50">
                  <RadioGroupItem value={addr.id} id={addr.id} />
                  <Label htmlFor={addr.id} className="cursor-pointer flex-1">
                    <p className="font-medium">{addr.label}</p>
                    <p className="text-sm text-muted-foreground">{addr.street}, {addr.city} {addr.zip}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-primary/50">
                <RadioGroupItem value="card1" id="card1" />
                <Label htmlFor="card1" className="cursor-pointer flex-1">
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Visa • Expires 12/25</p>
                </Label>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-primary/50">
                <RadioGroupItem value="card2" id="card2" />
                <Label htmlFor="card2" className="cursor-pointer flex-1">
                  <p className="font-medium">•••• •••• •••• 8888</p>
                  <p className="text-sm text-muted-foreground">Mastercard • Expires 06/26</p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Promo */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h2 className="font-heading font-semibold flex items-center gap-2"><Tag className="h-5 w-5 text-primary" /> Promo Code</h2>
            <div className="flex gap-2">
              <Input placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
            <h2 className="font-heading font-semibold">Order Summary</h2>
            <p className="text-sm text-muted-foreground">{items[0]?.restaurantName}</p>
            <div className="space-y-2 border-t pt-3">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.menuItem.name}</span>
                  <span className="font-medium">${((item.menuItem.price + item.selectedModifiers.reduce((s, m) => s + m.price, 0)) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between font-heading font-bold text-lg border-t pt-3">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isPlacing}>
              {isPlacing ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
