import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/container";

interface SlideData {
  id: string;
  badge: string;
  badgeIcon: typeof Sparkles;
  heading: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
  backgroundColor: string;
  textColor: string;
}

const slides: SlideData[] = [
  {
    id: "gourmet-flavours",
    badge: "Limited Edition • Chef Special",
    badgeIcon: Flame,
    heading: "Gourmet Roasted Flavours Just Arrived",
    subtext: "Experience artisanal spice blends roasted in pure olive oil & ghee. From fiery Peri-Peri to creamy Himalayan herbs, satisfy your cravings guilt-free.",
    ctaText: "Explore Flavours",
    ctaLink: "/shop",
    secondaryCtaText: "View Offers",
    secondaryCtaLink: "/offers",
    imageUrl: "/banners/ad-banner-1.webp",
    backgroundColor: "#F4ECE1",
    textColor: "#2D2013",
  },
  {
    id: "organic-harvest",
    badge: "100% Organic • Farm Fresh",
    badgeIcon: Sparkles,
    heading: "Wholesale & Corporate Festive Gifting",
    subtext: "Elevate your corporate events, wedding favors, and retail collections with direct farm-sourced superfood foxnuts at exclusive tiered B2B pricing.",
    ctaText: "Bulk Enquiries",
    ctaLink: "/b2b",
    secondaryCtaText: "Browse Combos",
    secondaryCtaLink: "/combos",
    imageUrl: "/banners/ad-banner-2.webp",
    backgroundColor: "#EFE6DC",
    textColor: "#2B1E1A",
  },
];

export default function HomeAdBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-advance every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const slide = slides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section className="px-4 sm:px-6 py-10 md:py-16">
      <Container className="!px-0">
        <div
          className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl border border-white/60 transition-colors duration-700"
          style={{ backgroundColor: slide.backgroundColor }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main 2-Column Banner Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] md:min-h-[480px] items-stretch">
            {/* Left Column: Text Content Area */}
            <div className="lg:col-span-6 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 z-10">
              {/* Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-black/5 text-xs font-bold uppercase tracking-wider text-brand-purple shadow-sm">
                  <BadgeIcon size={14} className="text-brand-purple" />
                  {slide.badge}
                </span>
              </div>

              {/* Editorial Heading */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black leading-[1.15] mb-4 tracking-tight"
                style={{ color: slide.textColor }}
              >
                {slide.heading}
              </h2>

              {/* Subtext */}
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg font-medium opacity-85"
                style={{ color: slide.textColor }}
              >
                {slide.subtext}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  to={slide.ctaLink}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 bg-brand-purple text-white font-bold text-sm sm:text-base rounded-2xl hover:bg-black transition-all shadow-md hover:shadow-purple-900/20 hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  {slide.ctaText}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                {slide.secondaryCtaText && (
                  <Link
                    to={slide.secondaryCtaLink || "/shop"}
                    className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/80 backdrop-blur-sm text-gray-800 font-bold text-sm sm:text-base rounded-2xl hover:bg-white transition-all border border-black/5 shadow-sm hover:-translate-y-0.5"
                  >
                    {slide.secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: Photography Visual Area */}
            <div className="lg:col-span-6 relative h-[260px] sm:h-[340px] lg:h-auto overflow-hidden bg-black/5">
              <img
                src={slide.imageUrl}
                alt={slide.heading}
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                loading="lazy"
              />

              {/* Gradient blend on desktop to seamlessly fade into text */}
              <div
                className="hidden lg:block absolute inset-y-0 left-0 w-32 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${slide.backgroundColor}, transparent)`,
                }}
              />
              
              {/* Gradient blend on mobile for top/bottom cohesion */}
              <div
                className="lg:hidden absolute inset-x-0 top-0 h-16 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${slide.backgroundColor}, transparent)`,
                }}
              />
            </div>
          </div>

          {/* Navigation Controls: Arrows and Dots */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-3">
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-2 rounded-full border border-black/5 shadow-sm">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-6 bg-brand-purple" : "w-2.5 bg-gray-400/60 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-gray-800 border border-black/5 flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Previous promotional slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-gray-800 border border-black/5 flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Next promotional slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}