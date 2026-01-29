import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

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

const offers: Offer[] = [
  {
    id: "1",
    title: "30% Off on First Order",
    description: "New customer exclusive offer",
    type: "percentage",
    value: 30,
    coupon: "FIRST30",
    validity: "Valid till 31st Dec 2025",
    image: "https://via.placeholder.com/500x200?text=First+Order",
    conditions: "Min purchase ₹499",
  },
  {
    id: "2",
    title: "Flat ₹300 Off",
    description: "On purchases above ₹1500",
    type: "flat",
    value: 300,
    coupon: "FLAT300",
    validity: "Valid till 15th Jan 2026",
    image: "https://via.placeholder.com/500x200?text=Flat+Discount",
    conditions: "Min purchase ₹1500",
  },
  {
    id: "3",
    title: "Buy 2 Get 1 Free",
    description: "On selected products",
    type: "percentage",
    value: 33,
    coupon: "BUY2GET1",
    validity: "Limited time offer",
    image: "https://via.placeholder.com/500x200?text=Buy2Get1",
    conditions: "On selected items only",
  },
  {
    id: "4",
    title: "Free Shipping",
    description: "On all orders above ₹499",
    type: "coupon",
    value: "FREE SHIPPING",
    coupon: "FREESHIP",
    validity: "Always active",
    image: "https://via.placeholder.com/500x200?text=Free+Shipping",
    conditions: "Applicable on all orders",
  },
];

export default function Offers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Special Offers
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Don't miss out on our amazing deals and exclusive discounts.
                Shop smart and save more!
              </p>
            </div>
          </Container>
        </section>

        {/* Active Offers */}
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-bold text-brand-purple-dark mb-8">
              Active Offers
            </h2>

            <div className="space-y-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-brand-gray-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="md:col-span-1 bg-brand-gray-lightest aspect-square md:aspect-auto overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-brand-purple-dark mb-2">
                            {offer.title}
                          </h3>
                          <p className="text-brand-gray text-base mb-3">
                            {offer.description}
                          </p>
                        </div>
                        {offer.type === "percentage" && (
                          <div className="bg-brand-red text-white px-4 py-2 rounded-full whitespace-nowrap ml-4">
                            <span className="text-2xl font-bold">{offer.value}%</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                          <p className="text-sm font-semibold text-brand-blue-dark mb-1">
                            Use Code
                          </p>
                          <div className="flex items-center gap-2">
                            <code className="bg-brand-gray-lighter px-3 py-2 rounded-md font-mono font-bold text-brand-blue-dark">
                              {offer.coupon}
                            </code>
                            <button className="p-2 hover:bg-brand-gray-lighter rounded transition-colors">
                              <span className="text-sm">📋</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-brand-blue-dark mb-1">
                            Validity
                          </p>
                          <p className="text-sm text-brand-gray">{offer.validity}</p>
                        </div>
                        {offer.conditions && (
                          <div>
                            <p className="text-sm font-semibold text-brand-blue-dark mb-1">
                              Conditions
                            </p>
                            <p className="text-sm text-brand-gray">{offer.conditions}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-3 px-4 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity">
                        Shop Now
                      </button>
                      <button className="py-3 px-4 border border-brand-gray-border rounded-md hover:bg-brand-gray-lighter transition-colors flex items-center gap-2 justify-center">
                        <span>Share</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Terms Section */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h2 className="text-2xl font-bold text-brand-purple-dark mb-8">
                Offer Terms & Conditions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark mb-4">
                    General Terms
                  </h4>
                  <ul className="text-sm text-brand-gray-light space-y-2">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Offers are valid for limited time only</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Cannot be combined with other offers</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>One coupon code per transaction</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Valid on online purchases only</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark mb-4">
                    Eligibility
                  </h4>
                  <ul className="text-sm text-brand-gray-light space-y-2">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Minimum purchase amount as mentioned</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Valid for new and existing customers</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Discount applied at checkout</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>We reserve the right to cancel offers</span>
                    </li>
                  </ul>
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
