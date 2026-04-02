import React, { useState } from "react";
import { Check, Smartphone, Banknote } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "prepaid",
    name: "Prepaid",
    description: "Pay using Google Pay, Paytm, PhonePe, or any UPI app",
    icon: <Smartphone size={32} strokeWidth={1.5} />,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered to your doorstep",
    icon: <Banknote size={32} strokeWidth={1.5} />,
  },
];

export default function PaymentMethods({ selectedMethod, onSelectMethod }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`relative p-4 border-2 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              selectedMethod === method.id
                ? "border-purple-600 bg-purple-50/50 shadow-sm"
                : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
            }`}
          >
            {/* Selected Indicator */}
            {selectedMethod === method.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center animate-in fade-in zoom-in duration-200">
                <Check size={14} strokeWidth={3} className="text-white" />
              </div>
            )}

            {/* Icon */}
            <div className={`mb-3 transition-colors duration-200 ${
              selectedMethod === method.id ? "text-purple-600" : "text-gray-500"
            }`}>
              {method.icon}
            </div>

            {/* Name */}
            <h4 className="font-bold text-gray-900 mb-1.5">{method.name}</h4>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed">
              {method.description}
            </p>
          </button>
        ))}
      </div>

      {/* Payment Note */}
      <div className="p-4 mt-6 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
        <Check size={18} className="text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-700 font-medium">
          All payments are secure and encrypted
        </p>
      </div>
    </div>
  );
}