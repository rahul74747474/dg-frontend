import React, { useState, useEffect, useRef } from "react";
import { Check, Loader2, MapPin } from "lucide-react";
import api from "@/api/axios";

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: "home" | "office";
  saveAddress: boolean;
}

interface AddressFormProps {
  onSubmit: (address: Address) => void;
  isLoading?: boolean;
}

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
  "Australia",
  "Singapore",
  "Germany",
  "France",
  "New Zealand",
];

export const INDIAN_STATES_AND_UTS = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const initialAddress: Address = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  addressType: "home",
  saveAddress: false,
};

export default function AddressForm({
  onSubmit,
  isLoading = false,
}: AddressFormProps) {
  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLookingUpPin, setIsLookingUpPin] = useState(false);
  const [pincodeFeedback, setPincodeFeedback] = useState<string>("");
  const pinLookupTimer = useRef<NodeJS.Timeout | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.email.trim()) newErrors.email = "Email is required";
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!address.country.trim()) newErrors.country = "Country is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (address.country === "India" && !/^\d{6}$/.test(address.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 6-digit Indian pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pincode lookup logic
  const handlePincodeLookup = async (pin: string) => {
    const cleanPin = pin.trim();
    if (address.country !== "India" || cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      return;
    }

    try {
      setIsLookingUpPin(true);
      setPincodeFeedback("");

      // Query backend lookup endpoint which handles India Post API and local PIN table
      const res = await api.get(`/address/pincode/${cleanPin}`);

      if (res.data?.success && res.data.state) {
        const detectedState = res.data.state;
        const detectedCity = res.data.city || "";

        // Match with canonical Indian states list
        const matchedState =
          INDIAN_STATES_AND_UTS.find(
            (s) => s.toLowerCase() === detectedState.toLowerCase()
          ) || detectedState;

        setAddress((prev) => ({
          ...prev,
          state: matchedState,
          city: prev.city && prev.city.trim() !== "" ? prev.city : detectedCity,
        }));

        setPincodeFeedback(`Auto-detected: ${matchedState}${detectedCity ? `, ${detectedCity}` : ""}`);

        // Clear errors if any
        setErrors((prev) => ({
          ...prev,
          state: "",
          pincode: "",
        }));
      }
    } catch {
      // Graceful fallback: do not crash or block the user, allow manual entry
      setPincodeFeedback("");
    } finally {
      setIsLookingUpPin(false);
    }
  };

  const handlePincodeChange = (value: string) => {
    setAddress((prev) => ({ ...prev, pincode: value }));

    if (errors.pincode) {
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }

    if (pinLookupTimer.current) {
      clearTimeout(pinLookupTimer.current);
    }

    const cleanPin = value.trim();
    if (address.country === "India" && cleanPin.length === 6 && /^\d{6}$/.test(cleanPin)) {
      pinLookupTimer.current = setTimeout(() => {
        handlePincodeLookup(cleanPin);
      }, 400);
    } else {
      setPincodeFeedback("");
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setAddress((prev) => ({
      ...prev,
      country: newCountry,
      state: newCountry === "India" ? "" : prev.state,
    }));
    setPincodeFeedback("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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

  useEffect(() => {
    return () => {
      if (pinLookupTimer.current) clearTimeout(pinLookupTimer.current);
    };
  }, []);

  const isIndia = address.country === "India";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.fullName
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.fullName && (
          <p className="text-brand-red text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
            errors.phone
              ? "border-brand-red focus:ring-brand-red"
              : "border-brand-gray-border focus:ring-brand-purple"
          }`}
        />
        {errors.phone && (
          <p className="text-brand-red text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
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
        {errors.email && (
          <p className="text-brand-red text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Country Dropdown */}
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
          Country *
        </label>
        <select
          id="country"
          name="country"
          value={address.country}
          onChange={handleCountryChange}
          className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white transition-all"
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-brand-red text-sm mt-1">{errors.country}</p>
        )}
      </div>

      {/* Address Line 1 */}
      <div>
        <label
          htmlFor="addressLine1"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
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
        {errors.addressLine1 && (
          <p className="text-brand-red text-sm mt-1">{errors.addressLine1}</p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <label
          htmlFor="addressLine2"
          className="block text-sm font-semibold text-brand-gray-dark mb-2"
        >
          Address Line 2 (Optional)
        </label>
        <textarea
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleChange}
          placeholder="Apartment, suite, unit, landmark, etc."
          rows={2}
          className="w-full px-4 py-3 border border-brand-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all"
        />
      </div>

      {/* City, State, Pincode Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pincode with Auto-Lookup */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="pincode"
              className="block text-sm font-semibold text-brand-gray-dark"
            >
              Pincode / Postal *
            </label>
            {isLookingUpPin && (
              <span className="flex items-center gap-1 text-xs text-brand-purple animate-pulse">
                <Loader2 size={12} className="animate-spin" /> Detecting...
              </span>
            )}
          </div>
          <div className="relative">
            <input
              id="pincode"
              type="text"
              name="pincode"
              maxLength={isIndia ? 6 : 10}
              value={address.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              onBlur={() => handlePincodeLookup(address.pincode)}
              placeholder={isIndia ? "e.g. 110096" : "Postal code"}
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.pincode
                  ? "border-brand-red focus:ring-brand-red"
                  : "border-brand-gray-border focus:ring-brand-purple"
              }`}
            />
          </div>
          {errors.pincode && (
            <p className="text-brand-red text-sm mt-1">{errors.pincode}</p>
          )}
          {pincodeFeedback && !errors.pincode && (
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <MapPin size={12} /> {pincodeFeedback}
            </p>
          )}
        </div>

        {/* State Dropdown (India) or Input (International) */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-semibold text-brand-gray-dark mb-2"
          >
            State / UT *
          </label>
          {isIndia ? (
            <select
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white transition-all ${
                errors.state
                  ? "border-brand-red focus:ring-brand-red"
                  : "border-brand-gray-border focus:ring-brand-purple"
              }`}
            >
              <option value="">-- Select State / UT --</option>
              {INDIAN_STATES_AND_UTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="state"
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State or Province"
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.state
                  ? "border-brand-red focus:ring-brand-red"
                  : "border-brand-gray-border focus:ring-brand-purple"
              }`}
            />
          )}
          {errors.state && (
            <p className="text-brand-red text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-brand-gray-dark mb-2"
          >
            City *
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="e.g. New Delhi"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.city
                ? "border-brand-red focus:ring-brand-red"
                : "border-brand-gray-border focus:ring-brand-purple"
            }`}
          />
          {errors.city && (
            <p className="text-brand-red text-sm mt-1">{errors.city}</p>
          )}
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
            <label
              key={type.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="addressType"
                value={type.value}
                checked={address.addressType === type.value}
                onChange={handleChange}
                className="w-4 h-4 text-brand-purple focus:ring-brand-purple"
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
          onClick={() =>
            setAddress({ ...address, saveAddress: !address.saveAddress })
          }
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
            address.saveAddress
              ? "bg-brand-purple border-brand-purple"
              : "border-brand-gray-border hover:border-brand-purple"
          }`}
        >
          {address.saveAddress && <Check size={16} className="text-white" />}
        </button>
        <label
          onClick={() =>
            setAddress({ ...address, saveAddress: !address.saveAddress })
          }
          className="text-sm text-brand-gray-dark cursor-pointer select-none"
        >
          Save this address for future orders
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3.5 bg-brand-purple text-white font-semibold rounded-xl hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-purple/20 cursor-pointer"
      >
        {isLoading ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
}
