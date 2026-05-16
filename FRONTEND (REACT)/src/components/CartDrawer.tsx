import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative flex h-full w-full flex-col sm:max-w-md glass-ultra shadow-2xl border-l border-white/10 z-50 p-6 bg-background"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm neon-glow-primary">
                  <ShoppingBag className="h-4 w-4 text-primary-foreground" />
                </div>
                Your Cart ({itemCount})
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl glass-liquid neon-border-teal">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add items from a restaurant to get started</p>
            </div>
            <Button onClick={() => { setIsOpen(false); navigate('/'); }} className="gradient-warm rounded-xl neon-glow-primary border-0">
              Browse Restaurants
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <p className="mb-3 text-sm font-semibold text-primary">{items[0]?.restaurantName}</p>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
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
                        className="flex gap-3 rounded-2xl glass-ultra p-3 liquid-shimmer"
                      >
                        <img src={item.menuItem.image} alt={item.menuItem.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading font-semibold line-clamp-1">{item.menuItem.name}</p>
                          {item.selectedModifiers.length > 0 && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.selectedModifiers.map(m => m.name).join(', ')}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 rounded-full glass-deep border border-white/10">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-heading font-bold text-gradient">${itemTotal.toFixed(2)}</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-white/10 pt-4 space-y-2"
            >
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery fee</span><span className="font-medium">${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-heading font-extrabold text-lg border-t border-white/10 pt-3 text-foreground">
                <span>Total</span><span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full mt-3 gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all gap-2 border-0"
                size="lg"
                onClick={() => { setIsOpen(false); navigate('/checkout'); }}
              >
                Go to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
