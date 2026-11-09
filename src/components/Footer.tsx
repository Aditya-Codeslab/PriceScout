import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#FBFAFF] border-t-2 border-[#1E1B3A] mt-auto text-sm text-[#4A4668]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#FFF4B3] border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A] font-extrabold text-xl shadow-none">
                <span>P</span>
              </div>
              <span className="text-2xl font-extrabold tracking-[-0.03em] text-[#1E1B3A]">
                Price<span className="text-[#6D28D9]">Scout</span>
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-[#4A4668] max-w-sm font-medium">
              India’s transparent shopping intelligence. We compare verified prices and real-time deal alerts across Amazon India and Flipkart so you never overpay.
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#1E1B3A] font-bold bg-[#FFF4B3] border-2 border-[#1E1B3A] px-3.5 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#6D28D9] shrink-0" aria-hidden="true" />
              <span>100% Free · No Direct Sales · Verified Links</span>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h2 className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider mb-4">
              Shop & Categories
            </h2>
            <ul className="space-y-2.5 font-medium text-sm">
              <li>
                <Link to="/categories" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  All Categories
                </Link>
              </li>
              <li>
                <Link to="/search?category=laptops" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Laptops & MacBooks
                </Link>
              </li>
              <li>
                <Link to="/search?category=mobiles" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/search?category=audio" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Audio & Headphones
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-[#6D28D9] transition-colors font-bold text-[#6D28D9] focus:outline-none focus-visible:underline">
                  Today's Lowest Deals
                </Link>
              </li>
              <li>
                <Link to="/student" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Student Verification Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore Tools */}
          <div>
            <h2 className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider mb-4">
              Explore Tools
            </h2>
            <ul className="space-y-2.5 font-medium text-sm">
              <li>
                <Link to="/compare" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Side-by-Side Comparison
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  AI Buying Assistant
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Saved Products & Watchlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  How PriceScout Works
                </Link>
              </li>
              <li>
                <a
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline"
                >
                  Amazon India <ExternalLink className="w-3 h-3 text-[#4A4668]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.flipkart.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline"
                >
                  Flipkart <ExternalLink className="w-3 h-3 text-[#4A4668]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h2 className="text-xs font-extrabold text-[#6D28D9] uppercase tracking-wider mb-4">
              Legal & Support
            </h2>
            <ul className="space-y-2.5 font-medium text-sm">
              <li>
                <Link to="/disclosure" className="hover:text-[#6D28D9] transition-colors font-bold text-[#1E1B3A] focus:outline-none focus-visible:underline">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#6D28D9] transition-colors focus:outline-none focus-visible:underline">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Section (Mandatory Rule with exact phrase) */}
        <div className="pt-8 border-t-2 border-[#1E1B3A] space-y-4">
          <div className="p-5 bg-[#E4DAFB] rounded-[20px] border-2 border-[#1E1B3A] text-xs text-[#1E1B3A] leading-relaxed">
            <p className="font-extrabold text-[#1E1B3A] mb-1.5 text-sm uppercase tracking-wide">
              Affiliate Disclosure & Transparency Statement:
            </p>
            <p className="font-medium">
              PriceScout is an independent comparison and shopping intelligence platform. We do not sell or fulfill any products directly. When you click on product links to Amazon.in or Flipkart.com and complete a purchase, we may earn an affiliate commission at zero additional cost to you. <strong>As an Amazon Associate I earn from qualifying purchases.</strong> Product prices, stock availability, ratings, and coupon codes are accurate as of the last update timestamp indicated on each listing and are governed strictly by the respective merchant.
            </p>
          </div>

          {/* Bottom Bar: Copyright & Back To Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[#4A4668] font-medium">
            <p>
              &copy; {new Date().getFullYear()} PriceScout India. All trademarks, logos, and brand names belong to their respective owners.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2 bg-white hover:bg-[#FFF4B3] text-[#1E1B3A] border-2 border-[#1E1B3A] rounded-full font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] cursor-pointer"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
