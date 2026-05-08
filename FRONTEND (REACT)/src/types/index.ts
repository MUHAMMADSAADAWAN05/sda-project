export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  priceRange: string;
  featured: boolean;
  categories: MenuCategory[];
  address: string;
  description: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  modifiers?: ModifierGroup[];
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelect: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: { groupId: string; optionId: string; name: string; price: number }[];
  specialInstructions: string;
  restaurantId: string;
  restaurantName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'confirmed' | 'preparing' | 'picked_up' | 'delivered';
  total: number;
  deliveryFee: number;
  tax: number;
  subtotal: number;
  restaurantName: string;
  restaurantId: string;
  deliveryAddress: string;
  estimatedDelivery: string;
  placedAt: string;
  driver?: {
    name: string;
    photo: string;
    vehicle: string;
    phone: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
}
