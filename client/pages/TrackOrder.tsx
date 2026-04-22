import { useState } from "react";
import { Search, CheckCircle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "../api/axios"

interface OrderStatus {
  status: "packed" | "shipped" | "delivered";
  date: string;
  location?: string;
  completed: boolean;
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [showError, setShowError] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapStatus = (status: string) => {
    if (!status) return "placed";

    const s = status.toLowerCase();

    if (s.includes("picked") || s.includes("packed")) return "packed";
    if (s.includes("transit") || s.includes("shipped")) return "shipped";
    if (s.includes("delivered")) return "delivered";

    return "placed";
  };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setShowError(true);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShowError(false);
      setOrderData(null);
      const res = await api.get(`/track/${orderId}`);
      // NOTE: no /api if already in baseURL

      setOrderData(res.data);
      setIsSearched(true);

    } catch (err: any) {
      console.log(err);

      setError(
        err?.response?.data?.message || "Order not found"
      );
      setOrderData(null);
      setIsSearched(true);

    } finally {
      setLoading(false);
    }
  };

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
                Enter your order ID to track the status of your delivery
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
            {loading && (
              <div className="text-center py-10">
                <p className="text-brand-gray">Tracking your order...</p>
              </div>
            )}

            {/* Order Status (shown after search) */}
            {isSearched && orderData && (
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
                      <p className="font-semibold text-brand-blue-dark">
                        {orderData?.orderInfo?.orderDate
                          ? new Date(orderData.orderInfo.orderDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>

                    </div>
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Total Amount</p>
                      <p className="font-semibold text-brand-purple">
                        ₹{orderData?.orderInfo?.amount || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-gray-light mb-1">Status</p>
                      <p className="font-semibold text-brand-green">
                        {orderData?.orderInfo?.currentStatus || orderData?.orderInfo?.status}
                      </p> </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {orderData?.items?.map((item: any) => (
                      <div key={item._id} className="flex gap-4 pb-3 border-b border-brand-gray-border">
                        <img
                          src={item.image}
                          className="w-16 h-16 object-cover rounded-md"
                        />

                        <div className="flex-1">
                          <p className="font-semibold text-brand-blue-dark">
                            {item.name}
                          </p>
                          <p className="text-sm text-brand-gray-light">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Timeline */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-6">
                    Delivery Timeline
                  </h3>

                  <div className="space-y-4">
                    {orderData?.timeline?.map((step: any, index: number) => {
                      const status = mapStatus(step.activity || step.status);

                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-green text-white">
                              <CheckCircle size={20} />
                            </div>
                            {index < (orderData?.timeline?.length || 0) - 1 && (
                              <div className="w-0.5 h-16 bg-brand-green"></div>
                            )}
                          </div>

                          <div className="pb-4 flex-1">
                            <h4 className="font-semibold text-brand-blue-dark capitalize">
                              {status}
                            </h4>

                            <p className="text-sm text-brand-gray-light">
                              {new Date(step.date).toLocaleString("en-IN")}
                            </p>

                            {step.location && (
                              <p className="text-sm text-brand-gray">📍 {step.location}</p>
                            )}

                            {step.activity && (
                              <p className="text-xs text-brand-gray-light mt-1">
                                {step.activity}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-brand-gray-border rounded-lg p-6">
                  <h3 className="text-lg font-bold text-brand-purple-dark mb-4">
                    Shipping Address
                  </h3>
                  <div className="text-sm text-brand-gray-dark space-y-1">
                    <p>{orderData?.address?.mobile}</p>
                    <p>{orderData?.address?.address_line}</p>
                    <p>
                      {orderData?.address?.city}, {orderData?.address?.state}{" "}
                      {orderData?.address?.pincode}
                    </p>
                    <p>{orderData?.address?.country}</p>
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
                  }}
                  className="w-full py-3 px-4 border border-brand-gray-border text-brand-blue-dark font-semibold rounded-md hover:bg-brand-gray-lighter transition-colors"
                >
                  Track Another Order
                </button>
              </div>
            )}

            {/* No Results State */}
            {isSearched && !orderData && !loading && (
              <div className="mt-12 text-center py-12 border border-brand-gray-border rounded-lg bg-brand-gray-lightest">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center text-3xl">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-brand-blue-dark mb-2">
                  Order Not Found
                </h3>
                <p className="text-sm text-brand-gray mb-6">
                  Please check your Order ID and try again.
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
