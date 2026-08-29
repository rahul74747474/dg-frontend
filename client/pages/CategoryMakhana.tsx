import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const flavours = ["All", "Flavoured Makhana", "Plain Makhana", "Sweet Makhana"];

export default function CategoryMakhana() {
  const [selectedFlavour, setSelectedFlavour] = useState("All");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-makhana"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data?.products || [];
    },
  });

  const filteredProducts = products.filter((p: any) => {
    if (selectedFlavour === "All") return true;
    return (
      p.catName?.toLowerCase().includes(selectedFlavour.toLowerCase()) ||
      p.name?.toLowerCase().includes(selectedFlavour.toLowerCase())
    );
  });

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
              Select Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {flavours.map((flavour) => (
                <button
                  key={flavour}
                  onClick={() => setSelectedFlavour(flavour)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedFlavour === flavour
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
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
            {isLoading ? (
              <div className="py-16 text-center">
                <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500 font-medium text-sm">Loading organic makhana products...</p>
              </div>
            ) : isError ? (
              <div className="py-16 text-center bg-red-50 rounded-2xl border border-red-100 p-8 max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-red-900 mb-1">Failed to load products</h3>
                <p className="text-sm text-red-600 mb-4">Please check your internet connection or server status.</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 text-center bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-500 mb-4">No products found in this category.</p>
                <Link to="/shop" className="px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                  View All Products <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    title={product.name}
                    price={product.price}
                    image={product.images?.[0] || "https://via.placeholder.com/300x300?text=DesiiGlobal"}
                    slug={product.slug}
                    countInStock={product.countInStock ?? 0}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>

        {/* Nutrition Highlight */}
        <section className="bg-brand-gray-lightest mt-12">
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
                  Plant protein per serving for muscle nourishment
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark">
                  Slow-Roasted
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Roasted in pure olive oil & ghee, never deep fried
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark">
                  100% Gluten Free
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Direct from certified organic foxnut farms
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
