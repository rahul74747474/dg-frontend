import Container from "@/components/ui/container";

interface USPPoint {
  id: string;
  title: string;
  description: string;
}

const uspPoints: USPPoint[] = [
  {
    id: "1",
    title: "Farm Direct",
    description: "Sourced directly from certified organic farms",
  },
  {
    id: "2",
    title: "No Preservatives",
    description: "100% natural, no added chemicals or preservatives",
  },
  {
    id: "3",
    title: "Lab Tested",
    description: "Quality tested in certified laboratories",
  },
  {
    id: "4",
    title: "Fresh Packing",
    description: "Freshly packed for maximum nutritional value",
  },
];

export default function WhyDesiiGlobalSection() {
  return (
    <section className="py-12 bg-brand-gray-lightest">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-4">
            Why DesiiGlobal?
          </h2>
          <p className="text-brand-gray text-base md:text-lg leading-relaxed mb-10">
            We believe in providing pure, organic wellness products sourced ethically
            and delivered fresh. Every product is a promise of health and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {uspPoints.map((point) => (
            <div key={point.id} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-brand-green-lighter flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 bg-brand-green rounded-full"></div>
              </div>
              <h3 className="font-poppins text-base font-semibold text-brand-blue-dark">
                {point.title}
              </h3>
              <p className="text-sm text-brand-gray-light leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
