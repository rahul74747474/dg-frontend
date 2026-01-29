import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const trendingSearches = [
  "Roasted Makhana",
  "Organic Makhana",
  "Cheese & Herbs",
  "Protein Snacks",
  "Healthy Snacks",
  "Weight Loss Foods",
  "Gluten-Free Snacks",
  "Honey Roasted",
];

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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Filter trending searches based on query
  const filteredSearches = searchQuery.trim()
    ? trendingSearches.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : trendingSearches;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredSearches.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelectSearch(filteredSearches[highlightedIndex]);
          } else if (searchQuery.trim()) {
            handleSelectSearch(searchQuery);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredSearches, searchQuery, onClose]);

  // Close dropdown on outside click
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
  }, [isOpen, onClose]);

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
      {filteredSearches.length > 0 ? (
        <div className="py-2">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Trending Searches
            </p>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filteredSearches.map((search, index) => (
              <li key={search}>
                <button
                  onClick={() => handleSelectSearch(search)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    highlightedIndex === index
                      ? "bg-brand-purple bg-opacity-10 text-brand-purple"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-gray-400 mr-2">🔍</span>
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            No results for "{searchQuery}"
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Try searching for makhana, snacks, or health products
          </p>
        </div>
      )}
    </div>
  );
}
