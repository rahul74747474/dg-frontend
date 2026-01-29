import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethods from "@/components/checkout/PaymentMethods";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Placeholder data - in a real app, this would come from cart state/context
  const cartSummary = {
    items: 3,
    subtotal: 2599.97,
    discount: 259.99,
    delivery: 99,
    total: 2439.98,
  };

  const orderItems: OrderItem[] = [
    {
      id: "1",
      name: "Premium Roasted Makhana",
      quantity: 2,
      price: 1299.99,
    },
    {
      id: "2",
      name: "Honey Roasted Makhana",
      quantity: 1,
      price: 1299.99,
    },
  ];

  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order-success");
    }, 2000);
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
                {/* Order Items Review */}
                <div className="bg-white rounded-lg p-6 border border-brand-gray-border">
                  <h3 className="text-lg font-bold text-brand-gray-dark mb-6">
                    Order Items
                  </h3>

                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center pb-4 border-b border-brand-gray-border last:border-b-0"
                      >
                        <div>
                          <p className="font-semibold text-brand-gray-dark">
                            {item.name}
                          </p>
                          <p className="text-sm text-brand-gray-light">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-brand-purple">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-lg p-6 border border-brand-gray-border">
                  <PaymentMethods
                    selectedMethod={selectedPayment}
                    onSelectMethod={setSelectedPayment}
                  />
                </div>

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

                {/* Payment Disclaimer */}
                <div className="p-4 bg-brand-blue rounded-lg">
                  <p className="text-sm text-white">
                    <strong>Note:</strong> This is a demo checkout. No actual payment will
                    be processed. Click "Place Order" to see the order confirmation page.
                  </p>
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
                  buttonText="Place Order"
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
