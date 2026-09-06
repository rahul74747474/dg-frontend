import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Tag,
  Share2,
} from "lucide-react";
import { blogCategories, blogPosts, BlogPost } from "@/data";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-b from-brand-peach-bg via-[#FFF5ED] to-[#FCFCFD] py-14 md:py-20 border-b border-orange-100/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-purple/10 text-brand-purple">
                <Sparkles size={14} /> DesiiGlobal Wellness Journal
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-purple-dark tracking-tight">
                Healthy Snacking & Wellness Blog
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Discover superfood nutrition insights, healthy snacking guides, traditional roasting secrets, and delicious recipes.
              </p>

              {/* Search input */}
              <div className="pt-4 max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles on Makhana, nutrition, recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= CATEGORY TABS ================= */}
        <section className="py-6 border-b border-gray-100 bg-white sticky top-[70px] z-20 shadow-xs">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Container>
        </section>

        <Container>
          {/* ================= FEATURED POST (Shown when looking at All) ================= */}
          {selectedCategory === "All" && !searchQuery && featuredPost && (
            <div className="py-10">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 group">
                <div className="lg:col-span-6 relative overflow-hidden bg-brand-peach-bg/50 p-6 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/RksxY8v7/Whats-App-Image-2026-03-08-at-17-21-43.webp"
                    alt={featuredPost.title}
                    className="w-full max-h-[320px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-8 left-8 px-3 py-1 bg-brand-purple text-white text-xs font-bold uppercase rounded-lg shadow-sm">
                    Featured Article
                  </span>
                </div>

                <div className="lg:col-span-6 p-6 lg:p-10 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="px-2.5 py-1 bg-green-50 text-brand-green rounded-md font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {featuredPost.readTime}
                    </span>
                    <span>• {featuredPost.publishedAt}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 group-hover:text-brand-purple transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-xs">
                        {featuredPost.author.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-brand-purple hover:gap-2 transition-all"
                    >
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= ARTICLES GRID ================= */}
          <div className="py-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-brand-purple-dark">
                {selectedCategory === "All"
                  ? "Latest Articles"
                  : `${selectedCategory} Articles`}
              </h3>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center bg-gray-50 rounded-3xl p-8 max-w-md mx-auto">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  No articles found
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Try searching with different keywords or switch categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-brand-purple text-white text-xs font-bold rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                  >
                    <div className="p-4 bg-brand-peach-bg/30">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 relative">
                        <img
                          src="https://i.ibb.co/RksxY8v7/Whats-App-Image-2026-03-08-at-17-21-43.webp"
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-xs text-brand-purple text-[11px] font-bold rounded-md shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.publishedAt}</span>
                        </div>

                        <h4 className="font-bold text-gray-900 group-hover:text-brand-purple transition-colors text-lg line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>

                        <p className="text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">
                          By {post.author.name}
                        </span>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-xs font-bold text-brand-purple hover:underline inline-flex items-center gap-1"
                        >
                          Read <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </article>
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
