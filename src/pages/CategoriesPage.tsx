import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Laptop, Smartphone, Headphones, Tablet, Watch, Camera } from 'lucide-react';
import { api } from '../api';
import { CategoryItem } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Headphones,
  Tablet,
  Watch,
  Camera,
};

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    async function fetchCats() {
      const data = await api.getCategories();
      setCategories(data);
    }
    fetchCats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#14201D] font-heading">
          All Product Categories
        </h1>
        <p className="text-sm text-[#46544F]">
          Browse verified price comparisons across electronics and tech hardware in India.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Layers;
          return (
            <Link
              key={cat.id}
              to={`/search?category=${cat.slug}`}
              className="group bg-white border border-[#E1DFD6] hover:border-[#0B5D52] rounded-2xl p-6 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#14201D] font-heading group-hover:text-[#0B5D52] transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-[#46544F] mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E1DFD6]/60 flex items-center justify-between text-xs text-[#46544F]">
                <span>{cat.itemCount} Tracked Products</span>
                <span className="font-semibold text-[#0B5D52] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
