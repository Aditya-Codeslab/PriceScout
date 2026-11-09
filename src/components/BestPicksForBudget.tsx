import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink } from 'lucide-react';

interface BestPickItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  specLine: string;
  bestPrice: number;
  originalPrice: number;
  cheaperStore: 'Amazon India' | 'Flipkart';
  savingsAmount: number;
  updatedMinutesAgo: number;
  affiliateUrl: string;
  bg: string;
}

const PICKS: BestPickItem[] = [
  {
    id: 'prod-macbook-air-m2',
    name: 'Apple MacBook Air M2 (13.6-inch, 8GB, 256GB)',
    brand: 'Apple',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    specLine: 'Apple M2 8-core CPU · 8GB Unified RAM · 256GB SSD',
    bestPrice: 84990,
    originalPrice: 99900,
    cheaperStore: 'Amazon India',
    savingsAmount: 2000,
    updatedMinutesAgo: 14,
    affiliateUrl: 'https://www.amazon.in/dp/B0B3C4VS55?tag=pricescout-in-21',
    bg: 'bg-[#E4DAFB]',
  },
  {
    id: 'prod-samsung-s24',
    name: 'Samsung Galaxy S24 5G (8GB RAM, 128GB)',
    brand: 'Samsung',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    specLine: '6.2" 120Hz Dynamic AMOLED · 50MP Triple Camera',
    bestPrice: 62999,
    originalPrice: 79999,
    cheaperStore: 'Amazon India',
    savingsAmount: 2000,
    updatedMinutesAgo: 5,
    affiliateUrl: 'https://www.amazon.in/dp/B0CS5XW1D9?tag=pricescout-in-21',
    bg: 'bg-[#FFD9CC]',
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless ANC Headphones',
    brand: 'Sony',
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    specLine: 'Industry-Leading Dual Processor ANC · 30h Battery',
    bestPrice: 26990,
    originalPrice: 34990,
    cheaperStore: 'Flipkart',
    savingsAmount: 1000,
    updatedMinutesAgo: 19,
    affiliateUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmdb2159faecbd5?affid=pricescout',
    bg: 'bg-[#CFE6FF]',
  },
];

export const BestPicksForBudget: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            BUDGET RECOMMENDATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Best Picks for Your Budget
          </h2>
        </div>
        
        {/* Exact label preserved */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
          <span>Sample verified fixtures</span>
        </div>
      </div>

      {/* Cards: 24px radius, 2px ink outline, rotating pastel fills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PICKS.map((item) => (
          <div
            key={item.id}
            className={`${item.bg} border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-7 flex flex-col justify-between space-y-5`}
          >
            <div className="space-y-4">
              {/* Visual slot: white background, 2px ink outline, still image */}
              <div className="relative aspect-4/3 rounded-[18px] overflow-hidden border-2 border-[#1E1B3A] bg-white flex items-center justify-center p-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
                
                {/* Positive/saving badge: butter yellow pill with ink text */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="text-xs font-[800] px-3 py-1 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border-2 border-[#1E1B3A]">
                    Saves ₹{item.savingsAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-[800] text-[#6D28D9] uppercase tracking-wider">
                  {item.brand} · {item.category}
                </span>
                <h3 className="text-lg font-[800] text-[#1E1B3A] line-clamp-1 mt-0.5 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-[#4A4668] font-medium line-clamp-2 mt-1 leading-relaxed">
                  {item.specLine}
                </p>
              </div>

              {/* Price Block: large and bold */}
              <div className="pt-2 border-t-2 border-[#1E1B3A]/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-[800] text-[#1E1B3A] tracking-tight">
                    ₹{item.bestPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-[700] text-[#4A4668] line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-[700] text-[#1E1B3A] mt-2">
                  <span className="px-2.5 py-0.5 bg-white rounded-full border border-[#1E1B3A]">
                    Lowest on {item.cheaperStore}
                  </span>
                  <span className="flex items-center gap-1 text-[#4A4668]">
                    <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                    {item.updatedMinutesAgo}m ago
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t-2 border-[#1E1B3A]/20 flex items-center justify-between gap-3">
              <Link
                to={`/compare?p1=${item.id}`}
                className="text-xs font-[800] text-[#6D28D9] hover:underline inline-flex items-center gap-1"
              >
                <span>Compare</span>
                <span>→</span>
              </Link>

              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="sponsored noopener"
                className="min-h-[44px] px-4 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-[800] rounded-full border-2 border-[#1E1B3A] flex items-center gap-1.5"
              >
                <span>View Deal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
