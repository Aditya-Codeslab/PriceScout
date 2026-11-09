import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ArrowLeftRight, Percent, Bot, ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    'MacBook Air M2',
    'Sony WH-1000XM5',
    'iPhone 15',
    'Samsung Galaxy S24',
    'iPad Air',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center space-y-8">
      
      {/* 404 Badge & Graphic */}
      <div className="inline-flex flex-col items-center justify-center space-y-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center shadow-xs">
          <Compass className="w-10 h-10 sm:w-12 sm:h-12 animate-spin-slow" aria-hidden="true" />
        </div>
        <span className="px-3 py-1 bg-white border border-[#E1DFD6] rounded-full text-xs font-mono font-bold text-[#0B5D52]">
          Error 404 · Link Expired or Missing
        </span>
      </div>

      {/* Main Copy */}
      <div className="space-y-3 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#14201D] font-heading tracking-tight">
          We scouted everywhere, but this page isn&apos;t here.
        </h1>
        <p className="text-sm sm:text-base text-[#46544F]">
          The product deal might have concluded, or the URL address may contain a typo. Search our live marketplace catalog below:
        </p>
      </div>

      {/* Instant Search Bar */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center shadow-xs">
          <Search className="absolute left-4 w-5 h-5 text-[#46544F]" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search products, brands, or models (e.g. Sony XM5)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[50px] pl-12 pr-28 py-3 bg-white border border-[#E1DFD6] focus:border-[#0B5D52] rounded-2xl text-sm text-[#14201D] placeholder:text-[#46544F]/60 transition-all focus:ring-2 focus:ring-[#0B5D52]/20"
          />
          <button
            type="submit"
            className="absolute right-1.5 min-h-[40px] px-4 py-2 bg-[#0B5D52] hover:bg-[#178F7A] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Suggested Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-xs text-[#46544F] font-medium">Try searching:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
              className="text-xs px-2.5 py-1 bg-white hover:bg-[#DDF0E8] text-[#14201D] hover:text-[#0B5D52] border border-[#E1DFD6] rounded-lg transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Helpful Navigation Links */}
      <div className="pt-6 border-t border-[#E1DFD6] max-w-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/"
            className="min-h-[44px] flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs font-semibold text-[#14201D] transition-colors"
          >
            <Home className="w-4 h-4 text-[#0B5D52]" />
            <span>Home</span>
          </Link>

          <Link
            to="/compare"
            className="min-h-[44px] flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs font-semibold text-[#14201D] transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4 text-[#0B5D52]" />
            <span>Compare</span>
          </Link>

          <Link
            to="/deals"
            className="min-h-[44px] flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs font-semibold text-[#14201D] transition-colors"
          >
            <Percent className="w-4 h-4 text-[#0B5D52]" />
            <span>Deals</span>
          </Link>

          <Link
            to="/assistant"
            className="min-h-[44px] flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs font-semibold text-[#14201D] transition-colors"
          >
            <Bot className="w-4 h-4 text-[#0B5D52]" />
            <span>AI Assistant</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
