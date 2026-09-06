import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Leaf,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame,
  Truck,
  Layers,
} from "lucide-react";
import { aboutContent } from "@/data";

const iconMap = {
  ShieldCheck: ShieldCheck,
  Award: Award,
  Leaf: Leaf,
  Heart: Heart,
  Sparkles: Sparkles,
  RefreshCw: Layers,
};

export default function About() {
  const { hero, story, missionVision, pillars, values, cta } = aboutContent;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-b from-brand-peach-bg via-[#FFF5ED] to-[#FCFCFD] py-16 md:py-20 border-b border-orange-100/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-purple/10 text-brand-purple mb-4">
                <Sparkles size={14} /> {hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-purple-dark tracking-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {hero.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* ================= STORY SECTION ================= */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 bg-green-50 text-brand-green text-xs font-bold uppercase tracking-wider rounded-lg">
                  Who We Are
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-brand-purple-dark tracking-tight">
                  {story.heading}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
                  {story.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-brand-green" /> 100% Roasted
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-brand-green" /> Zero Trans Fat
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-brand-green" /> FSSAI Certified
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-brand-purple/20 to-brand-green/20 rounded-3xl blur-2xl opacity-60"></div>
                  <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl shadow-brand-purple/5 p-3">
                    <img
                      src={story.image}
                      alt="DesiiGlobal Story & Snacks"
                      className="w-full aspect-square object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="py-16 bg-brand-gray-lightest border-y border-gray-200/60">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple-dark mb-4">
                  {missionVision.mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {missionVision.mission.description}
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6">
                  <Leaf size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-purple-dark mb-4">
                  {missionVision.vision.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {missionVision.vision.description}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= 4 PILLARS SECTION ================= */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple block mb-2">
                Why DesiiGlobal
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-purple-dark tracking-tight">
                Our Approach to Healthy Snacking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.id}
                  className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-brand-purple/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-peach-bg text-brand-purple-dark font-black flex items-center justify-center text-lg mb-5">
                    0{i + 1}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= VALUES SECTION ================= */}
        <section className="py-16 bg-[#F9FAFB] border-t border-gray-100">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green block mb-2">
                Core Principles
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-purple-dark tracking-tight">
                What We Stand For
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => {
                const IconComponent = iconMap[val.iconName] || ShieldCheck;
                return (
                  <div
                    key={val.id}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                      <IconComponent size={26} />
                    </div>
                    <h4 className="text-lg font-bold text-brand-blue-dark mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="bg-gradient-to-r from-brand-purple-dark via-[#4B2F83] to-brand-purple rounded-3xl p-8 md:p-14 text-white text-center relative overflow-hidden shadow-xl shadow-brand-purple/20">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  {cta.title}
                </h2>
                <p className="text-white/80 text-base md:text-lg">
                  {cta.description}
                </p>
                <div className="pt-2">
                  <Link
                    to={cta.buttonLink}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-purple-dark hover:bg-brand-peach-bg font-bold rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    {cta.buttonText} <ArrowRight size={18} />
                  </Link>
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
