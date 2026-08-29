import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

interface ComboItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  includedProducts: { name: string; slug: string }[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
}

const comboPacks: ComboItem[] = [
  {
    id: "spicy-trio",
    name: "Spicy & Savoury Flavour Trio",
    badge: "Most Popular",
    description: "Our bestselling slow-roasted spice collection. Bold, aromatic, and full of zest.",
    image: "https://i.ibb.co/wh35SSK9/Peri-Peri.webp",
    includedProducts: [
      { name: "Peri Peri Roasted Makhana", slug: "peri-peri-makhana" },
      { name: "Black Pepper Makhana", slug: "black-pepper-makhana" },
      { name: "Creamy Onion Garlic Makhana", slug: "creamy-onion-garlic-makhana" },
    ],
    originalPrice: 747,
    comboPrice: 649,
    savings: 98,
  },
  {
    id: "sweet-savoury-pair",
    name: "Sweet & Herbal Snack Pair",
    badge: "Chef's Choice",
    description: "The ideal balance of traditional jaggery sweetness with refreshing garden mint.",
    image: "https://i.ibb.co/q85Tpk1/Gud-Til.webp",
    includedProducts: [
      { name: "Gud & Til Sweet Makhana", slug: "gud-til-makhana" },
      { name: "Mint Roasted Makhana", slug: "mint-roasted-makhana" },
    ],
    originalPrice: 548,
    comboPrice: 479,
    savings: 69,
  },
  {
    id: "family-healthy-pack",
    name: "Daily Wellness Family Pack",
    badge: "Best Value",
    description: "Premium plain organic makhana family packs for wholesome daily home roasting and snacking.",
    image: "https://i.ibb.co/mPRjZ5t/Plain-Makhana-250g.webp",
    includedProducts: [
      { name: "Premium Plain Makhana 250g", slug: "premium-plain-makhana-250g" },
      { name: "Premium Plain Makhana 100g", slug: "premium-plain-makhana-100g" },
    ],
    originalPrice: 698,
    comboPrice: 599,
    savings: 99,
  },
  {
    id: "mega-makhana-sampler",
    name: "Complete 5-Flavour Explorer Box",
    badge: "Ultimate Sampler",
    description: "One pack of each signature flavour. Perfect for gifting and discovering your personal favourite.",
    image: "https://i.ibb.co/8LCCRj7w/Creamy-Onion-Garlic.webp",
    includedProducts: [
      { name: "Black Pepper Makhana", slug: "black-pepper-makhana" },
      { name: "Creamy Onion Garlic Makhana", slug: "creamy-onion-garlic-makhana" },
      { name: "Peri Peri Makhana", slug: "peri-peri-makhana" },
      { name: "Mint Roasted Makhana", slug: "mint-roasted-makhana" },
      { name: "Gud & Til Makhana", slug: "gud-til-makhana" },
    ],
    originalPrice: 1295,
    comboPrice: 1099,
    savings: 196,
  },
];

export default function Combos() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg py-12 md:py-16 border-b border-brand-purple/10">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-xs uppercase tracking-wider mb-3">
                Curated Value Packs
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-purple-dark mb-3">
                Combo Deals & Collections
              </h1>
              <p className="text-brand-gray text-base md:text-lg">
                Explore our handpicked multi-flavour pairings and family bundles. Enjoy premium organic snacking with maximum savings.
              </p>
            </div>
          </Container>
        </section>

        {/* Combos Grid */}
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comboPacks.map((combo) => (
                <div
                  key={combo.id}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      {/* Product Image */}
                      <div className="w-full sm:w-40 h-40 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 relative">
                        <img
                          src={combo.image}
                          alt={combo.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-1 bg-brand-purple text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                          {combo.badge}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                          {combo.name}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {combo.description}
                        </p>
                        
                        {/* Included Real Products */}
                        <div className="space-y-1.5 pt-2 border-t border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Included In This Pack:
                          </p>
                          {combo.includedProducts.map((prod) => (
                            <Link
                              key={prod.slug}
                              to={`/product/${prod.slug}`}
                              className="flex items-center gap-2 text-xs font-medium text-brand-purple hover:underline"
                            >
                              <Check size={13} className="text-green-600 flex-shrink-0" />
                              <span className="truncate">{prod.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="bg-gray-50/70 px-6 py-4 md:px-8 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-brand-purple-dark">
                          ₹{combo.comboPrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{combo.originalPrice}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-green-100/80 px-2 py-0.5 rounded-md">
                        Save ₹{combo.savings}
                      </span>
                    </div>

                    <Link
                      to="/shop"
                      className="px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center gap-2 shadow-sm"
                    >
                      <ShoppingBag size={16} />
                      Shop Pack Flavours
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
