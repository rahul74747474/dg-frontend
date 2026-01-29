import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/container";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // 🔥 EXACT contract from backend
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      navigate("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
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
              <div className="space-y-2 mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark">
                  Welcome Back
                </h1>
                <p className="text-brand-gray-light">
                  Sign in to your DesiiGlobal account
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-brand-gray-lightest rounded-lg p-6"
              >
                {error && (
                  <p className="text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border rounded-lg"
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

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-brand-purple"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-brand-purple text-white rounded-lg"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold text-brand-purple">
                  Sign up
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
