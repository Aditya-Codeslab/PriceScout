import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../api';
import { Product, StorePrice } from '../types';

export const AffiliateRedirectPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [data, setData] = useState<{ product: Product; storePrice: StorePrice } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function resolveOffer() {
      if (!offerId) {
        setError(true);
        setLoading(false);
        return;
      }
      try {
        const res = await api.getOfferById(offerId);
        if (res && res.storePrice?.affiliateUrl) {
          setData(res);
          // Automatic redirection after a short delay for security and attribution
          const timer = setTimeout(() => {
            window.location.replace(res.storePrice.affiliateUrl);
          }, 1000);
          return () => clearTimeout(timer);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    resolveOffer();
  }, [offerId]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-md">
        
        {loading ? (
          <div className="space-y-4 py-6">
            <Loader2 className="w-10 h-10 text-[#0B5D52] animate-spin mx-auto" />
            <h1 className="text-xl font-bold text-[#14201D] font-heading">
              Connecting to Partner Marketplace...
            </h1>
            <p className="text-xs text-[#46544F]">
              Verifying real-time stock and discount vouchers on Amazon India & Flipkart.
            </p>
          </div>
        ) : error || !data ? (
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#14201D] font-heading">
              Offer Link Expired or Not Found
            </h1>
            <p className="text-xs text-[#46544F]">
              The requested merchant offer identifier could not be verified. You can return to PriceScout to find active alternatives.
            </p>
            <div className="pt-2">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0B5D52] text-white text-xs font-semibold rounded-xl hover:bg-[#178F7A] transition-colors"
              >
                <span>Browse Active Comparisons</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto">
              <ExternalLink className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official Merchant Checkout</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#14201D] font-heading">
                Redirecting you to {data.storePrice.storeName}...
              </h1>
              <p className="text-xs text-[#46544F] line-clamp-2">
                {data.product.title}
              </p>
            </div>

            {/* Price Preview Card */}
            <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] space-y-1">
              <div className="text-xs text-[#46544F]">Price on {data.storePrice.storeName}</div>
              <div className="text-2xl font-bold text-[#0B5D52] font-mono tabular-nums">
                ₹{data.storePrice.price.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#178F7A] font-semibold">
                {data.storePrice.discountPercentage}% OFF Regular Price
              </div>
            </div>

            {/* Manual Click fallback */}
            <div className="space-y-2 pt-2">
              <a
                href={data.storePrice.affiliateUrl}
                rel="sponsored noopener"
                className="w-full min-h-[46px] bg-[#0B5D52] hover:bg-[#178F7A] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Continue to {data.storePrice.storeName}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-[#46544F]">
                Click above if your browser did not redirect automatically in 2 seconds.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E1DFD6] text-[11px] text-[#46544F] leading-relaxed">
              PriceScout is an independent comparison site and never sells products directly. When you purchase via this link, we may receive an affiliate commission at zero additional cost to you.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
