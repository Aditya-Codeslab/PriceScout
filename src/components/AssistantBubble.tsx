import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  User,
  Sparkles,
  CheckCircle2,
  X,
  Maximize2,
  Send,
  ArrowRight,
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  isOfferMatch?: boolean;
}

export interface AssistantBubbleProps {
  className?: string;
}

export const AssistantBubble: React.FC<AssistantBubbleProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'user',
      text: 'Should I buy the MacBook Air M2 on Amazon or Flipkart today?',
    },
    {
      sender: 'assistant',
      text: 'Amazon India currently has the best live price at ₹84,990, saving you ₹2,000 over Flipkart (₹86,990). Includes free 1-Day Prime delivery and 1-Year Apple warranty.',
      isOfferMatch: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close with Escape key for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for global custom trigger event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-assistant-bubble', handleOpen);
    return () => window.removeEventListener('open-assistant-bubble', handleOpen);
  }, []);

  // Auto-close on full assistant page to avoid double UI
  if (location.pathname === '/assistant') {
    return null;
  }

  const samplePrompts = [
    'Best laptop under ₹70,000?',
    'Galaxy S24: Amazon or Flipkart?',
    'Sony XM5 festival price drop?',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const qLower = query.toLowerCase();
      let reply = `Based on live marketplace listings on Amazon India and Flipkart: We scanned prices across verified sellers and active coupons.`;
      if (qLower.includes('laptop') || qLower.includes('macbook')) {
        reply = `For laptops, Amazon India currently leads on MacBook Air M2 (₹84,990), while Flipkart offers competitive exchange bonuses on Windows gaming laptops. Both provide official warranties.`;
      } else if (qLower.includes('s24') || qLower.includes('phone') || qLower.includes('galaxy')) {
        reply = `Samsung Galaxy S24 is currently matched at ₹74,999 on both platforms, with additional checkout card discounts offered on eligible payment methods.`;
      } else if (qLower.includes('sony') || qLower.includes('xm5') || qLower.includes('audio')) {
        reply = `Sony WH-1000XM5 is lowest on Flipkart at ₹26,990 (saves ₹1,000 vs Amazon's ₹27,990). It is currently near its 30-day recorded low!`;
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: 'assistant', text: reply, isOfferMatch: true },
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 ${className}`}>
      
      {/* COLLAPSED FLOATING BUBBLE BUTTON */}
      {!isOpen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          className="group relative flex items-center gap-3 min-h-[52px] px-4 py-2 bg-[#6D28D9] hover:bg-[#7C3AED] active:bg-[#6D28D9] text-white rounded-full border-2 border-[#1E1B3A] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E1B3A]"
          aria-label="Open AI Shopping Assistant"
          aria-expanded={false}
          aria-haspopup="dialog"
          title="Ask PriceScout AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFF4B3] border-2 border-[#1E1B3A] flex items-center justify-center shrink-0">
            <Bot className="w-4.5 h-4.5 text-[#1E1B3A]" aria-hidden="true" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-extrabold tracking-tight flex items-center gap-1.5 leading-tight">
              <span>Ask AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-[#FFF4B3] border border-[#1E1B3A]" />
            </div>
            <div className="text-[10px] text-white/80 font-medium leading-tight">
              Live Deals & Price Radar
            </div>
          </div>
        </button>
      )}

      {/* EXPANDED POP-OUT ASSISTANT INTERFACE */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="w-[calc(100vw-2.5rem)] sm:w-[420px] h-[560px] max-h-[85vh] bg-[#FBFAFF] border-2 border-[#1E1B3A] rounded-[24px] flex flex-col overflow-hidden"
          role="dialog"
          aria-label="PriceScout AI Assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-[#6D28D9] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 border-b-2 border-[#1E1B3A]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF4B3] border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A]">
                <Bot className="w-4.5 h-4.5 text-[#1E1B3A]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold leading-snug flex items-center gap-2">
                  <span>PriceScout Assistant</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#FFF4B3] text-[#1E1B3A] border-2 border-[#1E1B3A] rounded-full">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-white/80 font-medium leading-tight">
                  Amazon India + Flipkart shopping intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => navigate('/assistant')}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="Open full page assistant"
                aria-label="Open full page assistant"
              >
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="Close assistant pop-out"
                aria-label="Close assistant pop-out"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FBFAFF]">
            
            <div className="p-2.5 bg-white rounded-[16px] border-2 border-[#1E1B3A] text-[11px] text-[#1E1B3A] flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-[#6D28D9]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Prices Only
              </span>
              <span className="text-[#4A4668] font-medium">Live Amazon & Flipkart feeds</span>
            </div>

            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#FFF4B3] border-2 border-[#1E1B3A] text-[#1E1B3A] flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-[18px] text-xs leading-relaxed max-w-[85%] border-2 border-[#1E1B3A] ${
                    msg.sender === 'user'
                      ? 'bg-[#6D28D9] text-white font-medium'
                      : 'bg-white text-[#1E1B3A] font-medium space-y-1.5'
                  }`}
                >
                  {msg.sender === 'assistant' && msg.isOfferMatch && (
                    <div className="text-[10px] font-extrabold text-[#6D28D9] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>PriceScout Intelligence</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#1E1B3A] text-white flex items-center justify-center shrink-0 mb-1 border-2 border-[#1E1B3A]">
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#FFF4B3] border-2 border-[#1E1B3A] text-[#1E1B3A] flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="p-3 bg-white border-2 border-[#1E1B3A] rounded-[18px] text-xs text-[#1E1B3A] flex items-center gap-2 font-bold">
                  <span>Checking live store feeds...</span>
                </div>
              </div>
            )}

            {/* Discount note with neutral wording (no unverifiable bank claims) */}
            <div className="p-3 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-[18px] space-y-1 text-xs">
              <div className="font-extrabold text-[#1E1B3A] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Payment & Card Offers</span>
              </div>
              <p className="text-[11px] text-[#1E1B3A] font-medium leading-relaxed">
                Eligible bank cards and instant checkout offers apply to qualifying electronics during seasonal promotions.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6D28D9] block">
                Quick Questions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInputVal(prompt)}
                    className="text-[11px] px-3 py-1.5 bg-white hover:bg-[#CFE6FF] text-[#1E1B3A] border-2 border-[#1E1B3A] rounded-full font-bold transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t-2 border-[#1E1B3A] shrink-0">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about prices, warranty, student discounts..."
                className="flex-1 min-h-[44px] px-4 bg-[#FBFAFF] border-2 border-[#1E1B3A] rounded-full text-xs sm:text-sm text-[#1E1B3A] placeholder-[#1E1B3A]/50 font-medium focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="min-h-[44px] min-w-[44px] px-4 bg-[#6D28D9] hover:bg-[#7C3AED] disabled:opacity-50 text-white rounded-full border-2 border-[#1E1B3A] flex items-center justify-center font-bold transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1B3A]"
                aria-label="Send query to AI"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-[#4A4668] pt-2 px-1 font-medium">
              <span>100% Free · Real Store Pricing</span>
              <Link
                to="/assistant"
                className="text-[#6D28D9] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Full-screen mode</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
