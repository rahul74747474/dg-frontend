import { FormEvent, useState } from "react";
import Container from "@/components/ui/container";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for API call
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-12 bg-brand-purple">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join Our Wellness Community
          </h2>
          <p className="text-white text-opacity-90 text-base mb-8">
            Get exclusive offers, health tips, and early access to new products. Subscribe now!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 max-w-sm px-4 py-3 rounded-md text-brand-gray-dark placeholder-brand-gray-light focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-brand-purple font-semibold rounded-md hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-white text-opacity-70 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}
