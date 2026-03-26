import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '@/types';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <Link to={`/restaurant/${restaurant.id}`} className="group block">
    <div className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {restaurant.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
        )}
        {restaurant.deliveryFee === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-semibold text-success-foreground">
            Free Delivery
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-semibold text-card-foreground line-clamp-1">{restaurant.name}</h3>
          <div className="flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-0.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {restaurant.deliveryTime}
          </span>
          <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
        </div>
      </div>
    </div>
  </Link>
);

export default RestaurantCard;
