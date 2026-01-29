import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-poppins text-6xl font-bold text-brand-purple-dark mb-4">
            404
          </h1>
          <h2 className="font-poppins text-3xl font-semibold text-brand-gray-dark mb-6">
            Page Not Found
          </h2>
          <p className="font-poppins text-lg text-brand-gray mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-brand-purple text-white font-poppins font-medium hover:bg-[#634C9F] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
