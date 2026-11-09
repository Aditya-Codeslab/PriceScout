import React from 'react';
import { ShieldCheck, Eye, Sparkles, GraduationCap, Check } from 'lucide-react';

export const WhyShoppersUseUs: React.FC = () => {
  // Pastel rotation: lavender, peach, sky blue, butter yellow
  const benefits = [
    {
      title: 'Zero Direct Sales Bias',
      description:
        'We never sell, pack, or warehouse inventory. Our recommendations are 100% impartial and guided strictly by where you save the most money.',
      icon: ShieldCheck,
      bg: 'bg-[#E4DAFB]',
    },
    {
      title: 'Hidden Card & Checkout Discounts',
      description:
        'Marketplaces hide net payable totals behind complex promos. We calculate net checkout prices factoring in qualifying card promotions.',
      icon: Eye,
      bg: 'bg-[#FFD9CC]',
    },
    {
      title: 'Live Verified Timestamps',
      description:
        'No phantom stock or expired discounts. Every price includes an explicit "Updated X min ago" timestamp synchronized with store listings.',
      icon: Sparkles,
      bg: 'bg-[#CFE6FF]',
    },
    {
      title: 'Verified Student Mode',
      description:
        'University students unlock special privileges. Verify with your .ac.in or .edu address to surface educational vouchers and study deals.',
      icon: GraduationCap,
      bg: 'bg-[#FFF4B3]',
    },
  ];

  return (
    <section className="space-y-6">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            WHY SHOPPERS SCOUT WITH US
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Built for Transparent Shopping
          </h2>
        </div>
        <p className="text-xs font-[700] text-[#4A4668] uppercase tracking-wider">
          Consumer-first · 100% Independent
        </p>
      </div>

      {/* 4 Cards: 24px radius, 2px ink outline, rotating pastel fills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`${item.bg} border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-7 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A]">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                
                <h3 className="font-[800] text-lg text-[#1E1B3A] tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm font-medium text-[#4A4668] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-[#1E1B3A]/20 text-xs font-[800] text-[#1E1B3A] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#6D28D9] stroke-[3]" />
                <span>Verified Benefit</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
