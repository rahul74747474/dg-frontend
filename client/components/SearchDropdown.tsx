import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


interface SearchDropdownProps {
  isOpen: boolean;
  searchQuery: string;
  onClose: () => void;
  onSelectSearch: (query: string) => void;
}

export default function SearchDropdown({
  isOpen,
  searchQuery,
  onClose,
  onSelectSearch,
}: SearchDropdownProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- API SEARCH ---------------- */

  useEffect(() => {
  const fetchTrending = async () => {
    try {
      const res = await api.get("/products"); // your all products API
      const products = res.data.products || [];

      // pick any 3 products
      setTrendingProducts(products.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  fetchTrending();
}, []);


  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(`/products/search?q=${searchQuery}`);
        setResults(res.data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  /* ---------------- KEYBOARD NAV ---------------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

     const list = results.length > 0 ? results : trendingProducts;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < list.length - 1 ? prev + 1 : prev
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;

        case "Enter":
          e.preventDefault();

          if (highlightedIndex >= 0) {
            if (results.length > 0) {
              const item = results[highlightedIndex];
              navigate(`/product/${item.slug}`);
            } else {
             const item = trendingProducts[highlightedIndex];
navigate(`/product/${item.slug}`);
onClose();
            }
          } else if (searchQuery.trim()) {
            handleSelectSearch(searchQuery);
          }
          break;

        case "Escape":
          onClose();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, results, searchQuery]);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectSearch = (query: string) => {
    onSelectSearch(query);
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
    >
      {/* LOADING */}
      {loading && (
        <div className="px-4 py-4 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {/* RESULTS */}
      {!loading && results.length > 0 && (
        <ul className="max-h-64 overflow-y-auto py-2">
          {results.map((item, index) => (
            <li key={item._id}>
              <button
                onClick={() => {
                  navigate(`/product/${item.slug}`);
                  onClose();
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-4 py-3 transition ${
                  highlightedIndex === index
                    ? "bg-brand-purple bg-opacity-10"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images?.[0]}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* TRENDING */}
      {!loading && results.length === 0 && !searchQuery && (
        <div className="py-2">
          <p className="px-4 text-xs text-gray-500 uppercase">
            Trending
          </p>
       {trendingProducts.map((item, index) => (
  <button
    key={item._id}
    onClick={() => {
      navigate(`/product/${item.slug}`);
      onClose();
    }}
    onMouseEnter={() => setHighlightedIndex(index)}
    className={`w-full text-left px-4 py-3 transition ${
      highlightedIndex === index
        ? "bg-brand-purple bg-opacity-10"
        : "hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <img
        src={item.images?.[0]}
        className="w-10 h-10 rounded object-cover"
      />
      <div>
        <p className="text-sm font-medium text-gray-800">
          {item.name}
        </p>
        <p className="text-xs text-gray-500">
          ₹{item.price}
        </p>
      </div>
    </div>
  </button>
))}
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && results.length === 0 && searchQuery && (
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            No products found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}