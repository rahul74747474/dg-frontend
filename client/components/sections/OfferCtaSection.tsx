import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/container";

export default function OfferCtaSection() {
  return (
    <section className="py-12">
      <Container>
       <div
  className="relative rounded-lg p-8 md:p-12 text-white text-center overflow-hidden"
  style={{
    backgroundImage: "url('https://i.ibb.co/C5gwSnrM/Untitled-7.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col gap-4 items-center justify-center">
    
    <span className="inline-block px-3 py-1 rounded-full bg-white/30 font-semibold text-sm">
      Limited Time Offer
    </span>

    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
      Get 30% Off on Your First Order
    </h2>

    <p className="text-lg opacity-90 max-w-md">
      Use code FIRST30 at checkout. Valid for new customers only.
    </p>

    <p className="text-sm opacity-75 mt-2">
      Offer expires in{" "}
      <span className="font-semibold ml-1">
        2 days 15 hours
      </span>
    </p>

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
