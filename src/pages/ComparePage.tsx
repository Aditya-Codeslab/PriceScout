import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
  Star,
  Clock,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { api } from '../api';
import { Product } from '../types';

export const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');

  // Load catalog and initial selected products from URL params
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const prods = await api.getProducts();
        setAllProducts(prods);

        // Check if query params specify products: ?p1=...&p2=... or ?items=id1,id2
        const p1 = searchParams.get('p1');
        const p2 = searchParams.get('p2');
        const p3 = searchParams.get('p3');
        const p4 = searchParams.get('p4');
        const urlIds = [p1, p2, p3, p4].filter(Boolean) as string[];

        if (urlIds.length > 0) {
          setSelectedProductIds(urlIds.slice(0, 4));
        } else if (prods.length >= 2) {
          // Default to first 2 products for an immediate impressive comparison
          setSelectedProductIds([prods[0].id, prods[1].id]);
        }
      } catch (err) {
        console.error('Failed to load comparison data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync selected products to URL
  const updateSelected = (newIds: string[]) => {
    setSelectedProductIds(newIds);
    const params = new URLSearchParams();
    newIds.forEach((id, idx) => params.set(`p${idx + 1}`, id));
    setSearchParams(params);
  };

  const removeProduct = (idToRemove: string) => {
    const updated = selectedProductIds.filter((id) => id !== idToRemove);
    updateSelected(updated);
  };

  const addProduct = (idToAdd: string) => {
    if (selectedProductIds.length >= 4) return;
    if (!selectedProductIds.includes(idToAdd)) {
      updateSelected([...selectedProductIds, idToAdd]);
    }
    setIsAddModalOpen(false);
    setModalSearch('');
  };

  // Resolved list of selected products
  const selectedProducts = useMemo(() => {
    return selectedProductIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [allProducts, selectedProductIds]);

  // Determine best value per row
  const bestValues = useMemo(() => {
    if (selectedProducts.length === 0) return {};

    // 1. Lowest Best Price
    const minPrice = Math.min(...selectedProducts.map((p) => p.bestPrice));

    // 2. Highest Rating
    const maxRating = Math.max(...selectedProducts.map((p) => p.rating || 0));

    // 3. Highest RAM (numeric extract)
    const ramValues = selectedProducts.map((p) => {
      const match = (p.ram || '').match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const maxRam = Math.max(...ramValues);

    // 4. Highest Storage (numeric extract with GB/TB scale)
    const storageValues = selectedProducts.map((p) => {
      const str = p.storage || '';
      if (str.includes('TB')) return (parseInt(str, 10) || 1) * 1024;
      if (str.includes('GB')) return parseInt(str, 10) || 0;
      return 0;
    });
    const maxStorage = Math.max(...storageValues);

    return {
      minPrice,
      maxRating,
      maxRam,
      maxStorage,
    };
  }, [selectedProducts]);

  // Filter products for Add Modal
  const availableToAdd = useMemo(() => {
    return allProducts.filter((p) => {
      const notAlreadySelected = !selectedProductIds.includes(p.id);
      const matchesSearch =
        !modalSearch ||
        p.title.toLowerCase().includes(modalSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(modalSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(modalSearch.toLowerCase());
      return notAlreadySelected && matchesSearch;
    });
  }, [allProducts, selectedProductIds, modalSearch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="h-8 w-64 skeleton-shimmer rounded-xl" />
        <div className="h-96 skeleton-shimmer rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1DFD6] pb-5">
        <div className="space-y-1">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B5D52] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Search
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#14201D] font-heading">
            Side-by-Side Product Comparison
          </h1>
          <p className="text-xs sm:text-sm text-[#46544F]">
            Compare up to 4 gadgets simultaneously. Best value per attribute is highlighted in green.
          </p>
        </div>

        {selectedProducts.length < 4 && (
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product ({selectedProducts.length}/4)</span>
          </button>
        )}
      </div>

      {/* Comparison Grid View */}
      {selectedProducts.length === 0 ? (
        <div className="bg-white border border-[#E1DFD6] rounded-2xl p-12 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#14201D] font-heading">
            No products selected for comparison
          </h2>
          <p className="text-sm text-[#46544F] max-w-md mx-auto">
            Select products from the catalog to see real-time price differences and hardware specifications.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-[#0B5D52] text-white text-xs font-semibold rounded-xl hover:bg-[#178F7A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Choose Products</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E1DFD6] rounded-2xl shadow-sm overflow-hidden">
          {/* Mobile horizontal swipe indicator */}
          <div className="sm:hidden px-4 py-2.5 bg-[#DDF0E8]/50 text-[11px] font-medium text-[#0B5D52] border-b border-[#E1DFD6] flex items-center justify-between">
            <span>⇄ Swipe horizontally to compare specs</span>
            <span className="font-semibold">{selectedProducts.length} selected</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* STICKY HEADER ROW */}
              <thead className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E1DFD6]">
                <tr>
                  <th className="p-4 sm:p-5 w-48 min-w-[180px] bg-[#F7F6F2] font-heading text-xs font-bold uppercase tracking-wider text-[#46544F]">
                    Product Details
                  </th>
                  {selectedProducts.map((p) => {
                    const lowestPrice = p.bestPrice;
                    const lowestOffer = p.prices.find((pr) => pr.price === lowestPrice) || p.prices[0];
                    const offerId = lowestOffer?.offerId || `${p.id}-${lowestOffer?.store || 'amazon'}`;

                    return (
                      <th
                        key={p.id}
                        className="p-4 sm:p-5 min-w-[220px] max-w-[280px] align-top relative border-l border-[#E1DFD6]"
                      >
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeProduct(p.id)}
                          className="absolute top-3 right-3 p-1.5 text-[#46544F] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove from comparison"
                          aria-label={`Remove ${p.title}`}
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="space-y-3 pr-6">
                          <div className="w-20 h-20 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] p-2 flex items-center justify-center">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] font-semibold uppercase text-[#0B5D52]">
                              {p.brand}
                            </span>
                            <Link
                              to={`/product/${p.id}`}
                              className="block text-xs sm:text-sm font-bold text-[#14201D] font-heading line-clamp-2 hover:text-[#0B5D52] transition-colors"
                            >
                              {p.title}
                            </Link>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <div className="text-lg sm:text-xl font-bold text-[#0B5D52] font-mono tabular-nums">
                              ₹{lowestPrice.toLocaleString('en-IN')}
                            </div>
                            <a
                              href={`/go/${offerId}`}
                              target="_blank"
                              rel="sponsored noopener"
                              className="w-full min-h-[38px] px-3 py-1.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors shadow-2xs"
                            >
                              <span>Buy on {lowestOffer?.storeName || 'Store'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </th>
                    );
                  })}

                  {/* Add Slot column if fewer than 4 */}
                  {selectedProducts.length < 4 && (
                    <th className="p-4 sm:p-5 min-w-[180px] bg-[#F7F6F2]/50 border-l border-[#E1DFD6] align-middle text-center">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full h-full min-h-[140px] border-2 border-dashed border-[#E1DFD6] hover:border-[#0B5D52] rounded-xl flex flex-col items-center justify-center gap-2 text-xs font-semibold text-[#46544F] hover:text-[#0B5D52] transition-colors cursor-pointer"
                      >
                        <Plus className="w-6 h-6 text-[#0B5D52]" />
                        <span>Add another gadget</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              {/* SPECIFICATION & PRICE COMPARISON ROWS */}
              <tbody className="divide-y divide-[#E1DFD6] text-xs sm:text-sm text-[#14201D]">
                
                {/* 1. Lowest Verified Best Price */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Best Store Price
                  </td>
                  {selectedProducts.map((p) => {
                    const isMin = p.bestPrice === bestValues.minPrice;
                    return (
                      <td
                        key={p.id}
                        className={`p-4 border-l border-[#E1DFD6] ${
                          isMin ? 'bg-[#DDF0E8]/40 font-bold' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-bold text-[#0B5D52] font-mono tabular-nums">
                            ₹{p.bestPrice.toLocaleString('en-IN')}
                          </span>
                          {isMin && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#0B5D52] text-white rounded">
                              Best Value
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#46544F]">
                          Updated recently
                        </span>
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 2. Amazon Price */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Amazon India
                  </td>
                  {selectedProducts.map((p) => {
                    const amz = p.prices.find((pr) => pr.store === 'amazon');
                    return (
                      <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                        {amz ? (
                          <div className="space-y-0.5">
                            <span className="font-bold font-mono tabular-nums">
                              ₹{amz.price.toLocaleString('en-IN')}
                            </span>
                            <div className="text-[11px] text-[#46544F]">
                              {amz.discountPercentage}% OFF · {amz.updatedMinutesAgo}m ago
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#46544F] text-xs">Not available</span>
                        )}
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 3. Flipkart Price */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Flipkart
                  </td>
                  {selectedProducts.map((p) => {
                    const flp = p.prices.find((pr) => pr.store === 'flipkart');
                    return (
                      <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                        {flp ? (
                          <div className="space-y-0.5">
                            <span className="font-bold font-mono tabular-nums">
                              ₹{flp.price.toLocaleString('en-IN')}
                            </span>
                            <div className="text-[11px] text-[#46544F]">
                              {flp.discountPercentage}% OFF · {flp.updatedMinutesAgo}m ago
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#46544F] text-xs">Not available</span>
                        )}
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 4. Customer Rating */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Rating & Reviews
                  </td>
                  {selectedProducts.map((p) => {
                    const rating = p.rating || 0;
                    const isTopRating = rating > 0 && rating === bestValues.maxRating;
                    return (
                      <td
                        key={p.id}
                        className={`p-4 border-l border-[#E1DFD6] ${
                          isTopRating ? 'bg-[#DDF0E8]/40' : ''
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 font-bold text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {rating}
                          </span>
                          {isTopRating && (
                            <span className="text-[10px] font-bold text-[#0B5D52] flex items-center gap-0.5">
                              <Award className="w-3 h-3" /> Top Rated
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 5. RAM */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    RAM Memory
                  </td>
                  {selectedProducts.map((p) => {
                    const match = (p.ram || '').match(/\d+/);
                    const ramNum = match ? parseInt(match[0], 10) : 0;
                    const isMax = ramNum > 0 && ramNum === bestValues.maxRam;
                    return (
                      <td
                        key={p.id}
                        className={`p-4 border-l border-[#E1DFD6] ${
                          isMax ? 'bg-[#DDF0E8]/40 font-bold text-[#0B5D52]' : ''
                        }`}
                      >
                        <span>{p.ram || p.specs['RAM'] || 'N/A'}</span>
                        {isMax && <span className="text-[10px] font-bold ml-1.5 bg-[#0B5D52] text-white px-1.5 py-0.2 rounded">Highest</span>}
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 6. Storage */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Internal Storage
                  </td>
                  {selectedProducts.map((p) => {
                    const str = p.storage || '';
                    const sizeNum = str.includes('TB')
                      ? (parseInt(str, 10) || 1) * 1024
                      : parseInt(str, 10) || 0;
                    const isMax = sizeNum > 0 && sizeNum === bestValues.maxStorage;
                    return (
                      <td
                        key={p.id}
                        className={`p-4 border-l border-[#E1DFD6] ${
                          isMax ? 'bg-[#DDF0E8]/40 font-bold text-[#0B5D52]' : ''
                        }`}
                      >
                        <span>{p.storage || p.specs['Storage'] || 'N/A'}</span>
                        {isMax && <span className="text-[10px] font-bold ml-1.5 bg-[#0B5D52] text-white px-1.5 py-0.2 rounded">Largest</span>}
                      </td>
                    );
                  })}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 7. Display / Screen */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Display Specs
                  </td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                      <span className="text-xs">{p.specs['Display'] || p.specs['Screen'] || 'N/A'}</span>
                    </td>
                  ))}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 8. Processor / Chip */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Processor
                  </td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                      <span className="text-xs">{p.specs['Processor'] || p.specs['Chip'] || 'N/A'}</span>
                    </td>
                  ))}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 9. Student Discount */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Student Mode
                  </td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                      {p.studentDiscountEligible ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-xs text-[#0B5D52]">
                          <Check className="w-3.5 h-3.5" />
                          Eligible ({p.studentExtraOffPercent || 5}% Extra OFF)
                        </span>
                      ) : (
                        <span className="text-xs text-[#46544F]">Standard Deals Only</span>
                      )}
                    </td>
                  ))}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

                {/* 10. Official Warranty */}
                <tr className="hover:bg-[#F7F6F2]/30 transition-colors">
                  <td className="p-4 font-semibold text-[#46544F] bg-[#F7F6F2]/50">
                    Warranty (India)
                  </td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="p-4 border-l border-[#E1DFD6]">
                      <span className="text-xs text-[#14201D]">
                        1-Year Brand Manufacturer Warranty
                      </span>
                    </td>
                  ))}
                  {selectedProducts.length < 4 && <td className="border-l border-[#E1DFD6]" />}
                </tr>

              </tbody>
            </table>
          </div>

          {/* Table Footer Disclosure */}
          <div className="p-4 bg-[#F7F6F2] border-t border-[#E1DFD6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#46544F]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B5D52]" />
              Prices are updated continuously across Amazon India and Flipkart. Best values highlighted automatically.
            </span>
            <span className="text-[11px]">
              Affiliate disclosure applies to all marketplace links.
            </span>
          </div>

        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-[#E1DFD6] rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E1DFD6] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#14201D] font-heading">
                  Add Product to Comparison
                </h3>
                <p className="text-xs text-[#46544F]">
                  Select from verified catalog ({selectedProducts.length}/4 selected)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-[#46544F] hover:text-[#14201D] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b border-[#E1DFD6]">
              <input
                type="text"
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                placeholder="Search MacBook, OnePlus, Samsung, Sony..."
                className="w-full min-h-[42px] px-3.5 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-xs text-[#14201D] focus:ring-2 focus:ring-[#0B5D52]"
                autoFocus
              />
            </div>

            {/* Modal List */}
            <div className="p-4 overflow-y-auto space-y-2.5 max-h-96">
              {availableToAdd.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#46544F]">
                  No matching products available to add.
                </div>
              ) : (
                availableToAdd.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-[#E1DFD6] hover:border-[#0B5D52] hover:bg-[#DDF0E8]/30 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F7F6F2] rounded-lg p-1 shrink-0 border border-[#E1DFD6] flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-[#0B5D52] uppercase">
                          {item.brand} · {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#14201D] line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="text-xs font-mono font-bold text-[#0B5D52]">
                          ₹{item.bestPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addProduct(item.id)}
                      className="min-h-[36px] px-3.5 py-1.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Select</span>
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
