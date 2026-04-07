# Plan: iOS 26 Liquid Glass Overhaul

Transform the entire website with Apple's iOS 26-style liquid glass — real light refraction, translucent depth layers, specular highlights, and a refined color palette that feels like looking through frosted crystal.

## What Changes

### 1. New iOS-Style Liquid Glass CSS System (`src/index.css`)

Replace the current glass utilities with Apple-inspired variants:

- `**.glass-ios**` — The signature iOS 26 panel: `blur(80px)`, subtle white gradient top-to-bottom, specular highlight at top edge, soft inner shadow at bottom, very low opacity background (`white/0.12`), and a faint 1px white top border for the light-catching edge
- `**.glass-ios-card**` — Card variant with slightly more opacity, a soft multi-layer shadow system (ambient + directional + contact), and a micro `border-radius: 22px` to match Apple's corner radius
- `**.glass-ios-pill**` — Rounded-full pill shape for nav items and badges with tighter blur
- `**.glass-ios-button**` — Button glass with hover state that increases brightness and adds a specular bloom
- `**.glass-ios-input**` — Input fields with inner shadow and luminous focus ring
- `**.glass-ios-sheet**` — Full-width bottom sheet style with top handle bar
- Add `**@keyframes specular-shift**` — subtle moving highlight that simulates light source movement across glass surfaces
- Add `**@keyframes ios-breathe**` — very gentle scale pulse (1.0 to 1.005) for living UI feel
- Update body background to a richer, deeper gradient with warm-to-cool color stops (deep navy to warm amber undertone) that makes glass panels pop
- Add `**.glass-divider**` — a 1px line with white/0.08 that acts as an Apple-style separator

### 2. Splash Screen (`src/pages/SplashScreen.tsx`)

- Apply `glass-ios-card` with `rounded-[28px]` to role cards
- Add a frosted glass backdrop panel behind the logo area
- Role card icons: place inside a `glass-ios-pill` container with a subtle inner glow
- Add a soft vignette overlay around screen edges for depth
- Reduce particle count and make them softer (larger blur, lower opacity) for elegance

### 3. Header (`src/components/Header.tsx`)

- Replace `glass-ultra` with `glass-ios` — thinner, more translucent, true Apple nav bar feel
- Add a subtle bottom separator using `glass-divider`
- Remove rainbow border, replace with a single clean white/0.06 bottom edge
- Make the logo glow subtler and more refined

### 4. All Customer Pages (`Index.tsx`, `SearchPage.tsx`, `RestaurantDetail.tsx`, `Checkout.tsx`, `OrderTracking.tsx`, `Orders.tsx`, `Account.tsx`)

- Replace `glass-ultra` / `glass-strong` containers with `glass-ios-card`
- Hero section: add a large frosted `glass-ios` backdrop panel
- Category pills: use `glass-ios-pill`
- All buttons: apply `glass-ios-button` styling
- Input fields: apply `glass-ios-input`
- FAQ accordion items: `glass-ios-card` with clean separators

### 5. Restaurant Dashboard (`src/pages/Dashboard.tsx`)

- Outer wrapper: `glass-ios` with `rounded-[28px]`
- Stat cards: `glass-ios-card` with specular highlight animation
- Table rows: softer hover with `glass-ios` background transition
- Tab buttons: `glass-ios-pill` active state

### 6. Driver Dashboard (`src/pages/Driver.tsx`)

- Same treatment as Restaurant: `glass-ios` wrapper, `glass-ios-card` for delivery cards
- Earnings display: frosted glass pill with soft inner glow
- Timeline: glass separators between steps

### 7. Admin Panel (`src/pages/Admin.tsx`)

- Apply `glass-ios` to all section containers
- Stat cards: `glass-ios-card` with the specular animation
- Table: `glass-ios` header, clean dividers between rows

### 8. RestaurantCard (`src/components/RestaurantCard.tsx`)

- Apply `glass-ios-card` base with `rounded-[22px]`
- On hover: increase backdrop brightness slightly + add soft bloom shadow
- Remove aggressive glow-border-hover, replace with refined Apple-like lift

### 9. CartDrawer (`src/components/CartDrawer.tsx`)

- Drawer panel: `glass-ios-sheet` styling
- Each cart item: `glass-ios-card` with clean dividers
- Checkout button: `glass-ios-button` with warm gradient

### 10. Footer (`src/components/Footer.tsx`)

- Apply `glass-ios` with top `glass-divider`
- Clean, minimal Apple-style footer aesthetic

### 11. PageWrapper (`src/components/PageWrapper.tsx`)

- Add `filter: blur(0px)` explicitly in animate state for crisp rendering
- Slightly ease the transition curve for more Apple-like motion (ease-out with slight overshoot)

## Technical Details

- No new dependencies — pure CSS utilities + Tailwind class swaps
- iOS 26 glass key recipe: `backdrop-filter: blur(80px) saturate(190%) brightness(1.1)` + multi-layer box-shadow with inset highlights
- Apple's corner radius convention: 22px for cards, 28px for panels, full for pills
- Specular highlights via `inset 0 1px 0 white/0.25` at top edge + gradient overlay
- All animations kept under 0.4s for Apple's snappy feel
- `will-change: transform, backdrop-filter` on scroll-dependent elements  
  
  
  
also add more details like u adeed faqs and side vagitionbar so also add detils more i mean things 