import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowLeft, RotateCcw, AlertTriangle, ArrowUpDown, X } from 'lucide-react';
import { api } from '../api';
import { Product } from '../types';
import { SearchFilterPanel, SearchFilters } from '../components/SearchFilterPanel';
import { SearchProductCard } from '../components/SearchProductCard';

type SortOption = 'best' | 'price-asc' | 'price-desc' | 'discount' | 'rating';

const INITIAL_FILTERS: SearchFilters = {
  priceRange: 'all',
  selectedBrands: [],
  selectedCategory: 'all',
  minRating: 0,
  selectedRam: 'All',
  selectedStorage: 'All',
  marketplace: 'all',
  inStockOnly: false,
};

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState<SortOption>('best');
  const [filters, setFilters] = useState<SearchFilters>({
    ...INITIAL_FILTERS,
    selectedCategory: urlCategory,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync category param if url changes
  useEffect(() => {
    if (urlCategory && urlCategory !== filters.selectedCategory) {
      setFilters((prev) => ({ ...prev, selectedCategory: urlCategory }));
    }
  }, [urlCategory]);

  // Sync query param if url changes
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch marketplace price records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // 1. Text Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            Object.values(p.specs).some((v) => v.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // 2. Category Filter
        if (filters.selectedCategory !== 'all') {
          if (p.category.toLowerCase() !== filters.selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // 3. Price Range Filter
        if (filters.priceRange !== 'all') {
          if (filters.priceRange === 'under-25k' && p.bestPrice >= 25000) return false;
          if (filters.priceRange === '25k-50k' && (p.bestPrice < 25000 || p.bestPrice > 50000)) return false;
          if (filters.priceRange === '50k-100k' && (p.bestPrice < 50000 || p.bestPrice > 100000)) return false;
          if (filters.priceRange === 'above-100k' && p.bestPrice <= 100000) return false;
        }

        // 4. Brand Filter
        if (filters.selectedBrands.length > 0) {
          if (!filters.selectedBrands.some((b) => b.toLowerCase() === p.brand.toLowerCase())) {
            return false;
          }
        }

        // 5. Customer Rating
        if (filters.minRating > 0) {
          const prodRating = p.rating || p.prices[0]?.rating || 0;
          if (prodRating < filters.minRating) return false;
        }

        // 6. RAM Filter
        if (filters.selectedRam !== 'All') {
          if (p.ram !== filters.selectedRam) return false;
        }

        // 7. Storage Filter
        if (filters.selectedStorage !== 'All') {
          if (p.storage !== filters.selectedStorage) return false;
        }

        // 8. Marketplace Filter
        if (filters.marketplace !== 'all') {
          const hasStore = p.prices.some((pr) => pr.store === filters.marketplace);
          if (!hasStore) return false;
        }

        // 9. In Stock Only
        if (filters.inStockOnly) {
          const isAvailable = p.prices.some((pr) => pr.inStock);
          if (!isAvailable) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.bestPrice - b.bestPrice;
        }
        if (sortBy === 'price-desc') {
          return b.bestPrice - a.bestPrice;
        }
        if (sortBy === 'rating') {
          const ratingA = a.rating || a.prices[0]?.rating || 0;
          const ratingB = b.rating || b.prices[0]?.rating || 0;
          return ratingB - ratingA;
        }
        if (sortBy === 'discount') {
          const maxDiscA = Math.max(...a.prices.map((p) => p.discountPercentage));
          const maxDiscB = Math.max(...b.prices.map((p) => p.discountPercentage));
          return maxDiscB - maxDiscA;
        }
        // 'best' - default order
        return 0;
      });
  }, [products, searchQuery, filters, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (filters.selectedCategory !== 'all') params.set('category', filters.selectedCategory);
    navigate(`/search?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    navigate('/search');
  };

  // Count active filters
  const activeFilterCount =
    (filters.priceRange !== 'all' ? 1 : 0) +
    filters.selectedBrands.length +
    (filters.selectedCategory !== 'all' ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.selectedRam !== 'All' ? 1 : 0) +
    (filters.selectedStorage !== 'All' ? 1 : 0) +
    (filters.marketplace !== 'all' ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Top Search Bar & Page Title */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B5D52] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <span className="text-xs text-[#46544F]">
            Amazon India + Flipkart Live Matching
          </span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 sm:gap-3 max-w-3xl">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#46544F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, model (e.g. MacBook Air, Sony XM5, Galaxy S24)..."
              className="w-full min-h-[48px] pl-11 pr-4 bg-white border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] placeholder-[#46544F]/60 focus:ring-2 focus:ring-[#0B5D52] shadow-2xs"
            />
          </div>
          <button
            type="submit"
            className="min-h-[48px] px-6 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Control Bar: Filter Toggle for Mobile + Sort Dropdown + Result Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E1DFD6] pb-4">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden min-h-[44px] px-4 py-2.5 bg-white border border-[#E1DFD6] hover:border-[#0B5D52] rounded-xl text-xs font-semibold text-[#14201D] flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0B5D52]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <span className="text-sm font-semibold text-[#14201D]">
            Showing <strong className="text-[#0B5D52]">{filteredProducts.length}</strong> product
            {filteredProducts.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label htmlFor="sort-dropdown" className="text-xs font-medium text-[#46544F] shrink-0">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="min-h-[44px] pl-3 pr-8 bg-white border border-[#E1DFD6] rounded-xl text-xs font-semibold text-[#14201D] focus:ring-2 focus:ring-[#0B5D52] cursor-pointer shadow-2xs"
            >
              <option value="best">Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Discount %</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Filter Panel + Product Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Filter Panel (Desktop Sticky Sidebar) */}
        <div className="hidden lg:block lg:col-span-1">
          <SearchFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalMatches={filteredProducts.length}
          />
        </div>

        {/* Mobile Filter Bottom Drawer */}
        {mobileDrawerOpen && (
          <SearchFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalMatches={filteredProducts.length}
            isMobileDrawer={true}
            onCloseMobile={() => setMobileDrawerOpen(false)}
          />
        )}

        {/* Product Results Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Filter Chips Bar */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-[#E1DFD6] rounded-xl text-xs">
              <span className="font-medium text-[#46544F]">Active:</span>
              
              {filters.selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#DDF0E8] text-[#0B5D52] font-semibold rounded-md">
                  {filters.selectedCategory}
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, selectedCategory: 'all' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#DDF0E8] text-[#0B5D52] font-semibold rounded-md"
                >
                  {brand}
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        selectedBrands: filters.selectedBrands.filter((b) => b !== brand),
                      })
                    }
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#DDF0E8] text-[#0B5D52] font-semibold rounded-md">
                  {filters.priceRange}
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, priceRange: 'all' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.marketplace !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#DDF0E8] text-[#0B5D52] font-semibold rounded-md">
                  Store: {filters.marketplace}
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, marketplace: 'all' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-[#0B5D52] hover:underline ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* 1. Loading Skeletons */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E1DFD6] rounded-2xl p-6 space-y-4 shadow-2xs animate-pulse"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-44 h-44 rounded-xl skeleton-shimmer" />
                    <div className="flex-1 space-y-3">
                      <div className="w-28 h-4 rounded-md skeleton-shimmer" />
                      <div className="w-3/4 h-6 rounded-md skeleton-shimmer" />
                      <div className="flex gap-2">
                        <div className="w-20 h-5 rounded-md skeleton-shimmer" />
                        <div className="w-24 h-5 rounded-md skeleton-shimmer" />
                      </div>
                      <div className="w-40 h-8 rounded-md skeleton-shimmer mt-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E1DFD6]">
                    <div className="h-16 rounded-xl skeleton-shimmer" />
                    <div className="h-16 rounded-xl skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* 2. Error State with Retry Button */
            <div className="bg-white border border-red-200 rounded-2xl p-10 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14201D] font-heading">
                Unable to load product comparison
              </h3>
              <p className="text-sm text-[#46544F] max-w-md mx-auto">
                {error}
              </p>
              <button
                type="button"
                onClick={fetchProducts}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Connection</span>
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* 3. Empty State */
            <div className="bg-white border border-[#E1DFD6] rounded-2xl p-12 text-center space-y-5 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-[#14201D] font-heading">
                  No products match your active filters
                </h3>
                <p className="text-sm text-[#46544F] max-w-md mx-auto">
                  We couldn't find matches for {searchQuery ? `"${searchQuery}"` : 'the selected criteria'}. Try broadening your price range or clearing brand filters.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset all filters</span>
                </button>
              </div>
            </div>
          ) : (
            /* 4. Product Cards List */
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <SearchProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
