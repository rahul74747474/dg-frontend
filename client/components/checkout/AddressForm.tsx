import { useState } from "react";
import { Check } from "lucide-react";

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

interface AddressFormProps {
  onSubmit: (address: Address) => void;
  isLoading?: boolean;
}

const initialAddress: Address = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "home",
  saveAddress: false,
};

export default function AddressForm({ onSubmit, isLoading = false }: AddressFormProps) {
  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.email.trim()) newErrors.email = "Email is required";
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setAddress({ ...address, [name]: !address[name as keyof Address] });
    } else {
      setAddress({ ...address, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(address);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.fullName
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.fullName && <p className="text-brand-red text-sm mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="9876543210"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.phone
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.phone && <p className="text-brand-red text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={address.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.email && <p className="text-brand-red text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Address Line 1 */}
      <div>
        <label htmlFor="addressLine1" className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Address Line 1 *
        </label>
        <textarea
          id="addressLine1"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleChange}
          placeholder="Street address, building, house no."
          rows={2}
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.addressLine1
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.addressLine1 && <p className="text-brand-red text-sm mt-1">{errors.addressLine1}</p>}
      </div>

      {/* Address Line 2 */}
      <div>
        <label htmlFor="addressLine2" className="block text-sm font-semibold text-brand-gray-dark mb-2">
          Address Line 2 (Optional)
        </label>
        <textarea
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleChange}
          placeholder="Apartment, suite, etc."
          rows={2}
          className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
        />
      </div>

      {/* City, State, Pincode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-brand-gray-dark mb-2">
            City *
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Mumbai"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.city
                ? "border-brand-red focus:ring-brand-red"
                : "border-brand-gray-border focus:ring-brand-purple"
            }`}
          />
          {errors.city && <p className="text-brand-red text-sm mt-1">{errors.city}</p>}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-brand-gray-dark mb-2">
            State *
          </label>
          <input
            id="state"
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="Maharashtra"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.state
                ? "border-brand-red focus:ring-brand-red"
                : "border-brand-gray-border focus:ring-brand-purple"
            }`}
          />
          {errors.state && <p className="text-brand-red text-sm mt-1">{errors.state}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-semibold text-brand-gray-dark mb-2">
            Pincode *
          </label>
          <input
            id="pincode"
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            placeholder="400001"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.pincode
                ? "border-brand-red focus:ring-brand-red"
                : "border-brand-gray-border focus:ring-brand-purple"
            }`}
          />
          {errors.pincode && <p className="text-brand-red text-sm mt-1">{errors.pincode}</p>}
        </div>
      </div>

      {/* Address Type */}
      <div>
        <label className="block text-sm font-semibold text-brand-gray-dark mb-3">
          Address Type
        </label>
        <div className="flex gap-4">
          {[
            { value: "home", label: "Home" },
            { value: "office", label: "Office" },
          ].map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="addressType"
                value={type.value}
                checked={address.addressType === type.value}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-brand-gray-dark">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Address Checkbox */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setAddress({ ...address, saveAddress: !address.saveAddress })}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            address.saveAddress
              ? "bg-brand-purple border-brand-purple"
              : "border-brand-gray-border hover:border-brand-purple"
          }`}
        >
          {address.saveAddress && <Check size={16} className="text-white" />}
        </button>
        <label className="text-sm text-brand-gray-dark cursor-pointer">
          Save this address for future orders
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        {isLoading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
}
