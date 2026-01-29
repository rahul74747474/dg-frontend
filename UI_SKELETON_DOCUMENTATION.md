# DesiiGlobal UI Skeleton Implementation

## Overview
This document outlines the comprehensive structural UI skeletons created for the DesiiGlobal ecommerce platform. All components are built with placeholder content and are ready for integration with real data.

## Key Principles Used
- ✅ Structural/wireframe layouts only (no final UI designs)
- ✅ Dummy placeholder content throughout
- ✅ Gray blocks/neutral containers for images
- ✅ No hardcoded brand colors (using Tailwind theme variables)
- ✅ No inline CSS (all Tailwind utilities)
- ✅ Reusable React components
- ✅ Mobile-first, responsive design
- ✅ Arrays with `.map()` for all repeated UI
- ✅ Clean JSX/TSX code

## Component Structure

### Section Components (`client/components/sections/`)

#### 1. **CategoriesSection.tsx**
Purpose: Shop by category display
- Grid layout with 4 categories (Makhana, Roasted Flavours, Protein Snacks, Weight Loss)
- Clickable category cards with image placeholders
- Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop
- Uses: Container, SectionHeader

#### 2. **BestSellersSection.tsx**
Purpose: Social proof & fast conversion with trending products
- 4 product cards with images, titles, prices, and badges
- ProductCard component integration
- Responsive grid layout
- Uses: ProductCard, Container, SectionHeader

#### 3. **WhyDesiiGlobalSection.tsx**
Purpose: Brand differentiation and USP
- Section heading and brand description
- 4 USP points: Farm Direct, No Preservatives, Lab Tested, Fresh Packing
- Circle badge design for each point
- Uses: Container

#### 4. **HealthBenefitsSection.tsx**
Purpose: Educational content about product benefits
- Section heading and intro text
- 4 benefit cards with icons and descriptions
- Benefits: Rich in Protein, Low Carb, Gluten Free, High Fiber
- Uses: Container

#### 5. **TestimonialsSection.tsx**
Purpose: Trust & credibility through customer reviews
- 4 testimonial cards with 5-star ratings
- Customer name, city, and review text
- Star rating component with Lucide icons
- Uses: Container, Lucide React icons

#### 6. **OfferCtaSection.tsx**
Purpose: Create urgency with limited-time offers
- Gradient background banner (purple to blue)
- Offer headline, code, countdown timer placeholder
- "Shop Now" CTA button
- Uses: Container, Link, ArrowRight icon

#### 7. **NewsletterSection.tsx**
Purpose: Email capture for retention
- Email input field
- Subscribe button
- Privacy notice
- Form submission handling (placeholder)
- Uses: Container

#### 8. **SocialProofSection.tsx**
Purpose: Authenticity through social proof
- 8-image grid placeholder (Instagram-style)
- Image hover effects
- Responsive layout: 2 cols mobile, 4 cols desktop
- Uses: Container

### Page Components (`client/pages/`)

#### **Index.tsx** (Home Page)
Composed of:
- Hero section with CTA
- Feature cards (COD, Quality, Delivery, Offers)
- CategoriesSection
- BestSellersSection
- WhyDesiiGlobalSection
- HealthBenefitsSection
- TestimonialsSection
- OfferCtaSection
- SocialProofSection
- NewsletterSection

#### **Shop.tsx**
Features:
- Page heading and description
- Sidebar filters (mobile-responsive toggle):
  - Category filter (6 options)
  - Price range filter (5 ranges)
  - Clear filters button
- Product grid (2 cols mobile, 3 cols tablet, 3 cols desktop)
- Sort dropdown (Relevance, Price, Newest)
- Pagination placeholder (Previous, 1, 2, 3, Next)
- Empty state when no products found
- ProductCard integration

#### **CategoryMakhana.tsx**
Features:
- Category banner with description
- Flavour selection tabs
- Product grid
- Nutrition highlight strip (3 cards: High Protein, Low Calorie, Gluten Free)

#### **CategoryRoasted.tsx**
Features:
- Category banner
- Flavour selection (5 flavours)
- Product grid
- Taste & nutrition highlight (4 cards)

#### **CategoryProtein.tsx**
Features:
- Category banner
- Benefit highlight section (3 cards)
- Product grid
- Comparison strip (Our vs Regular Snacks)

#### **CategoryWeightLoss.tsx**
Features:
- Category banner
- Educational intro section
- Stats display (Calories, Protein, Fibre)
- Product grid
- Health tips section (4 numbered tips)

#### **Combos.tsx**
Features:
- Page heading
- 4 combo cards with:
  - Image
  - Included products list
  - Original & discounted prices
  - Save % badge
  - Add to Cart button
- Why choose combos section (3 benefits)

#### **Offers.tsx**
Features:
- Active offers list (4 offers)
- Offer cards with:
  - Image
  - Title, description
  - Coupon code
  - Validity date
  - Terms & conditions
  - Shop Now & Share buttons
- Terms & conditions section

#### **TrackOrder.tsx**
Features:
- Search form (Order ID, Email)
- Order status display (after search):
  - Order summary
  - Order items
  - Delivery timeline with progress
  - Shipping address
  - Help section
- FAQ section (3 questions)
- Reset/new search button

#### **About.tsx**
Features:
- Hero section
- Brand story section
- Mission & vision cards
- Why we started (3 reasons)
- Sourcing & quality promise (4 points)
- Brand values (4 cards: Transparency, Quality, Sustainability, Care)
- Stats section (50K customers, 500+ farms, 100% organic, 5⭐ rating)
- Contact CTA

#### **Contact.tsx**
Features:
- Contact form with fields:
  - Full name
  - Email
  - Subject dropdown
  - Message textarea
  - Submit button
- Success message on submission
- Contact information (Email, Phone, Address, Hours)
- Social links placeholder
- Map placeholder
- FAQ section (4 questions)

## Database/State Structure

All components use local state with placeholder data arrays. Example structure:

```typescript
interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  badge?: string;
  category?: string;
  link?: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface Testimonial {
  id: string;
  name: string;
  city?: string;
  rating: number;
  text: string;
}

interface Combo {
  id: string;
  name: string;
  image: string;
  includedProducts: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  type: "percentage" | "flat" | "coupon";
  value: string | number;
  coupon?: string;
  validity: string;
  image: string;
  conditions?: string;
}
```

## Routing Structure

```
/ → Index (Home)
/shop → Shop (Products)
/category/makhana → Category: Makhana
/category/roasted-flavours → Category: Roasted Flavours
/category/protein-snacks → Category: Protein Snacks
/category/weight-loss → Category: Weight Loss
/combos → Combo Deals
/offers → Special Offers
/about → About Us
/contact → Contact Us
/track-order → Track Order
```

## Design System Integration

All components use the existing Tailwind theme from `tailwind.config.ts`:

**Color Palette:**
- `brand-purple`: #704FE6
- `brand-purple-dark`: #39245F
- `brand-green`: #236D3F
- `brand-green-light`: #B9E9BE
- `brand-blue`: #1346AF
- `brand-blue-dark`: #28375A
- `brand-gray`: #808080
- `brand-gray-dark`: #2B2B2B
- `brand-gray-light`: #8F8F8F
- `brand-gray-lighter`: #EAEAEA
- `brand-peach-bg`: #FEE7D7

**Font Families:**
- `font-poppins`: Poppins (primary)
- `font-quicksand`: Quicksand
- `font-inter`: Inter

**Spacing & Sizing:**
- Uses Tailwind's standard spacing scale
- Container max-width: 7xl with responsive padding
- Section padding: py-12 (48px) standard

## Next Steps for Implementation

1. **API Integration**
   - Connect to backend/database for real product data
   - Implement search and filtering functionality
   - Add cart and checkout functionality

2. **Authentication**
   - User login/signup forms
   - Account management pages
   - Order history

3. **Payment Integration**
   - Payment gateway setup
   - Coupon/discount code validation
   - Invoice generation

4. **Notifications**
   - Toast notifications (already integrated with Sonner)
   - Email notifications
   - SMS/WhatsApp integration

5. **Optimization**
   - Image optimization and lazy loading
   - Performance monitoring
   - SEO optimization

## Notes for Developers

- All image placeholders use `https://via.placeholder.com/`
- Form submissions are placeholder functions (console.log)
- Pagination is UI-only (no actual pagination logic)
- Search/filter functionality is skeleton-level
- All data is local state (no API calls yet)
- Ready for integration with real backend APIs
- Components follow React best practices
- TypeScript is used throughout for type safety
- Tailwind CSS used exclusively (no inline styles)
