import Container from "@/components/ui/container";

interface Benefit {
  id: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: "1",
    title: "Rich in Protein",
    description: "High protein content for muscle building and recovery",
  },
  {
    id: "2",
    title: "Low Carb",
    description: "Perfect for weight loss and keto diet plans",
  },
  {
    id: "3",
    title: "Gluten Free",
    description: "Safe for celiac disease and gluten sensitivity",
  },
  {
    id: "4",
    title: "High Fiber",
    description: "Supports digestive health and gut wellness",
  },
];

export default function HealthBenefitsSection() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-4">
            Why Makhana?
          </h2>
          <p className="text-brand-gray text-base md:text-lg leading-relaxed">
            Makhana is nature's superfood packed with essential nutrients and health
            benefits. Discover why it's gaining popularity among health-conscious individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-lg border border-brand-gray-border"
            >
              <div className="w-20 h-20 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              </div>
              <h3 className="font-poppins text-base font-semibold text-brand-blue-dark">
                {benefit.title}
              </h3>
              <p className="text-sm text-brand-gray-light leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
