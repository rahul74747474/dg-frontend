import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Container from "@/components/ui/container";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import SearchDropdown from "./SearchDropdown";
import api from "@/api/axios";

/* ---------------- NAV ITEMS ---------------- */

const navItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Track Order", path: "/track-order" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

export default function Header() {
  const navigate = useNavigate();
  const { items: cartItems = [] } = useCart();
  const { items: wishlistItems = [] } = useWishlist();
  const { user, setUser, isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  /* CLOSE PROFILE DROPDOWN */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
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
    <header className="sticky top-0 z-50 bg-white border-b">
      <Container>

        {/* ================= MOBILE HEADER ================= */}
        <div className="flex items-center justify-between py-3 md:hidden">

          {/* LEFT */}
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* CENTER */}
          <Link to="/">
            <img
              src="https://i.ibb.co/rfKq4JJC/dg-logo.webp"
              className="h-12"
            />
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/wishlist")}>
              <Heart className="w-5 h-5" />
            </button>

            <button onClick={() => navigate("/cart")}>
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= DESKTOP HEADER ================= */}
        <div className="hidden md:flex items-center justify-between h-[70px]">

          {/* LOGO */}
          <Link to="/">
            <img
              src="https://i.ibb.co/rfKq4JJC/dg-logo.webp"
              className="h-14 md:h-20"
            />
          </Link>

          {/* NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-brand-purple"
                      : "text-brand-gray-dark"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-7 pr-3 py-1 text-sm border rounded"
              />
              <SearchDropdown
                isOpen={isSearchOpen}
                searchQuery={searchQuery}
                onClose={() => setIsSearchOpen(false)}
                onSelectSearch={(q) => setSearchQuery(q)}
              />
            </form>

            {/* WISHLIST */}
            <button onClick={() => navigate("/wishlist")} className="relative">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="badge">{wishlistItems.length}</span>
              )}
            </button>

            {/* PROFILE */}
            {!isAuthenticated ? (
              <button onClick={() => navigate("/login")}>
                <User className="w-6 h-6" />
              </button>
            ) : (
              <div ref={profileRef} className="relative">
                <div
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="w-9 h-9 rounded-full bg-brand-purple text-white flex items-center justify-center cursor-pointer"
                >
                  {user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-bold">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                    <button
                      onClick={() => navigate("/account")}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CART */}
            <button onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </button>

          </div>
        </div>
      </Container>

      {/* ================= MOBILE DRAWER ================= */}
      <div className={`fixed inset-0 z-50 ${isMenuOpen ? "visible" : "invisible"}`}>
        
        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-black/40 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* DRAWER */}
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-lg transform transition ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X />
            </button>
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSearchSubmit} className="p-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </form>

          {/* NAV */}
          <nav className="flex flex-col gap-4 px-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="mt-6 px-4 flex gap-4">
            <button onClick={() => navigate("/wishlist")}>
              <Heart />
            </button>

            <button
              onClick={() =>
                navigate(isAuthenticated ? "/account" : "/login")
              }
            >
              <User />
            </button>

            <button onClick={() => navigate("/cart")}>
              <ShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}