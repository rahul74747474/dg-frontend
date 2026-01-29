import { useState } from "react";
import { Camera, LogOut } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/container";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

export default function Account() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const [avatarUploading, setAvatarUploading] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAvatarUploading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      await api.put("/auth/avatar", formData);
      const meRes = await api.get("/auth/me");
      setUser(meRes.data.user);

    } catch (err) {
      console.error("Avatar upload failed", err);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6 space-y-8">
            <h1 className="text-2xl font-bold">My Account</h1>

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                {user.avatar?.url ? (
                  <img src={user.avatar.url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-brand-purple text-white flex items-center justify-center text-xl font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}

                <label className="absolute bottom-0 right-0 bg-brand-purple text-white p-1 rounded-full cursor-pointer">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={avatarUploading}
                  />
                </label>
              </div>

              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm">{user.email}</p>
                {!user.isEmailVerified && (
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                    Email not verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button onClick={() => navigate("/orders")} className="btn">
                My Orders
              </button>
              <button onClick={() => navigate("/address")} className="btn">
                My Addresses
              </button>
              <button
                onClick={handleLogout}
                className="ml-auto text-red-600 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
