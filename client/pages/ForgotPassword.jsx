import { useState } from "react";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

import api from "@/api/axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP + Password
  
  // Step 1 state
  const [email, setEmail] = useState("");
  
  // Step 2 state
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // General state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to send OTP";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
  setError("Session expired. Please enter email again.");
  setStep(1);
  return;
}

    // Validation
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }
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
  email: email,
  otp: otp,
  newPassword: password,
});
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to reset password";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setError("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
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
                  {step === 1
                    ? "Enter your email to receive an OTP"
                    : "Enter the OTP and create a new password"}
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex gap-2 mb-8 justify-center">
                <div
                  className={`h-1 flex-1 rounded-full ${
                    step >= 1 ? "bg-brand-purple" : "bg-brand-gray-border"
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full ${
                    step >= 2 ? "bg-brand-purple" : "bg-brand-gray-border"
                  }`}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Step 1: Email Input */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-5 bg-brand-gray-lightest rounded-lg p-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brand-gray-dark">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      required
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                        error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-brand-gray-border focus:ring-brand-purple"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* Step 2: OTP + Password */}
              {step === 2 && (
                
                <form onSubmit={handleStep2Submit} className="space-y-5 bg-brand-gray-lightest rounded-lg p-6">
                  {/* OTP Input */}
                  <p className="text-sm text-gray-500 text-center">
  OTP sent to <span className="font-semibold">{email}</span>
</p>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-brand-gray-dark">
                      Enter OTP (6 digits) *
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setOtp(val);
                        setError("");
                      }}
                      placeholder="000000"
                      maxLength="6"
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all text-center font-mono text-xl tracking-widest ${
                        error && otp.length !== 6
                          ? "border-red-500 focus:ring-red-500"
                          : "border-brand-gray-border focus:ring-brand-purple"
                      }`}
                    />
                  </div>

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

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {loading ? "Updating..." : "Reset Password"}
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    className="w-full px-6 py-3 border border-brand-gray-border text-brand-gray-dark font-semibold rounded-lg hover:bg-brand-gray-lightest transition-colors"
                  >
                    Back
                  </button>
                </form>
              )}

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
