import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

import api from "@/api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      await api.post("/auth/forgot-password", { email });

      setMessage(
        "If an account exists, a password reset link has been sent to your email."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20">
          <Container>
            <div className="max-w-md mx-auto">
              {/* Heading */}
              <div className="space-y-2 mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark">
                  Forgot Password
                </h1>
                <p className="text-brand-gray-light">
                  We’ll send you a link to reset your password
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-brand-gray-lightest rounded-lg p-6"
              >
                {error && (
                  <p className="text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="text-sm text-green-600 text-center">
                    {message}
                  </p>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-brand-purple"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-brand-purple hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
