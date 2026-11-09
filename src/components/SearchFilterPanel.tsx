import React from 'react';
import { X, RotateCcw, Check, Star, Filter } from 'lucide-react';

export interface SearchFilters {
  priceRange: string;
  selectedBrands: string[];
  selectedCategory: string;
  minRating: number;
  selectedRam: string;
  selectedStorage: string;
  marketplace: 'all' | 'amazon' | 'flipkart';
  inStockOnly: boolean;
}

interface SearchFilterPanelProps {
  filters: SearchFilters;
  onChange: (updated: SearchFilters) => void;
  onReset: () => void;
  totalMatches: number;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const BRANDS = ['Apple', 'Samsung', 'Sony', 'ASUS', 'OnePlus', 'Amazon'];
const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Smartphones', value: 'Smartphones' },
  { label: 'Laptops', value: 'Laptops' },
  { label: 'Audio', value: 'Audio' },
  { label: 'Accessories', value: 'Accessories' },
];

const PRICE_RANGES = [
  { label: 'Any Price', value: 'all' },
  { label: 'Under ₹25,000', value: 'under-25k' },
  { label: '₹25,000 - ₹50,000', value: '25k-50k' },
  { label: '₹50,000 - ₹1,00,000', value: '50k-100k' },
  { label: 'Above ₹1,00,000', value: 'above-100k' },
];

const RAM_OPTIONS = ['All', '6GB', '8GB', '16GB'];
const STORAGE_OPTIONS = ['All', '128GB', '256GB', '512GB', '1TB'];

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalMatches,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  const toggleBrand = (brand: string) => {
    const nextBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onChange({ ...filters, selectedBrands: nextBrands });
  };

  const hasActiveFilters =
    filters.priceRange !== 'all' ||
    filters.selectedBrands.length > 0 ||
    filters.selectedCategory !== 'all' ||
    filters.minRating > 0 ||
    filters.selectedRam !== 'All' ||
    filters.selectedStorage !== 'All' ||
    filters.marketplace !== 'all' ||
    filters.inStockOnly;

  const content = (
    <div className="space-y-6 text-sm text-[#14201D]">
      
      {/* 1. Header with Reset */}
      <div className="flex items-center justify-between border-b border-[#E1DFD6] pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0B5D52]" />
          <h2 className="font-bold text-[#14201D] font-heading text-base">
            Filters {hasActiveFilters && <span className="text-[#0B5D52] text-xs font-semibold">· Active</span>}
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[#0B5D52] hover:text-[#178F7A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset all</span>
          </button>
        )}
      </div>

      {/* 2. Marketplace Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading">
          Marketplace
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6]">
          {[
            { label: 'Both', value: 'all' },
            { label: 'Amazon', value: 'amazon' },
            { label: 'Flipkart', value: 'flipkart' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange({ ...filters, marketplace: item.value as any })}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filters.marketplace === item.value
                  ? 'bg-white text-[#0B5D52] shadow-2xs border border-[#E1DFD6]'
                  : 'text-[#46544F] hover:text-[#14201D]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Availability Toggle */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#0B5D52] focus:ring-[#0B5D52] accent-[#0B5D52] border-[#E1DFD6]"
          />
          <span className="text-xs font-medium text-[#14201D]">
            In Stock Only (Ready to Dispatch)
          </span>
        </label>
      </div>

      {/* 4. Price Range */}
      <div className="space-y-2.5 pt-2 border-t border-[#E1DFD6]/60">
        <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading">
          Price Range
        </label>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.value}
              className="flex items-center gap-2.5 text-xs text-[#46544F] hover:text-[#14201D] cursor-pointer"
            >
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={() => onChange({ ...filters, priceRange: range.value })}
                className="w-3.5 h-3.5 text-[#0B5D52] focus:ring-[#0B5D52] accent-[#0B5D52]"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Category */}
      <div className="space-y-2.5 pt-2 border-t border-[#E1DFD6]/60">
        <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading">
          Department
        </label>
        <select
          value={filters.selectedCategory}
          onChange={(e) => onChange({ ...filters, selectedCategory: e.target.value })}
          className="w-full min-h-[40px] px-3 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs text-[#14201D] font-medium focus:ring-2 focus:ring-[#0B5D52]"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Brand Checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-[#E1DFD6]/60">
        <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading">
          Brands
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BRANDS.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isChecked
                    ? 'bg-[#DDF0E8] border-[#0B5D52] text-[#0B5D52]'
                    : 'bg-[#F7F6F2] border-[#E1DFD6] text-[#46544F] hover:text-[#14201D]'
                }`}
              >
                <span>{brand}</span>
                {isChecked && <Check className="w-3 h-3 text-[#0B5D52]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Rating Filter */}
      <div className="space-y-2 pt-2 border-t border-[#E1DFD6]/60">
        <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading">
          Customer Rating
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Any', value: 0 },
            { label: '4.0★+', value: 4.0 },
            { label: '4.5★+', value: 4.5 },
          ].map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => onChange({ ...filters, minRating: r.value })}
              className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                filters.minRating === r.value
                  ? 'bg-[#0B5D52] text-white border-[#0B5D52]'
                  : 'bg-[#F7F6F2] text-[#46544F] border-[#E1DFD6] hover:bg-white'
              }`}
            >
              {r.value > 0 && <Star className="w-3 h-3 fill-current" />}
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 8. RAM & Storage */}
      <div className="space-y-3 pt-2 border-t border-[#E1DFD6]/60">
        <div>
          <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading mb-1.5">
            RAM
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RAM_OPTIONS.map((ram) => (
              <button
                key={ram}
                type="button"
                onClick={() => onChange({ ...filters, selectedRam: ram })}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  filters.selectedRam === ram
                    ? 'bg-[#0B5D52] text-white border-[#0B5D52]'
                    : 'bg-[#F7F6F2] text-[#46544F] border-[#E1DFD6]'
                }`}
              >
                {ram}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#14201D] uppercase tracking-wider block font-heading mb-1.5">
            Storage
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STORAGE_OPTIONS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onChange({ ...filters, selectedStorage: st })}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  filters.selectedStorage === st
                    ? 'bg-[#0B5D52] text-white border-[#0B5D52]'
                    : 'bg-[#F7F6F2] text-[#46544F] border-[#E1DFD6]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

  // If rendering inside mobile bottom drawer
  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#E1DFD6]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#14201D] font-heading text-base">
                Filter Products ({totalMatches})
              </span>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-2 text-[#46544F] hover:text-[#14201D] rounded-xl"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="p-5 overflow-y-auto space-y-6">
            {content}
          </div>

          {/* Drawer Bottom Action */}
          <div className="p-4 border-t border-[#E1DFD6] bg-[#F7F6F2]">
            <button
              type="button"
              onClick={onCloseMobile}
              className="w-full min-h-[46px] bg-[#0B5D52] text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-colors shadow-xs"
            >
              Show {totalMatches} Result{totalMatches === 1 ? '' : 's'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Desktop Panel
  return (
    <aside className="bg-white border border-[#E1DFD6] rounded-2xl p-5 shadow-2xs sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      {content}
    </aside>
  );
};
