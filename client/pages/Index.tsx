import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
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
  }, [setIsOnHero]);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section ref={heroRef} className="pt-4 pb-10 sm:pt-6 sm:pb-14 lg:pt-8 lg:pb-16 px-4 sm:px-6">
          <Container className="!px-0">
            <div className="relative bg-[#F4EDE3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-white/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] md:min-h-[580px] lg:min-h-[600px] items-stretch">
                
                {/* Left Column: Editorial Brand & CTA Content */}
                <div className="lg:col-span-6 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 md:px-14 lg:py-20 z-10">
                  {/* Eyebrow Pill Badge */}
                  <div className="mb-5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-brand-purple/10 text-brand-purple-dark font-bold text-xs uppercase tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      100% Organic & Slow-Roasted
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-[1.12] mb-5 tracking-tight">
                    Pure Organic Makhana, <span className="text-brand-purple">Roasted to Perfection.</span>
                  </h1>

                  {/* Supporting Brand Paragraph */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium max-w-lg">
                    Direct from certified organic foxnut farms. 100% natural, high in plant protein, gluten-free, and crafted for guilt-free everyday snacking.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 mb-8">
                    <Link
                      to="/shop"
                      className="px-7 sm:px-8 py-3.5 sm:py-4 bg-brand-purple text-white font-bold text-sm sm:text-base rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-purple-900/20 hover:-translate-y-0.5 flex items-center gap-2 group"
                    >
                      Shop Collection
                      <ArrowRight size={19} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to="/b2b"
                      className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/80 backdrop-blur-md text-brand-purple font-bold text-sm sm:text-base rounded-2xl hover:bg-white transition-all border border-brand-purple/20 shadow-sm hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      Bulk Orders
                      <ArrowRight size={18} />
                    </Link>
                  </div>

                  {/* Benefit Checkpoints */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-black/5 text-xs sm:text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                      <span>Slow-Roasted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                      <span>High Plant Protein</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                      <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                      <span>Zero Cholesterol</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photography Visual Area */}
                <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-black/5">
                  <img
                    src="/banners/hero-makhana.webp"
                    alt="DesiiGlobal Premium Organic Roasted Makhana Collection"
                    className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                    fetchPriority="high"
                  />

                  {/* Desktop Smooth Gradient Fade */}
                  <div
                    className="hidden lg:block absolute inset-y-0 left-0 w-32 pointer-events-none"
                    style={{
                      background: "linear-gradient(to right, #F4EDE3 0%, rgba(244, 237, 227, 0.6) 40%, transparent 100%)",
                    }}
                  />

                  {/* Mobile Top Gradient Fade */}
                  <div
                    className="lg:hidden absolute inset-x-0 top-0 h-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, #F4EDE3 0%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= TRUST & VALUE FEATURES ================= */}
        <section className="py-8 md:py-10">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <FeatureCard
                icon="https://api.builder.io/api/v1/image/assets/TEMP/6f83cf22ae9e3825cd531d1d5ba0109539c27dd1?width=115"
                title="COD Available"
                description="Cash on delivery across India"
              />
              <FeatureCard
                icon="https://api.builder.io/api/v1/image/assets/TEMP/7da434a4edf75bbed191417e79c0fbebb24b2dc8?width=115"
                title="Quality Assured"
                description="100% natural, farm certified"
              />
              <FeatureCard
                icon="https://api.builder.io/api/v1/image/assets/TEMP/b36a8620335ceaf167c31d6f747bd0126e6927b0?width=115"
                title="Fast Express Shipping"
                description="Live Shiprocket courier tracking"
              />
              <FeatureCard
                icon="https://api.builder.io/api/v1/image/assets/TEMP/ff49af4c42b10b149884390f199bda5e7ac0c04a?width=115"
                title="Best Wholesale Rates"
                description="Direct farmer-to-consumer value"
              />
            </div>
          </Container>
        </section>

        {/* ================= PROMOTIONAL AD BANNER CAROUSEL ================= */}
        <HomeAdBanner />

        {/* ================= BEST SELLERS ================= */}
        <BestSellersSection
          products={featuredProducts.length ? featuredProducts : products.slice(0, 4)}
          loading={loading}
        />

        {/* ================= WHY DESIIGLOBAL ================= */}
        <WhyDesiiGlobalSection />

        {/* ================= TESTIMONIALS ================= */}
        <TestimonialsSection />

        {/* ================= OFFERS CTA & NEWSLETTER ================= */}
        <OfferCtaSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
