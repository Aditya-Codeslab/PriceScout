import React from 'react';
import { FileText, ShieldAlert, Scale, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14201D] font-heading">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[#46544F]">
          Effective: November 2026 · Governing use of PriceScout.in
        </p>
      </div>

      <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#46544F] leading-relaxed shadow-2xs">
        
        <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] space-y-2">
          <h2 className="text-sm font-bold text-[#14201D] font-heading flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#0B5D52]" />
            Key Summary: We are an Informational Service Only
          </h2>
          <p className="text-xs text-[#46544F]">
            PriceScout is an independent comparison and research platform. We do not sell or ship products, collect payments, or handle merchant warranties. All purchases occur directly between you and official sellers on Amazon India or Flipkart.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using PriceScout (accessible via web and mobile interfaces), you agree to be bound by these Terms of Service. If you do not agree to all terms, please discontinue use of the site immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            2. Nature of Service & Price Accuracy
          </h2>
          <p>
            PriceScout synchronizes pricing, stock availability, and promotional coupons from public merchant feeds on Amazon.in and Flipkart.com. While we aim for sub-minute synchronization with visible "Updated X min ago" timestamps, e-commerce pricing fluctuates dynamically.
          </p>
          <p>
            In the event of a discrepancy between the price shown on PriceScout and the price on the destination checkout page, the price on the merchant's checkout page shall always prevail.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            3. Affiliate Relationship & Commissions
          </h2>
          <p>
            PriceScout participates in the Amazon Associates Program and the Flipkart Affiliate Program. Outbound links marked "Buy Now" contain our affiliate tags. Clicking these links supports our platform at zero extra charge to you. For full details, please review our <Link to="/disclosure" className="text-[#0B5D52] underline font-semibold">Affiliate Disclosure</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by Indian law, PriceScout and its operators shall not be liable for:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#14201D]">
            <li>Any merchant delivery delays, courier damages, counterfeit seller disputes, or defective items.</li>
            <li>Warranty fulfillment, returns, or refund processing (which are handled strictly by Amazon India, Flipkart, or the manufacturer).</li>
            <li>Loss of opportunity or price changes occurring between viewing a deal and visiting the merchant.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            5. Intellectual Property
          </h2>
          <p>
            "PriceScout" and its proprietary comparison UI, algorithms, and logos are property of PriceScout India. Amazon, Flipkart, Prime, SuperCoins, Apple, Samsung, Sony, and other third-party trademarks and logos belong exclusively to their respective owners and are used strictly for nominative identification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            6. Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India.
          </p>
        </section>

      </div>
    </div>
  );
};
