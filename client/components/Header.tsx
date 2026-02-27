import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Container from "@/components/ui/container";
import AnnouncementBar from "@/components/ui/announcementbar";
import { useScrollContext } from "@/context/scrollContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import CompactHeader from "./compactHeader";
import SearchDropdown from "./SearchDropdown";
import api from "@/api/axios";

/* ---------------- CATEGORY MAP ---------------- */

const navItems = [
  "HOME",
  "SHOP",
  "TRACK ORDER",
  "ABOUT US",
  "CONTACT US",
  "BULK ORDER",
];

const categoryMap: Record<string, string> = {
  HOME: "/",
  SHOP: "/shop",
  "TRACK ORDER": "/track-order",
  "ABOUT US": "/about",
  "CONTACT US": "/contact",
  "BULK ORDER": "/b2b",
};


/* ---------------- BIG HEADER ---------------- */

function BigHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems = [] } = useCart();
  const { items: wishlistItems = [] } = useWishlist();
  const { user, setUser, isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  /* close profile dropdown on outside click */
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
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch { }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <Container>
          {/* MOBILE HEADER */}
<div className="flex items-center justify-between py-3 md:hidden">

  {/* LEFT - MENU */}
  <button onClick={() => setIsMenuOpen(true)}>
    <Menu className="w-6 h-6" />
  </button>
  {/* CENTER - LOGO */}
  <Link to="/">
    <img
      src="https://i.ibb.co/rfKq4JJC/dg-logo.webp"
      className="h-12"
    />
  </Link>

  {/* RIGHT - ICONS */}
  <div className="flex items-center gap-3">
    <button onClick={() => navigate("/wishlist")}>
      <Heart className="w-5 h-5" />
    </button>

    <button onClick={() => navigate("/cart")}>
      <ShoppingCart className="w-5 h-5" />
    </button>
  </div>
</div>

{/* DESKTOP HEADER */}
<div className="hidden md:grid grid-cols-3 items-center py-4">
            {/* SEARCH */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search healthy snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full border border-gray-300 pl-9 pr-3 py-2 text-sm rounded focus:ring-2 focus:ring-brand-purple"
              />
              <SearchDropdown
                isOpen={isSearchOpen}
                searchQuery={searchQuery}
                onClose={() => setIsSearchOpen(false)}
                onSelectSearch={(q) => {
                  setSearchQuery(q);
                  navigate(`/shop?search=${encodeURIComponent(q)}`);
                  setIsSearchOpen(false);
                }}
              />
            </form>

            {/* LOGO */}
            <div className="flex justify-center">
              <Link to="/">
                <img
                  src="https://i.ibb.co/rfKq4JJC/dg-logo.webp"
                  alt="DesiiGlobal"
                  className="h-24 md:h-28"
                />
              </Link>
            </div>

            {/* ICONS */}
            <div className="flex justify-end gap-6 items-center">
              {/* USER */}
              {!isAuthenticated ? (
                <button onClick={() => navigate("/login")}>
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <div ref={profileRef} className="relative">
                  <div
                    onClick={() => setIsProfileOpen((p) => !p)}
                    className="w-9 h-9 rounded-full overflow-hidden bg-brand-purple text-white flex items-center justify-center cursor-pointer"
                  >
                    {user?.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt="Profile"
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
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate("/account");
                        }}
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

              {/* WISHLIST */}
              <button onClick={() => navigate("/wishlist")} className="relative">
                <Heart className="w-5 h-5" />
                {wishlistItems?.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}

              </button>

              {/* CART */}
              <button onClick={() => navigate("/cart")} className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems?.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}

              </button>
            </div>
          </div>
        </Container>

        {/* NAV */}
        <div className="hidden md:block border-t">
          <Container>
            <nav className="flex justify-center gap-8 py-3">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={categoryMap[item]}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-700 border-b-2 border-green-700 pb-1"
                      : "text-gray-700 hover:text-green-700"
                  }
                >
                  {item}
                </NavLink>

              ))}
            </nav>
          </Container>
        </div>
        {/* MOBILE DRAWER */}
<div
  className={`fixed inset-0 z-50 ${isMenuOpen ? "visible" : "invisible"}`}
>
  {/* OVERLAY */}
  <div
    className={`absolute inset-0 bg-black/40 transition ${
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
    {/* HEADER */}
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

    {/* NAV ITEMS */}
    <nav className="flex flex-col gap-4 px-4">
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => {
            navigate(categoryMap[item]);
            setIsMenuOpen(false);
          }}
          className="text-left text-gray-700"
        >
          {item}
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
    </>
  );
}

/* ---------------- HEADER SWITCH ---------------- */

export default function Header() {
  const { isOnHero } = useScrollContext();
  const location = useLocation();

  return location.pathname === "/" && isOnHero ? (
    <BigHeader />
  ) : (
    <CompactHeader />
  );
}
