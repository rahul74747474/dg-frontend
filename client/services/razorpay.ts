/**
 * Razorpay Payment Integration Utility
 * Handles loading Razorpay script and initializing payment modal
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Load Razorpay script from CDN
 */
export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {

    console.log("Loading Razorpay script...");

    if (window.Razorpay) {
      console.log("Razorpay already loaded");
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Razorpay script loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("❌ Razorpay script failed to load");
      reject(new Error("Failed to load Razorpay script"));
    };

    document.body.appendChild(script);
  });
};

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

/**
 * Initialize Razorpay payment modal
 */
export const initializeRazorpayPayment = (
  options: RazorpayOptions
): Promise<RazorpayResponse> => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay script not loaded"));
      return;
    }

    const razorpay = new window.Razorpay({
      ...options,
      handler: (response: RazorpayResponse) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment cancelled by user"));
        },
      },
    });

    razorpay.open();
  });
};
