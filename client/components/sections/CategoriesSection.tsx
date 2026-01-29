import { Link } from "react-router-dom";
import Container from "@/components/ui/container";
import SectionHeader from "@/components/ui/section-header";

interface Props {
  categories: string[];
}

export default function CategoriesSection({ categories }: Props) {
  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <div
              key={cat}
              className="px-6 py-3 rounded-lg border font-semibold"
            >
              {cat}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
