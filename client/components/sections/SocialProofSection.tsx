import Container from "@/components/ui/container";

interface ImageItem {
  id: string;
  image: string;
  alt: string;
}

const socialImages: ImageItem[] = [
  {
    id: "1",
    image: "https://via.placeholder.com/300x300?text=Image+1",
    alt: "Customer image 1",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/300x300?text=Image+2",
    alt: "Customer image 2",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/300x300?text=Image+3",
    alt: "Customer image 3",
  },
  {
    id: "4",
    image: "https://via.placeholder.com/300x300?text=Image+4",
    alt: "Customer image 4",
  },
  {
    id: "5",
    image: "https://via.placeholder.com/300x300?text=Image+5",
    alt: "Customer image 5",
  },
  {
    id: "6",
    image: "https://via.placeholder.com/300x300?text=Image+6",
    alt: "Customer image 6",
  },
  {
    id: "7",
    image: "https://via.placeholder.com/300x300?text=Image+7",
    alt: "Customer image 7",
  },
  {
    id: "8",
    image: "https://via.placeholder.com/300x300?text=Image+8",
    alt: "Customer image 8",
  },
];

export default function SocialProofSection() {
  return (
    <section className="py-12 bg-brand-gray-lightest">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark">
            Loved by Customers
          </h2>
          <p className="text-brand-gray mt-2">
            See what our community is sharing @DesiiGlobal
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialImages.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-gray-300 aspect-square group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
