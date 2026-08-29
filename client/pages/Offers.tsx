import { ArrowRight, Tag, Truck, Percent, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { toast } from "sonner";

interface OfferCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  code?: string;
  highlight: string;
  conditions: string;
  icon: typeof Tag;
  iconBg: string;
  iconColor: string;
}

const activeOffers: OfferCard[] = [
  {
    id: "welcome10",
    badge: "New Customer Special",
    title: "10% Off on Your Order",
    description: "Enjoy a flat 10% instant discount across all organic makhana products when placing your order.",
    code: "WELCOME10",
    highlight: "10% INSTANT OFF",
    conditions: "Automatically verified and applied by the backend pricing engine at checkout.",
    icon: Percent,
    iconBg: "bg-purple-100",
    iconColor: "text-brand-purple",
  },
  {
    id: "free-delivery",
    badge: "All Customers",
    title: "Free Express Shipping Across India",
    description: "Orders above ₹499 qualify for 100% free home delivery with premium Shiprocket logistics.",
    highlight: "FREE SHIPPING ON ₹499+",
    conditions: "Cart taxable amount must be ₹499 or higher. Shipping fee absorbed by merchant.",
    icon: Truck,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    id: "flat100",
    badge: "Cart Booster",
    title: "Flat ₹100 Off on Bulk Cart",
    description: "Stock up on healthy family snacking and get a flat ₹100 discount on orders exceeding ₹999.",
    code: "SAVE100",
    highlight: "FLAT ₹100 OFF",
    conditions: "Minimum cart subtotal of ₹999. Calculated automatically at checkout.",
    icon: Tag,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    id: "b2b-wholesale",
    badge: "B2B & Retailers",
    title: "Custom Bulk & Corporate Pricing",
    description: "Planning large corporate gifts, wedding favors, or retail distribution? Get direct wholesale tiered rates.",
    highlight: "TIERED WHOLESALE RATES",
    conditions: "Minimum order quantity applies. Inquire via our dedicated B2B portal.",
    icon: Sparkles,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
];

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg py-12 md:py-16 border-b border-brand-purple/10">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-xs uppercase tracking-wider mb-3">
                Live Pricing Rules & Discounts
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-purple-dark mb-3">
                Offers & Promotions
              </h1>
              <p className="text-brand-gray text-base md:text-lg">
                All discounts and free shipping benefits are calculated authoritatively in real-time at checkout.
              </p>
            </div>
          </Container>
        </section>

        {/* Active Offers Grid */}
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeOffers.map((offer) => {
                const Icon = offer.icon;
                return (
                  <div
                    key={offer.id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${offer.iconBg} ${offer.iconColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={24} />
                        </div>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {offer.badge}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {offer.title}
                      </h2>
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {offer.description}
                      </p>

                      <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 mb-6">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Offer Highlight:
                        </p>
                        <p className="text-sm font-bold text-brand-purple">
                          {offer.highlight}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {offer.conditions}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
                      {offer.code ? (
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-purple-50 text-brand-purple font-mono font-bold text-sm rounded-lg border border-purple-200">
                            {offer.code}
                          </span>
                          <button
                            onClick={() => handleCopy(offer.code!)}
                            className="p-2 text-gray-500 hover:text-brand-purple hover:bg-purple-50 rounded-lg transition-colors"
                            title="Copy code"
                          >
                            {copiedCode === offer.code ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                          Auto-Applied in Cart
                        </span>
                      )}

                      {offer.id === "b2b-wholesale" ? (
                        <Link
                          to="/b2b"
                          className="px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center gap-2"
                        >
                          B2B Portal <ArrowRight size={16} />
                        </Link>
                      ) : (
                        <Link
                          to="/shop"
                          className="px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center gap-2"
                        >
                          Shop Now <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
