import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ScrollProvider } from "./context/scrollContext";

import ProtectedRoute from "./components/ProtectedRoute";

// Existing Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import CheckoutDelivery from "./pages/CheckoutDelivery";
import CheckoutPayment from "./pages/CheckoutPayment";
import OrderSuccess from "./pages/OrderSuccess";
import CategoryMakhana from "./pages/CategoryMakhana";
import CategoryRoasted from "./pages/CategoryRoasted";
import CategoryProtein from "./pages/CategoryProtein";
import CategoryWeightLoss from "./pages/CategoryWeightLoss";
import Combos from "./pages/Combos";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import B2B from "./pages/B2B";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import Account from "./pages/Account";
import Orders from "@/pages/Orders";
import AddressPage from "@/pages/Address";

// New Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";
import FAQ from "./pages/FAQ";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Accessibility from "./pages/Accessibility";
import Unsubscribe from "./pages/Unsubscribe";
import AdminNewsletter from "./pages/AdminNewsletter";

const queryClient = new QueryClient();

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner richColors position="top-right" />

              <ScrollProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />

                    {/* 🔐 Protected Routes */}
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout/delivery"
                      element={
                        <ProtectedRoute>
                          <CheckoutDelivery />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout/payment"
                      element={
                        <ProtectedRoute>
                          <CheckoutPayment />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-success"
                      element={
                        <ProtectedRoute>
                          <OrderSuccess />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute>
                          <Orders />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/address"
                      element={
                        <ProtectedRoute>
                          <AddressPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/newsletter"
                      element={
                        <ProtectedRoute requiredRole="ADMIN">
                          <AdminNewsletter />
                        </ProtectedRoute>
                      }
                    />

                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verifyEmail" element={<VerifyEmail />} />

                    {/* Categories */}
                    <Route path="/category/makhana" element={<CategoryMakhana />} />
                    <Route
                      path="/category/roasted-flavours"
                      element={<CategoryRoasted />}
                    />
                    <Route
                      path="/category/protein-snacks"
                      element={<CategoryProtein />}
                    />
                    <Route
                      path="/category/weight-loss"
                      element={<CategoryWeightLoss />}
                    />

                    {/* Shop & Combos */}
                    <Route path="/combos" element={<Combos />} />
                    <Route path="/offers" element={<Offers />} />

                    {/* Company Pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/careers" element={<Careers />} />

                    {/* Support Pages */}
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/b2b" element={<B2B />} />

                    {/* Legal Pages */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/accessibility" element={<Accessibility />} />

                    {/* Newsletter & Unsubscribe */}
                    <Route path="/unsubscribe" element={<Unsubscribe />} />

                    {/* 404 Handler */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </ScrollProvider>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
