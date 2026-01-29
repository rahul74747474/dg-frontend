import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for API call
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Get in Touch
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto">
                Have a question or feedback? We'd love to hear from you. Fill out the form below
                or reach us through any of our contact channels.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Form & Info */}
        <Container>
          <div className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-brand-gray-border rounded-lg p-8">
                <h2 className="text-2xl font-bold text-brand-purple-dark mb-6">
                  Send us a Message
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-brand-green rounded-lg">
                    <p className="text-sm text-brand-green font-semibold">
                      ✓ Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-issue">Order Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-brand-gray-border rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>

                <p className="text-xs text-brand-gray-light text-center mt-4">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-brand-purple-dark mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-blue-dark mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:support@desiiglobal.com"
                      className="text-sm text-brand-purple hover:underline"
                    >
                      support@desiiglobal.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-blue-dark mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+919876543210"
                      className="text-sm text-brand-purple hover:underline"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-blue-dark mb-1">
                      Address
                    </h4>
                    <address className="text-sm text-brand-gray-light not-italic">
                      DesiiGlobal Headquarters
                      <br />
                      123 Wellness Street
                      <br />
                      Mumbai, Maharashtra 400001
                      <br />
                      India
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-blue-dark mb-1">
                      Business Hours
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Monday - Friday: 10:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
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

        {/* Map Placeholder */}
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
