export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: "percentage" | "fixed" | "code";
  value: string;
  coupon: string;
  validity: string;
  image?: string;
  conditions: string[];
}

export interface Combo {
  id: string;
  name: string;
  image: string;
  includedProducts: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: string;
}

export interface OrderStatus {
  status: "pending" | "packed" | "shipped" | "delivered";
  date: string;
  location: string;
  completed: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date?: string;
}

// Payment methods for checkout
export const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay via Google Pay, PhonePe, Paytm, or any UPI app",
    icon: "📱",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: "💳",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "Direct transfer from your bank account",
    icon: "🏦",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered",
    icon: "💵",
  },
];

// Current offers
export const offers: Offer[] = [
  {
    id: "1",
    title: "Flat 30% OFF",
    description: "First-time buyer offer on all products",
    type: "percentage",
    value: "30",
    coupon: "FIRST30",
    validity: "Valid till 31st Dec 2024",
    conditions: [
      "Applicable on minimum purchase of ₹500",
      "First purchase only",
      "Valid on all products",
    ],
  },
  {
    id: "2",
    title: "₹100 OFF",
    description: "On purchases above ₹1000",
    type: "fixed",
    value: "100",
    coupon: "SAVE100",
    validity: "Valid till 15th Dec 2024",
    conditions: [
      "Minimum purchase: ₹1000",
      "Valid for existing customers",
      "Cannot be combined with other offers",
    ],
  },
  {
    id: "3",
    title: "Free Shipping",
    description: "On all orders above ₹499",
    type: "code",
    value: "FREE",
    coupon: "FREESHIPPING",
    validity: "Always valid",
    conditions: ["Orders above ₹499", "Across India", "No minimum purchase"],
  },
];

// Combo offers
export const combos: Combo[] = [
  {
    id: "1",
    name: "Healthy Living Combo",
    image: "https://via.placeholder.com/300x300?text=Combo+1",
    includedProducts: ["Premium Makhana", "Protein Mix", "Organic Honey"],
    originalPrice: 2500,
    discountedPrice: 1899,
    discount: "25%",
  },
  {
    id: "2",
    name: "Weight Loss Bundle",
    image: "https://via.placeholder.com/300x300?text=Combo+2",
    includedProducts: ["Weight Loss Snack", "Raw Almonds", "Green Tea"],
    originalPrice: 1800,
    discountedPrice: 1299,
    discount: "28%",
  },
  {
    id: "3",
    name: "Roasted Variety Pack",
    image: "https://via.placeholder.com/300x300?text=Combo+3",
    includedProducts: [
      "Roasted Cheese",
      "Roasted Spicy",
      "Roasted Original",
    ],
    originalPrice: 1600,
    discountedPrice: 1199,
    discount: "25%",
  },
];

// Product reviews (for product detail page)
export const productReviews: Review[] = [
  {
    id: "1",
    user: "Kavya M.",
    rating: 5,
    comment: "Absolutely love this! Crispy and delicious. Worth the price.",
    date: "Dec 10, 2024",
  },
  {
    id: "2",
    user: "Rohan S.",
    rating: 4,
    comment: "Good quality, fast delivery. Would recommend to friends.",
    date: "Dec 8, 2024",
  },
  {
    id: "3",
    user: "Neha P.",
    rating: 5,
    comment: "Perfect for my diet. Fresh and tasty. Best makhana ever!",
    date: "Dec 5, 2024",
  },
];

// Mock order status for tracking
export const mockOrderStatus: OrderStatus[] = [
  {
    status: "packed",
    date: "Dec 11, 2024",
    location: "DesiiGlobal Warehouse, Delhi",
    completed: true,
  },
  {
    status: "shipped",
    date: "Dec 12, 2024",
    location: "In transit with courier partner",
    completed: false,
  },
  {
    status: "delivered",
    date: "Dec 14, 2024 (Expected)",
    location: "Your doorstep",
    completed: false,
  },
];

// B2B form data
export interface B2BForm {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  productCategory: string;
  approximateQuantity: string;
  message: string;
}

export const initialB2BForm: B2BForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  productCategory: "",
  approximateQuantity: "",
  message: "",
};

// B2B benefits
export interface B2BBenefit {
  icon?: string;
  title: string;
  description: string;
}

export const b2bBenefits: B2BBenefit[] = [
  {
    icon: "📉",
    title: "Bulk Discounts",
    description: "Special pricing for large orders and corporate accounts",
  },
  {
    icon: "📦",
    title: "Custom Packaging",
    description: "White-label and custom branding options available",
  },
  {
    icon: "🚚",
    title: "Flexible Delivery",
    description: "Scheduled deliveries and dedicated logistics support",
  },
  {
    icon: "📞",
    title: "Dedicated Support",
    description: "Account manager and 24/7 customer support",
  },
];
