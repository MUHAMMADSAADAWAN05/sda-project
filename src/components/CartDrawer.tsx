import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-heading font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add items from a restaurant to get started</p>
            </div>
            <Button onClick={() => { setIsOpen(false); navigate('/'); }}>Browse Restaurants</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">{items[0]?.restaurantName}</p>
              <div className="space-y-4">
                {items.map(item => {
                  const modTotal = item.selectedModifiers.reduce((s, m) => s + m.price, 0);
                  const itemTotal = (item.menuItem.price + modTotal) * item.quantity;
                  return (
                    <div key={item.id} className="flex gap-3 rounded-lg border p-3">
                      <img src={item.menuItem.image} alt={item.menuItem.name} className="h-16 w-16 rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.menuItem.name}</p>
                        {item.selectedModifiers.length > 0 && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.selectedModifiers.map(m => m.name).join(', ')}
                          </p>
                        )}
                        {item.specialInstructions && (
                          <p className="text-xs italic text-muted-foreground line-clamp-1">"{item.specialInstructions}"</p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">${itemTotal.toFixed(2)}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery fee</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-heading font-semibold text-lg border-t pt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full mt-2"
                size="lg"
                onClick={() => { setIsOpen(false); navigate('/checkout'); }}
              >
                Go to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
