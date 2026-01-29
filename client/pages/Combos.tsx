import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

interface Combo {
  id: string;
  name: string;
  image: string;
  includedProducts: string[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

const combos: Combo[] = [
  {
    id: "1",
    name: "Fitness Combo",
    image: "https://via.placeholder.com/300x300?text=Fitness+Combo",
    includedProducts: [
      "Protein Makhana Mix",
      "Raw Almonds",
      "Mixed Nuts Pack",
    ],
    originalPrice: 1099,
    discountedPrice: 799,
    discount: 27,
  },
  {
    id: "2",
    name: "Weight Loss Bundle",
    image: "https://via.placeholder.com/300x300?text=Weight+Loss+Bundle",
    includedProducts: [
      "Low Calorie Makhana",
      "High Fibre Mix",
      "Keto-Friendly Pack",
    ],
    originalPrice: 899,
    discountedPrice: 599,
    discount: 33,
  },
  {
    id: "3",
    name: "Taste Explosion Pack",
    image: "https://via.placeholder.com/300x300?text=Taste+Pack",
    includedProducts: [
      "Cheese & Herbs Makhana",
      "Spicy Masala Makhana",
      "Salted Caramel Makhana",
    ],
    originalPrice: 899,
    discountedPrice: 649,
    discount: 28,
  },
  {
    id: "4",
    name: "Premium Wellness Box",
    image: "https://via.placeholder.com/300x300?text=Wellness+Box",
    includedProducts: [
      "Premium Makhana Original",
      "Premium Cashews",
      "Organic Honey",
    ],
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 31,
  },
];

export default function Combos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Combo Deals
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Get more value with our specially curated combo packages.
                Mix and match your favourites at unbeatable prices.
              </p>
            </div>
          </Container>
        </section>

        {/* Combos Grid */}
        <Container>
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {combos.map((combo) => (
                <div
                  key={combo.id}
                  className="flex flex-col border border-brand-gray-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden bg-brand-gray-lightest aspect-video">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save {combo.discount}%
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-4 p-6 flex-1">
                    <h3 className="text-xl font-bold text-brand-purple-dark">
                      {combo.name}
                    </h3>

                    {/* Included Products */}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-brand-blue-dark mb-2">
                        Includes:
                      </p>
                      <ul className="text-sm text-brand-gray-light space-y-1">
                        {combo.includedProducts.map((product, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-green mt-0.5">✓</span>
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-brand-gray-border pt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-brand-purple">
                          ₹{combo.discountedPrice}
                        </span>
                        <span className="text-lg text-brand-gray-light line-through">
                          ₹{combo.originalPrice}
                        </span>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 px-4 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        Add to Cart <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Why Choose Combos */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark text-center mb-8">
                Why Choose Our Combos?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                    💰
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    Big Savings
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Save up to 33% compared to buying individually
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                    🎁
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    Variety Pack
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Try multiple products in one purchase
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                    🚚
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    Convenient
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    All products shipped together in one box
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
