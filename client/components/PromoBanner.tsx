import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PromoBannerProps {
  backgroundImage: string;
  badge: string;
  title: string;
  subtitle: string;
  link?: string;
}

export default function PromoBanner({
  backgroundImage,
  badge,
  title,
  subtitle,
  link = "/",
}: PromoBannerProps) {
  return (
    <div
      className="min-h-[210px] rounded-[10px] relative bg-cover bg-center p-5 flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col gap-3">
        <p className="font-poppins text-sm font-bold text-brand-red leading-7">
          {badge}
        </p>
        
        <h2
          className="font-poppins text-lg md:text-xl font-semibold text-brand-gray-dark leading-6 max-w-[250px]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        
        <p className="font-poppins text-sm font-normal text-brand-black leading-7">
          {subtitle}
        </p>
      </div>
      
      <div className="mt-4">
        <Link
          to={link}
          className="inline-flex items-center gap-[5px] py-[10px] px-[15px] rounded-full border border-brand-gray-border bg-white"
        >
          <span className="font-poppins text-[15px] font-medium text-brand-black leading-[15px]">
            Shop Now
          </span>
          <ArrowRight className="w-[15px] h-[15px] text-brand-black" />
        </Link>
      </div>
    </div>
  );
}
