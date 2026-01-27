import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

type CategoryMeta = { name: string; subcategories: string[] };

interface ShopFiltersProps {
  categories: CategoryMeta[];
  thicknesses: string[];
  finishes: string[];
  priceRange: { min: number; max: number };
  onFilterChange: (filters: any) => void;
  initialFilters?: any;
}

const ShopFilters = ({ categories, thicknesses, finishes, priceRange, onFilterChange, initialFilters = {} }: ShopFiltersProps) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || [],
    thickness: initialFilters.thickness || [],
    finish: initialFilters.finish || [],
    price: initialFilters.price || [priceRange.min, priceRange.max],
  });

  useEffect(() => {
    setFilters({
      category: initialFilters.category || [],
      thickness: initialFilters.thickness || [],
      finish: initialFilters.finish || [],
      price: initialFilters.price || [priceRange.min, priceRange.max],
    });
  }, [initialFilters, priceRange.min, priceRange.max]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category],
    }));
  };

  const handleThicknessChange = (thickness: string) => {
    setFilters(prev => ({
      ...prev,
      thickness: prev.thickness.includes(thickness)
        ? prev.thickness.filter(t => t !== thickness)
        : [...prev.thickness, thickness],
    }));
  };

  const handleFinishChange = (finish: string) => {
    setFilters(prev => ({
      ...prev,
      finish: prev.finish.includes(finish)
        ? prev.finish.filter(f => f !== finish)
        : [...prev.finish, finish],
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, price: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
        {categories.map(cat => (
          <div key={cat.name} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={cat.name}
              checked={filters.category.includes(cat.name)}
              onCheckedChange={() => handleCategoryChange(cat.name)}
            />
            <label htmlFor={cat.name} className="text-sm font-medium text-gray-700 cursor-pointer">
              {cat.name}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Thickness</h3>
        {thicknesses.map(thickness => (
          <div key={thickness} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={thickness}
              checked={filters.thickness.includes(thickness)}
              onCheckedChange={() => handleThicknessChange(thickness)}
            />
            <label htmlFor={thickness} className="text-sm font-medium text-gray-700 cursor-pointer">
              {thickness}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Finish</h3>
        {finishes.map(finish => (
          <div key={finish} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={finish}
              checked={filters.finish.includes(finish)}
              onCheckedChange={() => handleFinishChange(finish)}
            />
            <label htmlFor={finish} className="text-sm font-medium text-gray-700 cursor-pointer">
              {finish}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <Slider
          value={filters.price}
          onValueChange={handlePriceChange}
          max={priceRange.max}
          step={50}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹{filters.price[0]}</span>
          <span>₹{filters.price[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;