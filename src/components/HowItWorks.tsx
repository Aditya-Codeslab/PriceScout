import React from 'react';
import { Search, SlidersHorizontal, ShoppingBag, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  // Pastel rotation: peach #FFD9CC, sky blue #CFE6FF, butter yellow #FFF4B3
  const steps = [
    {
      number: '01',
      title: 'Search or Browse Gadgets',
      description:
        'Type any product model or explore top departments. We query active listings across Amazon India and Flipkart in parallel.',
      icon: Search,
      bg: 'bg-[#FFD9CC]',
    },
    {
      number: '02',
      title: 'Compare Net Prices & Deals',
      description:
        'See instant side-by-side pricing, eligible card discounts, delivery speeds, and verified student voucher options.',
      icon: SlidersHorizontal,
      bg: 'bg-[#CFE6FF]',
    },
    {
      number: '03',
      title: 'Checkout on Official Store',
      description:
        'We never collect payment or hold inventory. Click "Buy" to complete your purchase safely on Amazon.in or Flipkart.com checkout.',
      icon: ShoppingBag,
      bg: 'bg-[#FFF4B3]',
    },
  ];

  return (
    <section className="space-y-6">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Three Simple Steps to Save
          </h2>
        </div>
        <p className="text-xs font-[700] text-[#4A4668] uppercase tracking-wider">
          Zero markups · 100% Free
        </p>
      </div>

      {/* Cards: 24px radius, 2px ink outline, rotating pastel fills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`${step.bg} border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Large number badge */}
                  <span className="w-12 h-12 rounded-full bg-white border-2 border-[#1E1B3A] flex items-center justify-center text-lg font-[800] text-[#1E1B3A]">
                    {step.number}
                  </span>
                  
                  <div className="w-11 h-11 rounded-xl bg-white border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A]">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-[800] tracking-tight text-[#1E1B3A]">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-[#4A4668] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#1E1B3A]/20 text-xs font-[800] text-[#1E1B3A] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6D28D9]" />
                <span>Verified Merchant Guarantee</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
