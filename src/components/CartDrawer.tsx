import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md border-l-0 shadow-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add items from a restaurant to get started</p>
            </div>
            <Button onClick={() => { setIsOpen(false); navigate('/'); }} className="gradient-warm rounded-xl shadow-glow">
              Browse Restaurants
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <p className="mb-3 text-sm font-semibold text-primary">{items[0]?.restaurantName}</p>
              <AnimatePresence mode="popLayout">
                <div className="space-y-3">
                  {items.map(item => {
                    const modTotal = item.selectedModifiers.reduce((s, m) => s + m.price, 0);
                    const itemTotal = (item.menuItem.price + modTotal) * item.quantity;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0 }}
                        className="flex gap-3 rounded-xl border bg-secondary/30 p-3"
                      >
                        <img src={item.menuItem.image} alt={item.menuItem.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-1">{item.menuItem.name}</p>
                          {item.selectedModifiers.length > 0 && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.selectedModifiers.map(m => m.name).join(', ')}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 rounded-full border bg-card">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">${itemTotal.toFixed(2)}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t pt-4 space-y-2"
            >
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery fee</span><span className="font-medium">${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-heading font-bold text-lg border-t pt-3">
                <span>Total</span><span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full mt-3 gradient-warm rounded-xl shadow-glow hover:shadow-lg transition-all gap-2"
                size="lg"
                onClick={() => { setIsOpen(false); navigate('/checkout'); }}
              >
                Go to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
