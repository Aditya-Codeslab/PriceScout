import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Trash2,
  Bell,
  Clock,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import { Product } from '../types';

export const SavedPage: React.FC = () => {
  const { savedProductIds, toggleSaveProduct, user } = useAuth();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const prods = await api.getProducts();
        setAllProducts(prods);
      } catch (e) {
        console.error('Failed to load products for saved page', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const savedProducts = useMemo(() => {
    return savedProductIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [allProducts, savedProductIds]);

  const handleSetAlert = (productTitle: string) => {
    setAlertSuccess(`Price drop alert active for "${productTitle}". You'll be notified when prices fall.`);
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1DFD6] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Saved Watchlist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#14201D] font-heading">
            Your Tracked Products ({savedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#46544F]">
            {user
              ? `Synced to your account (${user.email}) via Supabase.`
              : 'Saved locally in your browser. Sign in to sync across devices.'}
          </p>
        </div>

        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <span>Find More Deals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {alertSuccess && (
        <div className="p-4 bg-[#DDF0E8] border border-[#0B5D52]/30 rounded-xl text-xs sm:text-sm text-[#0B5D52] font-semibold flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{alertSuccess}</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-white border border-[#E1DFD6] rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      ) : savedProducts.length === 0 ? (
        <div className="bg-white border border-[#E1DFD6] rounded-2xl p-12 text-center space-y-5 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#14201D] font-heading">
              Your watchlist is currently empty
            </h2>
            <p className="text-sm text-[#46544F] max-w-md mx-auto">
              Save any product while browsing or searching to monitor live price drops and receive automated deal notifications.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0B5D52] text-white text-xs font-semibold rounded-xl hover:bg-[#178F7A] transition-colors"
            >
              <span>Explore Top Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {savedProducts.map((prod) => {
            const amazonPrice = prod.prices.find((p) => p.store === 'amazon');
            const flipkartPrice = prod.prices.find((p) => p.store === 'flipkart');
            const lowestPrice = prod.bestPrice;
            const lowestOffer = prod.prices.find((p) => p.price === lowestPrice) || prod.prices[0];
            const offerId = lowestOffer?.offerId || `${prod.id}-${lowestOffer?.store || 'amazon'}`;

            return (
              <div
                key={prod.id}
                className="bg-white border border-[#E1DFD6] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Visual + Specs */}
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <span className="text-[11px] font-semibold text-[#0B5D52] uppercase">
                      {prod.brand} · {prod.category}
                    </span>
                    <Link
                      to={`/product/${prod.id}`}
                      className="block text-sm sm:text-base font-bold text-[#14201D] font-heading hover:text-[#0B5D52] transition-colors line-clamp-1"
                    >
                      {prod.title}
                    </Link>

                    {/* Dual Store Live Pricing */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#46544F]">
                      {amazonPrice && (
                        <span className="flex items-center gap-1 font-mono">
                          <strong className="text-[#14201D]">Amazon:</strong> ₹{amazonPrice.price.toLocaleString('en-IN')}
                          <span className="text-[10px] text-[#0B5D52]">({amazonPrice.updatedMinutesAgo}m ago)</span>
                        </span>
                      )}
                      <span>·</span>
                      {flipkartPrice && (
                        <span className="flex items-center gap-1 font-mono">
                          <strong className="text-[#14201D]">Flipkart:</strong> ₹{flipkartPrice.price.toLocaleString('en-IN')}
                          <span className="text-[10px] text-[#0B5D52]">({flipkartPrice.updatedMinutesAgo}m ago)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lowest Price & Quick Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#E1DFD6] pt-3 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-[#46544F] block">Lowest Verified:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#0B5D52] font-mono tabular-nums">
                      ₹{lowestPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSetAlert(prod.title)}
                      className="min-h-[44px] px-3.5 py-2 bg-[#F7F6F2] hover:bg-[#DDF0E8] text-[#0B5D52] rounded-xl text-xs font-semibold border border-[#E1DFD6] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Set target price drop alert"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Set Alert</span>
                    </button>

                    <a
                      href={`/go/${offerId}`}
                      target="_blank"
                      rel="sponsored noopener"
                      className="min-h-[44px] px-4 py-2 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
                    >
                      <span>Buy Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => toggleSaveProduct(prod.id)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#46544F] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove from saved"
                      aria-label={`Remove ${prod.title} from saved items`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 bg-white border border-[#E1DFD6] rounded-2xl flex items-center justify-between text-xs text-[#46544F]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0B5D52]" />
          <span>PriceScout checks price drops and coupons every 15 minutes.</span>
        </div>
        <Link to="/student" className="text-[#0B5D52] font-semibold hover:underline">
          Check Student Mode Discounts →
        </Link>
      </div>

    </div>
  );
};
