import Container from "@/components/ui/container";
import { Star } from "lucide-react";
import { testimonials } from "@/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-brand-gray-lighter"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-brand-gray-lightest">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-2">
            What Our Customers Say
          </h2>
          <p className="text-brand-gray text-base">
            Join thousands of satisfied customers experiencing wellness with DesiiGlobal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg border border-brand-gray-border flex flex-col gap-4"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-sm text-brand-gray leading-relaxed flex-1">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-poppins font-semibold text-brand-blue-dark text-sm">
                  {testimonial.name}
                </h4>
                {testimonial.city && (
                  <p className="text-xs text-brand-gray-light">{testimonial.city}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
