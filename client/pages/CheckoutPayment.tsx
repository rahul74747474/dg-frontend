import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Check, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import api from "@/api/axios";
import { loadRazorpayScript, initializeRazorpayPayment } from "@/services/razorpay";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [method, setMethod] = useState<string>("prepaid");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);
  const [addressLoading, setAddressLoading] = useState(true);

  // 1. Load selected delivery address from session
  useEffect(() => {
    const storedAddressId = sessionStorage.getItem("deliveryAddressId");

    if (!storedAddressId) {
      toast.error("Please select a delivery address first");
      navigate("/checkout/delivery");
      return;
    }

    const fetchAddress = async () => {
      try {
        setAddressLoading(true);
        const { data } = await api.get(`/address/${storedAddressId}`);
        setDeliveryAddress(data.address);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load delivery address");
        navigate("/checkout/delivery");
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
    loadRazorpayScript().catch((err) => console.warn("Razorpay script preload:", err.message));
  }, [navigate]);

  // 2. Fetch Authoritative Order Pricing & Real-Time Shipping from Backend
  const normalizedMethod = method === "cod" ? "COD" : "ONLINE";

  const {
    data: previewResponse,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
    error: previewError,
    refetch: refetchPreview,
  } = useQuery({
    queryKey: ["order-preview", deliveryAddress?._id, normalizedMethod],
    queryFn: async () => {
      const res = await api.post("/orders/preview", {
        addressId: deliveryAddress?._id,
        paymentMethod: normalizedMethod,
      });
      return res.data;
    },
    enabled: Boolean(deliveryAddress?._id),
    staleTime: 1000 * 30, // 30 seconds
    retry: 1,
  });

  const billingData = previewResponse || null;
  const isServiceable = billingData?.serviceable ?? true;
  const serviceabilityError = billingData?.message || "";
  const items = billingData?.items || [];
  const pricing = billingData?.pricing || {
    subTotal: 0,
    discount: 0,
    shipping: 0,
    tax: 0,
    codCharge: 0,
    grandTotal: 0,
  };
  const shippingInfo = billingData?.shipping || {};
  const discountInfo = billingData?.discount || {};

  // 3. Handle Place Order
  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (!isServiceable) {
      toast.error(serviceabilityError || "Delivery is not available for this pincode");
      return;
    }

    if (method === "cod") {
      await handleCODOrder();
    } else {
      await handleRazorpayPayment();
    }
  };

  // 4. Cash On Delivery Flow
  const handleCODOrder = async () => {
    try {
      setIsProcessing(true);

      const res = await api.post("/orders", {
        addressId: deliveryAddress._id,
        paymentMethod: "COD",
      });

      const createdOrder = res.data.order;
      toast.success("Order placed successfully with Cash on Delivery 🎉");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      sessionStorage.removeItem("deliveryAddressId");

      navigate("/order-success", {
        state: { orderId: createdOrder._id },
      });
    } catch (error: any) {
      console.error("COD Order Placement Error:", error);
      toast.error(error.response?.data?.message || "Failed to place COD order");
      setIsProcessing(false);
    }
  };

  // 5. Razorpay Online Payment Flow
  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      await loadRazorpayScript();

      // Step 1: Request authoritative Razorpay order from backend
      const { data } = await api.post("/payment/create-order", {
        addressId: deliveryAddress._id,
      });

      const razorpayOrder = data.order;

      // Step 2: Open Razorpay Gateway Modal
      const result = await initializeRazorpayPayment({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "DesiiGlobal",
        description: "Organic Health Snacks Payment",
        order_id: razorpayOrder.id,
        prefill: {
          name: deliveryAddress.name || "Customer",
          contact: deliveryAddress.mobile || "",
        },
        theme: {
          color: "#704FE6",
        },
      });

      // Step 3: Verify Payment and commit order on backend
      if (result.razorpay_payment_id) {
        const verifyRes = await api.post("/payment/verify", {
          razorpay_order_id: data.order.id,
          razorpay_payment_id: result.razorpay_payment_id,
          razorpay_signature: result.razorpay_signature,
          addressId: deliveryAddress._id,
        });

        const confirmedOrder = verifyRes.data.order;
        toast.success("Payment verified! Your order has been placed 🎉");

        queryClient.invalidateQueries({ queryKey: ["cart"] });
        sessionStorage.removeItem("deliveryAddressId");

        navigate("/order-success", {
          state: { orderId: confirmedOrder._id },
        });
      }
    } catch (error: any) {
      console.error("Payment Processing Error:", error);
      toast.error(error?.response?.data?.message || error.message || "Payment cancelled or failed");
      setIsProcessing(false);
    }
  };

  if (addressLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500">Loading delivery details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!deliveryAddress) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb / Progress */}
        <section className="py-8 border-b border-brand-gray-border">
          <Container>
            <div className="flex items-center gap-2 text-sm text-brand-gray-light mb-4">
              <span>Cart</span>
              <span>/</span>
              <span>Delivery</span>
              <span>/</span>
              <span className="text-brand-purple font-semibold">Payment</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark">
              Review & Pay
            </h1>
            <p className="text-brand-gray-light mt-2">
              Review your live billing breakdown and choose a payment method
            </p>
          </Container>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Details & Payment */}
              <div className="lg:col-span-2 space-y-8">
                {/* Delivery Address Card */}
                <div className="bg-brand-gray-lightest rounded-xl p-6 border border-brand-gray-border flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Delivering To
                    </h3>
                    <p className="font-bold text-brand-gray-dark text-base">
                      {deliveryAddress.name}
                    </p>
                    <p className="text-sm text-brand-gray-dark mt-1">
                      {deliveryAddress.address_line}
                    </p>
                    <p className="text-sm text-brand-gray-light">
                      {deliveryAddress.city}, {deliveryAddress.state} —{" "}
                      <span className="font-bold text-brand-purple">{deliveryAddress.pincode}</span>
                    </p>
                    <p className="text-sm text-brand-gray-light mt-1">
                      Phone: {deliveryAddress.mobile}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/checkout/delivery")}
                    className="text-sm font-semibold text-brand-purple hover:underline px-3 py-1.5 bg-white border border-brand-gray-border rounded-lg shadow-sm"
                  >
                    Change Address
                  </button>
                </div>

                {/* Serviceability Warning */}
                {!isServiceable && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-300 rounded-xl text-red-800">
                    <AlertCircle size={24} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Delivery Unavailable for this Pincode</h4>
                      <p className="text-sm mt-1">
                        {serviceabilityError || `Shiprocket couriers do not currently service pincode ${deliveryAddress.pincode}.`}
                      </p>
                      <button
                        onClick={() => navigate("/checkout/delivery")}
                        className="mt-2 text-xs font-bold text-red-900 underline"
                      >
                        Choose a different delivery address
                      </button>
                    </div>
                  </div>
                )}

                {/* Order Items Review */}
                <div className="bg-white rounded-xl p-6 border border-brand-gray-border shadow-sm">
                  <h3 className="text-lg font-bold text-brand-gray-dark mb-4">
                    Review Order Items ({items.length})
                  </h3>

                  {isPreviewLoading ? (
                    <div className="py-6 text-center text-gray-400 text-sm">
                      Loading cart items...
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {items.map((item: any) => (
                        <div
                          key={item.productId}
                          className="py-3 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg border"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-brand-gray-dark text-sm">
                                {item.name}
                              </p>
                              <p className="text-xs text-brand-gray-light">
                                Qty: {item.quantity} × ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <p className="font-bold text-brand-purple text-sm">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Payment Methods Component */}
                <div className="bg-white rounded-xl p-6 border border-brand-gray-border shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-brand-gray-dark">Select Payment Method</h3>
                    <p className="text-sm text-brand-gray-light">
                      Choose between online payment (UPI, Cards, NetBanking) or Cash on Delivery
                    </p>
                  </div>

                  <PaymentMethods selectedMethod={method} onSelectMethod={setMethod} />
                </div>

                {/* Terms & Conditions */}
                <div className="bg-brand-gray-lightest rounded-xl p-5 border border-brand-gray-border">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgreeTerms(!agreeTerms)}
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        agreeTerms
                          ? "bg-brand-purple border-brand-purple"
                          : "border-brand-gray-border hover:border-brand-purple bg-white"
                      }`}
                    >
                      {agreeTerms && <Check size={14} className="text-white" />}
                    </button>
                    <label className="text-sm text-brand-gray-dark cursor-pointer">
                      I agree to the{" "}
                      <span className="font-bold text-brand-purple hover:underline">
                        Terms of Service
                      </span>
                      ,{" "}
                      <span className="font-bold text-brand-purple hover:underline">
                        Privacy Policy
                      </span>
                      , and authorize this order.
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Authoritative Breakdown */}
              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={items.length}
                  subtotal={pricing.subTotal}
                  discount={pricing.discount}
                  discountName={discountInfo.name}
                  delivery={pricing.shipping}
                  actualShippingCost={pricing.actualShippingCost}
                  freeShippingApplied={shippingInfo.freeShippingApplied}
                  courierName={shippingInfo.courier}
                  estimatedDelivery={shippingInfo.estimatedDelivery}
                  tax={pricing.tax}
                  codCharge={pricing.codCharge}
                  total={pricing.grandTotal}
                  isLoading={isPreviewLoading}
                  isServiceable={isServiceable}
                  serviceabilityError={serviceabilityError}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                  isDisabled={!agreeTerms || !isServiceable || isPreviewLoading}
                  buttonText={
                    method === "cod"
                      ? "Place COD Order"
                      : `Pay ₹${pricing.grandTotal.toFixed(2)}`
                  }
                  showSecondaryButton
                  onSecondaryClick={() => navigate("/shop")}
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
