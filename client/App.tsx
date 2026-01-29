import "./global.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Pages
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

const queryClient = new QueryClient();

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
              <Sonner />

              <ScrollProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />

                    {/* 🔐 Protected */}
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

                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

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

                    {/* Static */}
                    <Route path="/combos" element={<Combos />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/b2b" element={<B2B />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/verifyEmail" element={<VerifyEmail />} />
<Route path="/account" element={<Account />} />

<Route path="/orders" element={<Orders />} />

<Route path="/address" element={<AddressPage />} />




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
