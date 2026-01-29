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

const roastedProducts: Product[] = [
  {
    id: "r1",
    image: "https://via.placeholder.com/300x300?text=Cheese+Herbs",
    title: "Roasted Makhana - Cheese & Herbs",
    price: "₹299 – ₹1,199",
    badge: "Hot",
  },
  {
    id: "r2",
    image: "https://via.placeholder.com/300x300?text=Spicy+Masala",
    title: "Roasted Makhana - Spicy Masala",
    price: "₹299 – ₹1,199",
  },
  {
    id: "r3",
    image: "https://via.placeholder.com/300x300?text=Salted+Caramel",
    title: "Roasted Makhana - Salted Caramel",
    price: "₹329 – ₹1,299",
  },
  {
    id: "r4",
    image: "https://via.placeholder.com/300x300?text=Garlic+Chilli",
    title: "Roasted Makhana - Garlic Chilli",
    price: "₹299 – ₹1,199",
  },
];

const flavours = ["All Flavours", "Cheese & Herbs", "Spicy Masala", "Salted Caramel", "Garlic Chilli"];

export default function CategoryRoasted() {
  const [selectedFlavour, setSelectedFlavour] = useState("All Flavours");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Banner */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Roasted Flavours
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Explore our exciting range of roasted makhana with delicious flavours.
                Each variant is carefully crafted to deliver taste without compromising on nutrition.
              </p>
            </div>
          </Container>
        </section>

        {/* Flavour Selection */}
        <Container>
          <div className="py-8">
            <h3 className="font-poppins font-semibold text-brand-blue-dark mb-4">
              Choose Your Flavour
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
              {roastedProducts.map((product) => (
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

        {/* Taste & Nutrition Highlight */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h3 className="text-2xl font-bold text-brand-purple-dark text-center mb-8">
                Great Taste, Better Nutrition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center text-white text-2xl">
                    🌶️
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    Bold Flavours
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Mouth-watering taste profiles
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white text-2xl">
                    🥛
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    High Protein
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    10g protein per serving
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center text-white text-2xl">
                    🍃
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    100% Natural
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    No artificial additives
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center text-white text-2xl">
                    ✓
                  </div>
                  <h4 className="font-poppins font-semibold text-brand-blue-dark">
                    Certified Organic
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Lab tested for purity
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
