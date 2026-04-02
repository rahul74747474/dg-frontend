import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState,useEffect} from "react";
import api from "@/api/axios";

export default function Cart() {
  const navigate = useNavigate();
const { items, removeItem, updateQuantity, total } = useCart();

  /* ---------- HANDLERS ---------- */

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout/delivery");
  };

  /* ---------- CALCULATIONS ---------- */

  const subtotal = total;
  const discount = subtotal * 0.1; // placeholder
  const delivery = subtotal > 500 ? 0 : 50; // realistic INR logic
  const grandTotal = subtotal - discount + delivery;

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* HEADER */}
        <section className="py-8 border-b">
          <Container>
            <h1 className="text-3xl font-bold text-brand-purple-dark">
              Shopping Cart
            </h1>
          </Container>
        </section>

        {/* EMPTY CART */}
        {isEmpty ? (
          <section className="py-20 text-center">
            <Container>
              <div className="flex flex-col items-center gap-6">
                <div className="text-5xl">🛒</div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-gray-500">
                  Start shopping to add items to your cart
                </p>
                <Link
                  to="/shop"
                  className="px-6 py-3 bg-brand-purple text-white rounded-lg flex items-center gap-2"
                >
                  Continue Shopping <ArrowRight size={18} />
                </Link>
              </div>
            </Container>
          </section>
        ) : (
          /* CART ITEMS */
          <section className="py-10">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ITEMS */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="font-bold text-brand-purple">
                          ₹{item.price}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-2 flex items-center gap-2 border rounded w-fit px-2">
                          <button
                           onClick={() => updateQuantity(item.id, "decrease")}
                          >
                            <Minus size={16} />
                          </button>

                          <span className="px-2 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                           onClick={() => updateQuantity(item.id, "increase")}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <button
                      onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* SUMMARY */}
                <div>
                  <div className="sticky top-24 border rounded-lg p-6 space-y-4 bg-gray-50">
                    <h3 className="text-lg font-bold">Order Summary</h3>

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>
                        {delivery === 0 ? "FREE" : `₹${delivery}`}
                      </span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 bg-brand-purple text-white rounded-lg flex justify-center items-center gap-2"
                    >
                      Proceed to Checkout <ArrowRight size={18} />
                    </button>

                    <Link
                      to="/shop"
                      className="block text-center text-brand-purple font-semibold"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}