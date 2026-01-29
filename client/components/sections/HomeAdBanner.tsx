import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/container";

interface BannerProps {
  heading: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
}

export default function HomeAdBanner({
  heading,
  subtext,
  ctaText = "Shop Now",
  ctaLink = "/shop",
  imagePosition = "right",
  backgroundColor = "bg-brand-gray-lightest",
}: BannerProps) {
  const imageElement = (
    <div className={`${backgroundColor} rounded-lg aspect-video flex items-center justify-center overflow-hidden`}>
      <div className="text-center">
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-brand-gray font-semibold">Banner Image Placeholder</p>
      </div>
    </div>
  );

  return (
    <section className="py-8">
      <Container>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}>
          {imagePosition === "left" && (
            <div>{imageElement}</div>
          )}

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold text-brand-purple-dark leading-tight">
              {heading}
            </h2>

            {subtext && (
              <p className="text-brand-gray-light leading-relaxed max-w-lg">
                {subtext}
              </p>
            )}

            <div className="pt-2">
              <Link
                to={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                {ctaText} <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {imagePosition === "right" && (
            <div>{imageElement}</div>
          )}
        </div>
      </Container>
    </section>
  );
}
