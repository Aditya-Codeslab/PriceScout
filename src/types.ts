export type Marketplace = 'amazon' | 'flipkart';

export interface StorePrice {
  store: Marketplace;
  storeName: string;
  offerId?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  affiliateUrl: string;
  inStock: boolean;
  deliveryDays?: number;
  updatedMinutesAgo: number;
  rating: number;
  ratingCount: number;
  bankOffer?: string;
}

export interface PricePoint {
  date: string;
  amazon: number;
  flipkart: number;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  imageUrl: string;
  galleryImages?: string[];
  specs: Record<string, string>;
  bestPrice: number;
  prices: StorePrice[];
  studentDiscountEligible?: boolean;
  studentExtraOffPercent?: number;
  lastCheckedTime: string;
  ram?: string;
  storage?: string;
  rating?: number;
  inStock?: boolean;
  history?: PricePoint[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  iconName: string;
  description: string;
}

export interface DealItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  imageUrl: string;
  store: Marketplace;
  dealPrice: number;
  regularPrice: number;
  savingsPercentage: number;
  affiliateUrl: string;
  updatedMinutesAgo: number;
  badge?: string;
}
