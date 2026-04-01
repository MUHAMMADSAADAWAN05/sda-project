import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '@/types';
import { motion } from 'framer-motion';

const RestaurantCard = ({ restaurant, index = 0 }: { restaurant: Restaurant; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
    whileTap={{ scale: 0.98 }}
  >
    <Link to={`/restaurant/${restaurant.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl glass-liquid neon-border-teal transition-all hover:neon-border">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {restaurant.featured && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute left-3 top-3 rounded-full gradient-warm px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow"
            >
              ⭐ Featured
            </motion.span>
          )}
          {restaurant.deliveryFee < 1 && (
            <span className="absolute right-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground">
              Free Delivery
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-foreground line-clamp-1">{restaurant.name}</h3>
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

export default RestaurantCard;
