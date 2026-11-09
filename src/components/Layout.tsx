import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AssistantBubble } from './AssistantBubble';

interface RouteMetadata {
  title: string;
  description: string;
}

const getRouteMetadata = (pathname: string): RouteMetadata => {
  if (pathname === '/') {
    return {
      title: 'PriceScout | Smart Price Comparison for Amazon India & Flipkart',
      description: 'Find the best price across Amazon India and Flipkart. AI-driven shopping intelligence with verified live prices, price history charts, and student discounts.',
    };
  }
  if (pathname === '/search') {
    return {
      title: 'Search & Compare Prices | PriceScout India',
      description: 'Filter and compare prices across electronics, mobiles, audio, and laptops on Amazon India and Flipkart.',
    };
  }
  if (pathname.startsWith('/product/')) {
    return {
      title: 'Product Price Comparison & History | PriceScout India',
      description: 'Compare live offers from Amazon India and Flipkart with lowest-price highlighting, specs comparison, and AI buying advice.',
    };
  }
  if (pathname.startsWith('/go/')) {
    return {
      title: 'Redirecting to Merchant | PriceScout India',
      description: 'Directing you safely to the official seller listing on Amazon.in or Flipkart.com.',
    };
  }
  if (pathname === '/compare') {
    return {
      title: 'Side-by-Side Product Comparison | PriceScout',
      description: 'Compare up to 4 electronics side-by-side with full spec matrices, pricing delta, and best-value recommendations.',
    };
  }
  if (pathname === '/assistant') {
    return {
      title: 'AI Shopping Assistant | PriceScout India',
      description: 'Chat with PriceScout AI for objective buying advice, verified product facts, and price comparison.',
    };
  }
  if (pathname === '/saved') {
    return {
      title: 'Saved Watchlist & Price Alerts | PriceScout',
      description: 'Track price drops and stock changes on your favorite electronics across Amazon India and Flipkart.',
    };
  }
  if (pathname === '/student') {
    return {
      title: 'Student Discount Mode & Verification | PriceScout India',
      description: 'Exclusive verified education discounts and student deals on laptops, tablets, and headphones in India.',
    };
  }
  if (pathname === '/categories') {
    return {
      title: 'Browse Electronics Categories | PriceScout India',
      description: 'Explore laptops, smartphones, headphones, tablets, smartwatches, and cameras across India\'s top marketplaces.',
    };
  }
  if (pathname === '/deals') {
    return {
      title: "Today's Lowest Verified Deals | PriceScout India",
      description: 'Real-time deal radar tracking 30-day all-time lows and lightning sales on Amazon India and Flipkart.',
    };
  }
  if (pathname === '/about') {
    return {
      title: 'About Us | PriceScout India',
      description: 'Learn how PriceScout provides unbiased price comparison and deal intelligence for Indian shoppers.',
    };
  }
  if (pathname === '/disclosure') {
    return {
      title: 'Affiliate Disclosure & Earnings Disclaimer | PriceScout',
      description: 'Our commitment to full transparency, ASCI compliance, and independent price comparison rules.',
    };
  }
  if (pathname === '/privacy') {
    return {
      title: 'Privacy Policy & DPDP Compliance | PriceScout India',
      description: 'How PriceScout protects user privacy in full compliance with the Digital Personal Data Protection (DPDP) Act.',
    };
  }
  if (pathname === '/terms') {
    return {
      title: 'Terms of Service | PriceScout India',
      description: 'Terms and conditions governing the use of PriceScout price comparison services.',
    };
  }
  if (pathname === '/contact') {
    return {
      title: 'Contact Support & Price Desk | PriceScout',
      description: 'Report price discrepancies, enquire about student verification, or reach our technical team in Bengaluru.',
    };
  }
  if (pathname === '/auth') {
    return {
      title: 'Sign In or Register | PriceScout India',
      description: 'Access your saved price alerts and student verification profile on PriceScout.',
    };
  }

  // Fallback for 404 or other routes
  return {
    title: 'Page Not Found · Error 404 | PriceScout India',
    description: 'The requested page or deal listing could not be found. Search verified products on Amazon India and Flipkart.',
  };
};

export const Layout: React.FC = () => {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change unless hash is present
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  // Synchronize document title and meta description dynamically
  useEffect(() => {
    const meta = getRouteMetadata(pathname);
    document.title = meta.title;

    // Update meta name="description"
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update OpenGraph tags
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.title);
    }
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFAFF] text-[#1E1B3A]">
      {/* Skip to Main Content Link for WCAG AA Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-[#6D28D9] focus:text-white focus:rounded-full focus:border-2 focus:border-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#1E1B3A] text-xs font-extrabold"
      >
        Skip to main content
      </a>

      {/* Sticky Blurred Navbar */}
      <Navbar />

      {/* Primary Route Outlet */}
      <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Floating Assistant Bubble with pulse animation & prefers-reduced-motion compliance */}
      <AssistantBubble />

      {/* Full Footer */}
      <Footer />
    </div>
  );
};
