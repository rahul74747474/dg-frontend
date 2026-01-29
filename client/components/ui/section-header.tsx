import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  link?: string;
}

export default function SectionHeader({
  title,
  link = "/shop",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <h2 className="text-xl md:text-2xl font-semibold text-brand-gray-dark">
        {title}
      </h2>
      <Link
        to={link}
        className="text-sm font-semibold text-brand-gray-dark hover:underline"
      >
        See all products
      </Link>
    </div>
  );
}
