import React, { useState } from 'react';
import { Bell, Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const DealAlertBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-[#CFE6FF] text-[#1E1B3A] rounded-[24px] p-6 sm:p-10 lg:p-14 border-2 border-[#1E1B3A] relative">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-extrabold uppercase tracking-wider text-[#1E1B3A]">
          <Bell className="w-3.5 h-3.5 text-[#6D28D9]" />
          <span>Wishlist Price Radar</span>
        </div>

        {/* Big Type Headline */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B3A] tracking-[-0.03em] leading-[1.05]">
            Never miss a price drop on your wishlist
          </h2>
          <p className="text-[#1E1B3A]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Get instant alerts when deals or price reductions hit Amazon India or Flipkart. No spam, just real savings on verified listings.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-white border-2 border-[#1E1B3A] rounded-full max-w-md mx-auto flex items-center justify-center gap-2.5 text-sm text-[#1E1B3A] font-bold">
            <CheckCircle2 className="w-5 h-5 text-[#6D28D9] shrink-0" />
            <span>Alerts activated for {email}! We will notify you when deals drop.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-[#1E1B3A]/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full min-h-[48px] pl-11 pr-5 bg-white border-2 border-[#1E1B3A] rounded-full text-sm text-[#1E1B3A] placeholder-[#1E1B3A]/50 font-medium focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
                aria-label="Email for price drop alerts"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto min-h-[48px] px-8 bg-[#6D28D9] hover:bg-[#7C3AED] active:bg-[#6D28D9] text-white font-extrabold text-sm rounded-full border-2 border-[#1E1B3A] shrink-0 flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1B3A]"
            >
              <span>Notify me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#1E1B3A] rounded-full text-xs font-bold text-[#1E1B3A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6D28D9]" />
            <span>Zero Spam Guarantee</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-white border-2 border-[#1E1B3A] rounded-full text-xs font-bold text-[#1E1B3A]">
            One-click unsubscribe
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-white border-2 border-[#1E1B3A] rounded-full text-xs font-bold text-[#1E1B3A]">
            100% Free Consumer Tool
          </span>
        </div>

      </div>
    </section>
  );
};
