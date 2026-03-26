import { Restaurant, Category, Order, Address } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Pizza', icon: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
  { id: '2', name: 'Burgers', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: '3', name: 'Sushi', icon: '🍣', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop' },
  { id: '4', name: 'Chinese', icon: '🥡', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&h=200&fit=crop' },
  { id: '5', name: 'Mexican', icon: '🌮', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop' },
  { id: '6', name: 'Indian', icon: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop' },
  { id: '7', name: 'Thai', icon: '🍜', image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=200&h=200&fit=crop' },
  { id: '8', name: 'Healthy', icon: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
  { id: '9', name: 'Desserts', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop' },
  { id: '10', name: 'Coffee', icon: '☕', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
];

const sizeModifier = {
  id: 'size',
  name: 'Size',
  required: true,
  maxSelect: 1,
  options: [
    { id: 'sm', name: 'Small', price: 0 },
    { id: 'md', name: 'Medium', price: 2 },
    { id: 'lg', name: 'Large', price: 4 },
  ],
};

const toppingModifier = {
  id: 'toppings',
  name: 'Extra Toppings',
  required: false,
  maxSelect: 5,
  options: [
    { id: 't1', name: 'Extra Cheese', price: 1.5 },
    { id: 't2', name: 'Bacon', price: 2 },
    { id: 't3', name: 'Avocado', price: 2.5 },
    { id: 't4', name: 'Jalapeños', price: 1 },
  ],
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: "Mario's Authentic Pizzeria",
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop',
    cuisine: 'Pizza',
    rating: 4.8,
    reviewCount: 2340,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    priceRange: '$$',
    featured: true,
    address: '123 Main St',
    description: 'Authentic Neapolitan pizza made with imported ingredients from Italy.',
    categories: [
      {
        id: 'c1',
        name: 'Popular Items',
        items: [
          { id: 'm1', name: 'Margherita Pizza', description: 'San Marzano tomato sauce, fresh mozzarella, basil, extra virgin olive oil', price: 14.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', popular: true, modifiers: [sizeModifier, toppingModifier] },
          { id: 'm2', name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella and our signature tomato sauce', price: 16.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', popular: true, modifiers: [sizeModifier, toppingModifier] },
        ],
      },
      {
        id: 'c2',
        name: 'Specialty Pizzas',
        items: [
          { id: 'm3', name: 'Truffle Mushroom', description: 'Wild mushrooms, truffle oil, fontina cheese, thyme', price: 19.99, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', modifiers: [sizeModifier] },
          { id: 'm4', name: 'BBQ Chicken', description: 'Grilled chicken, BBQ sauce, red onion, cilantro, smoked gouda', price: 17.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', modifiers: [sizeModifier] },
        ],
      },
      {
        id: 'c3',
        name: 'Sides & Drinks',
        items: [
          { id: 'm5', name: 'Garlic Breadsticks', description: 'Freshly baked with garlic butter and parmesan', price: 6.99, image: 'https://images.unsplash.com/photo-1619535860434-ba1f915d87c7?w=400&h=300&fit=crop' },
          { id: 'm6', name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, caesar dressing', price: 8.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Burger Republic',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop',
    cuisine: 'Burgers',
    rating: 4.6,
    reviewCount: 1870,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    priceRange: '$$',
    featured: true,
    address: '456 Oak Ave',
    description: 'Premium craft burgers made with 100% Angus beef.',
    categories: [
      {
        id: 'c1',
        name: 'Signature Burgers',
        items: [
          { id: 'm1', name: 'Classic Smash Burger', description: 'Double smashed patties, American cheese, pickles, secret sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', popular: true, modifiers: [toppingModifier] },
          { id: 'm2', name: 'Truffle Burger', description: 'Angus beef, truffle aioli, gruyère, arugula, caramelized onions', price: 16.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', popular: true },
          { id: 'm3', name: 'Spicy Nashville', description: 'Nashville hot chicken, coleslaw, pickles, brioche bun', price: 14.99, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop' },
        ],
      },
      {
        id: 'c2',
        name: 'Sides',
        items: [
          { id: 'm4', name: 'Loaded Fries', description: 'Crispy fries with cheese sauce, bacon, green onions', price: 7.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
          { id: 'm5', name: 'Onion Rings', description: 'Beer-battered, served with ranch dip', price: 6.99, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Sakura Sushi Bar',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=400&fit=crop',
    cuisine: 'Sushi',
    rating: 4.9,
    reviewCount: 3120,
    deliveryTime: '30-45 min',
    deliveryFee: 3.99,
    priceRange: '$$$',
    featured: true,
    address: '789 Cherry Ln',
    description: 'Premium sushi crafted by master chefs using the freshest fish.',
    categories: [
      {
        id: 'c1',
        name: 'Rolls',
        items: [
          { id: 'm1', name: 'Dragon Roll', description: 'Eel, cucumber, avocado on top, unagi sauce', price: 16.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', popular: true },
          { id: 'm2', name: 'Rainbow Roll', description: 'California roll topped with assorted sashimi', price: 18.99, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop', popular: true },
          { id: 'm3', name: 'Spicy Tuna Roll', description: 'Spicy tuna, cucumber, sesame seeds, spicy mayo', price: 13.99, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop' },
        ],
      },
      {
        id: 'c2',
        name: 'Nigiri & Sashimi',
        items: [
          { id: 'm4', name: 'Salmon Nigiri (2pc)', description: 'Fresh Atlantic salmon over seasoned rice', price: 7.99, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop' },
          { id: 'm5', name: 'Tuna Sashimi (5pc)', description: 'Premium bluefin tuna, thinly sliced', price: 14.99, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Tandoori Nights',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
    cuisine: 'Indian',
    rating: 4.7,
    reviewCount: 1560,
    deliveryTime: '35-50 min',
    deliveryFee: 2.49,
    priceRange: '$$',
    featured: false,
    address: '321 Spice Rd',
    description: 'Authentic Indian cuisine with traditional tandoori oven preparations.',
    categories: [
      {
        id: 'c1',
        name: 'Main Course',
        items: [
          { id: 'm1', name: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato sauce', price: 15.99, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', popular: true },
          { id: 'm2', name: 'Lamb Biryani', description: 'Aromatic basmati rice with slow-cooked lamb, saffron', price: 17.99, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', popular: true },
          { id: 'm3', name: 'Palak Paneer', description: 'Fresh spinach with homemade cottage cheese', price: 13.99, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop' },
        ],
      },
      {
        id: 'c2',
        name: 'Breads & Sides',
        items: [
          { id: 'm4', name: 'Garlic Naan', description: 'Freshly baked in tandoor with garlic butter', price: 3.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop' },
          { id: 'm5', name: 'Samosa (2pc)', description: 'Crispy pastry filled with spiced potatoes and peas', price: 5.99, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Green Bowl Kitchen',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop',
    cuisine: 'Healthy',
    rating: 4.5,
    reviewCount: 980,
    deliveryTime: '20-30 min',
    deliveryFee: 1.49,
    priceRange: '$',
    featured: false,
    address: '555 Wellness Way',
    description: 'Fresh, healthy bowls and salads made with organic ingredients.',
    categories: [
      {
        id: 'c1',
        name: 'Bowls',
        items: [
          { id: 'm1', name: 'Açaí Power Bowl', description: 'Açaí, banana, granola, berries, honey', price: 11.99, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop', popular: true },
          { id: 'm2', name: 'Poke Bowl', description: 'Fresh salmon, avocado, edamame, sesame, sushi rice', price: 14.99, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', popular: true },
        ],
      },
      {
        id: 'c2',
        name: 'Salads',
        items: [
          { id: 'm3', name: 'Mediterranean Salad', description: 'Mixed greens, feta, olives, tomatoes, lemon vinaigrette', price: 10.99, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop' },
          { id: 'm4', name: 'Grilled Chicken Salad', description: 'Grilled chicken breast, quinoa, roasted veggies, tahini', price: 12.99, image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Taco Loco',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop',
    cuisine: 'Mexican',
    rating: 4.4,
    reviewCount: 1240,
    deliveryTime: '15-25 min',
    deliveryFee: 0.99,
    priceRange: '$',
    featured: true,
    address: '777 Fiesta Blvd',
    description: 'Authentic street-style Mexican food with bold, fresh flavors.',
    categories: [
      {
        id: 'c1',
        name: 'Tacos',
        items: [
          { id: 'm1', name: 'Carne Asada Tacos (3)', description: 'Grilled steak, onion, cilantro, salsa verde', price: 11.99, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', popular: true },
          { id: 'm2', name: 'Al Pastor Tacos (3)', description: 'Marinated pork, pineapple, onion, cilantro', price: 10.99, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop', popular: true },
          { id: 'm3', name: 'Fish Tacos (3)', description: 'Beer-battered fish, cabbage slaw, chipotle crema', price: 12.99, image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=400&h=300&fit=crop' },
        ],
      },
      {
        id: 'c2',
        name: 'Burritos & Bowls',
        items: [
          { id: 'm4', name: 'Loaded Burrito', description: 'Your choice of protein, rice, beans, cheese, guac, sour cream', price: 13.99, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop' },
          { id: 'm5', name: 'Burrito Bowl', description: 'All the burrito fillings without the tortilla', price: 12.99, image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
];

export const savedAddresses: Address[] = [
  { id: '1', label: 'Home', street: '742 Evergreen Terrace', city: 'Springfield', zip: '62704' },
  { id: '2', label: 'Work', street: '1600 Pennsylvania Ave', city: 'Washington', zip: '20500' },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [],
    status: 'preparing',
    total: 32.47,
    deliveryFee: 2.99,
    tax: 2.50,
    subtotal: 26.98,
    restaurantName: "Mario's Authentic Pizzeria",
    restaurantId: '1',
    deliveryAddress: '742 Evergreen Terrace, Springfield',
    estimatedDelivery: '7:45 PM',
    placedAt: '2024-01-15T19:10:00Z',
    driver: {
      name: 'Alex Rivera',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      vehicle: 'Toyota Corolla • ABC 1234',
      phone: '(555) 123-4567',
    },
  },
  {
    id: 'ORD-002',
    items: [],
    status: 'delivered',
    total: 45.96,
    deliveryFee: 3.99,
    tax: 3.50,
    subtotal: 38.47,
    restaurantName: 'Sakura Sushi Bar',
    restaurantId: '3',
    deliveryAddress: '742 Evergreen Terrace, Springfield',
    estimatedDelivery: '6:30 PM',
    placedAt: '2024-01-14T18:00:00Z',
  },
];
