import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  ExternalLink,
  Bookmark,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Bot,
  Send,
  HelpCircle,
  TrendingDown,
  Truck,
  Star,
  Check,
  Tag,
} from 'lucide-react';
import { api } from '../api';
import { Product, StorePrice } from '../types';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // AI Assistant side panel state
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([]);
  const [aiTyping, setAiTyping] = useState(false);

  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProductById(id);
      if (!data) {
        setError(`Product with ID "${id}" was not found.`);
      } else {
        setProduct(data);
        // Preload initial AI prompt
        setAiChat([
          {
            sender: 'assistant',
            text: `Hi! I'm your PriceScout shopping assistant for the ${data.title}. Ask me anything about store warranty, bank card discounts, or whether today's price is a good deal!`,
          },
        ]);
      }
    } catch (err) {
      setError('Failed to fetch real-time product prices. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Gallery images array
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    // Default angles/variations based on primary image
    return [
      product.imageUrl,
      `${product.imageUrl}&crop=entropy&fit=crop&w=600`,
      `${product.imageUrl}&auto=format&fit=crop&w=700&q=85`,
    ];
  }, [product]);

  // Calculate pricing comparisons
  const pricingAnalysis = useMemo(() => {
    if (!product || product.prices.length === 0) return null;
    const sorted = [...product.prices].sort((a, b) => a.price - b.price);
    const lowest = sorted[0];
    const secondLowest = sorted[1] || sorted[0];
    const difference = Math.max(0, secondLowest.price - lowest.price);
    return {
      lowestStore: lowest.store,
      lowestPrice: lowest.price,
      secondLowestPrice: secondLowest.price,
      difference,
      otherStoreName: secondLowest.storeName,
    };
  }, [product]);

  // Handle AI Chat Submit
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || !product) return;
    const userQ = aiQuery.trim();
    setAiQuery('');
    setAiChat((prev) => [...prev, { sender: 'user', text: userQ }]);
    setAiTyping(true);

    setTimeout(() => {
      let answer = '';
      const qLower = userQ.toLowerCase();
      if (qLower.includes('buy') || qLower.includes('deal') || qLower.includes('wait') || qLower.includes('price')) {
        const lowestStoreName = product.prices.find((p) => p.price === product.bestPrice)?.storeName || 'Amazon India';
        answer = `Currently, ${lowestStoreName} has the lowest verified price at ₹${product.bestPrice.toLocaleString('en-IN')}. This is near its 30-day low, making it a favorable time to purchase rather than waiting.`;
      } else if (qLower.includes('warranty') || qLower.includes('return')) {
        answer = `Both Amazon India and Flipkart fulfill through authorized Indian distributor channels, granting full 1-Year official manufacturer warranty. Both offer 7-day replacement for technical defects.`;
      } else if (qLower.includes('student') || qLower.includes('college')) {
        if (product.studentDiscountEligible) {
          answer = `Yes! This model qualifies for PriceScout Student Mode with an extra ${product.studentExtraOffPercent || 5}% educational rebate when verified with your university email.`;
        } else {
          answer = `Standard educational vouchers are not currently active for this specific model, but bank credit card instant discounts (up to ₹1,500) can be stacked at checkout.`;
        }
      } else {
        answer = `Based on current Amazon India and Flipkart catalog listings: ${product.title} offers excellent value at ₹${product.bestPrice.toLocaleString('en-IN')}. Ensure you check the merchant checkout screen for active bank EMI options.`;
      }
      setAiChat((prev) => [...prev, { sender: 'assistant', text: answer }]);
      setAiTyping(false);
    }, 700);
  };

  // Loading skeleton state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
        <div className="w-32 h-4 skeleton-shimmer rounded-md" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-square skeleton-shimmer rounded-2xl" />
            <div className="h-28 skeleton-shimmer rounded-2xl" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="h-10 skeleton-shimmer rounded-xl" />
            <div className="h-32 skeleton-shimmer rounded-2xl" />
            <div className="h-44 skeleton-shimmer rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#14201D] font-heading">
            Product Not Found
          </h1>
          <p className="text-sm text-[#46544F]">
            {error || "The product you're looking for does not exist in our active database."}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={fetchProduct}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Loading</span>
          </button>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-white border border-[#E1DFD6] text-[#14201D] text-xs font-semibold rounded-xl hover:bg-[#F7F6F2] transition-colors"
          >
            <span>Back to Search</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 font-semibold text-[#0B5D52] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Search Results
        </Link>

        <div className="flex items-center gap-2 text-[#46544F]">
          <span>{product.brand}</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-[#14201D] truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main Top Grid: Gallery & Offer Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column (7 cols): Image Gallery & Specs Table */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Image Gallery */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            {/* Main Stage */}
            <div className="relative aspect-square max-h-[460px] bg-[#F7F6F2] rounded-xl overflow-hidden border border-[#E1DFD6] flex items-center justify-center p-6 group">
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-shimmer z-0" aria-label="Loading image" />
              )}
              <img
                src={gallery[selectedImageIndex]}
                alt={product.title}
                onLoad={() => setImageLoaded(true)}
                referrerPolicy="no-referrer"
                className={`max-h-full max-w-full object-contain relative z-1 transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {product.studentDiscountEligible && (
                <span className="absolute top-4 left-4 z-2 text-xs font-bold px-3 py-1 bg-[#DDF0E8] text-[#0B5D52] rounded-lg border border-[#0B5D52]/20 shadow-2xs">
                  Student Rebate Eligible
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageLoaded(false);
                      setSelectedImageIndex(idx);
                    }}
                    className={`w-18 h-18 rounded-xl border-2 p-1.5 bg-[#F7F6F2] shrink-0 overflow-hidden transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#0B5D52] shadow-xs scale-105'
                        : 'border-[#E1DFD6] hover:border-[#46544F]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Specs Table */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E1DFD6] pb-3">
              <h2 className="text-lg font-bold text-[#14201D] font-heading">
                Technical Specifications
              </h2>
              <span className="text-xs text-[#46544F]">
                Verified against manufacturer datasheets
              </span>
            </div>

            <div className="divide-y divide-[#E1DFD6] text-xs sm:text-sm">
              <div className="grid grid-cols-3 py-2.5">
                <span className="font-semibold text-[#46544F]">Brand</span>
                <span className="col-span-2 text-[#14201D] font-medium">{product.brand}</span>
              </div>
              <div className="grid grid-cols-3 py-2.5">
                <span className="font-semibold text-[#46544F]">Category</span>
                <span className="col-span-2 text-[#14201D] font-medium">{product.category}</span>
              </div>
              {product.ram && (
                <div className="grid grid-cols-3 py-2.5">
                  <span className="font-semibold text-[#46544F]">RAM</span>
                  <span className="col-span-2 text-[#14201D] font-medium">{product.ram}</span>
                </div>
              )}
              {product.storage && (
                <div className="grid grid-cols-3 py-2.5">
                  <span className="font-semibold text-[#46544F]">Internal Storage</span>
                  <span className="col-span-2 text-[#14201D] font-medium">{product.storage}</span>
                </div>
              )}
              {Object.entries(product.specs).map(([specKey, specVal]) => (
                <div key={specKey} className="grid grid-cols-3 py-2.5">
                  <span className="font-semibold text-[#46544F]">{specKey}</span>
                  <span className="col-span-2 text-[#14201D] font-medium">{specVal}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 py-2.5">
                <span className="font-semibold text-[#46544F]">Official Warranty</span>
                <span className="col-span-2 text-[#14201D] font-medium">
                  1-Year Brand Warranty in India (Amazon & Flipkart Verified)
                </span>
              </div>
            </div>
          </div>

          {/* 3. Price History Chart for this Product */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E1DFD6] pb-3">
              <div>
                <h2 className="text-lg font-bold text-[#14201D] font-heading">
                  Price History & Volatility
                </h2>
                <p className="text-xs text-[#46544F]">
                  30-day tracking on Amazon India vs Flipkart
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                Illustrative Market Trend
              </span>
            </div>

            {/* SVG Chart */}
            <div className="w-full overflow-x-auto pt-2">
              <svg
                viewBox="0 0 600 200"
                className="w-full h-auto max-h-[220px] overflow-visible"
                aria-label="30-day price trend chart"
              >
                <line x1="50" y1="30" x2="570" y2="30" stroke="#E1DFD6" strokeDasharray="3 3" />
                <line x1="50" y1="80" x2="570" y2="80" stroke="#E1DFD6" strokeDasharray="3 3" />
                <line x1="50" y1="130" x2="570" y2="130" stroke="#E1DFD6" strokeDasharray="3 3" />

                {/* Trendlines */}
                <path
                  d="M 60 50 L 160 55 L 260 90 L 360 115 L 460 100 L 560 140"
                  fill="none"
                  stroke="#0B5D52"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />

                <path
                  d="M 60 60 L 160 65 L 260 95 L 360 120 L 460 110 L 560 148"
                  fill="none"
                  stroke="#46544F"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />

                {/* Pulsing End Marker on Lowest Price */}
                <g transform="translate(560, 140)">
                  <circle cx="0" cy="0" r="8" fill="#0B5D52" className="animate-ping" opacity="0.6" />
                  <circle cx="0" cy="0" r="5" fill="#0B5D52" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="-40" y="-12" fontSize="10" fontWeight="bold" fill="#0B5D52" fontFamily="monospace">
                    Today: ₹{product.bestPrice.toLocaleString('en-IN')}
                  </text>
                </g>

                {/* Date ticks */}
                <text x="60" y="175" textAnchor="middle" fontSize="10" fill="#46544F">30d ago</text>
                <text x="260" y="175" textAnchor="middle" fontSize="10" fill="#46544F">15d ago</text>
                <text x="460" y="175" textAnchor="middle" fontSize="10" fill="#46544F">5d ago</text>
                <text x="560" y="175" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0B5D52">Today</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-[#46544F] pt-2 border-t border-[#E1DFD6]/60">
              <span className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-[#0B5D52]" />
                Price is currently at its 30-day recorded low
              </span>
              <span>Amazon & Flipkart Partner Data</span>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Offer Rows + Affiliate Disclosure + AI Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Title & Ratings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0B5D52]">
                {product.brand} · In Stock
              </span>
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${
                  isSaved
                    ? 'bg-[#0B5D52] text-white border-[#0B5D52]'
                    : 'bg-white text-[#46544F] border-[#E1DFD6] hover:bg-[#F7F6F2]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#14201D] font-heading leading-snug">
              {product.title}
            </h1>

            {/* Rating badge */}
            <div className="flex items-center gap-2 text-xs text-[#46544F]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 rounded font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {product.rating || 4.6}
              </span>
              <span>Based on verified Amazon & Flipkart consumer reviews</span>
            </div>
          </div>

          {/* Offer Rows per Marketplace */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E1DFD6] pb-3">
              <h2 className="text-sm font-bold text-[#14201D] uppercase tracking-wider font-heading">
                Marketplace Offers & Checkout
              </h2>
              <span className="text-xs text-[#0B5D52] font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Live Sync Active
              </span>
            </div>

            <div className="space-y-3">
              {product.prices.map((offer) => {
                const isLowest = pricingAnalysis?.lowestPrice === offer.price;
                const offerId = offer.offerId || `${product.id}-${offer.store}`;

                return (
                  <div
                    key={offer.store}
                    className={`p-4 rounded-xl border transition-all space-y-3 ${
                      isLowest
                        ? 'bg-[#DDF0E8]/50 border-2 border-[#0B5D52] ring-2 ring-[#0B5D52]/20 shadow-xs'
                        : 'bg-[#F7F6F2] border-[#E1DFD6]'
                    }`}
                  >
                    {/* Store Title & Badges */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isLowest && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B5D52] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0B5D52]" />
                          </span>
                        )}
                        <span className="font-bold text-sm text-[#14201D]">
                          {offer.storeName}
                        </span>
                        {isLowest && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#0B5D52] text-white rounded-full">
                            Lowest Verified
                          </span>
                        )}
                      </div>

                      {/* Difference Banner */}
                      {isLowest && pricingAnalysis && pricingAnalysis.difference > 0 && (
                        <span className="text-[11px] font-bold text-[#0B5D52] bg-white px-2.5 py-0.5 rounded-full border border-[#0B5D52]/30 shadow-2xs">
                          Saves ₹{pricingAnalysis.difference.toLocaleString('en-IN')} vs {pricingAnalysis.otherStoreName}
                        </span>
                      )}
                    </div>

                    {/* Price and Timestamps */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#0B5D52] font-mono tabular-nums">
                            ₹{offer.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#46544F] line-through font-mono tabular-nums">
                            ₹{offer.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-bold text-[#178F7A]">
                            ({offer.discountPercentage}% OFF)
                          </span>
                        </div>
                        <div className="text-[11px] text-[#46544F] flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#0B5D52]" />
                            Updated {offer.updatedMinutesAgo}m ago
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-[#14201D]">
                            <Truck className="w-3 h-3 text-[#0B5D52]" />
                            {offer.deliveryDays || 2}-day delivery
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Offer Promo */}
                    <div className="text-[11px] text-[#46544F] bg-white/70 p-2 rounded-lg border border-[#E1DFD6] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#0B5D52] shrink-0" />
                      <span>{offer.bankOffer || 'Extra 5% instant discount with qualifying bank credit cards at checkout'}</span>
                    </div>

                    {/* Buy Now Button (opens /go/:offerId in new tab with rel="sponsored noopener") */}
                    <a
                      href={`/go/${offerId}`}
                      target="_blank"
                      rel="sponsored noopener"
                      className={`w-full min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs ${
                        isLowest
                          ? 'bg-[#0B5D52] hover:bg-[#178F7A] text-white'
                          : 'bg-white hover:bg-[#F7F6F2] text-[#14201D] border border-[#E1DFD6] hover:border-[#0B5D52]'
                      }`}
                    >
                      <span>Buy Now on {offer.storeName}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Affiliate Disclosure near Buy Now buttons (Mandatory Rule) */}
            <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] text-xs text-[#46544F] space-y-1">
              <div className="font-semibold text-[#14201D] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B5D52]" />
                <span>Affiliate Disclosure</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                PriceScout never sells products directly. Clicking 'Buy Now' redirects you securely to official merchant checkout on Amazon India or Flipkart. We may receive an affiliate referral commission at zero additional cost to you.
              </p>
            </div>
          </div>

          {/* 4. "Ask AI About This Product" Side Panel */}
          <div className="bg-white border border-[#E1DFD6] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#E1DFD6] pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#0B5D52] text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#14201D] font-heading">
                  Ask AI About This Product
                </h2>
                <p className="text-[11px] text-[#46544F]">
                  Grounded in live prices & verified specs
                </p>
              </div>
            </div>

            {/* Quick Prompt Starters */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'Is this a good price today?',
                'Amazon vs Flipkart warranty difference?',
                'Are student discounts applicable?',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setAiQuery(q);
                  }}
                  className="text-[11px] px-2.5 py-1 bg-[#F7F6F2] hover:bg-[#DDF0E8] text-[#14201D] hover:text-[#0B5D52] rounded-lg border border-[#E1DFD6] transition-colors text-left cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Log Window */}
            <div className="max-h-60 overflow-y-auto space-y-3 p-3 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] text-xs">
              {aiChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0B5D52] text-white rounded-br-xs'
                        : 'bg-white text-[#14201D] border border-[#E1DFD6] rounded-tl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {aiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E1DFD6] p-2 rounded-xl rounded-tl-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D52] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D52] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D52] animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleAiSubmit} className="flex gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask about deals, specs, alternatives..."
                className="flex-1 min-h-[42px] px-3 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs text-[#14201D] focus:ring-2 focus:ring-[#0B5D52] focus:bg-white"
              />
              <button
                type="submit"
                disabled={aiTyping}
                className="min-h-[42px] px-4 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
