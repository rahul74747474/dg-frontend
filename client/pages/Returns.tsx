import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  RotateCcw,
  ShieldCheck,
  Clock,
  HelpCircle,
  Mail,
  Phone,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { returnsContent } from "@/data";
import { Link } from "react-router-dom";

export default function Returns() {
  const { hero, sections, supportBox } = returnsContent;

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

        {/* ================= QUICK STATS HIGHLIGHT ================= */}
        <section className="py-8 bg-white border-b border-gray-100">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/50 border border-green-100/60">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center font-bold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">48-Hour Claim</h4>
                  <p className="text-xs text-gray-600">Transit damage reporting window</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/60">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold">
                  <RotateCcw size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Free Replacement</h4>
                  <p className="text-xs text-gray-600">For wrong or defective items</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/60">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">5-7 Days Refund</h4>
                  <p className="text-xs text-gray-600">Direct to original payment method</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= POLICY SECTIONS ================= */}
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
                    {sec.content.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* ================= SUPPORT BOX ================= */}
              <div className="bg-brand-peach-bg/60 rounded-3xl p-8 border border-orange-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-xl font-bold text-brand-purple-dark">
                    {supportBox.heading}
                  </h4>
                  <p className="text-sm text-gray-700 max-w-xl">
                    {supportBox.text}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-800">
                    <span className="flex items-center gap-1.5">
                      <Mail size={15} className="text-brand-purple" /> {supportBox.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={15} className="text-brand-purple" /> {supportBox.phone}
                    </span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="px-6 py-3 bg-brand-purple text-white font-bold rounded-xl text-sm hover:bg-brand-purple-dark transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Contact Support <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
