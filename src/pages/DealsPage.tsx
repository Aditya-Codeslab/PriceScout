import React, { useEffect, useState } from 'react';
import { Zap, Clock, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import { DealItem } from '../types';

export const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<DealItem[]>([]);

  useEffect(() => {
    async function loadDeals() {
      const data = await api.getDeals();
      setDeals(data);
    }
    loadDeals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Real-time Deal Radar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#14201D] font-heading">
          Today's Lowest Verified Deals
        </h1>
        <p className="text-sm text-[#46544F]">
          Handpicked price cuts and 30-day all-time lows on Amazon India and Flipkart.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white border border-[#E1DFD6] rounded-2xl p-6 flex flex-col justify-between shadow-xs space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0B5D52] bg-[#DDF0E8] px-2.5 py-1 rounded-md">
                  {deal.badge || 'Deal Alert'}
                </span>
                <span className="text-[#46544F] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#0B5D52]" /> {deal.updatedMinutesAgo}m ago
                </span>
              </div>

              <div className="aspect-video bg-[#F7F6F2] rounded-xl overflow-hidden flex items-center justify-center p-3 border border-[#E1DFD6]">
                <img
                  src={deal.imageUrl}
                  alt={deal.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full object-contain"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#46544F]">
                  {deal.category} · Store: {deal.store === 'amazon' ? 'Amazon India' : 'Flipkart'}
                </span>
                <h2 className="text-base font-bold text-[#14201D] font-heading line-clamp-2 mt-1">
                  {deal.title}
                </h2>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0B5D52] font-mono tabular-nums">
                  ₹{deal.dealPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#46544F] line-through font-mono tabular-nums">
                  ₹{deal.regularPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-[#178F7A]">
                  ({deal.savingsPercentage}% OFF)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E1DFD6]">
              <a
                href={deal.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] px-4 py-2 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>View on {deal.store === 'amazon' ? 'Amazon.in' : 'Flipkart'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[10px] text-center text-[#46544F]">
                Affiliate Link · Dispatched by verified seller
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
