import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Mail, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Consumer Privacy Commitment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#14201D] font-heading">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#46544F]">
          Last Updated: November 2026 · In compliance with India’s Digital Personal Data Protection (DPDP) standards
        </p>
      </div>

      <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#46544F] leading-relaxed shadow-2xs">
        
        {/* Summary box */}
        <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] space-y-2">
          <h2 className="text-sm font-bold text-[#14201D] font-heading flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0B5D52]" />
            Privacy First Principles
          </h2>
          <p className="text-xs text-[#46544F]">
            PriceScout is designed to be browsed freely without requiring registration. We do not store payment card information, and we never sell your personal data or browsing behavior to third-party ad brokers.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            1. Information We Collect
          </h2>
          <p>
            We collect the absolute minimum information required to deliver our price-comparison and deal-alert services:
          </p>
          <ul className="space-y-2 pl-4 list-disc text-xs text-[#14201D]">
            <li>
              <strong>Account Information (Optional):</strong> If you choose to register an account or sign in with Google via Supabase, we store your email address and authentication ID to synchronize your saved wishlist items and price-drop alerts.
            </li>
            <li>
              <strong>Student Verification Details (Optional):</strong> If you choose to activate Student Discount Mode, we only collect your university email ending in <code className="px-1.5 py-0.5 bg-[#F7F6F2] rounded text-[#0B5D52]">.ac.in</code> or <code className="px-1.5 py-0.5 bg-[#F7F6F2] rounded text-[#0B5D52]">.edu</code> and institution name. We do not request student ID card photographs.
            </li>
            <li>
              <strong>Device & Telemetry Data:</strong> Standard technical information such as browser type, approximate geography (India city level), and requested product URLs to prevent fraudulent automated scraping and ensure site reliability.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            2. Cookies and Outbound Referral Attribution
          </h2>
          <p>
            When you click an outbound link on PriceScout to Amazon India (<a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer" className="text-[#0B5D52] underline">Amazon.in</a>) or Flipkart (<a href="https://www.flipkart.com" target="_blank" rel="noopener noreferrer" className="text-[#0B5D52] underline">Flipkart.com</a>), the destination marketplace places a standard referral cookie to record that you arrived from PriceScout.
          </p>
          <p>
            These cookies are governed exclusively by the privacy and cookie policies of Amazon and Flipkart. PriceScout does not read or retain your payment details or purchase history on those merchant platforms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            3. How We Use Information
          </h2>
          <p>We use collected data solely to:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#14201D]">
            <li>Deliver automated price drop notification emails you explicitly requested.</li>
            <li>Persist your tracked wishlist products across mobile and desktop devices.</li>
            <li>Compute aggregate statistics on which electronics categories have the highest price volatility.</li>
            <li>Protect PriceScout against abuse, denial-of-service, and malicious attacks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            4. Data Retention and Account Deletion
          </h2>
          <p>
            You have the absolute right to delete your saved products, price alerts, or entire user profile at any time. You can clear your browser storage immediately or request total account purge by contacting our Grievance Officer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-[#14201D] font-heading">
            5. Grievance Redressal (India)
          </h2>
          <p>
            In accordance with India’s Information Technology Act, 2000 and the Digital Personal Data Protection regulations, our appointed Grievance Officer can be contacted at:
          </p>
          <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] space-y-1 text-xs text-[#14201D]">
            <p><strong>Grievance Officer:</strong> Aditya Sahani</p>
            <p><strong>Email:</strong> privacy@pricescout.in</p>
            <p><strong>Address:</strong> PriceScout India, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038, India</p>
          </div>
        </section>

      </div>
    </div>
  );
};
