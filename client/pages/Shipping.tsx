import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { shippingContent } from "@/data";
import { Link } from "react-router-dom";

export default function Shipping() {
  const { hero, highlights, sections } = shippingContent;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-b from-brand-peach-bg via-[#FFF5ED] to-[#FCFCFD] py-16 md:py-20 border-b border-orange-100/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-purple/10 text-brand-purple">
                <Sparkles size={14} /> {hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-purple-dark tracking-tight">
                {hero.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {hero.subtitle}
              </p>
              <p className="text-xs text-gray-500 font-semibold">
                {hero.lastUpdated}
              </p>
            </div>
          </Container>
        </section>

        {/* ================= HIGHLIGHT CARDS ================= */}
        <section className="py-10 bg-white border-b border-gray-100">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-brand-gray-lightest/70 p-6 rounded-2xl border border-gray-200/60 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold flex-shrink-0">
                    {idx === 0 ? (
                      <Truck size={24} />
                    ) : idx === 1 ? (
                      <Clock size={24} />
                    ) : (
                      <Package size={24} />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= DETAILED SECTIONS ================= */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-brand-purple-dark">
                    {sec.heading}
                  </h3>
                  <div className="space-y-2.5 text-gray-600 text-sm md:text-base leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {sec.id === "tracking" && (
                    <div className="pt-2">
                      <Link
                        to="/track-order"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple text-white font-bold rounded-xl text-xs md:text-sm hover:bg-brand-purple-dark transition-all shadow-sm"
                      >
                        <Search size={15} /> Track Your Order Now <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Delivery Partners Badge */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Trusted Logistics Network
                </span>
                <p className="text-sm text-gray-600 max-w-xl mx-auto">
                  We integrate directly with India's leading courier networks (Bluedart, Delhivery, DTDC, Xpressbees) to guarantee safe, temperature-monitored transit.
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
