import ProductCard from "../ProductCard";
import { Product } from "../../pages/Index";
import Container from "@/components/ui/container";
import SectionHeader from "@/components/ui/section-header";

interface Props {
  products: Product[];
  loading?: boolean;
}

export default function BestSellersSection({ products, loading }: Props) {
  if (loading) return <p>Loading...</p>;

  return (
    // <section className="py-10">
    //   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    //     {products.map((p) => (
    //       <ProductCard
    //         key={p._id}
    //         image={p.images[0]}          // ✅ IMPORTANT
    //         title={p.name}
    //         price={`₹${p.price}`}
    //         link={`/product/${p.slug}`}
    //       />
    //     ))}
    //   </div>
    // </section>
    <section className="py-12">
      <Container>
        <SectionHeader title="Best Sellers" link="/shop" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
          <ProductCard
  key={p._id}
  id={p._id}
  title={p.name}
  image={p.images[0]}
  price={p.price}
  slug={p.slug}
/>
        ))}
        </div>
      </Container>
    </section>
  );
}
