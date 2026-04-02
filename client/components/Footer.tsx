import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Leaf,
  Truck,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/api/axios";

export default function Footer() {
  const [newsletter, setNewsletter] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletter.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsSubscribing(true);
      // Subscribe to newsletter - adjust API call if needed
      await api.post("/newsletter/subscribe", { email: newsletter });
      toast.success("Thank you for subscribing!");
      setNewsletter("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to subscribe");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-brand-black-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-container mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-brand-gray-lighter/20">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex-shrink-0 w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center">
              <Leaf className="text-brand-green" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% Natural</h4>
              <p className="text-sm text-brand-gray-light">Premium quality products</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex-shrink-0 w-12 h-12 bg-brand-blue/20 rounded-lg flex items-center justify-center">
              <Truck className="text-brand-blue" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Free Delivery</h4>
              <p className="text-sm text-brand-gray-light">On orders above ₹499</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="flex-shrink-0 w-12 h-12 bg-brand-purple/20 rounded-lg flex items-center justify-center">
              <Lock className="text-brand-purple" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white">Secure Payment</h4>
              <p className="text-sm text-brand-gray-light">SSL encrypted checkout</p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 pb-12 border-b border-brand-gray-lighter/20">
          {/* Newsletter */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Connected</h3>
              <p className="text-brand-gray-light">
                Get exclusive offers, recipes, and wellness tips delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-brand-gray-dark text-white placeholder-brand-gray-light border border-brand-gray-lighter/20 focus:outline-none focus:border-brand-purple transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {isSubscribing ? "..." : "Subscribe"}
                </button>
              </div>
              <p className="text-xs text-brand-gray-light">
                We promise not to spam. Unsubscribe at any time.
              </p>
            </form>
          </div>

          {/* Social Media */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Follow Us</h3>
              <p className="text-brand-gray-light">
                Join our community on social media for daily inspiration.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/desiiglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-brand-gray-dark rounded-lg flex items-center justify-center hover:bg-brand-purple transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/desiiglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-brand-gray-dark rounded-lg flex items-center justify-center hover:bg-brand-purple transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/desiiglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-brand-gray-dark rounded-lg flex items-center justify-center hover:bg-brand-purple transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-brand-gray-lighter/20">
          {/* Shop */}
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/category/makhana"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Flavored Makhana
                </Link>
              </li>
              <li>
                <Link
                  to="/category/roasted-flavours"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Roasted Snacks
                </Link>
              </li>
              <li>
                <Link
                  to="/category/protein-snacks"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Protein Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/track-order"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="text-brand-gray-light hover:text-brand-purple transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-brand-gray-lighter/20">
          <div className="flex gap-4">
            <Mail size={24} className="text-brand-purple flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-1">Email</h4>
              <a
                href="mailto:support@desiiglobal.com"
                className="text-brand-gray-light hover:text-brand-purple transition-colors"
              >
                support@desiiglobal.com
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={24} className="text-brand-purple flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-1">Phone</h4>
              <a
                href="tel:+919876543210"
                className="text-brand-gray-light hover:text-brand-purple transition-colors"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={24} className="text-brand-purple flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-white mb-1">Location</h4>
              <p className="text-brand-gray-light text-sm">
                New Delhi, India
              </p>
            </div>
          </div>
        </div>

        {/* FSSAI Section */}
        <div className="bg-brand-gray-dark/50 rounded-lg p-6 mb-12 pb-12 border-b border-brand-gray-lighter/20">
          <h4 className="font-bold text-white mb-3">Food Safety & Certification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-brand-gray-light mb-2">
                <span className="font-semibold">FSSAI License:</span> 12345678912345
              </p>
              <p className="text-sm text-brand-gray-light">
                DesiiGlobal is licensed by the Food Safety and Standards Authority
                of India (FSSAI) to manufacture and sell food products.
              </p>
            </div>
            <div>
              <p className="text-sm text-brand-gray-light mb-2">
                <span className="font-semibold">Product Categories:</span>
              </p>
              <ul className="text-sm text-brand-gray-light space-y-1">
                <li>• Premium Roasted Makhana</li>
                <li>• Flavored Snacks</li>
                <li>• Protein Enriched Foods</li>
                <li>• Health & Wellness Products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gray-lighter/20 py-8">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-brand-gray-light text-sm">
                © 2025 DesiiGlobal. All rights reserved.
              </p>
            </div>
            {/* <div className="flex gap-6">
              <img
                src="https://via.placeholder.com/40x24?text=VISA"
                alt="Visa"
                className="h-6 opacity-75 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://via.placeholder.com/40x24?text=MASTERCARD"
                alt="Mastercard"
                className="h-6 opacity-75 hover:opacity-100 transition-opacity"
              />
              <img
                src="https://via.placeholder.com/40x24?text=UPI"
                alt="UPI"
                className="h-6 opacity-75 hover:opacity-100 transition-opacity"
              />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
