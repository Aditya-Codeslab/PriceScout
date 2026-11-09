import React from 'react';
import { ExternalLink, Clock, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedPriceComparison: React.FC = () => {
  const specs = [
    '30-Hr Battery',
    'Dual Processor V1',
    '8-Mic Beamforming',
    'Multipoint Bluetooth 5.2',
    'Carrying Case',
  ];

  const amazonPrice = 27990;
  const flipkartPrice = 26990;
  const mrp = 34990;
  const savings = amazonPrice - flipkartPrice;

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            HEAD-TO-HEAD SPOTLIGHT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Live Price Comparison Spotlight
          </h2>
        </div>

        {/* Kept exact required sample data label */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
          <span>Sample verified fixture</span>
        </div>
      </div>

      {/* Featured Card: 24px radius, 2px ink outline, pastel fill (Lavender #E4DAFB) */}
      <div className="bg-[#E4DAFB] border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-8 lg:p-10 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Product Visual & Specs */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-white rounded-[20px] p-6 flex items-center justify-center border-2 border-[#1E1B3A] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80"
                alt="Sony WH-1000XM5 Wireless Headphones"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute bottom-3 left-3 text-xs font-[800] px-3 py-1 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border-2 border-[#1E1B3A]">
                Flagship ANC
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-[800] uppercase tracking-wider text-[#6D28D9]">
                <span>Sony</span>
                <span>·</span>
                <span>Wireless Audio</span>
                <span>·</span>
                <span className="text-[#4A4668]">WH-1000XM5</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-[800] tracking-tight text-[#1E1B3A] leading-snug">
                Sony WH-1000XM5 Active Noise Cancelling Headphones
              </h3>

              {/* Specs chips: fully rounded pills with 2px ink outline */}
              <div className="flex flex-wrap gap-2 pt-1">
                {specs.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center text-xs px-3 py-1 bg-white text-[#1E1B3A] rounded-full border-2 border-[#1E1B3A] font-[700]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#6D28D9] mr-1 shrink-0 stroke-[3]" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Marketplace Pricing Matrix */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 1. Flipkart Row - White card inside pastel section with violet outline */}
            <div className="p-5 sm:p-6 bg-white border-2 border-[#6D28D9] rounded-[20px] space-y-4">
              
              {/* Header: Store Name & Butter Yellow Savings Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-[800] text-lg text-[#1E1B3A]">
                    Flipkart
                  </span>
                  <span className="text-xs font-[800] px-3 py-0.5 bg-[#FFF4B3] text-[#1E1B3A] rounded-full border-2 border-[#1E1B3A]">
                    Lowest Verified Price
                  </span>
                </div>

                {/* Positive/saving badge: butter yellow pill with ink text */}
                <span className="text-xs font-[800] text-[#1E1B3A] bg-[#FFF4B3] px-3.5 py-1 rounded-full border-2 border-[#1E1B3A]">
                  Saves ₹{savings.toLocaleString('en-IN')} vs Amazon
                </span>
              </div>

              {/* Price figures & timestamp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-[800] text-[#1E1B3A] tracking-tight">
                      ₹{flipkartPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#4A4668] line-through font-[700]">
                      ₹{mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-[800] text-[#6D28D9] bg-[#E4DAFB] px-2 py-0.5 rounded-full border border-[#1E1B3A]">
                      23% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-[700] text-[#4A4668] mt-1.5">
                    <span className="flex items-center gap-1 text-[#1E1B3A]">
                      <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                      Updated 19 min ago
                    </span>
                    <span>·</span>
                    <span>Standard Seller Warranty</span>
                  </div>
                </div>

                {/* Primary Button: Violet pill, white text, arrow glyph */}
                <a
                  href="https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmdb2159faecbd5?affid=pricescout"
                  target="_blank"
                  rel="sponsored noopener"
                  className="min-h-[46px] px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-[800] rounded-full border-2 border-[#1E1B3A] flex items-center justify-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                >
                  <span>Buy on Flipkart</span>
                  <span className="text-base">→</span>
                </a>
              </div>
            </div>

            {/* 2. Amazon Row - White card with 2px ink outline */}
            <div className="p-5 sm:p-6 bg-white border-2 border-[#1E1B3A] rounded-[20px] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-[800] text-lg text-[#1E1B3A]">
                    Amazon India
                  </span>
                  <span className="text-xs font-[800] text-[#1E1B3A] bg-[#CFE6FF] px-2.5 py-0.5 rounded-full border-2 border-[#1E1B3A]">
                    Prime Eligible
                  </span>
                </div>
                <span className="text-xs font-[700] text-[#4A4668]">
                  Official Warranty
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-[800] text-[#1E1B3A] tracking-tight">
                      ₹{amazonPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-[#4A4668] line-through font-[700]">
                      ₹{mrp.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-[800] text-[#4A4668]">
                      20% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-[700] text-[#4A4668] mt-1.5">
                    <span className="flex items-center gap-1 text-[#1E1B3A]">
                      <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                      Updated 8 min ago
                    </span>
                    <span>·</span>
                    <span>Direct Merchant Dispatch</span>
                  </div>
                </div>

                {/* Secondary Button: White pill with 2px ink outline */}
                <a
                  href="https://www.amazon.in/dp/B09XS7JWHH?tag=pricescout-in-21"
                  target="_blank"
                  rel="sponsored noopener"
                  className="min-h-[46px] px-6 py-2.5 bg-white hover:bg-[#FBFAFF] text-[#1E1B3A] border-2 border-[#1E1B3A] text-sm font-[800] rounded-full flex items-center justify-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                >
                  <span>Buy on Amazon</span>
                  <ExternalLink className="w-4 h-4 text-[#1E1B3A]" />
                </a>
              </div>
            </div>

            {/* Affiliate Disclosure Notice (Mandatory Rule) */}
            <div className="p-4 bg-white rounded-[16px] border-2 border-[#1E1B3A] text-xs font-medium text-[#4A4668] flex items-start gap-2.5 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
              <p>
                <strong>Affiliate Transparency:</strong> PriceScout never sells products directly. Clicking 'Buy' redirects you securely to the official seller checkout on Flipkart or Amazon India. We may earn a standard referral fee at no additional cost to you.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-1">
              <Link
                to="/compare"
                className="text-xs font-[800] text-[#6D28D9] hover:underline inline-flex items-center gap-1"
              >
                <span>Add to side-by-side comparison</span>
                <span className="text-sm">→</span>
              </Link>

              <Link
                to="/product/prod-sony-wh1000xm5"
                className="text-xs font-[800] text-[#1E1B3A] hover:underline"
              >
                View price history chart
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
