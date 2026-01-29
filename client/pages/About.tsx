import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-brand-peach-bg">
          <Container>
            <div className="py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-purple-dark mb-4">
                About DesiiGlobal
              </h1>
              <p className="text-lg text-brand-gray max-w-2xl mx-auto">
                Bringing organic wellness to your doorstep with transparency, quality, and care.
              </p>
            </div>
          </Container>
        </section>

        {/* Brand Story */}
        <Container>
          <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-purple-dark mb-4">
                Our Story
              </h2>
              <p className="text-brand-gray mb-4 leading-relaxed">
                DesiiGlobal was founded with a simple mission: to make premium organic wellness
                products accessible to everyone. We started with a belief that health should not be
                a luxury, and quality should never be compromised.
              </p>
              <p className="text-brand-gray mb-4 leading-relaxed">
                What began as a small venture has grown into a community of health-conscious
                individuals who trust us to deliver pure, authentic, and nutritious products.
                Every product in our catalog is carefully selected and tested to ensure it meets
                our strict quality standards.
              </p>
              <p className="text-brand-gray leading-relaxed">
                Today, DesiiGlobal is proud to serve thousands of customers across India, bringing
                wellness products directly from farms to families.
              </p>
            </div>
            <div className="bg-brand-gray-lightest rounded-lg aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-brand-gray font-semibold">Our Journey to Organic</p>
              </div>
            </div>
          </section>
        </Container>

        {/* Mission & Vision */}
        <section className="bg-brand-gray-lightest py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg border border-brand-gray-border">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-brand-purple-dark mb-4">
                  Our Mission
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  To empower individuals to lead healthier, more sustainable lives by providing
                  authentic, organic wellness products that are responsibly sourced and
                  transparently shared with our community.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-brand-gray-border">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-2xl font-bold text-brand-purple-dark mb-4">
                  Our Vision
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  To become the most trusted brand for organic wellness products in India, where
                  every customer feels confident that they're investing in their health with
                  products backed by quality, transparency, and care.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Why We Started */}
        <Container>
          <section className="py-16">
            <h2 className="text-3xl font-bold text-brand-purple-dark text-center mb-12">
              Why We Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                  💰
                </div>
                <h4 className="font-bold text-brand-blue-dark mb-2">
                  Affordability Crisis
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Organic products were expensive and out of reach for many families looking
                  to improve their health.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                  🔍
                </div>
                <h4 className="font-bold text-brand-blue-dark mb-2">
                  Trust Issues
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Many "organic" products lacked proper certifications and transparent sourcing
                  information.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-green-lighter flex items-center justify-center text-2xl">
                  🚚
                </div>
                <h4 className="font-bold text-brand-blue-dark mb-2">
                  Accessibility Gap
                </h4>
                <p className="text-sm text-brand-gray-light">
                  Quality organic products were not easily available online with reliable delivery
                  and customer support.
                </p>
              </div>
            </div>
          </section>
        </Container>

        {/* Sourcing & Quality Promise */}
        <section className="bg-brand-peach-bg py-16">
          <Container>
            <h2 className="text-3xl font-bold text-brand-purple-dark text-center mb-12">
              Sourcing & Quality Promise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-dark mb-2">
                    Direct Farm Partnerships
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    We work directly with certified organic farms, eliminating middlemen and
                    ensuring transparency from source to your doorstep.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-dark mb-2">
                    Lab Testing
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Every batch is tested in certified laboratories for pesticides, heavy metals,
                    and nutritional content.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-dark mb-2">
                    No Preservatives
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    100% natural products with no artificial additives, colors, or preservatives.
                    What you see is what you get.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-dark mb-2">
                    Fresh Packing
                  </h4>
                  <p className="text-sm text-brand-gray-light">
                    Products are freshly packed to maintain maximum nutritional value and taste.
                    Quality you can taste and feel.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Brand Values */}
        <Container>
          <section className="py-16">
            <h2 className="text-3xl font-bold text-brand-purple-dark text-center mb-12">
              Our Brand Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-brand-gray-border text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-bold text-brand-blue-dark mb-2">Transparency</h4>
                <p className="text-sm text-brand-gray-light">
                  We openly share our sourcing, testing, and production processes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-brand-gray-border text-center">
                <div className="text-4xl mb-3">💎</div>
                <h4 className="font-bold text-brand-blue-dark mb-2">Quality</h4>
                <p className="text-sm text-brand-gray-light">
                  We never compromise on quality, even if it means higher costs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-brand-gray-border text-center">
                <div className="text-4xl mb-3">♻️</div>
                <h4 className="font-bold text-brand-blue-dark mb-2">Sustainability</h4>
                <p className="text-sm text-brand-gray-light">
                  We promote eco-friendly practices throughout our supply chain.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-brand-gray-border text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h4 className="font-bold text-brand-blue-dark mb-2">Care</h4>
                <p className="text-sm text-brand-gray-light">
                  Your health and satisfaction are at the heart of everything we do.
                </p>
              </div>
            </div>
          </section>
        </Container>

        {/* Stats Section */}
        <section className="bg-brand-blue text-white py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-opacity-90">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-opacity-90">Partner Farms</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-opacity-90">Organic Products</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5⭐</div>
                <p className="text-opacity-90">Customer Rating</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact CTA */}
        <Container>
          <section className="py-16 text-center">
            <h2 className="text-3xl font-bold text-brand-purple-dark mb-4">
              Get in Touch
            </h2>
            <p className="text-brand-gray max-w-2xl mx-auto mb-8">
              Have questions about our products, sourcing, or anything else? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-brand-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
