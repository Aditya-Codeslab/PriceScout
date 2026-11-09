import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { CategoryTiles } from '../components/CategoryTiles';
import { FeaturedPriceComparison } from '../components/FeaturedPriceComparison';
import { BestPicksForBudget } from '../components/BestPicksForBudget';
import { HowItWorks } from '../components/HowItWorks';
import { PriceHistoryCard } from '../components/PriceHistoryCard';
import { AssistantChatPreview } from '../components/AssistantChatPreview';
import { StudentDiscountCard } from '../components/StudentDiscountCard';
import { WhyShoppersUseUs } from '../components/WhyShoppersUseUs';
import { FaqAccordion } from '../components/FaqAccordion';
import { DealAlertBanner } from '../components/DealAlertBanner';
import { FadeUpSection } from '../components/FadeUpSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-20">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* Main Content Sections with Fade Up on Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18 lg:space-y-24">
        
        {/* 2. Category Tiles (Smartphones, Laptops, Audio, Appliances, Fashion, Accessories) */}
        <FadeUpSection delayMs={0}>
          <CategoryTiles />
        </FadeUpSection>

        {/* 3. Featured Price-Comparison Card */}
        <FadeUpSection delayMs={50}>
          <FeaturedPriceComparison />
        </FadeUpSection>

        {/* 4. Best Picks for Your Budget (3 cards with shimmer skeleton, specs, price & compare link) */}
        <FadeUpSection delayMs={50}>
          <BestPicksForBudget />
        </FadeUpSection>

        {/* 5. How It Works (3 numbered steps) */}
        <FadeUpSection delayMs={50}>
          <HowItWorks />
        </FadeUpSection>

        {/* 6. Price History Card (Self-drawing SVG line chart with pulsing end marker) */}
        <FadeUpSection delayMs={50}>
          <PriceHistoryCard />
        </FadeUpSection>

        {/* 7. AI Assistant Chat Preview */}
        <FadeUpSection delayMs={50}>
          <AssistantChatPreview />
        </FadeUpSection>

        {/* 8. Student Discount Mode Card */}
        <FadeUpSection delayMs={50}>
          <StudentDiscountCard />
        </FadeUpSection>

        {/* 9. Why Shoppers Use Us */}
        <FadeUpSection delayMs={50}>
          <WhyShoppersUseUs />
        </FadeUpSection>

        {/* 10. FAQ Accordion (Native details/summary) */}
        <FadeUpSection delayMs={50}>
          <FaqAccordion />
        </FadeUpSection>

        {/* 11. Dark-green Deal Alert Banner with email input and "Notify me" */}
        <FadeUpSection delayMs={50}>
          <DealAlertBanner />
        </FadeUpSection>

      </div>
    </div>
  );
};
