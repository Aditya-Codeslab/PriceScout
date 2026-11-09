import React from 'react';
import { ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>About PriceScout India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14201D] font-heading">
          Empowering Indian shoppers with transparent price intelligence.
        </h1>
        <p className="text-base text-[#46544F] leading-relaxed">
          Online prices change multiple times a day across India’s major marketplaces. PriceScout monitors live catalog listings across Amazon India and Flipkart, analyzing coupon codes, bank cards, and historical pricing to ensure you never overpay.
        </p>
      </div>

      <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-[#14201D] font-heading">Our Three Core Principles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold text-base text-[#14201D]">Never Sell Directly</h3>
            <p className="text-xs text-[#46544F] leading-relaxed">
              We hold no inventory. You always purchase directly from verified sellers on Amazon.in and Flipkart.com with full merchant buyer protection.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold text-base text-[#14201D]">Zero Fake Prices</h3>
            <p className="text-xs text-[#46544F] leading-relaxed">
              We never fabricate simulated reviews or bogus discounts. Every single listed price is synchronized with real store timestamps.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold text-base text-[#14201D]">Full Transparency</h3>
            <p className="text-xs text-[#46544F] leading-relaxed">
              We disclose our affiliate relationships clearly. Free to use for every shopper, supported by referral commissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
