import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { faqContent } from "@/data";

export default function FAQ() {
  const { hero, categories } = faqContent;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        if (selectedCategory !== "all" && cat.id !== selectedCategory) {
          return null;
        }

        const filteredItems = cat.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          return (
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

        if (filteredItems.length === 0) return null;

        return {
          ...cat,
          items: filteredItems,
        };
      })
      .filter(Boolean) as typeof categories;
  }, [categories, selectedCategory, searchQuery]);

  const totalQuestions = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

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

              {/* Search Box */}
              <div className="pt-4 max-w-lg mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search answers (e.g. shipping time, makhana shelf life, returns)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= CATEGORY TABS ================= */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-[70px] z-20 shadow-xs">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Topics
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= ACCORDION CONTENT ================= */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-4xl mx-auto space-y-12">
              {filteredCategories.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto space-y-4">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-900">
                    No matching answers found
                  </h4>
                  <p className="text-sm text-gray-500">
                    Try searching with different terms or check all categories.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 bg-brand-purple text-white text-xs font-bold rounded-lg"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="text-xl font-bold text-brand-purple-dark">
                        {cat.category}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {cat.items.length} {cat.items.length === 1 ? "question" : "questions"}
                      </span>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {cat.items.map((item) => (
                        <AccordionItem
                          key={item.id}
                          value={item.id}
                          className="border-b border-gray-100 last:border-none"
                        >
                          <AccordionTrigger className="text-left font-bold text-gray-900 hover:text-brand-purple hover:no-underline text-base md:text-lg py-4">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed pb-4 pt-1">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}

              {/* ================= STILL HAVE QUESTIONS CARD ================= */}
              <div className="bg-gradient-to-r from-brand-purple-dark via-[#4B2F83] to-brand-purple rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-brand-purple/15">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold">
                    Still have questions or need custom assistance?
                  </h3>
                  <p className="text-white/80 text-sm max-w-xl">
                    Our support team is available Mon–Sat, 10 AM – 7 PM IST to assist with order tracking, bulk orders, and product details.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-white text-brand-purple-dark hover:bg-brand-peach-bg font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2"
                  >
                    Contact Support <ArrowRight size={16} />
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
