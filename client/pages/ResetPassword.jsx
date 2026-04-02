import { useState } from "react";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

import api from "@/api/axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-20">
            <Container>
              <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <AlertCircle size={48} className="text-brand-red" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-4">
                  Invalid Reset Link
                </h1>
                <p className="text-brand-gray-light mb-6">
                  The password reset link is missing or invalid. Please request a new one.
                </p>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Request New Link
                </button>
              </div>
            </Container>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        token,
        password,
      });

      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Invalid or expired token";
      setError(message);
      toast.error(message);
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
                  Reset Password
                </h1>
                <p className="text-brand-gray-light">
                  Create a new secure password
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-brand-gray-lightest rounded-lg p-6"
              >
                {/* New Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Min. 6 characters"
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all pr-10 ${
                        error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-brand-gray-border focus:ring-brand-purple"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-light hover:text-brand-gray-dark"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Re-enter password"
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all pr-10 ${
                        error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-brand-gray-border focus:ring-brand-purple"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-light hover:text-brand-gray-dark"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity"
                >
                  {loading ? "Updating..." : "Reset Password"}
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
