import { Check } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay using Google Pay, Paytm, PhonePe, or any UPI app",
    icon: "📱",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    description: "Visa, Mastercard, American Express, and RuPay",
    icon: "💳",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "Direct payment from your bank account",
    icon: "🏦",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when your order is delivered to your doorstep",
    icon: "🚚",
  },
];

export default function PaymentMethods({ selectedMethod, onSelectMethod }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-brand-gray-dark">Payment Method</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`relative p-4 border-2 rounded-lg text-left transition-all ${
              selectedMethod === method.id
                ? "border-brand-purple bg-brand-gray-lightest"
                : "border-brand-gray-border hover:border-brand-purple hover:bg-brand-gray-lightest"
            }`}
          >
            {/* Selected Indicator */}
            {selectedMethod === method.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-purple flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            )}

            {/* Icon */}
            <div className="text-3xl mb-2">{method.icon}</div>

            {/* Name */}
            <h4 className="font-bold text-brand-gray-dark mb-1">{method.name}</h4>

            {/* Description */}
            <p className="text-xs text-brand-gray-light leading-relaxed">
              {method.description}
            </p>
          </button>
        ))}
      </div>

      {/* Payment Note */}
      <div className="p-4 bg-brand-green-lighter rounded-lg border border-brand-green">
        <p className="text-sm text-brand-green font-semibold">
          ✓ All payments are secure and encrypted
        </p>
      </div>
    </div>
  );
}
