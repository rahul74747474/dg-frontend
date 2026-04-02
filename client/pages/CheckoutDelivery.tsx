import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CircleDot, Circle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import AddressForm from "@/components/checkout/AddressForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { useCart } from "@/context/CartContext";
import api from "@/api/axios";

interface Address {
  _id: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  mobile: string;
  isDefault: boolean;
}

interface AddressFormData {
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

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Auto-select default address
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr._id);
      } else {
        setSelectedAddressId(addresses[0]._id);
      }
    }
  }, [addresses]);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/address");
      console.log(response.data.addresses)
      setAddresses(response.data.addresses || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (formData: AddressFormData) => {
    try {
      setIsSaving(true);
      const payload = {
        address_line: `${formData.addressLine1}${formData.addressLine2 ? ", " + formData.addressLine2 : ""}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: "India",
        mobile: formData.phone,
      };

      await api.post("/address", payload);
      toast.success("Address added successfully!");
      setShowAddressForm(false);
      await fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await api.delete(`/address/${addressId}`);
      toast.success("Address deleted successfully!");
      await fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const handleContinue = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    const selectedAddr = addresses.find((a) => a._id === selectedAddressId);
    console.log(selectedAddr)
    sessionStorage.setItem("deliveryAddressId", selectedAddr._id);
    navigate("/checkout/payment");
  };

  const cartSummary = {
    items: items.length,
    subtotal: total,
    discount: total*0.1,
    delivery: total > 499 ? 0 : 50,
    total: total + (total > 499 ? 0 :50) - (total*0.1),
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
              Select or add a delivery address to proceed with checkout
            </p>
          </Container>
        </section>

        {/* Main Checkout Content */}
        <section className="py-8 md:py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Address Section - Left Column */}
              <div className="lg:col-span-2">
                {/* Existing Addresses */}
                {!showAddressForm && (
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-brand-gray-dark">
                        Select Delivery Address
                      </h3>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Plus size={18} />
                        Add New Address
                      </button>
                    </div>

                    {isLoading ? (
                      <div className="text-center py-8">
                        <p className="text-brand-gray-light">Loading addresses...</p>
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="bg-brand-gray-lightest rounded-lg p-6 text-center">
                        <p className="text-brand-gray-light mb-4">No addresses found</p>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Add Address
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            onClick={() => setSelectedAddressId(address._id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedAddressId === address._id
                                ? "border-brand-purple bg-blue-50"
                                : "border-brand-gray-border hover:border-brand-purple"
                            }`}
                          >
                            <div className="flex gap-4">
                              {selectedAddressId === address._id ? (
                                <CircleDot size={24} className="text-brand-purple flex-shrink-0 mt-1" />
                              ) : (
                                <Circle size={24} className="text-brand-gray-border flex-shrink-0 mt-1" />
                              )}
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold text-brand-gray-dark">
                                      {address.address_line}
                                    </p>
                                    <p className="text-sm text-brand-gray-light mt-1">
                                      {address.city}, {address.state} {address.pincode}
                                    </p>
                                    <p className="text-sm text-brand-gray-light">
                                      {address.mobile}
                                    </p>
                                  </div>
                                  {address.isDefault && (
                                    <span className="px-2 py-1 bg-brand-green text-white text-xs font-semibold rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address._id);
                                  }}
                                  className="p-2 hover:bg-brand-gray-lightest rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} className="text-brand-red" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Add Address Form */}
                {showAddressForm && (
                  <div className="bg-white rounded-lg p-6 border border-brand-gray-border">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-brand-gray-dark">Add New Address</h3>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="text-brand-gray-light hover:text-brand-gray-dark"
                      >
                        ✕
                      </button>
                    </div>
                    <AddressForm onSubmit={handleAddressSubmit} isLoading={isSaving} />
                  </div>
                )}

                {/* Continue Button */}
                {!showAddressForm && addresses.length > 0 && (
                  <button
                    onClick={handleContinue}
                    className="w-full mt-6 px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    Continue to Payment
                  </button>
                )}
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
