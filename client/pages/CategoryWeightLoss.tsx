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

const weightLossProducts: Product[] = [
  {
    id: "w1",
    image: "https://via.placeholder.com/300x300?text=Weight+Loss+Pack",
    title: "Weight Loss Snack Pack",
    price: "₹199 – ₹799",
    badge: "Sale!",
  },
  {
    id: "w2",
    image: "https://via.placeholder.com/300x300?text=Low+Cal+Makhana",
    title: "Low Calorie Makhana",
    price: "₹249 – ₹899",
  },
  {
    id: "w3",
    image: "https://via.placeholder.com/300x300?text=Fibre+Mix",
    title: "High Fibre Mix",
    price: "₹299 – ₹999",
  },
  {
    id: "w4",
    image: "https://via.placeholder.com/300x300?text=Keto+Pack",
    title: "Keto-Friendly Pack",
    price: "₹349 – ₹1,099",
  },
];

export default function CategoryWeightLoss() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Banner */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-3">
                Weight Loss Snacks
              </h1>
              <p className="text-brand-gray max-w-2xl mx-auto text-base md:text-lg">
                Designed for your weight loss journey. Low-calorie, high-protein snacks
                that satisfy cravings while keeping you on track with your health goals.
              </p>
            </div>
          </Container>
        </section>

        {/* Educational Intro */}
        <section className="bg-white">
          <Container>
            <div className="py-12 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-brand-purple-dark mb-4">
                Healthy Snacking for Weight Loss
              </h3>
              <p className="text-brand-gray leading-relaxed mb-6">
                Losing weight doesn't mean sacrificing taste or satisfaction. Our curated
                selection of snacks is specifically designed to support your weight loss goals
                with minimal calories and maximum nutrition.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-brand-purple">100</p>
                  <p className="text-sm text-brand-gray">Calories per serving</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-purple">10g</p>
                  <p className="text-sm text-brand-gray">Protein content</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-purple">6g</p>
                  <p className="text-sm text-brand-gray">Dietary fibre</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Products Grid */}
        <Container>
          <div className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {weightLossProducts.map((product) => (
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

        {/* Health Tips Section */}
        <section className="bg-brand-gray-lightest">
          <Container>
            <div className="py-12">
              <h3 className="text-2xl font-bold text-brand-purple-dark text-center mb-8">
                Tips for Successful Weight Loss
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-purple text-white">
                      <span className="text-lg">1</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-2">
                      Choose High-Protein Snacks
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Protein keeps you fuller longer and boosts metabolism naturally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-purple text-white">
                      <span className="text-lg">2</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-2">
                      Stay Hydrated
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Drink plenty of water throughout the day to aid digestion and metabolism.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-purple text-white">
                      <span className="text-lg">3</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-2">
                      Portion Control
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Our pre-portioned snacks help you control calorie intake naturally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-purple text-white">
                      <span className="text-lg">4</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-brand-blue-dark mb-2">
                      Regular Exercise
                    </h4>
                    <p className="text-sm text-brand-gray-light">
                      Combine healthy snacking with regular physical activity for best results.
                    </p>
                  </div>
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
