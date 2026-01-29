import { useState, useEffect } from "react";

interface Props {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceFilter({ min, max, onChange }: Props) {
  const [value, setValue] = useState(max);

 useEffect(() => {
  setValue(max);
}, [max]);

useEffect(() => {
  onChange(min, value);
}, [value, min]);


  return (
    <div className="space-y-4">
      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
        Price Range
      </h4>

      <div className="flex items-center gap-3">
        <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1">
          <span className="text-gray-400 mr-1">₹</span>
          <span className="font-bold text-gray-700">{min}</span>
        </div>

        <span className="text-gray-300">-</span>

        <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-sm flex-1">
          <span className="text-gray-400 mr-1">₹</span>
          <span className="font-bold text-gray-700">{value}</span>
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-brand-purple h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
