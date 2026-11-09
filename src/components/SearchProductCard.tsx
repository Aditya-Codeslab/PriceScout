import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ExternalLink, Bookmark, ArrowLeftRight, Check, Star, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface SearchProductCardProps {
  product: Product;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const SearchProductCard: React.FC<SearchProductCardProps> = ({
  product,
  isSaved = false,
  onToggleSave,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [savedLocal, setSavedLocal] = useState(isSaved);
  const navigate = useNavigate();

  const amazonPrice = product.prices.find((p) => p.store === 'amazon');
  const flipkartPrice = product.prices.find((p) => p.store === 'flipkart');

  const handleSaveClick = () => {
    setSavedLocal(!savedLocal);
    if (onToggleSave) onToggleSave(product.id);
  };

  const handleCompareClick = () => {
    navigate(`/compare?p1=${product.id}`);
  };

  // Find lowest price store
  const bestStore = amazonPrice && flipkartPrice
    ? amazonPrice.price <= flipkartPrice.price
      ? { name: 'Amazon India', price: amazonPrice.price, savings: Math.abs(amazonPrice.price - flipkartPrice.price) }
      : { name: 'Flipkart', price: flipkartPrice.price, savings: Math.abs(amazonPrice.price - flipkartPrice.price) }
    : amazonPrice
    ? { name: 'Amazon India', price: amazonPrice.price, savings: 0 }
    : { name: 'Flipkart', price: flipkartPrice?.price || 0, savings: 0 };

  return (
    <div className="bg-white border border-[#E1DFD6] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow duration-300 space-y-5">
      
      {/* Top Section: Visual & Details */}
      <div className="flex flex-col sm:flex-row gap-5">
        
        {/* Product Visual with Shimmer Skeleton */}
        <div className="relative w-full sm:w-44 h-44 rounded-xl overflow-hidden bg-[#F7F6F2] border border-[#E1DFD6] shrink-0 p-3 flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton-shimmer z-0" aria-label="Loading image" />
          )}
          <img
            src={product.imageUrl}
            alt={product.title}
            onLoad={() => setImageLoaded(true)}
            referrerPolicy="no-referrer"
            className={`max-h-full max-w-full object-contain relative z-1 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {product.studentDiscountEligible && (
            <span className="absolute bottom-2 left-2 z-2 text-[10px] font-bold px-2 py-0.5 bg-[#DDF0E8] text-[#0B5D52] rounded border border-[#0B5D52]/20">
              Student Rebate
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B5D52]">
              {product.brand} · {product.category}
            </span>

            {/* Save & Compare Buttons in header */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSaveClick}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                  savedLocal
                    ? 'bg-[#0B5D52] text-white border-[#0B5D52]'
                    : 'bg-[#F7F6F2] text-[#46544F] border-[#E1DFD6] hover:text-[#14201D] hover:bg-white'
                }`}
                title={savedLocal ? 'Saved in wishlist' : 'Save to wishlist'}
                aria-label={savedLocal ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                type="button"
                onClick={handleCompareClick}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border bg-[#F7F6F2] text-[#46544F] border-[#E1DFD6] hover:text-[#0B5D52] hover:bg-white transition-colors cursor-pointer"
                title="Add to side-by-side comparison"
                aria-label="Add to comparison"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block text-base sm:text-lg font-bold text-[#14201D] font-heading hover:text-[#0B5D52] transition-colors leading-snug"
          >
            {product.title}
          </Link>

          {/* Specs tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <span
                key={key}
                className="text-[11px] px-2 py-0.5 bg-[#F7F6F2] text-[#46544F] rounded-md border border-[#E1DFD6]"
              >
                <strong>{key}:</strong> {value}
              </span>
            ))}
            {product.ram && (
              <span className="text-[11px] px-2 py-0.5 bg-[#DDF0E8] text-[#0B5D52] font-semibold rounded-md border border-[#0B5D52]/20">
                {product.ram} RAM
              </span>
            )}
            {product.storage && (
              <span className="text-[11px] px-2 py-0.5 bg-[#F7F6F2] text-[#46544F] rounded-md border border-[#E1DFD6]">
                {product.storage}
              </span>
            )}
          </div>

          {/* Best Price Callout */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="text-xs text-[#46544F]">Lowest Price:</span>
            <span className="text-xl sm:text-2xl font-bold text-[#0B5D52] font-mono tabular-nums">
              ₹{bestStore.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-[#14201D]">
              on {bestStore.name}
            </span>
            {bestStore.savings > 0 && (
              <span className="text-xs font-bold text-[#178F7A] bg-[#DDF0E8] px-2 py-0.5 rounded">
                (Save ₹{bestStore.savings.toLocaleString('en-IN')})
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Section: Per-Marketplace Price List */}
      <div className="pt-3 border-t border-[#E1DFD6] space-y-2.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#46544F]">
          Store Availability & Timestamp Comparison
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Amazon Store Box */}
          {amazonPrice ? (
            <div
              className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                amazonPrice.price <= (flipkartPrice?.price || Infinity)
                  ? 'bg-[#DDF0E8]/40 border-[#0B5D52]'
                  : 'bg-[#F7F6F2] border-[#E1DFD6]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#14201D]">Amazon.in</span>
                  <span className="text-[10px] text-[#0B5D52] flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {amazonPrice.updatedMinutesAgo}m ago
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-bold text-[#14201D] font-mono tabular-nums">
                    ₹{amazonPrice.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#46544F] line-through font-mono tabular-nums">
                    ₹{amazonPrice.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <a
                href={`/go/${amazonPrice.offerId || `${product.id}-amazon`}`}
                target="_blank"
                rel="sponsored noopener"
                className="min-h-[44px] px-3.5 py-2 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Buy Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed border-[#E1DFD6] text-xs text-[#46544F] flex items-center justify-center">
              Not listed on Amazon India
            </div>
          )}

          {/* Flipkart Store Box */}
          {flipkartPrice ? (
            <div
              className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                flipkartPrice.price < (amazonPrice?.price || Infinity)
                  ? 'bg-[#DDF0E8]/40 border-[#0B5D52]'
                  : 'bg-[#F7F6F2] border-[#E1DFD6]'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#14201D]">Flipkart</span>
                  <span className="text-[10px] text-[#0B5D52] flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {flipkartPrice.updatedMinutesAgo}m ago
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-bold text-[#14201D] font-mono tabular-nums">
                    ₹{flipkartPrice.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-[#46544F] line-through font-mono tabular-nums">
                    ₹{flipkartPrice.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <a
                href={`/go/${flipkartPrice.offerId || `${product.id}-flipkart`}`}
                target="_blank"
                rel="sponsored noopener"
                className="min-h-[44px] px-3.5 py-2 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Buy Flipkart</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed border-[#E1DFD6] text-xs text-[#46544F] flex items-center justify-center">
              Not listed on Flipkart
            </div>
          )}
        </div>

        {/* Affiliate Disclosure footer */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-[#46544F]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D52]" />
            Affiliate link · Dispatched directly by merchant
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-[#0B5D52] font-semibold hover:underline"
          >
            Detailed Price Analysis →
          </Link>
        </div>
      </div>

    </div>
  );
};
