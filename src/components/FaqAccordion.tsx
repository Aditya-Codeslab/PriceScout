import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  bg: string;
}

// Rotating pastel palette: lavender, peach, sky blue, butter yellow
const FAQS: FaqItem[] = [
  {
    question: 'How does PriceScout make money if you never sell products?',
    answer:
      'PriceScout operates strictly as an independent affiliate and price-comparison engine. When you click our links and complete a purchase on Amazon India or Flipkart, the retailer pays us a standard referral fee. This never increases your price, and allows us to keep PriceScout 100% free and unbiased.',
    bg: 'bg-[#E4DAFB]',
  },
  {
    question: 'Are the prices shown guaranteed at checkout?',
    answer:
      'We refresh store prices regularly and display an explicit "Updated X min ago" timestamp on every single listing. However, flash sales and merchant stock levels fluctuate rapidly on Amazon and Flipkart. The final price shown on the merchant’s official checkout screen always governs your purchase.',
    bg: 'bg-[#FFD9CC]',
  },
  {
    question: 'How does Student Discount Mode work?',
    answer:
      'Students in India can activate Student Mode using any accredited university email (.ac.in or .edu). We surface educational rebate vouchers, Prime Student perks, and student store exchange bonuses so you get maximum campus savings on study tech.',
    bg: 'bg-[#CFE6FF]',
  },
  {
    question: 'Do I ever enter credit card or payment details on PriceScout?',
    answer:
      'Never. PriceScout does not collect or process payments, and we never ask for your card details. When you find the best deal, you are redirected directly to Amazon.in or Flipkart.com where you checkout securely using your existing merchant account.',
    bg: 'bg-[#FFF4B3]',
  },
  {
    question: 'Which marketplaces does PriceScout compare?',
    answer:
      'We currently track and compare prices across India’s two primary e-commerce giants: Amazon India and Flipkart. This includes Prime delivery benefits, Plus perks, and verified Indian manufacturer warranties.',
    bg: 'bg-[#E4DAFB]',
  },
];

export const FaqAccordion: React.FC = () => {
  // Support individual open/close state for full click and keyboard control
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(idx);
    }
  };

  return (
    <section className="space-y-6">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Common Questions Answered
          </h2>
        </div>
        <p className="text-xs font-[700] text-[#4A4668] uppercase tracking-wider">
          Click or press Enter to expand
        </p>
      </div>

      {/* Full-width pill-shaped rows, rotating pastel fills, '+' on the right */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`${faq.bg} border-2 border-[#1E1B3A] ${
                isOpen ? 'rounded-[24px]' : 'rounded-full'
              } p-4 sm:p-5 transition-none`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-full min-h-[44px] px-2 select-none"
              >
                <span className="font-[800] text-base sm:text-lg text-[#1E1B3A] tracking-tight pr-4">
                  {faq.question}
                </span>

                {/* '+' glyph on the right in rounded circle with 2px ink outline */}
                <span
                  className="w-10 h-10 rounded-full bg-white border-2 border-[#1E1B3A] flex items-center justify-center shrink-0 text-[#1E1B3A]"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <Minus className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  )}
                </span>
              </button>

              {/* Expand in place */}
              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  className="pt-3.5 mt-3 border-t-2 border-[#1E1B3A]/20 px-2 text-sm sm:text-base font-medium text-[#4A4668] leading-relaxed"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
