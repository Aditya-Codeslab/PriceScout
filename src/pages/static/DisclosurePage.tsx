import React from 'react';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, ExternalLink, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DisclosurePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Transparency & Consumer Trust</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14201D] font-heading">
          Affiliate Disclosure & Earnings Disclaimer
        </h1>
        <p className="text-sm text-[#46544F]">
          Last reviewed: November 2026 · Compliant with ASCI (Advertising Standards Council of India) and FTC Guidelines
        </p>
      </div>

      {/* Summary Highlight Box */}
      <div className="bg-[#DDF0E8]/60 border border-[#0B5D52]/20 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#0B5D52] font-bold text-base">
          <Info className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>The Plain-English Promise</span>
        </div>
        <p className="text-sm text-[#14201D] leading-relaxed">
          PriceScout is an independent comparison service and buying guide. <strong>We do not sell products directly</strong>, nor do we stock inventory or handle shipping. When you click an affiliate link to Amazon India or Flipkart and make a purchase, the merchant pays us a small referral commission. <strong>This never increases the price you pay.</strong> In fact, we often highlight merchant coupons and student programs that decrease your checkout total.
        </p>
      </div>

      <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-10 space-y-8 text-sm text-[#46544F] leading-relaxed shadow-2xs">
        
        {/* Amazon Associates Statement */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading flex items-center gap-2">
            <span>1. Amazon India Associates Program</span>
          </h2>
          <p>
            PriceScout is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to <strong>Amazon.in</strong>.
          </p>
          <div className="p-3.5 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] text-xs font-mono text-[#14201D]">
            &ldquo;As an Amazon Associate, PriceScout earns from qualifying purchases made on Amazon.in.&rdquo;
          </div>
          <p className="text-xs">
            Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </section>

        {/* Flipkart Affiliate Program */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading flex items-center gap-2">
            <span>2. Flipkart Affiliate Program</span>
          </h2>
          <p>
            PriceScout is also an authorized publisher in the <strong>Flipkart Affiliate Network</strong>. When users follow product redirects from our platform to Flipkart.com and complete qualifying orders within the active cookie attribution window, PriceScout receives a standardized referral percentage.
          </p>
          <p className="text-xs">
            Flipkart and the Flipkart logo are registered trademarks of Flipkart Internet Private Limited.
          </p>
        </section>

        {/* Editorial Independence & Unbiased Algorithms */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading">
            3. Strict Editorial Independence
          </h2>
          <p>
            Our core mission is finding you the lowest verified price and best value. To protect shopper integrity:
          </p>
          <ul className="space-y-2.5 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>Lowest price always wins:</strong> The green highlight badge and savings calculation are strictly mathematical. If Flipkart is ₹500 cheaper, Flipkart is ranked first; if Amazon is cheaper, Amazon is ranked first.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>No commission bias:</strong> Our search and comparison algorithms are completely decoupled from merchant commission payouts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0B5D52] shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>No sponsored rankings in organic search:</strong> We never accept pay-for-placement fees from third-party sellers to artificially boost product recommendations.</span>
            </li>
          </ul>
        </section>

        {/* Live Price Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading">
            4. Live Pricing & Stock Volatility
          </h2>
          <p>
            E-commerce prices in India fluctuate constantly due to lightning sales, dynamic algorithmic pricing, and instant bank discounts (HDFC, ICICI, SBI, etc.). While PriceScout syncs listing data regularly and clearly stamps every price with an &ldquo;Updated X min ago&rdquo; indicator:
          </p>
          <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-[#14201D]">
              <strong>Final Checkout Authority:</strong> The price, seller rating, warranty terms, and delivery timeline shown on the official merchant checkout screen (Amazon.in or Flipkart.com) at the exact moment of order placement will supersede any historical or cached data shown on PriceScout.
            </p>
          </div>
        </section>

        {/* Affiliate Link Identifier */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading">
            5. How We Mark Affiliate Links
          </h2>
          <p>
            In compliance with international web transparency regulations and Google Search quality guidelines, outbound merchant links generated by PriceScout:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#46544F]">
            <li>Include explicit link attributes: <code className="px-1.5 py-0.5 bg-[#F7F6F2] rounded font-mono text-[#0B5D52]">rel=&quot;sponsored noopener&quot;</code></li>
            <li>Route through our transparent redirection endpoint <code className="px-1.5 py-0.5 bg-[#F7F6F2] rounded font-mono text-[#0B5D52]">/go/:offerId</code></li>
            <li>Display visible affiliate disclosures right next to every &ldquo;Buy Now&rdquo; and &ldquo;View Deal&rdquo; button.</li>
          </ul>
        </section>

        {/* Question & Discrepancy Reporting */}
        <section className="pt-4 border-t border-[#E1DFD6] space-y-3">
          <h2 className="text-lg font-bold text-[#14201D] font-heading">
            6. Spotted a Price Discrepancy?
          </h2>
          <p>
            If you encounter an outdated price tag or broken link, our engineering team investigates immediately.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Report Price Mismatch
            </Link>
            <a
              href="mailto:compliance@pricescout.in"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 border border-[#E1DFD6] hover:bg-[#F7F6F2] text-[#14201D] rounded-xl text-xs font-medium transition-colors"
            >
              compliance@pricescout.in
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
