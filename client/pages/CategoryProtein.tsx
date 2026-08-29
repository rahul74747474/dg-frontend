import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryProtein() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-protein"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data?.products || [];
    },
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
                High Protein Snacks
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Fuel your day with our high-protein superfood snacks. 100% natural, nutrient-dense, and energy boosting.
              </p>
            </div>
          </Container>
        </section>

        {/* Products Grid */}
        <Container>
          <div className="py-12">
            {isLoading ? (
              <div className="py-16 text-center">
                <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500 font-medium text-sm">Loading protein superfoods...</p>
              </div>
            ) : isError ? (
              <div className="py-16 text-center bg-red-50 rounded-2xl border border-red-100 p-8 max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-red-900 mb-1">Failed to load products</h3>
                <p className="text-sm text-red-600 mb-4">Please check your connection and try again.</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-500 mb-4">No protein snacks found.</p>
                <Link to="/shop" className="px-5 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2">
                  Explore Shop <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: any) => (
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
      </main>
      <Footer />
    </div>
  );
}
