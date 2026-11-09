import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Check,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AssistantChatPreview: React.FC = () => {
  const [quickQuery, setQuickQuery] = useState('');
  const navigate = useNavigate();

  const handleOpenAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-assistant-bubble'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/assistant?q=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      handleOpenAssistant();
    }
  };

  const samplePrompts = [
    'Best laptop under ₹70,000?',
    'Galaxy S24: Amazon vs Flipkart?',
    'Sony XM5 festival price drop?',
  ];

  return (
    <section className="space-y-6">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            AI SHOPPING INTELLIGENCE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Ask PriceScout Assistant
          </h2>
        </div>
        <Link
          to="/assistant"
          className="inline-flex items-center gap-1.5 text-sm font-[800] text-[#6D28D9] hover:underline"
        >
          <span>Open Full Page Assistant</span>
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* Target card container: Pastel fill (Lavender #E4DAFB), 24px radius, 2px ink outline */}
      <div className="bg-[#E4DAFB] border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-8 lg:p-10 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            {/* Butter yellow pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] text-[#1E1B3A]">
              <Bot className="w-4 h-4 text-[#1E1B3A]" aria-hidden="true" />
              <span>Available in Corner & Full Screen</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-[800] text-[#1E1B3A] tracking-tight leading-snug">
              Compare Amazon vs Flipkart deals hands-free with AI.
            </h3>
            
            <p className="text-base text-[#4A4668] font-medium leading-relaxed">
              Ask about live pricing differences, student discounts, warranty terms, and active coupon codes. Grounded strictly in real marketplace data.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-[700] text-[#1E1B3A] pt-1">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#6D28D9] stroke-[3]" />
                Zero invented prices
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-[#4A4668]">
                <Clock className="w-4 h-4 text-[#6D28D9]" />
                Real-time store timestamps
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-[#4A4668]">
                <ShieldCheck className="w-4 h-4 text-[#6D28D9]" />
                Direct affiliate checkout
              </span>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setQuickQuery(prompt);
                    handleOpenAssistant();
                  }}
                  className="min-h-[44px] px-3.5 py-1.5 bg-white text-[#1E1B3A] hover:bg-[#FFF4B3] border-2 border-[#1E1B3A] rounded-full text-xs font-[800] cursor-pointer"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Search Input & Action Pill */}
          <div className="w-full lg:w-auto lg:min-w-[340px] space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Ask a comparison question..."
                  className="w-full min-h-[50px] px-4 pr-12 bg-white border-2 border-[#1E1B3A] rounded-full text-sm font-medium text-[#1E1B3A] placeholder-[#4A4668] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 min-h-[38px] w-10 h-10 rounded-full bg-[#6D28D9] text-white flex items-center justify-center border-2 border-[#1E1B3A] cursor-pointer"
                  aria-label="Submit question to assistant"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleOpenAssistant}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenAssistant();
                  }
                }}
                className="w-full min-h-[48px] px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-[800] text-sm rounded-full border-2 border-[#1E1B3A] flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                aria-label="Click to expand corner AI assistant"
              >
                <Bot className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                <span>Pop Out AI Assistant</span>
                <span className="text-base">→</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
