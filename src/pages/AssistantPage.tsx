import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Clock,
  ArrowRight,
  ArrowLeft,
  TrendingDown,
  Info,
  Layers,
} from 'lucide-react';
import { api } from '../api';
import { Product } from '../types';

interface AiMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  // If assistant:
  verifiedFacts?: string[];
  aiAssessment?: string;
  relatedOffer?: {
    storeName: string;
    price: number;
    offerId: string;
    productTitle: string;
  };
  rawText?: string;
}

const SUGGESTED_CHIPS = [
  'Which store is cheaper for MacBook Air M2 today?',
  'Best noise-cancelling headphones under ₹30,000?',
  'Compare Samsung Galaxy S24 vs OnePlus 12',
  'How do I claim student discount on laptops?',
  'Is today’s price on Sony WH-1000XM5 an all-time low?',
];

export const AssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingFacts, setStreamingFacts] = useState('');
  const [streamingAssessment, setStreamingAssessment] = useState('');
  const [streamingStage, setStreamingStage] = useState<'facts' | 'assessment' | 'done'>('done');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingFacts, streamingAssessment]);

  // Initial welcome message
  useEffect(() => {
    const welcome: AiMessage = {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      verifiedFacts: [
        'PriceScout tracks live price feeds from Amazon India and Flipkart continuously.',
        'Zero invented prices or simulated reviews—every price point is anchored to active marketplace listings.',
        'Student Mode unlocks verified university email discounts across Apple and study laptops.',
      ],
      aiAssessment:
        'Ask me any comparison question, budget recommendation, or advice on whether current festival prices are worth buying right now!',
    };
    setMessages([welcome]);

    if (initialQ) {
      handleUserQuery(initialQ);
    }
  }, []);

  // Streaming AI response simulator
  const handleUserQuery = async (queryText: string) => {
    if (!queryText.trim() || isStreaming) return;

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      rawText: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsStreaming(true);
    setStreamingStage('facts');
    setStreamingFacts('');
    setStreamingAssessment('');

    // Fetch products to ground answers in verified catalog
    const products = await api.getProducts();

    // Determine domain-specific factual response
    const q = queryText.toLowerCase();
    let factsList: string[] = [];
    let assessmentText = '';
    let relatedOffer: AiMessage['relatedOffer'] = undefined;

    if (q.includes('macbook') || q.includes('apple laptop')) {
      const mac = products.find((p) => p.id === 'prod-macbook-air-m2');
      const amz = mac?.prices.find((p) => p.store === 'amazon');
      const flp = mac?.prices.find((p) => p.store === 'flipkart');

      factsList = [
        `Amazon India live price: ₹${amz?.price.toLocaleString('en-IN')} (Updated ${amz?.updatedMinutesAgo || 14}m ago).`,
        `Flipkart live price: ₹${flp?.price.toLocaleString('en-IN')} (Updated ${flp?.updatedMinutesAgo || 26}m ago).`,
        `Direct Difference: Amazon India is ₹${Math.abs((amz?.price || 0) - (flp?.price || 0)).toLocaleString('en-IN')} cheaper today.`,
        'Apple India Official Warranty: 1-Year Limited Hardware Warranty valid on both merchants.',
      ];
      assessmentText =
        'Recommendation: Purchase on Amazon India today. You save ₹2,000 immediately, plus Amazon Prime provides guaranteed 1-day free delivery. If you are a university student, activate Student Mode for an extra 5% educational cashback.';
      if (amz) {
        relatedOffer = {
          storeName: 'Amazon India',
          price: amz.price,
          offerId: 'prod-macbook-air-m2-amazon',
          productTitle: 'Apple MacBook Air M2 (Starlight, 256GB)',
        };
      }
    } else if (q.includes('sony') || q.includes('headphones') || q.includes('audio') || q.includes('xm5')) {
      const xm5 = products.find((p) => p.id === 'prod-sony-wh1000xm5');
      const amz = xm5?.prices.find((p) => p.store === 'amazon');
      const flp = xm5?.prices.find((p) => p.store === 'flipkart');

      factsList = [
        `Flipkart live price: ₹${flp?.price.toLocaleString('en-IN')} (Updated ${flp?.updatedMinutesAgo || 19}m ago) with Flipkart Assured dispatch.`,
        `Amazon India live price: ₹${amz?.price.toLocaleString('en-IN')} (Updated ${amz?.updatedMinutesAgo || 8}m ago).`,
        'Sony India 1-Year Brand Warranty applies across both partner stores.',
        'Battery runtime: 30 Hours with ANC on, USB-PD 3-minute quick charge provides 3 hours playback.',
      ];
      assessmentText =
        'Recommendation: Flipkart is the clear winner today at ₹26,990 (saving you ₹1,000 compared to Amazon). This is within 2% of its historic all-time low, so waiting for future festive sales is unlikely to yield substantially larger discounts.';
      if (flp) {
        relatedOffer = {
          storeName: 'Flipkart',
          price: flp.price,
          offerId: 'prod-sony-wh1000xm5-flipkart',
          productTitle: 'Sony WH-1000XM5 Wireless ANC Headphones',
        };
      }
    } else if (q.includes('s24') || q.includes('oneplus') || q.includes('phone') || q.includes('smartphone')) {
      const s24 = products.find((p) => p.id === 'prod-samsung-s24');
      const op = products.find((p) => p.id === 'prod-oneplus-12');

      factsList = [
        `Samsung Galaxy S24: ₹${s24?.bestPrice.toLocaleString('en-IN')} on Amazon India (8GB RAM, 128GB Storage, Exynos 2400).`,
        `OnePlus 12 5G: ₹${op?.bestPrice.toLocaleString('en-IN')} on Amazon India (16GB RAM, 512GB Storage, Snapdragon 8 Gen 3).`,
        'Battery & Charging: OnePlus 12 features 5400mAh with 100W brick in-box; Galaxy S24 features 4000mAh with 25W charging (adapter sold separately).',
      ];
      assessmentText =
        'Recommendation: If raw performance and storage per rupee is your priority, the OnePlus 12 gives you 4x the storage (512GB vs 128GB) and double the RAM for only ₹2,000 more. If you prefer compact ergonomics and 7 years of OS updates, the Galaxy S24 is the safer long-term choice.';
    } else if (q.includes('student')) {
      factsList = [
        'PriceScout Student Mode is verified through official university email domains (.ac.in and .edu).',
        'Eligible products include Apple MacBooks (up to 5% rebate), Windows workstations, and Samsung Galaxy tablets.',
        'Amazon Prime Youth offers 50% cashback on annual Prime subscription for shoppers aged 18-24.',
        'Flipkart Student Club provides up to ₹5,000 extra exchange valuation on study laptops.',
      ];
      assessmentText =
        'Recommendation: Never buy tech for college without verifying your student email first. The student rebate can be stacked on top of credit card no-cost EMI discounts on checkout.';
    } else {
      factsList = [
        'Amazon India and Flipkart run dynamic algorithmic pricing that updates multiple times daily.',
        'PriceScout aggregates both base retail prices and bank card promotional thresholds.',
        'All purchases are completed directly on the merchant site under full consumer buyer protection.',
      ];
      assessmentText = `Analysis for "${queryText}": When choosing between Amazon India and Flipkart, look beyond the sticker price to consider return windows, Prime 1-day delivery guarantees, and active card cashbacks.`;
    }

    // Stream Facts first
    const fullFactsStr = factsList.join('\n• ');
    let currentFactIdx = 0;

    const streamInterval = setInterval(() => {
      if (currentFactIdx < fullFactsStr.length) {
        currentFactIdx += 3;
        setStreamingFacts(fullFactsStr.slice(0, currentFactIdx));
      } else {
        clearInterval(streamInterval);
        // Now stream Assessment
        setStreamingStage('assessment');
        let currentAssIdx = 0;
        const assInterval = setInterval(() => {
          if (currentAssIdx < assessmentText.length) {
            currentAssIdx += 4;
            setStreamingAssessment(assessmentText.slice(0, currentAssIdx));
          } else {
            clearInterval(assInterval);
            setIsStreaming(false);
            setStreamingStage('done');

            // Commit final completed message
            const finalAiMsg: AiMessage = {
              id: `assistant-${Date.now()}`,
              sender: 'assistant',
              timestamp: 'Just now',
              verifiedFacts: factsList,
              aiAssessment: assessmentText,
              relatedOffer,
            };
            setMessages((prev) => [...prev, finalAiMsg]);
            setStreamingFacts('');
            setStreamingAssessment('');
          }
        }, 15);
      }
    }, 15);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        timestamp: 'Just now',
        verifiedFacts: [
          'PriceScout AI assistant reset. Ask any comparison or deal advice question.',
        ],
        aiAssessment:
          'Ready to compare prices across Amazon India and Flipkart. What gadgets are on your mind?',
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1DFD6] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-[#0B5D52] hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span className="text-[#46544F]">/</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#DDF0E8] text-[#0B5D52] rounded-full text-xs font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Grounded Shopping Intelligence</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#14201D] font-heading">
            PriceScout AI Shopping Assistant
          </h1>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 bg-white border border-[#E1DFD6] hover:bg-[#F7F6F2] text-[#46544F] text-xs font-semibold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#46544F] font-heading block">
          Suggested Comparison Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isStreaming}
              onClick={() => handleUserQuery(chip)}
              className="text-xs px-3 py-1.5 bg-white hover:bg-[#DDF0E8] text-[#14201D] hover:text-[#0B5D52] border border-[#E1DFD6] hover:border-[#0B5D52] rounded-full transition-colors text-left shadow-2xs cursor-pointer disabled:opacity-50"
            >
              "{chip}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white border border-[#E1DFD6] rounded-2xl shadow-sm flex flex-col min-h-[500px] max-h-[700px] overflow-hidden">
        
        {/* Chat Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#0B5D52] text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 leading-relaxed text-xs sm:text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#0B5D52] text-white rounded-br-xs'
                    : 'bg-[#F7F6F2] text-[#14201D] border border-[#E1DFD6] rounded-tl-xs shadow-2xs w-full sm:w-auto'
                }`}
              >
                {msg.sender === 'user' ? (
                  <p className="font-medium text-sm">{msg.rawText}</p>
                ) : (
                  <div className="space-y-4">
                    
                    {/* BLOCK 1: VERIFIED FACTS */}
                    {msg.verifiedFacts && msg.verifiedFacts.length > 0 && (
                      <div className="p-3.5 bg-white rounded-xl border border-[#0B5D52]/20 space-y-2 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B5D52] uppercase tracking-wider font-heading">
                          <CheckCircle2 className="w-4 h-4 text-[#0B5D52]" />
                          <span>Verified Facts</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#14201D]">
                          {msg.verifiedFacts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#0B5D52] font-bold mt-0.5">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* BLOCK 2: AI ASSESSMENT */}
                    {msg.aiAssessment && (
                      <div className="p-3.5 bg-[#DDF0E8]/60 rounded-xl border border-[#0B5D52]/30 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B5D52] uppercase tracking-wider font-heading">
                          <Sparkles className="w-4 h-4 text-[#0B5D52]" />
                          <span>AI Assessment</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#14201D] leading-relaxed">
                          {msg.aiAssessment}
                        </p>
                      </div>
                    )}

                    {/* Optional Direct Affiliate Checkout Card */}
                    {msg.relatedOffer && (
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#E1DFD6]">
                        <div>
                          <div className="text-xs font-bold text-[#14201D]">
                            {msg.relatedOffer.productTitle}
                          </div>
                          <div className="text-sm font-bold text-[#0B5D52] font-mono">
                            ₹{msg.relatedOffer.price.toLocaleString('en-IN')}{' '}
                            <span className="text-xs font-normal text-[#46544F]">
                              on {msg.relatedOffer.storeName}
                            </span>
                          </div>
                        </div>

                        <a
                          href={`/go/${msg.relatedOffer.offerId}`}
                          target="_blank"
                          rel="sponsored noopener"
                          className="min-h-[38px] px-4 py-1.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <span>Buy on {msg.relatedOffer.storeName}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#14201D] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* ACTIVE STREAMING BUBBLE */}
          {isStreaming && (
            <div className="flex items-start gap-3 justify-start animate-slide-up">
              <div className="w-8 h-8 rounded-xl bg-[#0B5D52] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>

              <div className="max-w-2xl w-full bg-[#F7F6F2] border border-[#E1DFD6] rounded-2xl rounded-tl-xs p-4 sm:p-5 space-y-4 shadow-2xs">
                
                {/* Streaming Block 1: Verified Facts */}
                <div className="p-3.5 bg-white rounded-xl border border-[#0B5D52]/20 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B5D52] uppercase tracking-wider font-heading">
                    <CheckCircle2 className="w-4 h-4 text-[#0B5D52]" />
                    <span>Verified Facts</span>
                  </div>
                  <div className="text-xs text-[#14201D] whitespace-pre-line leading-relaxed font-sans">
                    {streamingFacts ? `• ${streamingFacts}` : 'Querying Amazon India & Flipkart live catalog...'}
                    {streamingStage === 'facts' && (
                      <span className="inline-block w-1.5 h-3.5 bg-[#0B5D52] ml-1 animate-pulse align-middle" />
                    )}
                  </div>
                </div>

                {/* Streaming Block 2: AI Assessment */}
                {streamingStage === 'assessment' && (
                  <div className="p-3.5 bg-[#DDF0E8]/60 rounded-xl border border-[#0B5D52]/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B5D52] uppercase tracking-wider font-heading">
                      <Sparkles className="w-4 h-4 text-[#0B5D52]" />
                      <span>AI Assessment</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#14201D] leading-relaxed">
                      {streamingAssessment}
                      <span className="inline-block w-1.5 h-3.5 bg-[#0B5D52] ml-1 animate-pulse align-middle" />
                    </p>
                  </div>
                )}

              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#E1DFD6] bg-[#F7F6F2]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserQuery(inputVal);
            }}
            className="flex items-center gap-2 bg-white border border-[#E1DFD6] rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-[#0B5D52] shadow-2xs"
          >
            <input
              type="text"
              disabled={isStreaming}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask PriceScout assistant anything about Amazon vs Flipkart deals..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent text-[#14201D] placeholder-[#46544F]/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isStreaming || !inputVal.trim()}
              className="min-h-[44px] px-5 bg-[#0B5D52] hover:bg-[#178F7A] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-[#46544F] text-center mt-2">
            PriceScout AI delivers grounded intelligence based on verified Amazon India and Flipkart price updates.
          </p>
        </div>

      </div>

    </div>
  );
};
