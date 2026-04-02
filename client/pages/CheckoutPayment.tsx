import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethods from "@/components/checkout/PaymentMethods";
// import { useCart } from "@/context/CartContext";
import api from "@/api/axios";
import { loadRazorpayScript, initializeRazorpayPayment } from "@/services/razorpay";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    
      /* ---------- HANDLERS ---------- */
    const fetchCart = async () => {
      try {
        const { data } = await api.get("/cart");
        console.log("🔥 CART RESPONSE:", data);
        setItems(data.cartItems);
    
        // calculate total
        const totalAmount = data.cartItems.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        );
    
        setTotal(totalAmount);
    
      } catch (error) {
        console.error("Cart fetch error", error);
      }
    };
    
    useEffect(() => {
      fetchCart();
    }, []);
  

 const [method, setMethod] = useState<string>("prepaid");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null);

  useEffect(() => {
  const stored = sessionStorage.getItem("deliveryAddressId");

  if (!stored) {
    toast.error("Please select a delivery address first");
    navigate("/checkout/delivery");
    return;
  }

  const fetchAddress = async () => {
    try {
      const { data } = await api.get(`/address/${stored}`);
      setDeliveryAddress(data.address);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch address");
    }
  };

  fetchAddress();

  // load razorpay
  loadRazorpayScript();
}, []);

  if (!deliveryAddress) {
    return null;
  }

  const cartSummary = {
    items: items.length,
    subtotal: total,
    discount: 0,
    delivery: total > 499 ? 0 : 99,
    total: total + (total > 499 ? 0 : 99),
  };

  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (method === "cod") {
  await handleCODOrder();
} else {
  await handleRazorpayPayment();
}
  };

  const handleCODOrder = async () => {
  try {
    setIsProcessing(true);

    // ✅ send FULL address (not ID)
    const res = await api.post("/orders/", {
      paymentMethod: "COD",
      delivery_address: deliveryAddress, // 🔥 IMPORTANT FIX
    });

    const createdOrder = res.data.order;

    toast.success("Order placed with Cash on Delivery 🎉");

    // 🚚 Create shipping
    try {
      await api.post(`/shipping/create/${createdOrder._id}`);
      console.log("🚚 Shipping created successfully");
    } catch (shippingError) {
      console.error("🚨 Shipping failed:", shippingError);
      toast.error("Order placed but shipping failed");
    }

    sessionStorage.removeItem("deliveryAddressId");

    // ✅ Redirect
    navigate("/order-success", {
      state: { orderId: createdOrder._id },
    });

  } catch (error) {
    console.error("COD ERROR:", error);
    toast.error(
      error.response?.data?.message || "Failed to place COD order"
    );
    setIsProcessing(false);
  }
};

  const handleRazorpayPayment = async () => {
  try {
    setIsProcessing(true);

    await loadRazorpayScript(); // 🔥 ensure loaded

    const { data } = await api.post("/payment/create-order");

    console.log("Order:", data);

    const result = await initializeRazorpayPayment({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "DesiiGlobal",
      description: "Order Payment",
      order_id: data.order.id,
      prefill: {
        name: "Desiiglobal",
        contact: "9355346445",
      },
      theme: {
        color: "#704FE6",
      },
    });

    console.log("Payment Result:", result);

    if (result.razorpay_payment_id) {
      await verifyPaymentAndCreateOrder(
        data.order.id,
        result.razorpay_payment_id,
        result.razorpay_signature
      );
    }

  } catch (error: any) {
    console.error("ERROR:", error);
    toast.error(error.message || "Payment failed");
    setIsProcessing(false);
  }
};

  const verifyPaymentAndCreateOrder = async (
  orderId,
  paymentId,
  signature
) => {
  try {
    const addressId = sessionStorage.getItem("deliveryAddressId");

    const res = await api.post("/payment/verify", {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      addressId,
    });

    const createdOrder = res.data.order;

    toast.success("Payment successful 🎉");

    // 🔥 STEP 2: CALL SHIPPING API
    try {
      await api.post(`/shipping/create/${createdOrder._id}`);
      console.log("🚚 Shipping created successfully");
    } catch (shippingError) {
      console.error("🚨 Shipping failed:", shippingError);
      toast.error("Order placed but shipping failed");
    }

    sessionStorage.removeItem("deliveryAddressId");

    // 🔥 STEP 3: NAVIGATE
    navigate("/order-success", {
      state: { orderId: createdOrder._id },
    });

  } catch (error) {
    toast.error("Payment verification failed");
    setIsProcessing(false);
  }
};

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
              Review your order and select a payment method
            </p>
          </Container>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Section - Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Delivery Address */}
                <div className="bg-brand-gray-lightest rounded-lg p-6 border border-brand-gray-border">
                  <h3 className="text-lg font-bold text-brand-gray-dark mb-4">
                    Delivery Address
                  </h3>
                  <p className="font-semibold text-brand-gray-dark">
                    {deliveryAddress.address_line}
                  </p>
                  <p className="text-sm text-brand-gray-light mt-2">
                    {deliveryAddress.city}, {deliveryAddress.state}{" "}
                    {deliveryAddress.pincode}
                  </p>
                  <p className="text-sm text-brand-gray-light">
                    {deliveryAddress.mobile}
                  </p>
                  <button
                    onClick={() => navigate("/checkout/delivery")}
                    className="text-sm text-brand-purple hover:underline mt-3"
                  >
                    Change Address
                  </button>
                </div>

                {/* Order Items Review */}
                <div className="bg-white rounded-lg p-6 border border-brand-gray-border">
                  <h3 className="text-lg font-bold text-brand-gray-dark mb-6">
                    Order Items
                  </h3>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center pb-4 border-b border-brand-gray-border last:border-b-0"
                      >
                        <div>
                          <p className="font-semibold text-brand-gray-dark">
                            {item.productId.name}
                          </p>
                          <p className="text-sm text-brand-gray-light">
  Quantity: {item.quantity}
</p>
                        </div>
                        <p className="font-bold text-brand-purple">
  ₹{(item.productId.price * item.quantity).toFixed(2)}
</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="max-w-2xl w-full bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100"> */}
        
        {/* Header for context */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-gray-500 text-sm mt-1">Complete your order by choosing a payment method.</p>
        </div>

        {/* The Component */}
        <PaymentMethods selectedMethod={method} onSelectMethod={setMethod} />
        
      {/* </div>
    </div> */}
                {/* Terms & Conditions */}
                <div className="bg-brand-gray-lightest rounded-lg p-6 border border-brand-gray-border">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => setAgreeTerms(!agreeTerms)}
                      className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        agreeTerms
                          ? "bg-brand-purple border-brand-purple"
                          : "border-brand-gray-border hover:border-brand-purple"
                      }`}
                    >
                      {agreeTerms && <Check size={16} className="text-white" />}
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
                      , and{" "}
                      <span className="font-bold text-brand-purple hover:underline">
                        Return Policy
                      </span>
                    </label>
                  </div>
                </div>

                {/* Info Alert */}
                <div className="flex gap-3 p-4 bg-blue-50 border border-brand-blue rounded-lg">
                  <AlertCircle size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-brand-blue">
                    <p className="font-semibold">Secure Payment</p>
                    <p className="mt-1">
                      Your payment information is encrypted and secured using Razorpay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary - Right Column */}
              <div className="lg:col-span-1">
                <CheckoutSummary
                  items={cartSummary.items}
                  subtotal={cartSummary.subtotal}
                  discount={cartSummary.discount}
                  delivery={cartSummary.delivery}
                  total={cartSummary.total}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                  isDisabled={!agreeTerms}
                  buttonText={isProcessing ? "Processing..." : "Place Order"}
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
