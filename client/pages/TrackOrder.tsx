import { useState } from "react";
import { Search, CheckCircle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

interface OrderStatus {
  status: "packed" | "shipped" | "delivered";
  date: string;
  location?: string;
  completed: boolean;
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim() && email.trim()) {
      setIsSearched(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const mockOrderStatus: OrderStatus[] = [
    {
      status: "packed",
      date: "2025-01-15",
      location: "DesiiGlobal Warehouse",
      completed: true,
    },
    {
      status: "shipped",
      date: "2025-01-16",
      location: "In Transit",
      completed: true,
    },
    {
      status: "delivered",
      date: "2025-01-17",
      location: "Expected Delivery",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Track Your Order
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto">
                Enter your order ID and email to track the status of your delivery
              </p>
            </div>
          </Container>
        </section>

        {/* Search Form */}
        <Container>
          <div className="max-w-2xl mx-auto py-12">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., DG-2025-001234"
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                      setShowError(false);
                    }}
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowError(false);
                    }}
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                </div>
              </div>

              {showError && (
                <div className="p-4 bg-red-50 border border-brand-red rounded-md">
                  <p className="text-sm text-brand-red font-semibold">
                    Please fill in all fields to continue
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Search size={18} /> Track Order
              </button>
            </form>

            {/* Order Status (shown after search) */}
            {isSearched && (
              <div className="mt-12 space-y-8">
                {/* Order Summary */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-4">
                    Order Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Order ID</p>
                      <p className="font-semibold text-brand-blue-dark">{orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Order Date</p>
                      <p className="font-semibold text-brand-blue-dark">15 Jan 2025</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Total Amount</p>
                      <p className="font-semibold text-brand-purple">₹1,299</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Status</p>
                      <p className="font-semibold text-brand-green">In Transit</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-4 pb-3 border-b border-brand-gray-border">
                      <div className="w-16 h-16 bg-brand-gray-lighter rounded-md flex items-center justify-center text-2xl flex-shrink-0">
                        📦
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-blue-dark">
                          Premium Makhana - Original
                        </p>
                        <p className="text-sm text-brand-gray-light">
                          Qty: 1 × ₹1,099
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 pb-3">
                      <div className="w-16 h-16 bg-brand-gray-lighter rounded-md flex items-center justify-center text-2xl flex-shrink-0">
                        📦
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-brand-blue-dark">
                          Roasted Makhana - Cheese & Herbs
                        </p>
                        <p className="text-sm text-brand-gray-light">
                          Qty: 1 × ₹200 (Free)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Timeline */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-6">
                    Delivery Timeline
                  </h3>

                  <div className="space-y-4">
                    {mockOrderStatus.map((step, index) => (
                      <div key={step.status} className="flex gap-4">
                        {/* Timeline dot and line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              step.completed
                                ? "bg-brand-green text-white"
                                : "bg-brand-gray-lighter border-2 border-brand-gray-border"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle size={20} />
                            ) : (
                              <Clock size={20} className="text-brand-gray" />
                            )}
                          </div>
                          {index < mockOrderStatus.length - 1 && (
                            <div
                              className={`w-0.5 h-16 ${
                                step.completed ? "bg-brand-green" : "bg-brand-gray-lighter"
                              }`}
                            ></div>
                          )}
                        </div>

                        {/* Status Content */}
                        <div className="pb-4 flex-1">
                          <h4 className="font-semibold text-brand-blue-dark capitalize mb-1">
                            {step.status === "packed" && "Order Packed"}
                            {step.status === "shipped" && "Shipped"}
                            {step.status === "delivered" && "Delivery"}
                          </h4>
                          <p className="text-sm text-brand-gray-light mb-2">
                            {new Date(step.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          {step.location && (
                            <p className="text-sm text-brand-gray">
                              📍 {step.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-4">
                    Shipping Address
                  </h3>
                  <div className="text-sm text-brand-gray-dark space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street, Apartment 4B</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                    <p className="mt-3 text-brand-gray-light">
                      Phone: +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* Help Section */}
                <div className="bg-brand-gray-lightest border border-brand-gray-border rounded-lg p-6">
                  <h3 className="font-semibold text-brand-blue-dark mb-3">
                    Need Help?
                  </h3>
                  <p className="text-sm text-brand-gray mb-3">
                    If you have any questions about your order, contact our support team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="/contact" className="px-4 py-2 bg-white border border-brand-gray-border rounded-md text-brand-blue-dark font-semibold hover:bg-brand-gray-lighter transition-colors text-center">
                      Contact Support
                    </a>
                    <a href="/shop" className="px-4 py-2 bg-brand-purple text-white rounded-md font-semibold hover:opacity-90 transition-opacity text-center">
                      Continue Shopping
                    </a>
                  </div>
                </div>

                {/* Reset Search */}
                <button
                  onClick={() => {
                    setIsSearched(false);
                    setOrderId("");
                    setEmail("");
                  }}
                  className="w-full py-3 px-4 border border-brand-gray-border text-brand-blue-dark font-semibold rounded-md hover:bg-brand-gray-lighter transition-colors"
                >
                  Track Another Order
                </button>
              </div>
            )}

            {/* No Results State */}
            {isSearched && !orderId && (
              <div className="mt-12 text-center py-12 border border-brand-gray-border rounded-lg bg-brand-gray-lightest">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-3xl">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-brand-blue-dark mb-2">
                  Order Not Found
                </h3>
                <p className="text-sm text-brand-gray mb-6">
                  Please check your Order ID and email address and try again.
                </p>
              </div>
            )}
          </div>
        </Container>

        {/* FAQ Section */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h2 className="text-2xl font-bold text-brand-purple-dark text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <details className="bg-white rounded-lg p-6 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    How long does delivery take?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-4">
                    Most deliveries are completed within 5-7 business days from the order date.
                    Express delivery options may be available in select locations.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    Can I change my delivery address?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-4">
                    You can change your address if the order is still in the "Packed" status.
                    Contact our support team immediately for assistance.
                  </p>
                </details>

                <details className="bg-white rounded-lg p-6 cursor-pointer group">
                  <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                    What if my order is lost or damaged?
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-sm text-brand-gray mt-4">
                    Contact us immediately with photos and order details. We will investigate
                    and provide a replacement or refund within 48 hours.
                  </p>
                </details>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
