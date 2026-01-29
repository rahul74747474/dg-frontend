interface Props {
  selectedCategory: string;
  onChange: (value: string) => void;
}

import { Check } from "lucide-react";

export default function ShopCategoryFilter({
  selectedCategory,
  onChange,
}: Props) {
  const categories = [
    { label: "Sweet Makhana", value: "Sweet Makhana" },
    { label: "Flavoured Makhana", value: "Flavoured Makhana" },
    { label: "Plain Makhana", value: "Plain Makhana" },
  ];

  return (
     <div className="space-y-3">
      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Categories</h4>
      <div className="space-y-2">
        <button 
          onClick={() => onChange("")}
          className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors flex justify-between items-center ${!selectedCategory ? 'bg-brand-purple/10 text-brand-purple font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          All Products
          {!selectedCategory && <Check size={14} />}
        </button>
        {categories.map((cat) => (
          <button key={cat.value} onClick={() => onChange(cat.value)} className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors flex justify-between items-center ${selectedCategory === cat.value ? 'bg-brand-purple/10 text-brand-purple font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
            
            {cat.label}
            {selectedCategory === cat.value && <Check size={14} />}
          </button>
        ))}
      </div>
    </div>
  );
}
