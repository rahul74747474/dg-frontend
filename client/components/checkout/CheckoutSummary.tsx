import React from "react";
import { Truck, ShieldCheck, Tag } from "lucide-react";

interface CheckoutSummaryProps {
  items?: number;
  subtotal: number;
  discount?: number;
  discountName?: string;
  delivery?: number;
  actualShippingCost?: number;
  freeShippingApplied?: boolean;
  courierName?: string;
  estimatedDelivery?: string;
  tax?: number;
  codCharge?: number;
  total: number;
  isLoading?: boolean;
  isServiceable?: boolean;
  serviceabilityError?: string;
  onPlaceOrder?: () => void;
  isProcessing?: boolean;
  isDisabled?: boolean;
  buttonText?: string;
  showSecondaryButton?: boolean;
  onSecondaryClick?: () => void;
}

export default function CheckoutSummary({
  items = 0,
  subtotal = 0,
  discount = 0,
  discountName = "",
  delivery,
  actualShippingCost = 0,
  freeShippingApplied = false,
  courierName = "",
  estimatedDelivery = "",
  tax = 0,
  codCharge = 0,
  total = 0,
  isLoading = false,
  isServiceable = true,
  serviceabilityError = "",
  onPlaceOrder,
  isProcessing = false,
  isDisabled = false,
  buttonText = "Place Order",
  showSecondaryButton = false,
  onSecondaryClick,
}: CheckoutSummaryProps) {
  return (
    <div className="sticky top-24 border border-brand-gray-border rounded-xl p-6 bg-brand-gray-lightest shadow-sm">
      <h3 className="text-lg font-bold text-brand-gray-dark mb-4">Order Summary</h3>

      {/* Item Count */}
      <div className="flex justify-between text-sm text-brand-gray-light pb-3 border-b border-brand-gray-border">
        <span>{items} {items === 1 ? "item" : "items"} in cart</span>
        <span className="font-semibold text-brand-gray-dark">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      {isLoading ? (
        <div className="py-8 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-brand-gray-light">Calculating live rates...</p>
        </div>
      ) : (
        <>
          {/* Breakdown */}
          <div className="space-y-3 py-4 text-sm">
            {/* Subtotal */}
            <div className="flex justify-between text-brand-gray-dark">
              <span>Items Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between items-center text-brand-green bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-200">
                <span className="flex items-center gap-1.5">
                  <Tag size={14} />
                  {discountName || "Store Discount"}
                </span>
                <span className="font-bold">-₹{discount.toFixed(2)}</span>
              </div>
            )}

            {/* Delivery */}
            <div className="space-y-1">
              <div className="flex justify-between text-brand-gray-dark">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-brand-purple" />
                  Delivery Charge
                </span>
                <span className="font-semibold">
                  {delivery === undefined || delivery === null ? (
                    <span className="text-gray-400">At next step</span>
                  ) : freeShippingApplied || delivery === 0 ? (
                    <span className="text-brand-green font-bold flex items-center gap-1">
                      FREE
                      {actualShippingCost > 0 && (
                        <span className="text-xs text-gray-400 line-through font-normal">
                          ₹{actualShippingCost}
                        </span>
                      )}
                    </span>
                  ) : (
                    `₹${delivery.toFixed(2)}`
                  )}
                </span>
              </div>

              {courierName && isServiceable && (
                <p className="text-[11px] text-gray-500 pl-5">
                  Via {courierName} {estimatedDelivery ? `(${estimatedDelivery})` : ""}
                </p>
              )}
            </div>

            {/* Tax */}
            {tax > 0 && (
              <div className="flex justify-between text-brand-gray-dark">
                <span>GST (Tax)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
            )}

            {/* COD Charge */}
            {codCharge > 0 && (
              <div className="flex justify-between text-brand-gray-dark">
                <span>COD Convenience Fee</span>
                <span className="font-semibold">₹{codCharge.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Serviceability Warning */}
          {!isServiceable && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 mb-4">
              ⚠️ {serviceabilityError || "Delivery is unavailable for this pincode."}
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t border-brand-gray-border">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-brand-purple-dark text-base">Grand Total</span>
                <p className="text-[11px] text-brand-gray-light">Inclusive of all taxes & delivery</p>
              </div>
              <span className="text-2xl font-bold text-brand-purple">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      {onPlaceOrder && (
        <>
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing || isDisabled || !isServiceable || isLoading}
            className="w-full mt-6 px-6 py-4 bg-brand-purple text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              buttonText
            )}
          </button>

          {showSecondaryButton && (
            <button
              onClick={onSecondaryClick}
              className="w-full mt-3 px-6 py-3 border border-brand-gray-border text-brand-gray-dark font-semibold rounded-xl hover:bg-white transition-colors text-sm"
            >
              Continue Shopping
            </button>
          )}
        </>
      )}

      <div className="mt-6 pt-4 border-t border-brand-gray-border/60 flex items-center justify-center gap-2 text-xs text-brand-gray-light">
        <ShieldCheck size={16} className="text-brand-green" />
        <span>100% Secure Checkout & Live Rates</span>
      </div>
    </div>
  );
}
