import { useState, useMemo } from "react";
import { useParams, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Heart, Minus, Plus, ArrowRight, Star,
  Check, ShieldCheck, Leaf, Truck, ChevronDown, Share2,
  Menu, Search, User, ShoppingBag, ChevronRight
} from "lucide-react";
import { Toaster, toast } from "sonner";


/* --- ⬇️ UNCOMMENT THESE IMPORTS IN YOUR REAL PROJECT ⬇️ --- */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ProductCard";
import { productContent } from "@/data/productsContent";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

/* --- ⬆️ PREVIEW ENVIRONMENT MOCKS (DELETE IN REAL APP) ⬆️ --- */

// Mock Dependencies to make the preview work


/* ------------------------------- MAIN COMPONENT ------------------------------- */

// This is your main component. Copy this function to your project.
function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user, isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  /* ----------------------------- FETCH PRODUCT ---------------------------- */

  const { data: product } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await api.get(`/products/slug/${slug}`);
      return res.data.product;
    },
    // enabled: !!slug, // Uncomment in real app
  });

  /* ------------------------------ FETCH REVIEWS ---------------------------- */

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", product?._id],
    queryFn: async () => {
      const res = await api.get(`/reviews/${product?._id}`);
      return res.data.reviews;
    },
    enabled: !!product?._id,
  });

  const hasReviewed = useMemo(() => {
  if (!user) return false;
  return reviews.some((r) => r.user._id === user._id);
}, [reviews, user]);

const sortedReviews = useMemo(() => {
  if (!user) return reviews;
  return [...reviews].sort((a, b) =>
    a.user._id === user._id ? -1 : 1
  );
}, [reviews, user]);


  /* ------------------------------ REVIEW MUTATION -------------------------- */

  const reviewMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated) {
        throw new Error("NOT_AUTHENTICATED");
      }

      return api.post(
        `/reviews/${product?._id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Review submitted successfully ⭐");
      setRating(5);
      setComment("");

      queryClient.invalidateQueries({ queryKey: ["reviews", product?._id] });
      queryClient.invalidateQueries({ queryKey: ["product", slug] });
    },

    onError: (err: any) => {
      if (err.message === "NOT_AUTHENTICATED") {
        toast.error("Please login to submit review");
        navigate("/login");
        return;
      }

      if (err?.response?.status === 409) {
        toast.error("You already reviewed this product");
        return;
      }

      toast.error("Failed to submit review");
    },
  });


  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-purple border-t-transparent"></div>
    </div>
  );

  // Fallback for demo if productContent[slug] is undefined
  const extra = productContent[product.slug] || productContent["organic-matcha"];

  const finalPrice = product.offerPrice ?? product.price;
  const isWishlisted = isInWishlist(product._id);
  const discountPercentage = product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  /* ------------------------------ WISHLIST -------------------------------- */

  const handleWishlist = async () => {
    try {
      await toggleItem({
        productId: product._id,
        productTitle: product.name,
        image: product.images[0],
        price: finalPrice,
      });

      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch {
      toast.error("Please login to use wishlist");
      navigate("/login");
    }
  };

  /* --------------------------------- UI ----------------------------------- */

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ============================ HERO SECTION ============================ */}
        <section className="relative py-12 lg:py-16 overflow-visible">
          {/* Decorative Background Elements */}
          <Container className="relative">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-brand-gray-light mb-8 font-medium">
              <span className="hover:text-brand-purple cursor-pointer transition-colors">Home</span>
              <ChevronRight size={14} />
              <span className="hover:text-brand-purple cursor-pointer transition-colors">{product.catName}</span>
              <ChevronRight size={14} />
              <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              {/* LEFT: IMAGE GALLERY */}
              <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-6 self-start pb-6">

                {/* Thumbnails */}
                <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${selectedImage === i
                        ? "ring-2 ring-brand-purple ring-offset-2 opacity-100 shadow-md"
                        : "opacity-60 hover:opacity-100 ring-1 ring-gray-200"
                        }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`Product thumbnail ${i + 1}`} />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex flex-col">
                  <div className=" relative self-start w-full max-w-[520px] h-[520px] bg-white rounded-[2.5rem] p-6 shadow-xl shadow-gray-100/50 border border-white">
                    {discountPercentage > 0 && (
                      <div className="absolute top-6 left-6 bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-rose-500/30 z-10 backdrop-blur-sm">
                        {discountPercentage}% OFF
                      </div>
                    )}
                    <div className="absolute top-6 right-6 z-10">
                      <button className="p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:shadow-md text-gray-400 hover:text-brand-purple transition-all border border-white">
                        <Share2 size={20} />
                      </button>
                    </div>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {/* Quick Highlights */}
                  {extra?.highlights && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {extra.highlights.map((h, i) => (
                        <span key={i} className="px-4 py-2 leading-tight
 bg-white border border-gray-100 rounded-xl text-sm font-semibold text-gray-600 shadow-sm flex items-center gap-2">
                          <Check size={14} className="text-brand-purple stroke-[3px]" /> {h}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT: PRODUCT INFO */}
              <div className="lg:col-span-5 flex flex-col justify-center">

                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-4">
                    <Leaf size={12} className="fill-brand-purple" /> {product.brand}
                  </span>

                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={20} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-lg text-gray-900">{product.averageRating}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-brand-gray-light font-medium hover:text-brand-purple underline cursor-pointer decoration-dotted underline-offset-4">
                      {product.ratingCount} Reviews
                    </span>
                  </div>
                </div>

                {/* Description Excerpt */}
                <p className="text-brand-gray-light text-lg leading-relaxed mb-8 border-l-4 border-brand-purple/20 pl-4">
                  {product.description.substring(0, 150)}...
                </p>

                {/* Pricing Card */}
                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100 mb-8">
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-5xl font-black text-brand-purple tracking-tighter">₹{finalPrice}</span>
                    {product.offerPrice && (
                      <span className="text-xl text-brand-gray-light line-through font-medium mb-2 decoration-2">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                          disabled={quantity <= 1}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-gray-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <div className="text-sm font-medium text-green-600 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          addItem({ id: product._id, name: product.name, price: finalPrice, image: product.images[0], quantity });
                          toast.success("Added to cart");
                        }}
                        className="flex-1 bg-brand-purple hover:bg-brand-purple-dark text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">Add to Cart <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                      </button>

                      <button
                        onClick={handleWishlist}
                        className={`px-6 py-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${isWishlisted
                          ? "bg-rose-50 border-rose-200 text-rose-500"
                          : "border-gray-100 hover:border-gray-200 text-gray-400 hover:text-gray-600 bg-white"
                          }`}
                      >
                        <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </Container>
        </section>

        {/* ============================ DETAILS SECTION ============================ */}
        <div className="bg-white relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.03)] rounded-t-[3rem] mt-8">
          <section className="py-20">
            <Container>
              <div className="grid md:grid-cols-12 gap-12">

                {/* LEFT COL: DETAILS */}
                <div className="md:col-span-7 space-y-12">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple"><Leaf size={18} /></span>
                      About the Product
                    </h3>
                    <div className="prose prose-lg prose-purple text-brand-gray-light leading-relaxed">
                      <p>{product.description}</p>
                      {extra?.longDescription && <p className="mt-4">{extra.longDescription}</p>}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.ingredients.map((ing, i) => (
                        <span key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium text-sm shadow-sm">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FAQs Accordion */}
                  {extra?.faqs && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h3>
                      <div className="space-y-4">
                        {extra.faqs.map((f, i) => (
                          <div
                            key={i}
                            onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all hover:shadow-md"
                          >
                            <div className="p-5 flex justify-between items-center">
                              <h4 className="font-bold text-gray-800 group-hover:text-brand-purple transition-colors">{f.question}</h4>
                              <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                            </div>
                            <div className={`px-5 text-brand-gray-light leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                              {f.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COL: CARDS */}
                <div className="md:col-span-5 space-y-8">

                  {/* Nutrition Grid */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <ShieldCheck className="text-blue-500" /> Nutritional Facts
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.nutrition).map(([k, v]) => (
                        <div key={k} className="bg-gray-50 p-4 rounded-2xl text-center">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{k}</div>
                          {/* <div className="text-lg font-black text-gray-900">{v}</div> */}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-center text-gray-400">
                      Per serving ({product.netQuantity.value / 10}g approx)
                    </div>
                  </div>

                  {/* Benefits Cards */}
                  {extra?.benefits && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Why You'll Love It</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {extra.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50/30 border border-green-100/50">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm shrink-0">
                              <Check size={18} strokeWidth={3} />
                            </div>
                            <span className="font-bold text-gray-800">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Info Card */}
                  <div className="bg-gray-900 text-gray-300 rounded-3xl p-8 shadow-xl">
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <Truck className="text-brand-purple" /> Shipping & Specs
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-gray-800 pb-3">
                        <span>Country of Origin</span>
                        <span className="text-white font-medium">{product.countryOfOrigin}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-3">
                        <span>Shelf Life</span>
                        <span className="text-white font-medium">{product.shelfLife}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-3">
                        <span>Net Quantity</span>
                        <span className="text-white font-medium">{product.netQuantity.value} {product.netQuantity.unit}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>FSSAI License</span>
                        <span className="text-white font-mono">{product.fssaiLicense}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Container>
          </section>
        </div>

        {/* ============================ REVIEWS SECTION ============================ */}
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Customer Reviews</h2>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                  <span className="text-3xl font-bold text-gray-900">{product.averageRating}</span>
                  <div className="flex flex-col items-start">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.round(product.averageRating) ? "fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{product.ratingCount} Verified Ratings</span>
                  </div>
                </div>
              </div>

              {/* Review Input */}
              {isAuthenticated ? ( !hasReviewed && (
                <div className="bg-white rounded-3xl shadow-lg shadow-brand-purple/10 p-8 mb-12 border border-brand-purple/5">
                  <h3 className="font-bold text-xl mb-6 text-center">Share your experience</h3>
                  <div className="space-y-6">
                    <div className="flex justify-center gap-3">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className="group focus:outline-none transition-transform hover:scale-110 active:scale-90"
                          onClick={() => setRating(i + 1)}
                        >
                          <Star
                            size={32}
                            className={`${i < rating
                              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                              : "text-gray-200 group-hover:text-amber-200"
                              } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 focus:ring-4 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
                      placeholder="What did you like the most?"
                      rows={4}
                    />

                    <div className="flex justify-end">
                      <button
                        disabled={reviewMutation.isPending || !comment.trim()}
                        onClick={() => reviewMutation.mutate()}
                        className="bg-brand-purple disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-purple-dark transition-all shadow-lg"
                      >
                        {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </button>

                    </div>
                  </div>
                </div>
              )): (
  <div className="text-center text-gray-500">
    Please login to submit a review
  </div>
)}

              {/* Review List */}
              <div className="grid gap-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">No reviews yet. Be the first to try it!</p>
                  </div>
                ) : (
                  sortedReviews.map((r) => (
                    <div key={r._id} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-brand-purple/20 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple/10 to-white border border-brand-purple/5 flex items-center justify-center font-bold text-brand-purple text-lg shadow-inner">
                            {r.user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{r.user.name}</p>
                            <div className="flex gap-0.5 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i < r.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-200"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Verified Buyer</span>
                      </div>
                      <p className="text-brand-gray-light leading-relaxed pl-[64px]">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetail;