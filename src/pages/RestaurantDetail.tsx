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
import { MenuItem } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

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
      <p className="text-xl font-heading font-bold">Restaurant not found</p>
      <Button className="mt-4 gradient-warm rounded-xl neon-glow-primary" onClick={() => navigate('/')}>Go Home</Button>
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
    addItem({ menuItem: selectedItem, quantity, selectedModifiers: mods, specialInstructions, restaurantId: restaurant.id, restaurantName: restaurant.name });
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
    <PageWrapper>
      <div className="min-h-screen pb-12">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Button variant="secondary" size="icon" className="absolute left-6 top-6 rounded-xl glass-liquid neon-border shadow-lg z-20" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 font-bold" />
            </Button>
          </motion.div>
        </div>

        <div className="container -mt-28 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="rounded-3xl glass-strong border border-white/10 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-heading font-black md:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-sm">
                    {restaurant.name}
                  </h1>
                  <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
                    {restaurant.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1.5 rounded-full glass-liquid neon-border-teal px-4 py-1.5 shadow-glow">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-bold text-white">{restaurant.rating}</span>
                    <span className="text-white/60">({restaurant.reviewCount.toLocaleString()}+ reviews)</span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full glass-deep border border-white/10 px-4 py-1.5 text-white/90">
                    <Clock className="h-4 w-4 text-primary" />
                    {restaurant.deliveryTime}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full glass-deep border border-white/10 px-4 py-1.5 text-white/90">
                    <MapPin className="h-4 w-4 text-primary" />
                    {restaurant.address}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                <Badge variant="secondary" className="rounded-full px-4 py-1 glass-card border-white/20 text-white font-bold">{restaurant.cuisine}</Badge>
                <div className="flex gap-2">
                  <Badge variant="outline" className="rounded-full px-4 py-1 glass-liquid neon-border-teal text-white font-semibold">{restaurant.priceRange}</Badge>
                  <Badge variant="outline" className="rounded-full px-4 py-1 glass-liquid neon-border-teal text-white font-semibold">${restaurant.deliveryFee.toFixed(2)} delivery</Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Menu */}
          <div className="py-8 space-y-10">
            {restaurant.categories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2 text-white">
                  <div className="h-1 w-6 rounded-full gradient-warm" style={{ boxShadow: '0 0 8px hsl(var(--primary) / 0.4)' }} />
                  {category.name}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {category.items.map((item, itemIdx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.05 }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.98 }}
                      className="flex gap-4 rounded-2xl glass-liquid neon-border-teal p-4 text-left transition-all hover:shadow-card-hover w-full group"
                      onClick={() => openItemDialog(item)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-semibold line-clamp-1 text-white">{item.name}</span>
                          {item.popular && <Badge className="shrink-0 text-[10px] h-5 gradient-warm border-0 neon-glow-primary text-white">🔥 Popular</Badge>}
                        </div>
                        <p className="text-sm text-white/50 mt-1.5 line-clamp-2">{item.description}</p>
                        <p className="mt-2.5 font-heading font-extrabold text-white text-lg">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover shrink-0 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full gradient-warm neon-glow-primary text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Item Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={open => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl glass-strong border-white/10 shadow-2xl backdrop-blur-xl">
            {selectedItem && (
              <>
                <div className="relative -mt-2 -mx-6 overflow-hidden rounded-t-2xl">
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-52 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <DialogHeader className="mt-4">
                  <DialogTitle className="font-heading text-2xl font-black text-white">{selectedItem.name}</DialogTitle>
                  <p className="text-white/60 text-base">{selectedItem.description}</p>
                  <p className="text-2xl font-heading font-black text-white mt-1">${selectedItem.price.toFixed(2)}</p>
                </DialogHeader>

                <div className="space-y-6 my-4">
                  {selectedItem.modifiers?.map(group => (
                    <div key={group.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="font-heading font-bold text-white/90">{group.name}</Label>
                        {group.required && <Badge variant="destructive" className="text-[10px] rounded-full px-3">Required</Badge>}
                      </div>
                      {group.maxSelect === 1 ? (
                        <RadioGroup value={selectedModifiers[group.id]?.[0] || ''} onValueChange={v => toggleModifier(group.id, v, 1)}>
                          {group.options.map(opt => (
                            <div key={opt.id} className="flex items-center justify-between rounded-xl glass-deep border border-white/10 p-4 hover:neon-border transition-all cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={opt.id} id={`${group.id}-${opt.id}`} className="border-white/20 text-primary" />
                                <Label htmlFor={`${group.id}-${opt.id}`} className="cursor-pointer text-white font-medium group-hover:text-primary transition-colors">{opt.name}</Label>
                              </div>
                              {opt.price > 0 && <span className="text-sm text-white/50">+${opt.price.toFixed(2)}</span>}
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="space-y-2">
                          {group.options.map(opt => (
                            <div key={opt.id} className="flex items-center justify-between rounded-xl glass-deep border border-white/10 p-4 hover:neon-border transition-all cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <Checkbox id={`${group.id}-${opt.id}`} checked={selectedModifiers[group.id]?.includes(opt.id)} onCheckedChange={() => toggleModifier(group.id, opt.id, group.maxSelect)} className="border-white/20 data-[state=checked]:bg-primary" />
                                <Label htmlFor={`${group.id}-${opt.id}`} className="cursor-pointer text-white font-medium group-hover:text-primary transition-colors">{opt.name}</Label>
                              </div>
                              {opt.price > 0 && <span className="text-sm text-white/50">+${opt.price.toFixed(2)}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="space-y-3">
                    <Label className="font-heading font-bold text-white/90">Special Instructions</Label>
                    <Textarea 
                      placeholder="Any allergies or preferences?" 
                      value={specialInstructions} 
                      onChange={e => setSpecialInstructions(e.target.value)} 
                      className="resize-none rounded-xl glass-card border-white/10 text-white placeholder:text-white/20 focus:neon-border h-24" 
                    />
                  </div>
                </div>

                <DialogFooter className="flex-row items-center gap-4 mt-6">
                  <div className="flex items-center gap-4 rounded-full glass-deep border border-white/10 px-3 py-1.5">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-white/50 hover:text-white hover:bg-white/10" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-black text-white w-4 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-white/50 hover:text-white hover:bg-white/10" 
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="flex-1 gradient-warm rounded-xl neon-glow-primary text-white font-bold h-12 shadow-xl" onClick={handleAddToCart}>
                    Add to Cart — ${getItemTotal().toFixed(2)}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageWrapper>
  );
};

export default RestaurantDetail;
