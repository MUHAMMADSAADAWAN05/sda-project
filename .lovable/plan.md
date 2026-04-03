

# 🍔 FoodDash — Professional Food Ordering Platform

A full-featured, DoorDash-inspired food ordering platform with four user roles, built frontend-first with mock data.

---

## Design System
- **Primary accent**: Warm red (#FF3008 inspired)
- **Style**: Clean, card-based layouts with rounded corners, warm whites, subtle shadows
- **Typography**: Bold headers, clean sans-serif body text
- **Feel**: Friendly, appetizing, modern

---

## 1. Customer App (Main Experience)

### Landing / Home Page
- Hero banner with search bar ("What are you craving?")
- Location selector with saved addresses
- Category chips (Pizza, Sushi, Burgers, Healthy, etc.)
- Featured/promoted restaurants carousel
- "Popular near you" and "Top rated" sections with restaurant cards (image, name, rating, delivery time, delivery fee)

### Restaurant Browsing & Search
- Search with autocomplete and filters (cuisine, rating, price, delivery time, dietary)
- Grid/list view toggle for restaurant results
- Sort by: relevance, rating, delivery time, distance

### Restaurant Detail Page
- Restaurant hero image, name, rating, delivery time, price range
- Tabbed/grouped menu categories
- Menu items with photos, descriptions, prices, customization options
- "Add to cart" with quantity selector and modifiers (size, toppings, special instructions)

### Cart & Checkout
- Slide-out cart drawer with item list, quantities, modifications
- Promo code input field
- Order summary (subtotal, delivery fee, taxes, total)
- Delivery address selection
- Payment method selection (mock)
- Place order button

### Order Tracking
- Step-by-step progress: Confirmed → Preparing → Picked Up → Delivered
- Animated progress bar
- Estimated delivery time countdown
- Mock map placeholder showing delivery route
- Driver info card (name, photo, vehicle)

### User Account Pages
- Login / Sign up screens (email + social mock buttons)
- Profile page (name, email, phone, avatar)
- Order history with reorder option
- Saved addresses management
- Favorite restaurants list

---

## 2. Restaurant Dashboard

- Overview: today's orders, revenue stats, avg rating
- Orders management: incoming, preparing, ready tabs with accept/reject
- Menu management: add/edit/remove items, set prices, upload photos, toggle availability
- Business profile settings (hours, delivery radius, description)

---

## 3. Delivery Driver View

- Available orders to accept
- Active delivery with pickup/dropoff details
- Order status toggle (picked up → on the way → delivered)
- Earnings summary

---

## 4. Admin Panel

- Platform stats dashboard (total orders, revenue, active users)
- Restaurant management (approve/suspend restaurants)
- User management table
- Promo code management

---

## Pages & Routing
- `/` — Customer home
- `/search` — Restaurant search results
- `/restaurant/:id` — Restaurant detail & menu
- `/checkout` — Cart & checkout
- `/tracking/:orderId` — Order tracking
- `/account` — User profile & settings
- `/orders` — Order history
- `/login` & `/signup` — Auth pages
- `/dashboard` — Restaurant dashboard
- `/driver` — Driver view
- `/admin` — Admin panel

All data will be realistic mock data with proper images, ready to connect to a real backend later.

