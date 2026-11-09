import React from 'react';
import { TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PriceHistoryCard: React.FC = () => {
  return (
    <section className="space-y-6">
      {/* Eyebrow & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            30-DAY PRICE TRACKER
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Price History & Volatility Tracker
          </h2>
        </div>
        
        {/* Exact Label Preserved */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
          <span>Illustrative sample data</span>
        </div>
      </div>

      {/* White card with 2px ink outline */}
      <div className="bg-white border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-8 space-y-6">
        
        {/* Header & Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#1E1B3A]/20 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-[800] uppercase tracking-wider text-[#6D28D9]">
              Apple MacBook Air M2 (13.6&quot;, 256GB SSD)
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-[800] text-[#1E1B3A] tracking-tight">
                ₹84,990
              </span>
              <span className="text-xs font-[800] px-3 py-1 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border-2 border-[#1E1B3A] flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5 text-[#1E1B3A]" />
                30-day recorded low
              </span>
            </div>
            <p className="text-xs font-[700] text-[#4A4668]">
              Lowest on Amazon India · Updated 14m ago
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="p-3 bg-[#E4DAFB] rounded-[16px] border-2 border-[#1E1B3A]">
              <span className="text-[#4A4668] font-[700] block text-[11px] uppercase">30-Day Average</span>
              <span className="font-[800] text-sm text-[#1E1B3A]">₹89,450</span>
            </div>
            <div className="p-3 bg-[#FFD9CC] rounded-[16px] border-2 border-[#1E1B3A]">
              <span className="text-[#4A4668] font-[700] block text-[11px] uppercase">Highest Peak</span>
              <span className="font-[800] text-sm text-[#1E1B3A]">₹99,900</span>
            </div>
            <div className="p-3 bg-[#FFF4B3] rounded-[16px] border-2 border-[#1E1B3A]">
              <span className="text-[#4A4668] font-[700] block text-[11px] uppercase">Net Savings</span>
              <span className="font-[800] text-sm text-[#1E1B3A]">₹14,910 Drop</span>
            </div>
          </div>
        </div>

        {/* SVG Chart: Solid violet line for Amazon India, Flipkart dashed ink line */}
        <div className="relative pt-2">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 680 230"
              className="w-full h-auto max-h-[290px] overflow-visible"
              aria-label="Price history tracker showing solid violet line for Amazon India and dashed line for Flipkart"
            >
              {/* Horizontal grid lines */}
              <line x1="60" y1="30" x2="650" y2="30" stroke="#1E1B3A" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
              <text x="50" y="34" textAnchor="end" fontSize="11" fill="#4A4668" fontWeight="700">₹100k</text>

              <line x1="60" y1="80" x2="650" y2="80" stroke="#1E1B3A" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
              <text x="50" y="84" textAnchor="end" fontSize="11" fill="#4A4668" fontWeight="700">₹95k</text>

              <line x1="60" y1="130" x2="650" y2="130" stroke="#1E1B3A" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
              <text x="50" y="134" textAnchor="end" fontSize="11" fill="#4A4668" fontWeight="700">₹90k</text>

              <line x1="60" y1="180" x2="650" y2="180" stroke="#1E1B3A" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
              <text x="50" y="184" textAnchor="end" fontSize="11" fill="#4A4668" fontWeight="700">₹85k</text>

              {/* Flipkart trendline: Dashed line in ink */}
              <path
                d="M 80 48 L 170 52 L 260 92 L 350 125 L 440 110 L 530 165 L 620 172"
                fill="none"
                stroke="#1E1B3A"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              {/* Amazon India trendline: Solid violet line */}
              <path
                d="M 80 40 L 170 45 L 260 85 L 350 115 L 440 100 L 530 160 L 620 180"
                fill="none"
                stroke="#6D28D9"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Coordinate markers on Amazon line */}
              <circle cx="80" cy="40" r="5" fill="#6D28D9" stroke="#1E1B3A" strokeWidth="2" />
              <circle cx="260" cy="85" r="5" fill="#6D28D9" stroke="#1E1B3A" strokeWidth="2" />
              <circle cx="440" cy="100" r="5" fill="#6D28D9" stroke="#1E1B3A" strokeWidth="2" />
              <circle cx="530" cy="160" r="5" fill="#6D28D9" stroke="#1E1B3A" strokeWidth="2" />

              {/* Marker at Latest Price coordinate (620, 180) */}
              <circle cx="620" cy="180" r="7" fill="#FFF4B3" stroke="#1E1B3A" strokeWidth="2.5" />
              <text x="620" y="166" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1E1B3A">
                ₹84,990
              </text>

              {/* Date ticks */}
              <text x="80" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4A4668">30d ago</text>
              <text x="260" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4A4668">20d ago</text>
              <text x="440" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4A4668">10d ago</text>
              <text x="620" y="210" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6D28D9">Today</text>
            </svg>
          </div>
        </div>

        {/* Legend & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-[#1E1B3A]/20 text-xs">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 bg-[#6D28D9] rounded-full border border-[#1E1B3A]" />
              <span className="font-[800] text-[#1E1B3A]">Amazon India (Solid Violet)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 border-t-2 border-dashed border-[#1E1B3A]" />
              <span className="font-[800] text-[#1E1B3A]">Flipkart (Dashed Ink)</span>
            </div>
          </div>

          <Link
            to="/search"
            className="text-xs font-[800] text-[#6D28D9] hover:underline flex items-center gap-1"
          >
            <span>Search more model price histories</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
