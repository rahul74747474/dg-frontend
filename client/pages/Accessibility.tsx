import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { Eye, Keyboard, Sparkles, Mail, Phone } from "lucide-react";
import { accessibilityContent } from "@/data";

export default function Accessibility() {
  const { hero, sections } = accessibilityContent;

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

        {/* ================= CONTENT SECTIONS ================= */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-4"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-brand-purple-dark">
                    {sec.heading}
                  </h2>
                  <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                    {sec.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
