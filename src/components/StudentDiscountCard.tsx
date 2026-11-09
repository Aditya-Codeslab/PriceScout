import React from 'react';
import { GraduationCap, Check, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDiscountCard: React.FC = () => {
  const studentDeals = [
    { title: 'Apple MacBook Air M2', discount: 'Extra ₹4,250 OFF', category: 'Laptops' },
    { title: 'Samsung Galaxy S24', discount: 'Educational Cashback', category: 'Smartphones' },
    { title: 'Sony WH-1000XM5 ANC', discount: 'Student Voucher', category: 'Audio' },
  ];

  return (
    <section className="space-y-6">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            STUDENT MODE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Student Discount Hub
          </h2>
        </div>
        
        {/* Exact Label Preserved */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
          <span>Sample Verified Fixtures</span>
        </div>
      </div>

      {/* Main Container: Pastel Butter Yellow #FFF4B3, 24px radius, 2px ink outline */}
      <div className="bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
              <GraduationCap className="w-4 h-4 text-[#6D28D9]" />
              <span>University Email Verification Only</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[800] text-[#1E1B3A] tracking-tight leading-tight">
              Unlock educational savings on study laptops &amp; tech.
            </h3>

            <p className="text-base font-medium text-[#4A4668] leading-relaxed max-w-xl">
              We sync educational vouchers, Prime Student benefits, and campus discounts directly into your live price comparison view.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-[700] text-[#1E1B3A]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0 stroke-[3]" />
                <span>Instant .ac.in / .edu verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0 stroke-[3]" />
                <span>Stackable with card discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0 stroke-[3]" />
                <span>Zero markups · Direct official checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6D28D9] shrink-0 stroke-[3]" />
                <span>No fees or ID card uploads</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/student"
                className="min-h-[46px] px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-sm font-[800] rounded-full border-2 border-[#1E1B3A] flex items-center gap-2"
              >
                <span>Activate Student Mode</span>
                <span className="text-base">→</span>
              </Link>

              <span className="text-xs font-[700] text-[#4A4668]">
                Verified with accredited university domains (.ac.in / .edu)
              </span>
            </div>
          </div>

          {/* Right Preview Card of Eligible Products */}
          <div className="lg:col-span-5 bg-white border-2 border-[#1E1B3A] rounded-[20px] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#1E1B3A]/20 pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#6D28D9]" />
                <span className="text-xs font-[800] uppercase tracking-wider text-[#1E1B3A]">
                  Top Student Deals
                </span>
              </div>
              <span className="text-xs font-[800] px-2.5 py-0.5 bg-[#E4DAFB] text-[#1E1B3A] rounded-full border border-[#1E1B3A]">
                Active
              </span>
            </div>

            <div className="space-y-3">
              {studentDeals.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FBFAFF] rounded-[14px] border-2 border-[#1E1B3A] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-[800] text-[#1E1B3A]">{item.title}</div>
                    <div className="text-[11px] font-[700] text-[#4A4668]">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-[800] text-[#6D28D9] block">
                      {item.discount}
                    </span>
                    <span className="text-[10px] font-[700] text-[#4A4668]">
                      Amazon + Flipkart
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-[700] text-[#4A4668] text-center">
              Verification takes under 60 seconds with your university email.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
