import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Toaster, toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "@/api/axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ------------------------- HANDLE INPUT CHANGE ------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* --------------------------- HANDLE SUBMIT ----------------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/contact/contact", formData);

      if (res.data.success) {
        setIsSubmitted(true);

        toast.success("Message sent successfully 🚀", {
          description: "We’ll get back to you within 24 hours",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err: any) {
      console.error(err);

      toast.error("Failed to send message ❌", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------- UI ----------------------------------- */
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster richColors position="top-right" />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Get in Touch
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>
          </Container>
        </section>

        {/* ================= FORM + INFO ================= */}
        <Container>
          <div className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ---------------- FORM ---------------- */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-brand-gray-border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-bold text-brand-purple-dark mb-6">
                  Send us a Message
                </h2>

                {/* SUCCESS BOX */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-brand-green rounded-lg animate-fade-in">
                    <p className="text-sm text-brand-green font-semibold">
                      ✓ Message sent successfully!
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* NAME */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md 
                    focus:ring-2 focus:ring-brand-purple/40 outline-none"
                  />

                  {/* EMAIL */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md 
                    focus:ring-2 focus:ring-brand-purple/40 outline-none"
                  />

                  {/* SUBJECT */}
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md 
                    focus:ring-2 focus:ring-brand-purple/40 outline-none"
                  >
                    <option value="">Select Subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-issue">Order Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>

                  {/* MESSAGE */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-brand-gray-border rounded-md 
                    focus:ring-2 focus:ring-brand-purple/40 outline-none resize-none"
                  />

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-brand-purple text-white font-semibold rounded-md 
                    transition-all duration-300 hover:opacity-90 
                    disabled:opacity-60 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ---------------- INFO ---------------- */}
            <div>
              <h2 className="text-2xl font-bold text-brand-purple-dark mb-6">
                Contact Info
              </h2>

              <div className="space-y-6">
                
                <Info icon={<Mail />} title="Email" text="support@desiiglobal.com" />
                <Info icon={<Phone />} title="Phone" text="+91 98765 43210" />
                <Info icon={<MapPin />} title="Address" text="Mumbai, India" />
                <Info icon={<Clock />} title="Hours" text="Mon - Sat, 10AM - 6PM" />

              </div>
                 {/* Social Links Placeholder */}
              <div className="mt-8 pt-8 border-t border-brand-gray-border">
                <h4 className="font-semibold text-brand-blue-dark mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-brand-gray-lighter flex items-center justify-center hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-brand-gray-lighter flex items-center justify-center hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    @
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-brand-gray-lighter flex items-center justify-center hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>

         <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h2 className="text-2xl font-bold text-brand-purple-dark mb-6 text-center">
                Visit Us
              </h2>
              <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center border border-brand-gray-border">
                <div className="text-center">
                  <div className="text-5xl mb-3">🗺️</div>
                  <p className="text-brand-gray font-semibold">
                    Interactive Map Placeholder
                  </p>
                  <p className="text-sm text-brand-gray-light">
                    Google Maps or similar integration can be added here
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <Container>
          <section className="py-12">
            <h2 className="text-2xl font-bold text-brand-purple-dark text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-3">
              <details className="bg-white border border-brand-gray-border rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                  What is your refund policy?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-brand-gray mt-4">
                  We offer a 30-day refund policy on all products if you're not satisfied.
                  Contact our support team for assistance.
                </p>
              </details>

              <details className="bg-white border border-brand-gray-border rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                  Do you deliver outside India?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-brand-gray mt-4">
                  Currently, we deliver within India only. International shipping options
                  are coming soon. Stay tuned!
                </p>
              </details>

              <details className="bg-white border border-brand-gray-border rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                  Are all your products certified organic?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-brand-gray mt-4">
                  Yes! All our products are sourced from certified organic farms and are
                  lab-tested for purity and quality.
                </p>
              </details>

              <details className="bg-white border border-brand-gray-border rounded-lg p-6 cursor-pointer group">
                <summary className="font-semibold text-brand-blue-dark flex items-center justify-between">
                  Can I place bulk orders?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-sm text-brand-gray mt-4">
                  Yes! We offer bulk discounts for corporate orders and wholesalers.
                  Please contact our sales team for more details.
                </p>
              </details>
            </div>
          </section>
        </Container>

        
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- SMALL REUSABLE COMPONENT ---------------- */

function Info({ icon, title, text }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-brand-green-lighter flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-brand-blue-dark">{title}</h4>
        <p className="text-sm text-brand-gray-light">{text}</p>
      </div>
    </div>
  );
}