import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/container";

interface BannerProps {
  heading: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: "left" | "right";
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string; // ✅ NEW
}

export default function HomeAdBanner({
  heading,
  subtext,
  ctaText = "Shop Now",
  ctaLink = "/shop",
  imagePosition = "right",
  imageUrl = "https://i.ibb.co/Xf74kK6B/Gemini-Generated-Image-tcvtkitcvtkitcvt.png",
  backgroundColor = "#e8e5e0",
  textColor = "#2C2146", // ✅ default
}: BannerProps) {

  const isImageRight = imagePosition === "right";

  const ImageSection = (
    <div className="col-span-2 h-full relative">
      <img
        src={imageUrl}
        alt={heading}
        className="w-full h-full object-cover"
      />

      {/* 🔥 Stronger Gradient Blend */}
      <div
        className={`absolute inset-y-0 w-40 z-10 ${
          isImageRight ? "left-0" : "right-0"
        }`}
        style={{
          backgroundImage: isImageRight
            ? `linear-gradient(to right, 
                ${backgroundColor}F2 0%, 
                ${backgroundColor}CC 25%, 
                ${backgroundColor}66 45%, 
                transparent 80%)`
            : `linear-gradient(to left, 
                ${backgroundColor}F2 0%, 
                ${backgroundColor}CC 25%, 
                ${backgroundColor}66 45%, 
                transparent 80%)`
        }}
      />
    </div>
  );

  const TextSection = (
    <div className="col-span-1 flex flex-col justify-center gap-6 px-6 py-16 md:px-16 md:py-24">
      
      <h2
        className="text-3xl md:text-5xl font-bold leading-tight"
        style={{ color: textColor }} // ✅ dynamic
      >
        {heading}
      </h2>

      {subtext && (
        <p
          className="text-base md:text-lg leading-relaxed max-w-md"
          style={{ color: `${textColor}CC` }} // ✅ slightly lighter
        >
          {subtext}
        </p>
      )}

      <div>
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition"
        >
          {ctaText} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="px-4 sm:px-6 py-10 md:py-16">
      <Container className="!px-0">
        <div
          className="grid grid-cols-1 md:grid-cols-3 items-stretch rounded-[3rem] overflow-hidden shadow-2xl border border-white/50"
          style={{ backgroundColor }}
        >

          {isImageRight ? (
            <>
              {TextSection}
              {ImageSection}
            </>
          ) : (
            <>
              {ImageSection}
              {TextSection}
            </>
          )}

        </div>
      </Container>
    </section>
  );
}