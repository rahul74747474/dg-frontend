import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { useScrollContext } from "../context/scrollContext";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/container";
import FeatureCard from "../components/FeatureCard";

import CategoriesSection from "../components/sections/CategoriesSection";
import BestSellersSection from "../components/sections/BestSellersSection";
import WhyDesiiGlobalSection from "../components/sections/WhyDesiiGlobalSection";
import HealthBenefitsSection from "../components/sections/HealthBenefitsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import OfferCtaSection from "../components/sections/OfferCtaSection";
import NewsletterSection from "../components/sections/NewsletterSection";
import HomeAdBanner from "../components/sections/HomeAdBanner";

/* ---------- TYPES ---------- */
export interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  catName: string;
  isFeatured?: boolean;
}

export default function Index() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { setIsOnHero } = useScrollContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- HERO OBSERVER ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsOnHero(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured);
  const categories = Array.from(
    new Set(products.map((p) => p.catName))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        {/* <section
          ref={heroRef}
          className="bg-[#FEE7D7] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/sdGRTy4h/Gemini-Generated-Image-6wmi176wmi176wmi.webp')",
          }}
        >
          <Container>
            <div className="min-h-[420px] flex items-center justify-center">
              <div className="max-w-xl space-y-4 text-center mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-green text-brand-green-light font-semibold">
                  Discover 100% Organic
                </span>

                <h1 className="text-3xl md:text-5xl font-bold text-brand-purple-dark">
                  Premium Roasted Makhana – Healthy Snack from DesiiGlobal
                </h1>

                <p className="text-brand-gray">
                  100% natural, gluten-free, protein-rich makhana. Freshly roasted for
                  guilt-free snacking.
                </p>

                <div className="flex justify-center gap-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-brand-purple text-white font-semibold rounded-lg"
                  >
                    Shop Now <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/b2b"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-brand-purple text-brand-purple font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
                  >
                    Bulk Orders <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section> */}


        <section ref={heroRef} className="pt-8 pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-6">
          <Container className="!px-0">
            <div className="relative bg-[#FEE7D7] rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-100 border border-white/50">
              {/* Background Image with modern gradient overlay */}
              <div className="absolute inset-0">
                <img 
                   src="https://i.ibb.co/7J8j0k6H/Gemini-Generated-Image-5d0r7o5d0r7o5d0r.png" 
                   className="w-full h-full object-cover object-center opacity-90"
                   alt="Premium Makhana Background"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 px-6 py-20 md:py-32 md:px-16 max-w-2xl">
                 <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 border border-green-200 text-green-700 font-bold text-xs uppercase tracking-wider mb-6 backdrop-blur-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Discover 100% Organic
                </span>
                
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                  Premium Roasted Makhana <span className="text-brand-purple">Snacks</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-medium max-w-lg">
                  100% natural, gluten-free, protein-rich makhana. Freshly roasted for guilt-free snacking anytime, anywhere.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/shop" 
                    className="px-8 py-4 bg-brand-purple text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-purple-900/25 hover:-translate-y-1 flex items-center gap-2 group"
                  >
                    Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/b2b" 
                    className="px-8 py-4 bg-white/60 backdrop-blur-md border-2 bg-brand-purple text-brand-purple rounded-2xl font-bold hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center gap-2"
                  >
                    Bulk Orders <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FEATURES */}
        <section className="py-10">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
              icon="https://api.builder.io/api/v1/image/assets/TEMP/6f83cf22ae9e3825cd531d1d5ba0109539c27dd1?width=115"
              title="COD Available" description="Pay on delivery" />

              <FeatureCard 
              icon="https://api.builder.io/api/v1/image/assets/TEMP/7da434a4edf75bbed191417e79c0fbebb24b2dc8?width=115"
              title="Quality Assured" description="Premium products" />

              <FeatureCard 
              icon="https://api.builder.io/api/v1/image/assets/TEMP/b36a8620335ceaf167c31d6f747bd0126e6927b0?width=115"
               
              title="Fast Delivery" description="Across India" />

              <FeatureCard 
              icon="https://api.builder.io/api/v1/image/assets/TEMP/ff49af4c42b10b149884390f199bda5e7ac0c04a?width=115"
                
              title="Best Prices" description="Direct sourcing" />
            </div>
          </Container>
        </section>
          <HomeAdBanner
          heading="New Flavours Just Arrived!"
          subtext="Discover our exciting range of new makhana flavours crafted to delight your taste buds. Limited stock available."
          ctaText="Explore Now"
          ctaLink="/shop"
          imagePosition="right"
        />
        {/* CATEGORIES – REAL */}
        {/* <CategoriesSection categories={categories} /> */}

        {/* BEST SELLERS – REAL */}
        <BestSellersSection
          products={featuredProducts.length ? featuredProducts : products.slice(0, 4)}
          loading={loading}
        />

        <WhyDesiiGlobalSection />
        <HomeAdBanner
          heading="Wellness Starts Here"
          subtext="Join thousands of customers who've transformed their health with DesiiGlobal products. Get 20% off your first order today!"
          ctaText="Shop Wellness"
          ctaLink="/shop"
          imagePosition="left"
        />
        {/* <HealthBenefitsSection /> */}
        <TestimonialsSection />
        <OfferCtaSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

