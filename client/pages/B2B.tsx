import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

interface B2BForm {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  estimatedQuantity: string;
  category: string;
  message: string;
  agree: boolean;
}

const initialForm: B2BForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  estimatedQuantity: "",
  category: "",
  message: "",
  agree: false,
};

const productCategories = [
  { value: "", label: "Select a category" },
  { value: "makhana", label: "Makhana" },
  { value: "roasted-flavours", label: "Roasted Flavours" },
  { value: "protein-snacks", label: "Protein Snacks" },
  { value: "weight-loss", label: "Weight Loss" },
  { value: "mixed", label: "Mixed Products" },
];

export default function B2B() {
  const [formData, setFormData] = useState<B2BForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactPerson.trim())
      newErrors.contactPerson = "Contact person name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.estimatedQuantity.trim())
      newErrors.estimatedQuantity = "Estimated quantity is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.agree) newErrors.agree = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: !formData[name as keyof B2BForm] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData(initialForm);
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-brand-gray-lightest border-b border-brand-gray-border">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-brand-purple text-white text-sm font-semibold">
                B2B & Bulk Orders
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-purple-dark leading-tight">
                Bulk Orders & B2B Enquiries
              </h1>
              <p className="text-lg text-brand-gray-light leading-relaxed max-w-2xl mx-auto">
                Looking to order in bulk? We offer special pricing and dedicated support for
                hotels, restaurants, retailers, distributors, and other businesses.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "💰",
                  title: "Special Pricing",
                  description: "Competitive bulk rates tailored to your order volume",
                },
                {
                  icon: "🚚",
                  title: "Flexible Delivery",
                  description: "Custom delivery schedules and direct-to-destination shipping",
                },
                {
                  icon: "👥",
                  title: "Dedicated Support",
                  description: "Personal account manager for seamless communication",
                },
                {
                  icon: "📦",
                  title: "Customization",
                  description: "Custom packaging and labeling options available",
                },
                {
                  icon: "✓",
                  title: "Quality Assured",
                  description: "100% premium products with guaranteed freshness",
                },
                {
                  icon: "⏱️",
                  title: "Quick Turnaround",
                  description: "Fast processing and dispatch for urgent orders",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-brand-gray-border hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-brand-gray-dark mb-2">{benefit.title}</h3>
                  <p className="text-sm text-brand-gray-light">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Enquiry Form Section */}
        <section className="py-12 md:py-20 bg-brand-gray-lightest">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-brand-purple-dark mb-12 text-center">
                Send Your Enquiry
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-6 bg-brand-green-lighter rounded-lg border border-brand-green">
                  <div className="flex gap-3">
                    <CheckCircle className="text-brand-green flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-brand-green mb-1">
                        Enquiry Submitted Successfully!
                      </h4>
                      <p className="text-sm text-brand-green">
                        Our sales team will contact you within 24 hours with a detailed quote
                        and next steps.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-6 md:p-8 border border-brand-gray-border space-y-6"
              >
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                    Company Name *
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company Ltd."
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.companyName
                        ? "border-brand-red focus:ring-brand-red"
                        : "border-brand-gray-border focus:ring-brand-purple"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-brand-red text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>

                {/* Contact Person */}
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    id="contactPerson"
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.contactPerson
                        ? "border-brand-red focus:ring-brand-red"
                        : "border-brand-gray-border focus:ring-brand-purple"
                    }`}
                  />
                  {errors.contactPerson && (
                    <p className="text-brand-red text-sm mt-1">{errors.contactPerson}</p>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
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

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
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
                </div>

                {/* Estimated Quantity */}
                <div>
                  <label htmlFor="estimatedQuantity" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                    Estimated Order Quantity (in units) *
                  </label>
                  <input
                    id="estimatedQuantity"
                    type="text"
                    name="estimatedQuantity"
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    placeholder="e.g., 1000 units per month"
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.estimatedQuantity
                        ? "border-brand-red focus:ring-brand-red"
                        : "border-brand-gray-border focus:ring-brand-purple"
                    }`}
                  />
                  {errors.estimatedQuantity && (
                    <p className="text-brand-red text-sm mt-1">{errors.estimatedQuantity}</p>
                  )}
                </div>

                {/* Product Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                    Product Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.category
                        ? "border-brand-red focus:ring-brand-red"
                        : "border-brand-gray-border focus:ring-brand-purple"
                    }`}
                  >
                    {productCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-brand-red text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-gray-dark mb-2">
                    Message / Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business, requirements, special requests, etc."
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.message
                        ? "border-brand-red focus:ring-brand-red"
                        : "border-brand-gray-border focus:ring-brand-purple"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-brand-red text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, agree: !formData.agree })}
                    className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      formData.agree
                        ? "bg-brand-purple border-brand-purple"
                        : "border-brand-gray-border hover:border-brand-purple"
                    }`}
                  >
                    {formData.agree && <CheckCircle size={16} className="text-white" />}
                  </button>
                  <label className="text-sm text-brand-gray-dark cursor-pointer flex-1">
                    I agree to the terms and conditions and authorize DesiiGlobal to contact
                    me regarding this enquiry *
                  </label>
                </div>
                {errors.agree && <p className="text-brand-red text-sm">{errors.agree}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-brand-purple text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  {!isSubmitting && <ArrowRight size={20} />}
                </button>
              </form>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <Container>
            <h2 className="text-2xl font-bold text-brand-gray-dark mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-2xl mx-auto space-y-4">
              {[
                {
                  q: "What is the minimum order quantity?",
                  a: "We offer flexible minimum order quantities based on your business needs. Typically, we recommend starting with 500+ units for the best pricing.",
                },
                {
                  q: "Do you offer customization for bulk orders?",
                  a: "Yes! We offer custom packaging, labeling, and product customization for large orders. Please mention your requirements in the enquiry form.",
                },
                {
                  q: "What is the typical delivery time for bulk orders?",
                  a: "Most bulk orders are processed within 7-10 business days. Expedited delivery options are available for urgent requirements.",
                },
                {
                  q: "Do you provide samples?",
                  a: "Yes, we provide complimentary samples for bulk enquiries. Our sales team will arrange this during the negotiation phase.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-4 border border-brand-gray-border rounded-lg">
                  <h4 className="font-bold text-brand-gray-dark mb-2">{faq.q}</h4>
                  <p className="text-sm text-brand-gray-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
