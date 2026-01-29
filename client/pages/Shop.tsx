import { useState ,useEffect} from "react";
import { useSearchParams, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Filter, SlidersHorizontal, ShoppingBag, X, Search, Menu, User, ChevronDown, Check } from "lucide-react";

/* --- ⬇️ UNCOMMENT THESE IMPORTS IN YOUR REAL PROJECT ⬇️ --- */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";

import ShopCategoryFilter from "@/components/sections/ShopCategoryFilter";
import PriceFilter from "@/components/sections/PriceFilter";
import api from "@/api/axios";

/* --- ⬆️ PREVIEW ENVIRONMENT MOCKS (DELETE IN REAL APP) ⬆️ --- */

// Mock Dependencies








/* ------------------------------- MAIN COMPONENT ------------------------------- */

// This is your Shop component. Copy this function to your project.
function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selected, setSelected] = useState("");


  /* ---------- URL PARAMS ---------- */
  const selectedCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 10000);
  const search = searchParams.get("search") || "";

//   useEffect(() => {
//   setSelected(selectedCategory);
// }, [selectedCategory]);


  /* ---------- HANDLERS ---------- */
  const handleCategoryChange = (value) => {
    setSearchParams((prev) => {
      value ? prev.set("category", value) : prev.delete("category");
      return prev;
    });
  };

  const handlePriceChange = (min, max) => {
    setSearchParams((prev) => {
      prev.set("minPrice", String(min));
      prev.set("maxPrice", String(max));
      return prev;
    });
  };

  /* ---------- FETCH PRODUCTS ---------- */
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", selectedCategory, minPrice, maxPrice, search],
    queryFn: async () => {
      const res = await api.get("/products", {
        params: {
          category: selectedCategory,
          minPrice,
          maxPrice,
          search,
        },
      });
      return res.data.products ?? [];
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-sans selection:bg-brand-purple/20 selection:text-brand-purple-dark">
      <Header />

      <main className="flex-1 relative">
        
        <Container>
          {/* HEADER SECTION */}
          <div className="py-12 md:py-16 border-b border-gray-100/60">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-brand-purple font-bold tracking-wider text-xs uppercase mb-2 block">
                  {search ? "Search Results" : "Collections"}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  {search ? `"${search}"` : "Shop All Products"}
                </h1>
              </div>
              <p className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm">
                Showing <span className="font-bold text-gray-900">{products.length}</span> premium items
              </p>
            </div>
          </div>

          {/* LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 py-12">
            
            {/* FILTERS SIDEBAR */}
            <aside
              className={`
                fixed inset-0 z-40 bg-white/95 backdrop-blur-sm lg:bg-transparent lg:static lg:block lg:col-span-1 lg:z-0
                transition-all duration-300 ease-in-out
                ${isMobileFiltersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto hidden lg:block"}
              `}
            >
              {/* Mobile Close Button */}
              <div className="lg:hidden absolute top-6 right-6">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0">
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 lg:p-8 space-y-8 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                    <SlidersHorizontal size={20} className="text-brand-purple" />
                    <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
                  </div>

                  <div className="space-y-6">
                    <ShopCategoryFilter
                      selectedCategory={selectedCategory}
                      onChange={(val) => {
                        handleCategoryChange(val);
                        setIsMobileFiltersOpen(false);
                      }}
                    />

    
                  </div>
                </div>
              </div>
            </aside>

            {/* PRODUCTS GRID */}
            <section className="lg:col-span-3">
              {/* MOBILE FILTER TOGGLE */}
              <div className="flex justify-between items-center mb-8 lg:hidden bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <span className="font-bold text-gray-900">{products.length} Products</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-purple transition-colors shadow-md"
                >
                  <Filter size={16} /> Filter
                </button>
              </div>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                   <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-purple border-t-transparent mb-4"></div>
                   <p className="text-gray-400 font-medium">Curating your collection...</p>
                </div>
              )}

              {isError && (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-red-100 shadow-sm">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                  <p className="text-gray-500">We couldn't load the products. Please try again later.</p>
                </div>
              )}

              {!isLoading && !isError && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.name}
                      image={product.images?.[0]}
                      price={product.offerPrice ?? product.price}
                      slug={product.slug}
                      countInStock={product.countInStock}
                    />
                  ))}
                </div>
              )}

              {!isLoading && !isError && products.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="text-gray-300 w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We couldn't find any items matching your filters. Try adjusting your search or categories.
                  </p>
                  <button 
                    onClick={() => {
  setSearchParams({});
  setIsMobileFiltersOpen(false);
}}

                    className="mt-6 px-6 py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Shop;