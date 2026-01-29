import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import { useCart } from "@/context/CartContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Clear cart when order is confirmed (run only once on mount)
  useEffect(() => {
    clearCart();
  }, []);

  // Placeholder data - in a real app, this would come from order state
  const orderData = {
    orderNumber: "ORD-" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    date: new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    estimatedDelivery: "3-5 business days",
    total: 2439.98,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Success Message Section */}
        <section className="py-16 md:py-24 bg-brand-green-lighter border-b border-brand-green">
          <Container>
            <div className="flex flex-col items-center justify-center gap-6 max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-brand-green flex items-center justify-center">
                <CheckCircle size={40} className="text-white" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark">
                  Order Confirmed!
                </h1>
                <p className="text-brand-gray-light text-lg">
                  Thank you for your purchase. Your order has been placed successfully.
                </p>
              </div>

              {/* Order Number */}
              <div className="bg-white rounded-lg p-6 border border-brand-green w-full">
                <p className="text-sm text-brand-gray-light mb-1">Order Number</p>
                <p className="text-2xl font-bold text-brand-purple font-mono">
                  {orderData.orderNumber}
                </p>
                <p className="text-sm text-brand-gray-light mt-3">
                  Placed on {orderData.date}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Order Status Timeline */}
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-12 text-center">
              What Happens Next
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                {
                  icon: Package,
                  title: "Order Confirmed",
                  description: "Your order is being processed",
                  status: "complete",
                },
                {
                  icon: Truck,
                  title: "Dispatched",
                  description: "Your package will ship soon",
                  status: "pending",
                },
                {
                  icon: Clock,
                  title: "In Transit",
                  description: "On its way to you",
                  status: "pending",
                },
                {
                  icon: CheckCircle,
                  title: "Delivered",
                  description: "Arrives in 3-5 business days",
                  status: "pending",
                },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        step.status === "complete"
                          ? "bg-brand-green text-white"
                          : "bg-brand-gray-lighter text-brand-gray-light"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-brand-gray-dark mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-gray-light">
                      {step.description}
                    </p>

                    {/* Connector */}
                    {index < 3 && (
                      <div className="hidden md:block absolute w-12 h-1 bg-brand-gray-border mt-8 ml-32 -z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Order Details Card */}
        <section className="py-12 bg-brand-gray-lightest border-t border-brand-gray-border">
          <Container>
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 border border-brand-gray-border">
              <h3 className="text-xl font-bold text-brand-gray-dark mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-4 border-b border-brand-gray-border">
                  <span className="text-brand-gray-dark">Order Number</span>
                  <span className="font-bold text-brand-purple font-mono">
                    {orderData.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between pb-4 border-b border-brand-gray-border">
                  <span className="text-brand-gray-dark">Order Date</span>
                  <span className="font-semibold text-brand-gray-dark">
                    {orderData.date}
                  </span>
                </div>
                <div className="flex justify-between pb-4 border-b border-brand-gray-border">
                  <span className="text-brand-gray-dark">Estimated Delivery</span>
                  <span className="font-semibold text-brand-purple">
                    {orderData.estimatedDelivery}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-brand-purple-dark">Total Amount</span>
                  <span className="text-2xl font-bold text-brand-purple">
                    ₹{orderData.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-6 border-t border-brand-gray-border">
                <button
                  onClick={() => navigate("/track-order")}
                  className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Track Your Order
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full px-6 py-3 border-2 border-brand-gray-border text-brand-gray-dark font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* Support Section */}
        <section className="py-12">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-bold text-brand-gray-dark mb-4">
                Need Help?
              </h3>
              <p className="text-brand-gray-light mb-6">
                Check your email for order confirmation and tracking details. If you have
                any questions, our support team is available 24/7.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Email:</span>{" "}
                  <a href="mailto:support@desiiglobal.com" className="text-brand-purple hover:underline">
                    support@desiiglobal.com
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span>{" "}
                  <a href="tel:+919876543210" className="text-brand-purple hover:underline">
                    +91 98765 43210
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
