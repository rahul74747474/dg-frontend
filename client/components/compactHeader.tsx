import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
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
  { label: "Home", path: "/", hasDropdown: false },
  { label: "Shop", path: "/shop", hasDropdown: true },
  { label: "Track Order", path: "/track-order", hasDropdown: false },
  { label: "About Us", path: "/about", hasDropdown: false },
  { label: "Contact Us", path: "/contact", hasDropdown: false },
];

export default function Header() {
  const navigate = useNavigate();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, setUser, isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  /* -------- close profile dropdown on outside click -------- */
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-lighter">
      <Container>
        <div className="h-[70px] flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="https://i.ibb.co/rfKq4JJC/dg-logo.webp"
              alt="DesiiGlobal"
              className="h-14 md:h-20"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <NavLink
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
                
              </div>
            ))}
          </nav>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-4">
            {/* SEARCH */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-light" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-7 pr-3 py-1 text-sm border rounded focus:ring-2 focus:ring-brand-purple"
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
              <div className="relative" ref={profileRef}>
                <div
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="w-9 h-9 rounded-full overflow-hidden bg-brand-purple text-white flex items-center justify-center cursor-pointer"
                >
                  {user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      className="w-full h-full object-cover"
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

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t space-y-4">
            <nav className="flex flex-col gap-3 px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm"
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex gap-5 px-3 pt-4 border-t">
              <button onClick={() => navigate("/wishlist")}>
                <Heart />
              </button>
              {!isAuthenticated ? (
                <button onClick={() => navigate("/login")}>
                  <User />
                </button>
              ) : (
                <button onClick={() => navigate("/account")}>
                  <User />
                </button>
              )}
              <button onClick={() => navigate("/cart")}>
                <ShoppingCart />
              </button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
