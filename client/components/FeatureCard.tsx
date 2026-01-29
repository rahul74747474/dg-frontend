interface FeatureCardProps {
  icon?: string;   // ✅ optional
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start md:items-center justify-start md:justify-center">
      <div className="flex gap-3 md:gap-[15px] max-w-[300px] w-full">
        <div className="w-[50px] md:w-[57.39px] flex-shrink-0">
          {icon && <img src={icon} alt={title} />}
 </div>
        <div className="pt-2 md:pt-[15px] flex flex-col gap-1 md:gap-[5.8px]">
          <h3 className="font-poppins text-base md:text-lg font-semibold text-brand-gray-dark leading-6 md:leading-[27px]">
            {title}
          </h3>
          <p className="font-poppins text-xs md:text-sm font-normal text-gray-light leading-[18px] md:leading-[19.6px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
