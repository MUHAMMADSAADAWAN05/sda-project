import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { restaurants } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { MenuItem, ModifierOption } from '@/types';
import { useState } from 'react';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const restaurant = restaurants.find(r => r.id === id);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!restaurant) return (
    <div className="container py-20 text-center">
      <p className="text-xl font-heading font-semibold">Restaurant not found</p>
      <Button className="mt-4" onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );

  const openItemDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedModifiers({});
    setSpecialInstructions('');
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    const mods = Object.entries(selectedModifiers).flatMap(([groupId, optionIds]) => {
      const group = selectedItem.modifiers?.find(g => g.id === groupId);
      return optionIds.map(optId => {
        const opt = group?.options.find(o => o.id === optId);
        return { groupId, optionId: optId, name: opt?.name || '', price: opt?.price || 0 };
      });
    });

    addItem({
      menuItem: selectedItem,
      quantity,
      selectedModifiers: mods,
      specialInstructions,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
    setSelectedItem(null);
  };

  const getItemTotal = () => {
    if (!selectedItem) return 0;
    const modTotal = Object.entries(selectedModifiers).reduce((sum, [groupId, optionIds]) => {
      const group = selectedItem.modifiers?.find(g => g.id === groupId);
      return sum + optionIds.reduce((s, optId) => s + (group?.options.find(o => o.id === optId)?.price || 0), 0);
    }, 0);
    return (selectedItem.price + modTotal) * quantity;
  };

  const toggleModifier = (groupId: string, optionId: string, maxSelect: number) => {
    setSelectedModifiers(prev => {
      const current = prev[groupId] || [];
      if (maxSelect === 1) return { ...prev, [groupId]: [optionId] };
      if (current.includes(optionId)) return { ...prev, [groupId]: current.filter(id => id !== optionId) };
      if (current.length >= maxSelect) return prev;
      return { ...prev, [groupId]: [...current, optionId] };
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Button variant="secondary" size="icon" className="absolute left-4 top-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="container -mt-16 relative z-10">
        <div className="rounded-xl bg-card p-6 shadow-lg border">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold md:text-3xl">{restaurant.name}</h1>
              <p className="text-muted-foreground mt-1">{restaurant.description}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" />{restaurant.rating} ({restaurant.reviewCount.toLocaleString()}+ ratings)</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{restaurant.deliveryTime}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{restaurant.address}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{restaurant.cuisine}</Badge>
              <Badge variant="outline">{restaurant.priceRange}</Badge>
              <Badge variant="outline">${restaurant.deliveryFee.toFixed(2)} delivery</Badge>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="py-8 space-y-10">
          {restaurant.categories.map(category => (
            <div key={category.id}>
              <h2 className="text-xl font-heading font-bold mb-4">{category.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.items.map(item => (
                  <button
                    key={item.id}
                    className="flex gap-4 rounded-xl border bg-card p-4 text-left transition-all hover:shadow-md hover:border-primary/30 w-full"
                    onClick={() => openItemDialog(item)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium line-clamp-1">{item.name}</span>
                        {item.popular && <Badge className="shrink-0 text-[10px] h-5">Popular</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      <p className="mt-2 font-heading font-semibold text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={open => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedItem && (
            <>
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-48 object-cover rounded-lg -mt-2" />
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">{selectedItem.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                <p className="text-lg font-heading font-semibold text-primary">${selectedItem.price.toFixed(2)}</p>
              </DialogHeader>

              {selectedItem.modifiers?.map(group => (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{group.name}</Label>
                    {group.required && <Badge variant="destructive" className="text-[10px]">Required</Badge>}
                  </div>
                  {group.maxSelect === 1 ? (
                    <RadioGroup value={selectedModifiers[group.id]?.[0] || ''} onValueChange={v => toggleModifier(group.id, v, 1)}>
                      {group.options.map(opt => (
                        <div key={opt.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value={opt.id} id={`${group.id}-${opt.id}`} />
                            <Label htmlFor={`${group.id}-${opt.id}`} className="cursor-pointer">{opt.name}</Label>
                          </div>
                          {opt.price > 0 && <span className="text-sm text-muted-foreground">+${opt.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      {group.options.map(opt => (
                        <div key={opt.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`${group.id}-${opt.id}`}
                              checked={selectedModifiers[group.id]?.includes(opt.id)}
                              onCheckedChange={() => toggleModifier(group.id, opt.id, group.maxSelect)}
                            />
                            <Label htmlFor={`${group.id}-${opt.id}`} className="cursor-pointer">{opt.name}</Label>
                          </div>
                          {opt.price > 0 && <span className="text-sm text-muted-foreground">+${opt.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <Label className="font-medium">Special Instructions</Label>
                <Textarea placeholder="Any allergies or preferences?" value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} className="resize-none" rows={2} />
              </div>

              <DialogFooter className="flex-row items-center gap-3">
                <div className="flex items-center gap-3 rounded-lg border px-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                  <span className="font-medium w-4 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  Add to Cart — ${getItemTotal().toFixed(2)}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetail;
