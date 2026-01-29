interface CheckoutSummaryProps {
  items?: number;
  subtotal: number;
  discount?: number;
  delivery: number;
  total: number;
  onPlaceOrder?: () => void;
  isProcessing?: boolean;
  isDisabled?: boolean;
  buttonText?: string;
  showSecondaryButton?: boolean;
  onSecondaryClick?: () => void;
}

export default function CheckoutSummary({
  items = 3,
  subtotal,
  discount = 0,
  delivery,
  total,
  onPlaceOrder,
  isProcessing = false,
  isDisabled = false,
  buttonText = "Place Order",
  showSecondaryButton = false,
  onSecondaryClick,
}: CheckoutSummaryProps) {
  return (
    <div className="sticky top-24 border border-brand-gray-border rounded-lg p-6 bg-brand-gray-lightest">
      <h3 className="text-lg font-bold text-brand-gray-dark mb-6">Order Summary</h3>

      {/* Item Count */}
      <div className="flex justify-between text-sm text-brand-gray-light pb-4 border-b border-brand-gray-border">
        <span>{items} item{items !== 1 ? "s" : ""}</span>
        <span className="font-semibold text-brand-gray-dark">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 py-4">
        <div className="flex justify-between text-brand-gray-dark">
          <span>Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-brand-green">
            <span>Discount</span>
            <span className="font-semibold">-₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-brand-gray-dark">
          <span>Delivery Charges</span>
          <span className="font-semibold">
            {delivery === 0 ? (
              <span className="text-brand-green">FREE</span>
            ) : (
              `₹${delivery.toFixed(2)}`
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-brand-gray-border">
        <div className="flex justify-between items-center">
          <span className="font-bold text-brand-purple-dark">Total</span>
          <span className="text-2xl font-bold text-brand-purple">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-brand-gray-light mt-6 pt-6 border-t border-brand-gray-border">
        Taxes will be calculated at checkout
      </p>

      {/* Action Buttons */}
      {onPlaceOrder && (
        <>
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing || isDisabled}
            className="w-full mt-6 px-6 py-4 bg-brand-purple text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-lg"
          >
            {isProcessing ? "Processing..." : buttonText}
          </button>

          {showSecondaryButton && (
            <button
              onClick={onSecondaryClick}
              className="w-full mt-3 px-6 py-3 border-2 border-brand-gray-border text-brand-gray-dark font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
            >
              Continue Shopping
            </button>
          )}
        </>
      )}
    </div>
  );
}
