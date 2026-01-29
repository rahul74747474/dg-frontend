export interface Category {
  id?: string;
  value: string;
  label: string;
  image?: string;
  slug?: string;
  productCount?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

// Homepage categories
export const categories: Category[] = [
  {
    id: "1",
    value: "makhana",
    label: "Makhana",
    image: "https://via.placeholder.com/300x300?text=Makhana",
    slug: "makhana",
  },
  {
    id: "2",
    value: "roasted-flavours",
    label: "Roasted Flavours",
    image: "https://via.placeholder.com/300x300?text=Roasted",
    slug: "roasted-flavours",
  },
  {
    id: "3",
    value: "protein-snacks",
    label: "Protein Snacks",
    image: "https://via.placeholder.com/300x300?text=Protein",
    slug: "protein-snacks",
  },
  {
    id: "4",
    value: "weight-loss",
    label: "Weight Loss",
    image: "https://via.placeholder.com/300x300?text=Weight+Loss",
    slug: "weight-loss",
  },
];

// Shop categories with product count
export const shopCategories: Category[] = [
  {
    id: "1",
    value: "makhana",
    label: "Makhana",
    image: "https://via.placeholder.com/300x300?text=Makhana",
    slug: "makhana",
    productCount: 12,
  },
  {
    id: "2",
    value: "roasted-flavours",
    label: "Roasted Flavours",
    image: "https://via.placeholder.com/300x300?text=Roasted",
    slug: "roasted-flavours",
    productCount: 8,
  },
  {
    id: "3",
    value: "protein-snacks",
    label: "Protein Snacks",
    image: "https://via.placeholder.com/300x300?text=Protein",
    slug: "protein-snacks",
    productCount: 6,
  },
  {
    id: "4",
    value: "weight-loss",
    label: "Weight Loss",
    image: "https://via.placeholder.com/300x300?text=Weight+Loss",
    slug: "weight-loss",
    productCount: 10,
  },
];

// Filter options for shop page
export const categoryFilters: FilterOption[] = [
  { value: "", label: "All Categories" },
  { value: "makhana", label: "Makhana" },
  { value: "roasted-flavours", label: "Roasted Flavours" },
  { value: "protein-snacks", label: "Protein Snacks" },
  { value: "weight-loss", label: "Weight Loss" },
];

export const priceRanges: FilterOption[] = [
  { value: "", label: "All Prices" },
  { value: "0-300", label: "Under ₹300" },
  { value: "300-600", label: "₹300 – ₹600" },
  { value: "600-1000", label: "₹600 – ₹1,000" },
  { value: "1000", label: "Above ₹1,000" },
];

export const sortOptions: FilterOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

// Navigation categories for header
export const navCategories = [
  "SHOP MAKHANA",
  "ROASTED FLAVOURS",
  "PROTEIN SNACKS",
  "WEIGHT LOSS",
  "COMBOS",
  "OFFERS",
  "TRACK ORDER",
];

// B2B form categories
export const b2bProductCategories: FilterOption[] = [
  { value: "", label: "Select a category" },
  { value: "makhana", label: "Makhana" },
  { value: "roasted-flavours", label: "Roasted Flavours" },
  { value: "protein-snacks", label: "Protein Snacks" },
  { value: "weight-loss", label: "Weight Loss" },
  { value: "combos", label: "Combos" },
  { value: "custom", label: "Custom Orders" },
];

// Flavor options for category pages
export const makhanaFlavours: string[] = ["All", "Original", "Cheese & Herbs", "Spicy", "BBQ"];

export const roastedFlavours: string[] = [
  "All Flavours",
  "Cheese & Herbs",
  "Spicy",
  "Caramel",
  "Original",
];
