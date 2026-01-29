# UI Skeleton Components - Quick Reference

## 📁 File Locations

### Section Components (Reusable)
```
client/components/sections/
├── CategoriesSection.tsx       # Shop by category grid
├── BestSellersSection.tsx      # Best sellers products grid
├── WhyDesiiGlobalSection.tsx   # Brand USP section
├── HealthBenefitsSection.tsx   # Health benefits/education
├── TestimonialsSection.tsx     # Customer testimonials
├── OfferCtaSection.tsx         # Limited offer banner
├── NewsletterSection.tsx       # Email newsletter signup
└── SocialProofSection.tsx      # Instagram-style image grid
```

### Page Components
```
client/pages/
├── Index.tsx                   # Home page (all sections)
├── Shop.tsx                    # Product shop with filters
├── CategoryMakhana.tsx         # Makhana category page
├── CategoryRoasted.tsx         # Roasted Flavours category
├── CategoryProtein.tsx         # Protein Snacks category
├── CategoryWeightLoss.tsx      # Weight Loss category
├── Combos.tsx                  # Combo deals page
├── Offers.tsx                  # Special offers page
├── About.tsx                   # About us page
├── Contact.tsx                 # Contact us page
├── TrackOrder.tsx              # Track order page
├── NotFound.tsx                # 404 page (existing)
└── App.tsx                     # Router configuration
```

## 🎯 Component Quick Stats

| Component | Location | Items | Type |
|-----------|----------|-------|------|
| Categories | sections | 4 items | Grid |
| Best Sellers | sections | 4 products | Cards |
| USP Points | sections | 4 points | Badges |
| Benefits | sections | 4 benefits | Cards |
| Testimonials | sections | 4 reviews | Cards |
| Offer | sections | 1 banner | Section |
| Newsletter | sections | form | Form |
| Social Proof | sections | 8 images | Grid |
| Combos | pages/Combos | 4 combos | Cards |
| Offers | pages/Offers | 4 offers | Cards |
| Categories | pages/* | varied | Nested |

## 🔗 Route Mappings

```typescript
// Home & Main
"/"                    → Index.tsx

// Products & Categories
"/shop"                → Shop.tsx
"/category/makhana"    → CategoryMakhana.tsx
"/category/roasted-flavours" → CategoryRoasted.tsx
"/category/protein-snacks" → CategoryProtein.tsx
"/category/weight-loss" → CategoryWeightLoss.tsx

// Special Pages
"/combos"              → Combos.tsx
"/offers"              → Offers.tsx

// Info & Support
"/about"               → About.tsx
"/contact"             → Contact.tsx
"/track-order"         → TrackOrder.tsx
```

## 📦 Component Dependencies

### Page Dependencies
```
Index.tsx
  ├── Header (existing)
  ├── Footer (existing)
  ├── Container
  ├── FeatureCard (existing)
  └── Section Components (new)
      ├── CategoriesSection
      ├── BestSellersSection
      ├── WhyDesiiGlobalSection
      ├── HealthBenefitsSection
      ├── TestimonialsSection
      ├── OfferCtaSection
      ├── NewsletterSection
      └── SocialProofSection

Shop.tsx
  ├── Header
  ├── Footer
  ├── Container
  └── ProductCard (existing)

Category Pages (Makhana, Roasted, Protein, Weight Loss)
  ├── Header
  ├── Footer
  ├── Container
  └── ProductCard

Combos.tsx
  ├── Header
  ├── Footer
  ├── Container
  └── Icons (ArrowRight)

Offers.tsx
  ├── Header
  ├── Footer
  ├── Container
  └── Icons (ArrowRight)

About.tsx
  ├── Header
  ├── Footer
  └── Container

Contact.tsx
  ├── Header
  ├── Footer
  ├── Container
  └── Icons (Mail, Phone, MapPin, Clock)

TrackOrder.tsx
  ├── Header
  ├── Footer
  ├── Container
  └── Icons (Search, CheckCircle, Clock)
```

## 🎨 Styling

All components use:
- **Tailwind CSS** - utility classes only
- **Brand colors** - from `tailwind.config.ts`
- **Responsive design** - mobile-first approach
- **No inline styles** - pure Tailwind utilities
- **Semantic spacing** - py-12, gap-6, etc.

## 📝 Data Structure Examples

### Product
```typescript
{
  id: "1",
  image: "url",
  title: "Product Name",
  price: "₹249 – ₹1,099",
  badge?: "Sale!",
  category?: "makhana",
  link?: "/product/1"
}
```

### Category
```typescript
{
  id: "1",
  name: "Makhana",
  image: "url",
  slug: "makhana"
}
```

### Testimonial
```typescript
{
  id: "1",
  name: "John Doe",
  city: "Mumbai",
  rating: 5,
  text: "Review text..."
}
```

### Combo
```typescript
{
  id: "1",
  name: "Fitness Combo",
  image: "url",
  includedProducts: ["Product 1", "Product 2"],
  originalPrice: 1099,
  discountedPrice: 799,
  discount: 27
}
```

### Offer
```typescript
{
  id: "1",
  title: "30% Off",
  description: "New customer exclusive",
  type: "percentage",
  value: 30,
  coupon: "FIRST30",
  validity: "Till 31st Dec",
  image: "url",
  conditions: "Min ₹499"
}
```

## ✅ Implementation Checklist

- [x] 8 section components created
- [x] 12 page components created/updated
- [x] App.tsx routing configured
- [x] All Tailwind colors integrated
- [x] Responsive design implemented
- [x] Forms with state management
- [x] Icon integration (Lucide React)
- [x] Placeholder images
- [x] TypeScript interfaces
- [x] Component documentation

## 🚀 Next Steps

1. Replace placeholder images with real product images
2. Connect to backend APIs for data fetching
3. Implement real form submissions
4. Add authentication flow
5. Implement shopping cart functionality
6. Add payment gateway integration
7. Setup order tracking system
8. Configure email notifications

## 💡 Tips for Development

- **Placeholder URLs**: `https://via.placeholder.com/300x300?text=Your+Text`
- **Color variables**: Always use `brand-*` classes (e.g., `text-brand-purple`)
- **Responsive**: Always include mobile, tablet, and desktop layouts
- **Forms**: Use `onChange` for state and `onSubmit` for form handling
- **Grid layouts**: Use responsive cols (e.g., `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`)
- **Images**: Use `aspect-*` for consistent ratios
- **Links**: Use `<Link>` from react-router-dom
- **Icons**: Use Lucide React from lucide-react

## 📞 Support

For detailed component documentation, see `UI_SKELETON_DOCUMENTATION.md`
