import { useState, useContext } from "react";
import { ArrowRight, Eye, EyeOff, Check, Camera } from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";

import api from "@/api/axios";
import { AuthContext } from "@/context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Already logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔒 Frontend validations
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms");
      return;
    }

    try {
      setLoading(true);

      // ✅ FormData for avatar upload
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Redirect to OTP verification
      navigate("/verifyEmail", {
        state: { email },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create account"
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
                  Create Account
                </h1>
                <p className="text-brand-gray-light">
                  Join DesiiGlobal for exclusive offers
                </p>
              </div>

              {/* Signup Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-brand-gray-lightest rounded-lg p-6"
              >
                {error && (
                  <p className="text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}

                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-brand-purple flex items-center justify-center overflow-hidden bg-white">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera size={28} className="text-brand-purple" />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <p className="text-xs text-brand-gray-light">
                    Upload profile picture (optional)
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-brand-purple"
                  />
                </div>

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

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-brand-purple"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-brand-gray-dark">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-brand-purple"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                      agreeTerms
                        ? "bg-brand-purple border-brand-purple"
                        : "border-brand-gray-border"
                    }`}
                  >
                    {agreeTerms && <Check size={16} className="text-white" />}
                  </button>
                  <span className="text-sm text-brand-gray-light">
                    I agree to the{" "}
                    <Link to="#" className="text-brand-purple font-semibold">
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link to="#" className="text-brand-purple font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !agreeTerms}
                  className="w-full px-6 py-3 bg-brand-purple text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Account"}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Login Redirect */}
              <div className="mt-8 text-center">
                <p className="text-brand-gray-light text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-brand-purple hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
