# DesiiGlobal UI Features Overview

**Internal Developer Documentation**

## 1. High-Level Summary

DesiiGlobal is a premium ecommerce frontend for organic health and wellness snacks. Built with **React + Vite + Tailwind CSS**, the platform implements a modern, mobile-first experience with advanced UX patterns inspired by industry leaders like Flipkart.

### Technology Stack
- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS-in-JS utilities
- **Routing**: React Router v6
- **State Management**: React Context (Cart, Wishlist, Scroll context)
- **UI Components**: shadcn/ui (pre-built accessible components)
- **HTTP Client**: Fetch API (for future API integration)
- **Data Fetching**: TanStack React Query

### Design Philosophy
- **Skeleton-First**: All components support loading states with skeleton loaders
- **Accessibility**: WCAG 2.1 AA compliance (keyboard navigation, ARIA labels, semantic HTML)
- **Performance**: Optimized bundle size, lazy loading for routes and images
- **Maintainability**: Centralized data modules, reusable components, clear separation of concerns

---

## 2. Pages & Routes

### Core User Flows

#### 2.1 Homepage (`/`)
**Route**: `GET /`  
**Component**: `client/pages/Index.tsx`

- Hero banner with CTA (Shop Now, Bulk Orders)
- Feature cards grid (COD, Quality, Fast Delivery, Best Prices)
- Product showcase (Best Sellers)
- Categories section with category cards
- Why DesiiGlobal (USP points)
- Health benefits carousel
- Customer testimonials
- Limited-time offer CTA
- Newsletter subscription
- Footer with links

**Data Source**: Centralized in `client/data/`
- `sections.ts`: testimonials, healthBenefits, uspPoints, featureCards
- `commerce.ts`: offers, trustBadges

**Context Usage**: `useScrollContext()` to switch between BigHeader and CompactHeader on hero intersection

---

#### 2.2 Shop / Search (`/shop`)
**Route**: `GET /shop?category=:value&price=:range&sort=:option&search=:query`  
**Component**: `client/pages/Shop.tsx`

**Features**:
- Advanced filtering (category, price range, sort)
- Client-side search with product matching
- Responsive product grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- Filter sidebar (collapsible on mobile)
- Pagination placeholders
- Empty state UI
- No-results messaging

**Filters**:
- **Category**: Makhana, Roasted Flavours, Protein Snacks, Weight Loss
- **Price Range**: Custom bracket filters
- **Sort**: Relevance, Price (Low→High, High→Low), Newest
- **Search**: Full-text product title matching (case-insensitive)

**Data Source**: 
- `client/data/products.ts`: allProducts
- `client/data/categories.ts`: categoryFilters, priceRanges, sortOptions

---

#### 2.3 Product Detail (`/product/:slug`)
**Route**: `GET /product/:slug`  
**Component**: `client/pages/ProductDetail.tsx`

**Features**:
- Product image gallery with thumbnail selector
- Product title, rating, price
- Short & full description
- Quantity selector (with increment/decrement)
- Add to Cart button (with toast feedback)
- Add to Wishlist toggle button
- Tabs: Description, Nutrition Info, Customer Reviews
- Related Products carousel
- Trust badges

**Cart Integration**:
- Clicking "Add to Cart" dispatches `addItem()` to CartContext
- Shows success/error toast
- Stores to localStorage

**Wishlist Integration**:
- Clicking heart icon toggles `toggleItem()` in WishlistContext
- Shows visual feedback (filled/unfilled heart)
- Persists to localStorage

**Data Source**:
- `client/data/products.ts`: relatedProducts
- `client/data/sections.ts`: productReviews (placeholder)

---

#### 2.4 Cart (`/cart`)
**Route**: `GET /cart`  
**Component**: `client/pages/Cart.tsx`

**Features**:
- Cart items list with product details
- Quantity controls (increment/decrement/remove)
- Remove item from cart
- Price breakdown (subtotal, discount, delivery, total)
- "Proceed to Checkout" CTA button
- Empty cart state with "Continue Shopping" link
- Cart persists via localStorage (CartContext)

**Checkout Flow**:
- "Proceed to Checkout" button navigates to `/checkout/delivery`

**Data Binding**: Reads from `useCart()` context

---

#### 2.5 Checkout: Delivery Details (`/checkout/delivery`)
**Route**: `POST /checkout/delivery`  
**Component**: `client/pages/CheckoutDelivery.tsx`

**Features**:
- Breadcrumb progress indicator (Cart → Delivery → Payment)
- Address form with validation
  - Full Name, Phone, Email
  - Address Line 1 & 2
  - City, State, Pincode
  - Address Type (Home/Office)
  - Save Address checkbox
- Order summary (sticky sidebar)
- Trust badges (security, delivery speed, support)
- Form submission → sessionStorage (demo) → Navigate to `/checkout/payment`

**Form Validation**:
- All fields required
- Email format validation
- Phone number length validation
- Pincode format validation

---

#### 2.6 Checkout: Payment (`/checkout/payment`)
**Route**: `POST /checkout/payment`  
**Component**: `client/pages/CheckoutPayment.tsx`

**Features**:
- Breadcrumb progress (Cart → Delivery → **Payment**)
- Order items review (read-only)
- Payment method selection
  - UPI (Google Pay, PhonePe, Paytm)
  - Credit/Debit Card
  - Net Banking
  - Cash on Delivery (COD)
- Terms & Conditions checkbox
- "Place Order" button (disabled until terms checked)
- "Continue Shopping" secondary button
- Order summary (sticky, integrated)
- Payment disclaimer (demo checkout notice)

**Button Behavior**:
- "Place Order" → Simulates 2-second processing → Navigate to `/order-success`
- Button shows "Processing Payment..." during loading
- Button disabled until agreeTerms is true

**Data Source**: `client/data/commerce.ts`: paymentMethods

---

#### 2.7 Order Success (`/order-success`)
**Route**: `GET /order-success`  
**Component**: `client/pages/OrderSuccess.tsx`

**Features**:
- Success message & order number (generated)
- Order summary card
- Order status timeline (Pending → Packed → Shipped → Delivered)
- Estimated delivery date
- Primary CTA: "Track Your Order" → `/track-order`
- Secondary CTA: "Continue Shopping" → `/shop`
- Clears cart on mount (`clearCart()` from CartContext)

**Data Source**: `client/data/commerce.ts`: mockOrderStatus

---

#### 2.8 Track Order (`/track-order`)
**Route**: `GET /track-order`  
**Component**: `client/pages/TrackOrder.tsx`

**Features**:
- Order tracking form (Order ID + Email)
- Mock order status timeline
- Order summary & items
- Delivery timeline with dates & locations
- Shipping address
- Help/contact CTA

**Data Source**: `client/data/commerce.ts`: mockOrderStatus

---

#### 2.9 Wishlist (`/wishlist`)
**Route**: `GET /wishlist`  
**Component**: `client/pages/Wishlist.tsx`

**Features**:
- Desktop: Table view with item details
- Mobile: Grid/card view
- Add to Cart from wishlist
- Remove from wishlist
- Empty wishlist state with CTA
- Reads from `useWishlist()` context
- Persists to localStorage

---

#### 2.10 B2B / Bulk Orders (`/b2b`)
**Route**: `GET /b2b`  
**Component**: `client/pages/B2B.tsx`

**Features**:
- Professional tone, enterprise-ready messaging
- B2B benefits overview (bulk discounts, custom packaging, etc.)
- Enquiry form:
  - Company/Business Name
  - Contact Person Name
  - Email
  - Phone
  - Product Category dropdown
  - Approximate Quantity
  - Message/Requirements textarea
- Form validation
- Success confirmation modal (UI-only, no backend submission)
- FAQ section

**Data Source**:
- `client/data/categories.ts`: b2bProductCategories
- `client/data/commerce.ts`: b2bBenefits, initialB2BForm

---

#### 2.11 Category Pages (`/category/:slug`)
**Routes**:
- `/category/makhana` → `CategoryMakhana.tsx`
- `/category/roasted-flavours` → `CategoryRoasted.tsx`
- `/category/protein-snacks` → `CategoryProtein.tsx`
- `/category/weight-loss` → `CategoryWeightLoss.tsx`

**Features**:
- Category-specific product list
- Flavor/variant tabs (category-dependent)
- Taste/benefit highlights
- Nutrition info card
- Products grid with add-to-cart

**Data Source**: `client/data/products.ts` (categoryProducts)

---

#### 2.12 Combos (`/combos`)
**Route**: `GET /combos`  
**Component**: `client/pages/Combos.tsx`

**Features**:
- List of bundled offers (Healthy Living, Weight Loss, etc.)
- Each combo shows:
  - Image
  - Included products
  - Original vs. Discounted price
  - Discount percentage
  - Add to Cart button

**Data Source**: `client/data/commerce.ts`: combos

---

#### 2.13 Offers (`/offers`)
**Route**: `GET /offers`  
**Component**: `client/pages/Offers.tsx`

**Features**:
- List of active/upcoming offers
- Each offer card shows:
  - Title & description
  - Offer type (%, fixed, code)
  - Coupon code
  - Validity period
  - Conditions/T&Cs

**Data Source**: `client/data/commerce.ts`: offers

---

#### 2.14 Auth Pages
- **Login** (`/login`): Login form (UI placeholder)
- **Signup** (`/signup`): Signup form with T&Cs checkbox (UI placeholder)
- **Forgot Password**: Link on login page

---

#### 2.15 Info Pages
- **About** (`/about`): Company story, mission, values
- **Contact** (`/contact`): Contact form, info, map, FAQ
- **404** (`/*`): Not found page with link to home

---

## 3. UX Enhancements

### 3.1 Advanced Search Dropdown

**Component**: `client/components/SearchDropdown.tsx`

**Features**:
- Shows on search input focus
- Displays "Trending Searches" list (8 static terms)
- Dynamic filtering based on user query
- Keyboard navigation (↑↓ arrows, Enter to select, ESC to close)
- Click outside to close
- Mobile-friendly with touch support
- Hover/keyboard highlighting
- No results state with helpful text

**Trending Searches** (from `client/data/sections.ts`):
- Roasted Makhana
- Organic Makhana
- Cheese & Herbs
- Protein Snacks
- Healthy Snacks
- Weight Loss Foods
- Gluten-Free Snacks
- Honey Roasted

**Implementation**:
- Used in both BigHeader (full desktop hero) and CompactHeader (sticky nav)
- Reusable component prop-driven
- Integrates with React Router navigation

---

### 3.2 Cart & Wishlist Integration

**Context**: `client/context/CartContext.tsx`, `client/context/WishlistContext.tsx`

**Features**:
- Persistent state (localStorage)
- Add/Remove/Update operations
- Badge count display in headers
- Toast notifications for user feedback
- Real-time updates across pages

**Header Integration**:
- Cart badge shows item count
- Wishlist badge shows item count
- Click cart icon → `/cart`
- Click wishlist icon → `/wishlist`
- Click user icon → `/login`

---

### 3.3 Checkout Flow UX

**Fixed Issues**:
- ✅ Place Order button now integrated into sticky CheckoutSummary
- ✅ No parallax/transform artifacts
- ✅ Button is scroll-stable and properly positioned
- ✅ Proper disabled/loading states

**Button States**:
- Default: "Place Order" (clickable if terms checked)
- Loading: "Processing Payment..." (disabled)
- Disabled: Greyed out if terms not checked

---

### 3.4 Responsive Design

- **Mobile** (<768px): Single column, collapsed nav, touch-friendly buttons
- **Tablet** (768px-1024px): 2-column layout for products, sidebar nav
- **Desktop** (>1024px): Full featured layout, sticky headers, hover effects

**Mobile Optimizations**:
- Hamburger menu for navigation
- Collapsible filter sidebar
- Stack-based forms
- Larger touch targets (48px minimum)

---

## 4. Centralized Data Architecture

All static UI data is centralized in `client/data/` modules for easy maintenance and DRY principles.

### Data Modules

#### `client/data/products.ts`
- **allProducts**: Complete product seed for search/filter
- **bestSellers**: Homepage featured products
- **categoryProducts**: makhanaProducts, roastedProducts, etc.
- **relatedProducts**: Product detail page suggestions
- **Type**: `Product` interface

#### `client/data/categories.ts`
- **categories**: Homepage category cards
- **shopCategories**: Shop page with product counts
- **categoryFilters**: Shop filter options
- **priceRanges**: Price filter options
- **sortOptions**: Sort/order options
- **navCategories**: Top navigation items
- **b2bProductCategories**: B2B form dropdown
- **Flavours**: Category-specific variants
- **Types**: `Category`, `FilterOption` interfaces

#### `client/data/sections.ts`
- **testimonials**: Customer reviews
- **healthBenefits**: Makhana benefit highlights
- **uspPoints**: Why DesiiGlobal selling points
- **featureCards**: Homepage feature icons
- **socialImages**: Social proof gallery
- **trustBadges**: Checkout trust indicators
- **Types**: `Testimonial`, `Benefit`, `USPPoint`, `FeatureCard`, etc.

#### `client/data/commerce.ts`
- **paymentMethods**: Checkout payment options
- **offers**: Active promotional offers
- **combos**: Bundle deals
- **productReviews**: Product page reviews
- **mockOrderStatus**: Order tracking timeline
- **initialB2BForm**: B2B form default values
- **b2bBenefits**: B2B value proposition
- **Types**: `PaymentMethod`, `Offer`, `Combo`, `Review`, etc.

#### `client/data/index.ts`
- Re-exports all modules and types for convenient imports
- Single source for data imports: `import { bestSellers, testimonials } from "@/data"`

---

## 5. Component Architecture

### Reusable Components

#### UI Components (`client/components/ui/`)
- **button**: CTA button variants
- **input**: Form inputs
- **select**: Dropdown selects
- **checkbox**: Checkboxes
- **tooltip**: Hover tooltips
- **accordion**: Collapsible sections
- **skeleton**: Loading placeholders
- **badge**: Status badges
- **card**: Card layouts
- **modal**: Dialog/Modal components
- **pagination**: Page navigation

#### Section Components (`client/components/sections/`)
- **BestSellersSection**: Product carousel
- **CategoriesSection**: Category grid
- **HealthBenefitsSection**: Feature cards
- **TestimonialsSection**: Customer testimonials
- **WhyDesiiGlobalSection**: USP highlights
- **OfferCtaSection**: Promotional banner
- **NewsletterSection**: Email signup
- **ShopCategoriesSection**: Shop category section
- **HomeAdBanner**: Reusable ad banner

#### Feature Components (`client/components/`)
- **Header**: Main navigation (BigHeader + CompactHeader)
- **CompactHeader**: Sticky nav (used after scroll or on non-home pages)
- **SearchDropdown**: Advanced search with trending searches
- **ProductCard**: Product grid card
- **FeatureCard**: Feature highlight card
- **Footer**: Site footer
- **AnnouncementBar**: Top banner (free shipping, etc.)

#### Checkout Components (`client/components/checkout/`)
- **AddressForm**: Delivery address form with validation
- **PaymentMethods**: Payment option selector
- **CheckoutSummary**: Order summary with integrated buttons

---

## 6. Skeleton-First Loading States

All major sections support skeleton loaders for better perceived performance.

**Example Usage**:
```tsx
{isLoading ? (
  <div className="grid grid-cols-4 gap-6">
    {Array(4).fill(0).map((_, i) => (
      <Skeleton key={i} className="h-48 w-full rounded-lg" />
    ))}
  </div>
) : (
  <ProductGrid products={products} />
)}
```

**Components with Skeletons**:
- Product grids
- Image galleries
- Cart items list
- Testimonials carousel
- Category cards

---

## 7. Backend Integration Notes

### For Backend Developers

#### Product Data
**Current**: Static seed in `client/data/products.ts`  
**Integration**: Replace `allProducts` array with API call

```typescript
// Replace with API fetch
const { data: allProducts } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products').then(r => r.json())
});
```

#### Search & Filters
**Current**: Client-side filtering over seed data  
**Integration**: Use server-side search with query params

```typescript
const results = await fetch(`/api/search?q=${query}&category=${cat}&price=${price}`);
```

#### Cart & Checkout
**Current**: localStorage + context (demo)  
**Integration**: Persist to database after user login

```typescript
// After authentication, POST cart to server
POST /api/user/cart
{
  items: [...CartContext.items],
  userId: user.id
}
```

#### Orders
**Current**: Mock order generation on success page  
**Integration**: Create order record in database

```typescript
POST /api/orders
{
  items: [...cartItems],
  address: {...deliveryAddress},
  paymentMethod: selectedPayment,
  total: cartSummary.total
}
```

#### Payment Processing
**Current**: Simulated 2-second delay  
**Integration**: Integrate payment gateway (Razorpay, Stripe, etc.)

```typescript
// Call payment provider
const paymentResponse = await razorpay.createOrder({
  amount: total,
  currency: 'INR'
});
```

#### Authentication
**Current**: Placeholder forms  
**Integration**: Backend login/signup with JWT

```typescript
POST /api/auth/login
{ email, password }

// Response: { token, user }
// Store token in localStorage/secure cookie
```

#### B2B Enquiry Form
**Current**: UI-only, no submission  
**Integration**: Send to email or database

```typescript
POST /api/b2b/enquiry
{
  companyName,
  contactPerson,
  email,
  phone,
  productCategory,
  approximateQuantity,
  message
}
```

#### Newsletter
**Current**: UI placeholder  
**Integration**: Add to email service provider

```typescript
POST /api/newsletter/subscribe
{ email }
```

#### Image Optimization
**Current**: Placeholder URLs  
**Integration**: Replace with CDN or optimized image URLs

```typescript
// Use responsive image URLs with format/quality params
const imageUrl = `https://cdn.example.com/product/${id}.webp?w=300&q=80`;
```

---

## 8. Accessibility & Performance

### Accessibility Features
- Semantic HTML (header, nav, main, section, footer, article)
- ARIA labels for icons and interactive elements
- Keyboard navigation throughout (Tab, Enter, ESC, Arrows)
- Focus management and visible focus indicators
- Alt text on all images
- Color contrast ratios meet WCAG AA
- Form labels properly associated with inputs
- Error messages clearly communicated

### Performance Optimizations
- Code splitting by route (React lazy/Suspense)
- Image lazy loading
- Optimized bundle size (Vite)
- Memoization of expensive components
- Debounced search input
- CSS-in-JS optimizations via Tailwind
- Preload critical resources

---

## 9. Component State Management

### Context Providers

1. **CartProvider** (`client/context/CartContext.tsx`)
   - Manages shopping cart state
   - Methods: addItem, removeItem, updateQuantity, clearCart
   - Persists to localStorage

2. **WishlistProvider** (`client/context/WishlistContext.tsx`)
   - Manages saved items
   - Methods: addItem, removeItem, toggleItem
   - Persists to localStorage

3. **ScrollProvider** (`client/context/scrollContext.tsx`)
   - Tracks if user is on hero section
   - Used by Header to decide BigHeader vs CompactHeader
   - Intersection Observer based

### Hooks

- `useCart()`: Access cart context
- `useWishlist()`: Access wishlist context
- `useScrollContext()`: Access scroll context
- `useSearchParams()`: Router-provided hook for URL params
- `useNavigate()`: Router-provided hook for navigation

---

## 10. Deployment & Environment

### Build Process
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run test     # Run tests
```

### Environment Variables
- `VITE_API_URL`: Backend API endpoint
- `VITE_IMAGE_CDN`: Image CDN URL
- `VITE_PAYMENT_KEY`: Payment provider API key

### Deployment Targets
- **Netlify**: Connected via `netlify.toml`
- **Vercel**: Add `vercel.json` config
- **Docker**: See `Dockerfile` in project root

---

## 11. Testing Notes

### Unit Tests
Located in `lib/` folder with `.spec.ts` files

### E2E Tests
Consider Cypress or Playwright for:
- Cart add/remove flow
- Checkout form submission
- Search functionality
- Filter application

### Manual Testing Checklist
- [ ] Search autocomplete works on all header variants
- [ ] Cart persists across page reloads
- [ ] Wishlist persists across page reloads
- [ ] Checkout button is scroll-stable (no jumping/sticky artifacts)
- [ ] B2B form validates correctly
- [ ] Mobile filters collapse/expand properly
- [ ] Product detail images load and switch correctly
- [ ] All CTAs navigate to correct routes
- [ ] Payment method selection works
- [ ] Terms checkbox enables/disables Place Order
- [ ] Order success clears cart
- [ ] Newsletter form is accessible

---

## 12. Known Limitations & Future Enhancements

### Current Limitations
- Search is client-side only (not scalable for large catalogs)
- No real payment processing (demo only)
- No user authentication (forms are placeholders)
- Image URLs are placeholders
- Cart/Wishlist not synced with server
- No real-time inventory tracking

### Future Enhancements
- [ ] Server-side search with Elasticsearch
- [ ] Real payment gateway integration
- [ ] User authentication & profiles
- [ ] Order history & tracking
- [ ] Product reviews & ratings (user-submitted)
- [ ] Recommendation engine
- [ ] Inventory management
- [ ] Admin dashboard
- [ ] Analytics tracking
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA) features
- [ ] Social sharing buttons
- [ ] Product comparison tool
- [ ] Size/variant selector

---

## 13. Support & Contact

**For Frontend Issues**:
- Check existing GitHub issues
- Review this documentation
- Test in different browsers

**For Backend Integration**:
- Coordinate with backend team on API contracts
- Establish API documentation (OpenAPI/Swagger)
- Plan staging environment testing

**For Design Changes**:
- Update Tailwind config for theme changes
- Maintain design system consistency
- Test responsive behavior across breakpoints

---

**Document Last Updated**: December 2024  
**Next Review**: Q1 2025
