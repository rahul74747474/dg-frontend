import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/ui/container";

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  badge?: string;
}

const proteinProducts: Product[] = [
  {
    id: "p1",
    image: "https://via.placeholder.com/300x300?text=Protein+Mix",
    title: "Protein Makhana Mix",
    price: "₹349 – ₹1,299",
    badge: "Popular",
  },
  {
    id: "p2",
    image: "https://via.placeholder.com/300x300?text=Almonds",
    title: "Raw Almonds",
    price: "₹269 – ₹949",
  },
  {
    id: "p3",
    image: "https://via.placeholder.com/300x300?text=Cashews",
    title: "Premium Cashews",
    price: "₹349 – ₹1,199",
  },
  {
    id: "p4",
    image: "https://via.placeholder.com/300x300?text=Mixed+Nuts",
    title: "Mixed Nuts Pack",
    price: "₹399 – ₹1,399",
  },
];

export default function CategoryProtein() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Banner */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Protein Snacks
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Power-packed snacks loaded with protein to fuel your body and support
                your fitness goals. Perfect for post-workout recovery and daily energy.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefit Highlight */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h3 className="text-xl font-bold text-brand-purple-dark text-center mb-8">
                Why Choose Our Protein Snacks?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 text-white">
                    <span className="text-xl">💪</span>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-1">
                      15g+ Protein
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Supports muscle growth and repair
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0 text-white">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-1">
                      Sustained Energy
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      No sugar crashes or energy dips
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 text-white">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-1">
                      100% Natural
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      No additives or preservatives
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Products Grid */}
        <Container>
          <div className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {proteinProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  badge={product.badge}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          </div>
        </Container>

        {/* Comparison Strip */}
        <section className="bg-brand-blue text-white">
          <Container>
            <div className="py-12">
              <h3 className="text-2xl font-bold text-center mb-8">
                Our vs. Regular Snacks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Protein Content</p>
                  <p className="text-3xl font-bold mb-2">15g+</p>
                  <p className="text-sm opacity-90">vs 2-5g in regular snacks</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Calories</p>
                  <p className="text-3xl font-bold mb-2">150-200</p>
                  <p className="text-sm opacity-90">Nutrient-dense, not empty calories</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Sugar</p>
                  <p className="text-3xl font-bold mb-2">0g</p>
                  <p className="text-sm opacity-90">No added sugars or syrups</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
