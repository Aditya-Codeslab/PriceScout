import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Tv, Shirt, Watch, ArrowRight } from 'lucide-react';

interface CategoryTileData {
  title: string;
  slug: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  bg: string;
}

// Pastel rotation: lavender #E4DAFB, peach #FFD9CC, sky blue #CFE6FF, butter yellow #FFF4B3, then repeat
const CATEGORIES: CategoryTileData[] = [
  {
    title: 'Smartphones',
    slug: 'mobiles',
    tagline: 'Amazon & Flipkart',
    desc: 'Flagship & budget 5G phones compared',
    icon: Smartphone,
    bg: 'bg-[#E4DAFB]',
  },
  {
    title: 'Laptops',
    slug: 'laptops',
    tagline: 'MacBooks & PCs',
    desc: 'Gaming rigs, MacBooks & study machines',
    icon: Laptop,
    bg: 'bg-[#FFD9CC]',
  },
  {
    title: 'Audio',
    slug: 'audio',
    tagline: 'Headphones & ANC',
    desc: 'True wireless earbuds, cans & soundbars',
    icon: Headphones,
    bg: 'bg-[#CFE6FF]',
  },
  {
    title: 'Appliances',
    slug: 'appliances',
    tagline: 'Home & Kitchen',
    desc: 'Smart 4K TVs, inverter ACs & air fryers',
    icon: Tv,
    bg: 'bg-[#FFF4B3]',
  },
  {
    title: 'Fashion',
    slug: 'fashion',
    tagline: 'Footwear & Apparel',
    desc: 'Branded sneakers & everyday apparel deals',
    icon: Shirt,
    bg: 'bg-[#E4DAFB]',
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    tagline: 'Wearables & Power',
    desc: 'Smartwatches, GaN chargers & power banks',
    icon: Watch,
    bg: 'bg-[#FFD9CC]',
  },
];

export const CategoryTiles: React.FC = () => {
  return (
    <section className="space-y-6">
      
      {/* Eyebrow & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-[800] uppercase tracking-[0.15em] text-[#6D28D9] block mb-1.5">
            EXPLORE BY CATEGORY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[800] tracking-[-0.03em] text-[#1E1B3A] text-left">
            Popular Shopping Departments
          </h2>
        </div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-sm font-[800] text-[#6D28D9] hover:underline"
        >
          <span>All Departments</span>
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* Cards Grid: 24px radius, 2px ink outline, rotating pastel fills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              to={`/search?category=${cat.slug}`}
              className={`group ${cat.bg} border-2 border-[#1E1B3A] rounded-[24px] p-6 sm:p-7 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]`}
            >
              <div className="space-y-4">
                {/* Small rounded-square icon tile (pastel yellow fill, ink outline) */}
                <div className="w-12 h-12 rounded-xl bg-[#FFF4B3] border-2 border-[#1E1B3A] flex items-center justify-center text-[#1E1B3A]">
                  <Icon className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-xl font-[800] tracking-tight text-[#1E1B3A]">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-[700] text-[#4A4668] uppercase tracking-wider mt-0.5">
                    {cat.tagline}
                  </p>
                  <p className="text-sm text-[#4A4668] mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              {/* Bottom pill-style link button */}
              <div className="pt-6 mt-4 border-t-2 border-[#1E1B3A]/20 flex items-center justify-between text-xs font-[800] text-[#1E1B3A]">
                <span className="uppercase tracking-wider">Compare Stores</span>
                <span className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1B3A] flex items-center justify-center text-sm">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
