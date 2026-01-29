import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

import api from "@/api/axios";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  // email passed from signup
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!email) {
    navigate("/signup");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/auth/verify-email", {
        email,
        otp,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid or expired OTP"
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
                  Verify Your Email
                </h1>
                <p className="text-brand-gray-light">
                  Enter the 6-digit code sent to
                  <br />
                  <span className="font-semibold">{email}</span>
                </p>
              </div>

              {/* OTP Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-brand-gray-lightest rounded-lg p-6"
              >
                {error && (
                  <p className="text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}

                {/* OTP */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-center tracking-widest text-lg focus:ring-2 focus:ring-brand-purple"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
