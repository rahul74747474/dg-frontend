import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";
import { useState } from "react";

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  badge?: string;
}

const makhanaProducts: Product[] = [
  {
    id: "m1",
    image: "https://via.placeholder.com/300x300?text=Makhana+Original",
    title: "Premium Makhana - Original",
    price: "₹249 – ₹1,099",
    badge: "Best Seller",
  },
  {
    id: "m2",
    image: "https://via.placeholder.com/300x300?text=Makhana+Cheese",
    title: "Makhana - Cheese & Herbs",
    price: "₹299 – ₹1,199",
  },
  {
    id: "m3",
    image: "https://via.placeholder.com/300x300?text=Makhana+Spicy",
    title: "Makhana - Spicy Masala",
    price: "₹299 – ₹1,199",
  },
  {
    id: "m4",
    image: "https://via.placeholder.com/300x300?text=Makhana+Sweet",
    title: "Makhana - Sweet & Tangy",
    price: "₹279 – ₹1,099",
  },
];

const flavours = ["All", "Original", "Cheese & Herbs", "Spicy Masala", "Sweet & Tangy"];

export default function CategoryMakhana() {
  const [selectedFlavour, setSelectedFlavour] = useState("All");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Banner */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Shop Makhana
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Discover our premium selection of freshly roasted makhana sourced directly
                from certified organic farms. Rich in protein and perfect for guilt-free snacking.
              </p>
            </div>
          </Container>
        </section>

        {/* Flavour Tabs */}
        <Container>
          <div className="py-8">
            <h3 className="font-poppins font-semibold text-brand-blue-dark mb-4">
              Select Flavour
            </h3>
            <div className="flex flex-wrap gap-2">
              {flavours.map((flavour) => (
                <button
                  key={flavour}
                  onClick={() => setSelectedFlavour(flavour)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedFlavour === flavour
                      ? "bg-brand-purple text-white"
                      : "bg-brand-gray-lighter text-brand-gray-dark hover:bg-brand-gray-border"
                  }`}
                >
                  {flavour}
                </button>
              ))}
            </div>
          </div>
        </Container>

        {/* Products Grid */}
        <Container>
          <div className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {makhanaProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  badge={product.badge}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          </div>
        </Container>

        {/* Nutrition Highlight */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark">
                  High Protein
                </h4>
                <p className="text-sm text-brand-gray-light">
                  10g protein per serving for muscle building
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark">
                  Low Calorie
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Just 100 calories per serving
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark">
                  Gluten Free
                </h4>
                <p className="text-sm text-brand-gray-light">
                  100% natural, no additives
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
