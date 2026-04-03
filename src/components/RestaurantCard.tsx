import { Link } from 'react-router-dom';
import { Star, Clock, Flame } from 'lucide-react';
import { Restaurant } from '@/types';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const RestaurantCard = ({ restaurant, index = 0 }: { restaurant: Restaurant; index?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3-D tilt values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-8, 8]), { stiffness: 300, damping: 30 });
  const glareX  = useTransform(rawX, [-1, 1], ['0%', '100%']);
  const glareY  = useTransform(rawY, [-1, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="group block">
        <div className="overflow-hidden rounded-2xl glass-liquid neon-border-teal card-shine transition-all hover:neon-border relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Dynamic glare overlay following cursor */}
          <motion.div
            className="absolute inset-0 z-10 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x} ${y}, hsl(0 0% 100% / 0.08), transparent 60%)`
              ),
            }}
          />

          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Featured badge */}
            {restaurant.featured && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.07, type: 'spring', stiffness: 280, damping: 18 }}
                className="badge-pop absolute left-3 top-3 rounded-full gradient-warm px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow flex items-center gap-1"
              >
                <Flame className="h-3 w-3" /> Featured
              </motion.span>
            )}

            {/* Free delivery badge */}
            {restaurant.deliveryFee < 1 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.07, type: 'spring', stiffness: 280, damping: 18 }}
                className="badge-pop absolute right-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground"
              >
                Free Delivery
              </motion.span>
            )}
          </div>

          {/* Info */}
          <div className="p-4" style={{ transform: 'translateZ(10px)' }}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
                {restaurant.name}
              </h3>
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span className="text-sm font-bold text-foreground">{restaurant.rating}</span>
              </div>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
            <div className="mt-2.5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 rounded-full glass-deep px-2.5 py-0.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {restaurant.deliveryTime}
              </span>
              <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
