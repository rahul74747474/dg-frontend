export interface Testimonial {
  id: string;
  name: string;
  city?: string;
  rating: number;
  text: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface USPPoint {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

// Customer testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    city: "Mumbai",
    rating: 5,
    text: "Best makhana I've ever tasted! Fresh and healthy. Highly recommend DesiiGlobal for all wellness snacks.",
  },
  {
    id: "2",
    name: "Amit Patel",
    city: "Delhi",
    rating: 5,
    text: "Quality is excellent and delivery was fast. The products are genuinely organic as promised.",
  },
  {
    id: "3",
    name: "Sneha Gupta",
    city: "Bangalore",
    rating: 4,
    text: "Love the taste and health benefits. My whole family enjoys these snacks. Worth every penny!",
  },
  {
    id: "4",
    name: "Rajesh Kumar",
    city: "Pune",
    rating: 5,
    text: "Finally found genuine organic products at reasonable prices. Customer service is great too!",
  },
];

// Health benefits for makhana
export const healthBenefits: Benefit[] = [
  {
    id: "1",
    title: "100% Organic",
    description: "Cultivated without synthetic pesticides or chemicals. Pure nature in every bite.",
  },
  {
    id: "2",
    title: "High in Protein",
    description: "Rich in plant-based protein for muscle building and repair.",
  },
  {
    id: "3",
    title: "Low Glycemic Index",
    description: "Helps maintain steady blood sugar levels. Perfect for diabetics.",
  },
  {
    id: "4",
    title: "Rich in Antioxidants",
    description: "Loaded with antioxidants to fight oxidative stress and boost immunity.",
  },
];

// Why DesiiGlobal USP points
export const uspPoints: USPPoint[] = [
  {
    id: "1",
    title: "🚜 Farm Direct",
    description: "Direct sourcing from certified organic farms. No middlemen. Maximum freshness.",
  },
  {
    id: "2",
    title: "🌿 No Preservatives",
    description: "100% natural. Zero artificial additives, colors, or preservatives.",
  },
  {
    id: "3",
    title: "🏆 Quality Assured",
    description: "Tested for purity and safety at every step. Certified organic products only.",
  },
  {
    id: "4",
    title: "💨 Fast Delivery",
    description: "Ships within 24 hours. Fresh delivery to your doorstep across India.",
  },
];

// Homepage feature cards
export const featureCards: FeatureCard[] = [
  {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/6f83cf22ae9e3825cd531d1d5ba0109539c27dd1?width=115",
    title: "COD Available",
    description: "Pay only when your order arrives at your doorstep",
  },
  {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/7da434a4edf75bbed191417e79c0fbebb24b2dc8?width=115",
    title: "Quality Assurance",
    description: "Premium, tested, and hygienically packed products",
  },
  {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/b36a8620335ceaf167c31d6f747bd0126e6927b0?width=115",
    title: "Fast Delivery",
    description: "Quick, safe, and reliable delivery across India",
  },
  {
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/ff49af4c42b10b149884390f199bda5e7ac0c04a?width=115",
    title: "Best Prices & Offers",
    description: "Direct-from-source pricing with exciting deals",
  },
];

// Social proof images
export interface SocialImage {
  id: string;
  image: string;
  alt: string;
}

export const socialImages: SocialImage[] = [
  {
    id: "1",
    image: "https://via.placeholder.com/200x200?text=Customer+1",
    alt: "Customer enjoying makhana",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/200x200?text=Customer+2",
    alt: "Healthy snacking lifestyle",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/200x200?text=Customer+3",
    alt: "Family wellness",
  },
  {
    id: "4",
    image: "https://via.placeholder.com/200x200?text=Customer+4",
    alt: "DesiiGlobal community",
  },
  {
    id: "5",
    image: "https://via.placeholder.com/200x200?text=Customer+5",
    alt: "Customer satisfaction",
  },
  {
    id: "6",
    image: "https://via.placeholder.com/200x200?text=Customer+6",
    alt: "Quality products",
  },
];

// Trust badges for checkout
export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    icon: "🔒",
    title: "Secure Checkout",
    description: "Your data is encrypted and safe",
  },
  {
    icon: "✓",
    title: "Quick Delivery",
    description: "Delivered in 2-3 business days",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "We're here to help anytime",
  },
];
