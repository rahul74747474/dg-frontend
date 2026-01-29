import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import AddressForm from "@/components/checkout/AddressForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "office";
  saveAddress: boolean;
}

export default function CheckoutDelivery() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - in a real app, this would come from cart state/context
  const cartSummary = {
    items: 3,
    subtotal: 2599.97,
    discount: 259.99,
    delivery: 99,
    total: 2439.98,
  };

  const handleAddressSubmit = async (address: Address) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Store address in sessionStorage for demo purposes
      sessionStorage.setItem("deliveryAddress", JSON.stringify(address));
      setIsLoading(false);
      navigate("/checkout/payment");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb / Progress */}
        <section className="py-8 border-b border-brand-gray-border">
          <Container>
            <div className="flex items-center gap-2 text-sm text-brand-gray-light mb-4">
              <span className="text-brand-gray-dark font-semibold">Cart</span>
              <span>/</span>
              <span className="text-brand-purple font-semibold">Delivery</span>
              <span>/</span>
              <span>Payment</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark">
              Delivery Details
            </h1>
            <p className="text-brand-gray-light mt-2">
              Enter your delivery address to proceed with checkout
            </p>
          </Container>
        </section>

        {/* Main Checkout Content */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Address Form - Left Column */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 border border-brand-gray-border">
                  <AddressForm onSubmit={handleAddressSubmit} isLoading={isLoading} />
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
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-brand-gray-lightest border-t border-brand-gray-border">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <div className="text-3xl">🔒</div>
                <div>
                  <h4 className="font-bold text-brand-gray-dark">Secure Checkout</h4>
                  <p className="text-sm text-brand-gray-light">
                    Your data is encrypted and safe
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-3xl">✓</div>
                <div>
                  <h4 className="font-bold text-brand-gray-dark">Quick Delivery</h4>
                  <p className="text-sm text-brand-gray-light">
                    Delivered in 2-3 business days
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-3xl">📞</div>
                <div>
                  <h4 className="font-bold text-brand-gray-dark">24/7 Support</h4>
                  <p className="text-sm text-brand-gray-light">
                    We're here to help anytime
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
