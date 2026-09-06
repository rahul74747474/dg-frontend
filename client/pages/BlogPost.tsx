import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import {
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Tag,
  Sparkles,
} from "lucide-react";
import { blogPosts } from "@/data";
import { toast } from "sonner";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
        <Header />
        <main className="flex-1 py-20">
          <Container>
            <div className="max-w-md mx-auto text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">Article Not Found</h1>
              <p className="text-gray-600 text-sm">
                The article you are looking for does not exist or has been moved.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold"
              >
                <ArrowLeft size={16} /> Back to Blog
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <Container>
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-purple transition-colors"
            >
              <ArrowLeft size={16} /> Back to All Articles
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Share2 size={14} /> Share Article
            </button>
          </div>

          {/* Article Header */}
          <article className="max-w-3xl mx-auto">
            <header className="space-y-4 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2.5 text-xs">
                <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple font-bold rounded-md uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1 text-gray-500 font-medium">
                  <Clock size={13} /> {post.readTime}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{post.publishedAt}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-purple-dark tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed italic">
                "{post.excerpt}"
              </p>

              {/* Author badge */}
              <div className="pt-2 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center font-bold text-sm">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.author.role}</p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="my-8 rounded-3xl overflow-hidden bg-brand-peach-bg/40 p-4 border border-gray-100">
              <img
                src="https://i.ibb.co/RksxY8v7/Whats-App-Image-2026-03-08-at-17-21-43.webp"
                alt={post.title}
                className="w-full max-h-[400px] object-cover rounded-2xl shadow-sm"
              />
            </div>

            {/* Article Body */}
            <div className="space-y-8 text-gray-700 leading-relaxed text-base md:text-lg">
              <p className="font-medium text-gray-900 leading-relaxed">
                {post.content.intro}
              </p>

              {post.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-600">
                      {paragraph}
                    </p>
                  ))}

                  {section.keyTakeaway && (
                    <div className="p-4 bg-green-50 border-l-4 border-brand-green rounded-r-xl">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-semibold text-green-900">
                          <span className="font-bold">Key Takeaway:</span> {section.keyTakeaway}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="p-6 bg-brand-peach-bg/50 rounded-2xl border border-orange-100 text-gray-800">
                <h3 className="text-lg font-bold text-brand-purple-dark mb-2">
                  Conclusion
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                <Tag size={16} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-brand-purple-dark mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    to={`/blog/${rPost.slug}`}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-brand-purple uppercase">
                        {rPost.category}
                      </span>
                      <h4 className="font-bold text-gray-900 group-hover:text-brand-purple transition-colors text-sm line-clamp-2">
                        {rPost.title}
                      </h4>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>{rPost.readTime}</span>
                      <span className="font-semibold text-brand-purple inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
