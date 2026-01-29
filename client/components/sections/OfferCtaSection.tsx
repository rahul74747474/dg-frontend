import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/container";

export default function OfferCtaSection() {
  return (
    <section className="py-12">
      <Container>
        <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg p-8 md:p-12 text-white text-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="inline-block">
              <span className="inline-block px-3 py-1 rounded-full bg-white bg-opacity-30 font-semibold text-sm">
                Limited Time Offer
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Get 30% Off on Your First Order
            </h2>

            <p className="text-lg opacity-90 max-w-md">
              Use code FIRST30 at checkout. Valid for new customers only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4">
              <p className="text-sm opacity-75">
                Offer expires in{" "}
                <span className="font-semibold inline-block ml-1">
                  2 days 15 hours
                </span>
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-purple font-semibold rounded-md hover:bg-opacity-90 transition-all mt-6"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
