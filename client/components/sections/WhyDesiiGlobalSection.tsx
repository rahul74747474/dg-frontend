import React from 'react';
import { Leaf, ShieldCheck, FlaskConical, Package } from 'lucide-react';

// Mocking the Container component for the self-contained preview
const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </div>
);

interface USPPoint {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; // Added icon to the interface
}

const uspPoints: USPPoint[] = [
  {
    id: "1",
    title: "Farm Direct",
    description: "Sourced directly from certified organic farms",
    icon: Leaf, // Icon for farming/nature
  },
  {
    id: "2",
    title: "No Preservatives",
    description: "100% natural, no added chemicals or preservatives",
    icon: ShieldCheck, // Icon for safety/guarantee
  },
  {
    id: "3",
    title: "Lab Tested",
    description: "Quality tested in certified laboratories",
    icon: FlaskConical, // Icon for laboratory/testing
  },
  {
    id: "4",
    title: "Fresh Packing",
    description: "Freshly packed for maximum nutritional value",
    icon: Package, // Icon for packaging
  },
];

export default function WhyDesiiGlobalSection() {
  return (
    // Note: Replaced 'bg-brand-gray-lightest' with standard 'bg-gray-50' for preview
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Replaced 'text-brand-purple-dark' with 'text-purple-900' */}
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Why DesiiGlobal?
          </h2>
          {/* Replaced 'text-brand-gray' with 'text-gray-600' */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-12">
            We believe in providing pure, organic wellness products sourced ethically
            and delivered fresh. Every product is a promise of health and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {uspPoints.map((point) => (
            <div key={point.id} className="flex flex-col items-center text-center gap-4 group">
              {/* Icon Container: Replaced custom green colors with standard Tailwind greens */}
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-200">
                {/* Render the Lucide icon dynamically */}
                <point.icon className="w-8 h-8 text-green-700" strokeWidth={2} />
              </div>
              
              <div>
                {/* Replaced 'text-brand-blue-dark' with 'text-slate-800' */}
                <h3 className="font-poppins text-lg font-semibold text-slate-800 mb-2">
                  {point.title}
                </h3>
                {/* Replaced 'text-brand-gray-light' with 'text-gray-500' */}
                <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}