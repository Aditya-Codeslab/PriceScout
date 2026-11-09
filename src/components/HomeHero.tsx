import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface HomeHeroProps {
  initialQuery?: string;
}

const EXAMPLE_CHIPS = [
  { label: 'Apple MacBook Air M2', query: 'MacBook Air M2', bg: 'bg-[#E4DAFB]' },
  { label: 'Sony WH-1000XM5', query: 'Sony WH-1000XM5', bg: 'bg-[#FFD9CC]' },
  { label: 'Samsung Galaxy S24', query: 'Galaxy S24', bg: 'bg-[#CFE6FF]' },
];

export const HomeHero: React.FC<HomeHeroProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/search');
    }
  };

  const handleChipClick = (chipQuery: string) => {
    setQuery(chipQuery);
    navigate(`/search?q=${encodeURIComponent(chipQuery)}`);
  };

  return (
    <section className="pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 bg-[#FBFAFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* 1. Badge: Amazon India + Flipkart, one search */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs sm:text-sm font-[800] text-[#1E1B3A]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E1B3A]" />
          <span>Amazon India + Flipkart, one search</span>
        </div>

        {/* 2. Headline with heavy weight 800 and primary violet on "right product" */}
        <h1 className="text-[clamp(2.6rem,7vw,4.8rem)] font-[800] tracking-[-0.03em] leading-[1.06] text-[#1E1B3A] text-balance">
          Find the best price for the{' '}
          <span className="text-[#6D28D9] underline decoration-[#1E1B3A] decoration-wavy decoration-2 underline-offset-8">
            right product
          </span>
          , within your budget
        </h1>

        {/* 3. Subtitle (16px, muted navy-grey #4A4668, line length under 75 chars) */}
        <p className="text-base sm:text-lg text-[#4A4668] max-w-xl mx-auto leading-relaxed">
          Compare verified prices, stock availability, and card discounts across India&apos;s leading marketplaces. 100% free with unbiased matching.
        </p>

        {/* 4. Large Search Bar (Pill shape, 2px ink outline, primary violet button) */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white border-2 border-[#1E1B3A] rounded-full p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
            role="search"
            aria-label="Search and compare products"
          >
            <div className="relative flex-1 flex items-center min-h-[48px] pl-4 sm:pl-5">
              <Search
                className="w-5 h-5 text-[#1E1B3A] shrink-0 mr-3"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products (e.g. MacBook Air, Sony ANC, Galaxy S24)..."
                className="w-full h-full bg-transparent text-sm sm:text-base font-medium text-[#1E1B3A] placeholder-[#4A4668] focus:outline-none"
                aria-label="Search query"
              />
            </div>

            <button
              type="submit"
              className="min-h-[48px] px-7 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-[800] text-sm sm:text-base rounded-full border-2 border-[#1E1B3A] flex items-center justify-center gap-2 shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
            >
              <span>Compare prices</span>
              <span className="text-lg">→</span>
            </button>
          </form>
        </div>

        {/* 5. Example Chips (Pill shape, rotating pastel fills, 2px ink outline) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <span className="text-xs font-[700] text-[#4A4668] uppercase tracking-wider mr-1">
            Try searching:
          </span>
          {EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleChipClick(chip.query)}
              className={`min-h-[44px] px-4 py-2 ${chip.bg} text-[#1E1B3A] border-2 border-[#1E1B3A] rounded-full text-xs sm:text-sm font-[800] flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6D28D9]`}
            >
              <span>{chip.label}</span>
              <span className="text-[#1E1B3A] text-xs">↗</span>
            </button>
          ))}
        </div>

        {/* Trust markers (Neutral wording, no unverifiable claims) */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-[700] text-[#4A4668]">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            <span>Zero marked-up prices</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            <span>Official marketplace links</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            <span>100% Free consumer tool</span>
          </div>
        </div>

      </div>
    </section>
  );
};
