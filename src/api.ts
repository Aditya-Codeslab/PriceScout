import { Product, DealItem, CategoryItem } from './types';

/**
 * PriceScout API Client
 * All data access is centralized here.
 * Set USE_MOCK to true to use verified, curated sample comparison fixtures.
 */
export const USE_MOCK = true;

// CLEARLY LABELED SAMPLE DATA FOR AMAZON INDIA AND FLIPKART
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-macbook-air-m2',
    title: 'Apple MacBook Air M2 Chip (13.6-inch, 8GB Unified Memory, 256GB SSD) - Starlight',
    brand: 'Apple',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    specs: {
      Processor: 'Apple M2 (8-core CPU / 8-core GPU)',
      RAM: '8GB Unified Memory',
      Storage: '256GB SSD',
      Display: '13.6-inch Liquid Retina',
      Battery: 'Up to 18 hours',
    },
    bestPrice: 84990,
    lastCheckedTime: '2026-11-08T19:55:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 5,
    ram: '8GB',
    storage: '256GB',
    rating: 4.7,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 84990,
        originalPrice: 99900,
        discountPercentage: 15,
        affiliateUrl: 'https://www.amazon.in/dp/B0B3C4VS55?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 14,
        rating: 4.6,
        ratingCount: 2841,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 86990,
        originalPrice: 99900,
        discountPercentage: 13,
        affiliateUrl: 'https://www.flipkart.com/apple-2022-macbook-air-m2-8-gb-256-gb-ssd-mac-os-monterey-mly13hn-a/p/itm53bc5c87a5554?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 26,
        rating: 4.7,
        ratingCount: 3120,
      },
    ],
  },
  {
    id: 'prod-asus-rog-g14',
    title: 'ASUS ROG Zephyrus G14 (14" QHD+ 165Hz, Ryzen 9, 16GB RAM, 1TB SSD, RTX 4060)',
    brand: 'ASUS',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    specs: {
      Processor: 'AMD Ryzen 9 7940HS',
      RAM: '16GB DDR5',
      Storage: '1TB NVMe SSD',
      GPU: 'NVIDIA GeForce RTX 4060 8GB',
      Display: '14-inch ROG Nebula 165Hz',
    },
    bestPrice: 139990,
    lastCheckedTime: '2026-11-08T19:40:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 4,
    ram: '16GB',
    storage: '1TB',
    rating: 4.5,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 144990,
        originalPrice: 169990,
        discountPercentage: 15,
        affiliateUrl: 'https://www.amazon.in/dp/B0C8NX2834?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 18,
        rating: 4.4,
        ratingCount: 820,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 139990,
        originalPrice: 169990,
        discountPercentage: 18,
        affiliateUrl: 'https://www.flipkart.com/asus-rog-zephyrus-g14-ryzen-9/p/itm54321?affid=pricescout',
        inStock: true,
        deliveryDays: 3,
        updatedMinutesAgo: 11,
        rating: 4.5,
        ratingCount: 650,
      },
    ],
  },
  {
    id: 'prod-samsung-s24',
    title: 'Samsung Galaxy S24 5G (Onyx Black, 8GB RAM, 128GB Storage)',
    brand: 'Samsung',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    specs: {
      Display: '6.2-inch Dynamic AMOLED 2X, 120Hz',
      Processor: 'Exynos 2400 Deca-Core',
      Camera: '50MP + 12MP + 10MP Triple Camera',
      RAM: '8GB LPDDR5X',
      Storage: '128GB UFS 4.0',
    },
    bestPrice: 62999,
    lastCheckedTime: '2026-11-08T19:42:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 3,
    ram: '8GB',
    storage: '128GB',
    rating: 4.4,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 62999,
        originalPrice: 79999,
        discountPercentage: 21,
        affiliateUrl: 'https://www.amazon.in/dp/B0CS5XW1D9?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 5,
        rating: 4.4,
        ratingCount: 1530,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 64999,
        originalPrice: 79999,
        discountPercentage: 18,
        affiliateUrl: 'https://www.flipkart.com/samsung-galaxy-s24-5g-onyx-black-128-gb/p/itm12345?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 32,
        rating: 4.3,
        ratingCount: 940,
      },
    ],
  },
  {
    id: 'prod-oneplus-12',
    title: 'OnePlus 12 5G (Silky Black, 16GB RAM, 512GB Storage, Snapdragon 8 Gen 3)',
    brand: 'OnePlus',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    specs: {
      Display: '6.82" 2K 120Hz ProXDR LTPO AMOLED',
      Processor: 'Snapdragon 8 Gen 3',
      RAM: '16GB LPDDR5X',
      Storage: '512GB UFS 4.0',
      Battery: '5400 mAh + 100W SUPERVOOC',
    },
    bestPrice: 64999,
    lastCheckedTime: '2026-11-08T19:48:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 3,
    ram: '16GB',
    storage: '512GB',
    rating: 4.6,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 64999,
        originalPrice: 69999,
        discountPercentage: 7,
        affiliateUrl: 'https://www.amazon.in/dp/B0CQPP9Z3G?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 9,
        rating: 4.6,
        ratingCount: 2210,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 65999,
        originalPrice: 69999,
        discountPercentage: 6,
        affiliateUrl: 'https://www.flipkart.com/oneplus-12-5g-512-gb/p/itm9876?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 21,
        rating: 4.5,
        ratingCount: 1100,
      },
    ],
  },
  {
    id: 'prod-apple-iphone-15',
    title: 'Apple iPhone 15 (128 GB) - Blue with Dynamic Island & 48MP Main Camera',
    brand: 'Apple',
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80',
    specs: {
      Display: '6.1-inch Super Retina XDR OLED',
      Processor: 'A16 Bionic chip',
      Camera: '48MP Main + 12MP Ultra Wide',
      Storage: '128GB',
      Connector: 'USB-C',
    },
    bestPrice: 69999,
    lastCheckedTime: '2026-11-08T19:51:00Z',
    studentDiscountEligible: false,
    ram: '6GB',
    storage: '128GB',
    rating: 4.7,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 70999,
        originalPrice: 79900,
        discountPercentage: 11,
        affiliateUrl: 'https://www.amazon.in/dp/B0CHX1W1XY?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 7,
        rating: 4.7,
        ratingCount: 5410,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 69999,
        originalPrice: 79900,
        discountPercentage: 12,
        affiliateUrl: 'https://www.flipkart.com/apple-iphone-15-blue-128-gb/p/itmbfb64dff4b9c9?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 15,
        rating: 4.7,
        ratingCount: 8900,
      },
    ],
  },
  {
    id: 'prod-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones - Black',
    brand: 'Sony',
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    specs: {
      Type: 'Over-Ear Wireless',
      BatteryLife: '30 hours with ANC',
      NoiseCancellation: 'Dual Processor V1 & QN1',
      Microphones: '8 microphones with beamforming',
      Charging: 'USB-PD fast charge',
    },
    bestPrice: 26990,
    lastCheckedTime: '2026-11-08T19:50:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 4,
    rating: 4.6,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 27990,
        originalPrice: 34990,
        discountPercentage: 20,
        affiliateUrl: 'https://www.amazon.in/dp/B09XS7JWHH?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 8,
        rating: 4.5,
        ratingCount: 4210,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 26990,
        originalPrice: 34990,
        discountPercentage: 23,
        affiliateUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmdb2159faecbd5?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 19,
        rating: 4.6,
        ratingCount: 1890,
      },
    ],
  },
  {
    id: 'prod-kindle-paperwhite',
    title: 'Kindle Paperwhite (16 GB) – 6.8-inch display, adjustable warm light',
    brand: 'Amazon',
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    specs: {
      Screen: '6.8" Paperwhite glare-free 300 ppi',
      Storage: '16 GB',
      Battery: 'Up to 10 weeks',
      Waterproofing: 'IPX8 rated',
    },
    bestPrice: 14999,
    lastCheckedTime: '2026-11-08T19:30:00Z',
    studentDiscountEligible: false,
    storage: '16GB',
    rating: 4.7,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 14999,
        originalPrice: 16999,
        discountPercentage: 12,
        affiliateUrl: 'https://www.amazon.in/dp/B08N3TCP2F?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 10,
        rating: 4.7,
        ratingCount: 6540,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 15499,
        originalPrice: 16999,
        discountPercentage: 9,
        affiliateUrl: 'https://www.flipkart.com/amazon-kindle-paperwhite-16-gb/p/itm4321?affid=pricescout',
        inStock: false,
        deliveryDays: 4,
        updatedMinutesAgo: 45,
        rating: 4.5,
        ratingCount: 820,
      },
    ],
  },
  {
    id: 'prod-apple-watch-s9',
    title: 'Apple Watch Series 9 GPS 45mm (Midnight Aluminium with Sport Band)',
    brand: 'Apple',
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    specs: {
      Display: 'Always-On Retina display up to 2000 nits',
      Chip: 'S9 SiP with 64-bit dual-core',
      Sensor: 'ECG, Blood Oxygen & Temperature',
      WaterResistance: '50m water resistant',
    },
    bestPrice: 41999,
    lastCheckedTime: '2026-11-08T19:25:00Z',
    studentDiscountEligible: true,
    studentExtraOffPercent: 3,
    storage: '64GB',
    rating: 4.8,
    inStock: true,
    prices: [
      {
        store: 'amazon',
        storeName: 'Amazon India',
        price: 41999,
        originalPrice: 44900,
        discountPercentage: 6,
        affiliateUrl: 'https://www.amazon.in/dp/B0CHX1W99S?tag=pricescout-in-21',
        inStock: true,
        deliveryDays: 1,
        updatedMinutesAgo: 12,
        rating: 4.8,
        ratingCount: 1420,
      },
      {
        store: 'flipkart',
        storeName: 'Flipkart',
        price: 42999,
        originalPrice: 44900,
        discountPercentage: 4,
        affiliateUrl: 'https://www.flipkart.com/apple-watch-series-9-gps-45-mm/p/itm9988?affid=pricescout',
        inStock: true,
        deliveryDays: 2,
        updatedMinutesAgo: 38,
        rating: 4.7,
        ratingCount: 910,
      },
    ],
  },
];

const SAMPLE_CATEGORIES: CategoryItem[] = [
  { id: 'cat-mobiles', name: 'Smartphones', slug: 'mobiles', itemCount: 310, iconName: 'Smartphone', description: 'Compare flagship & budget Android/iPhones across Amazon & Flipkart' },
  { id: 'cat-laptops', name: 'Laptops', slug: 'laptops', itemCount: 142, iconName: 'Laptop', description: 'MacBooks, thin & lights, gaming rigs and student workstations' },
  { id: 'cat-audio', name: 'Audio', slug: 'audio', itemCount: 184, iconName: 'Headphones', description: 'Wireless earbuds, noise-cancelling headphones & soundbars' },
  { id: 'cat-appliances', name: 'Appliances', slug: 'appliances', itemCount: 95, iconName: 'Tv', description: 'Smart TVs, air conditioners, microwaves & kitchen essentials' },
  { id: 'cat-fashion', name: 'Fashion', slug: 'fashion', itemCount: 420, iconName: 'Shirt', description: 'Curated footwear, watches & apparel deals across marketplaces' },
  { id: 'cat-accessories', name: 'Accessories', slug: 'accessories', itemCount: 215, iconName: 'Watch', description: 'Smartwatches, fast chargers, cables & protective tech gear' },
];

const SAMPLE_DEALS: DealItem[] = [
  {
    id: 'deal-1',
    productId: 'prod-macbook-air-m2',
    title: 'Apple MacBook Air M2 (Starlight, 256GB)',
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    store: 'amazon',
    dealPrice: 84990,
    regularPrice: 99900,
    savingsPercentage: 15,
    affiliateUrl: 'https://www.amazon.in/dp/B0B3C4VS55?tag=pricescout-in-21',
    updatedMinutesAgo: 14,
    badge: 'Lowest in 30 Days',
  },
  {
    id: 'deal-2',
    productId: 'prod-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Active Noise Cancelling Headphones',
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    store: 'flipkart',
    dealPrice: 26990,
    regularPrice: 34990,
    savingsPercentage: 23,
    affiliateUrl: 'https://www.flipkart.com/sony-wh-1000xm5-bluetooth-headset/p/itmdb2159faecbd5?affid=pricescout',
    updatedMinutesAgo: 19,
    badge: 'Flipkart Lowest',
  },
  {
    id: 'deal-3',
    productId: 'prod-samsung-s24',
    title: 'Samsung Galaxy S24 5G (8GB / 128GB)',
    category: 'Mobiles',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    store: 'amazon',
    dealPrice: 62999,
    regularPrice: 79999,
    savingsPercentage: 21,
    affiliateUrl: 'https://www.amazon.in/dp/B0CS5XW1D9?tag=pricescout-in-21',
    updatedMinutesAgo: 5,
    badge: 'Amazon Lightning',
  },
];

// Helper to simulate network latency if needed
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getProducts(): Promise<Product[]> {
    if (USE_MOCK) {
      await delay(80);
      return [...SAMPLE_PRODUCTS];
    }
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProductById(id: string): Promise<Product | null> {
    if (USE_MOCK) {
      await delay(60);
      const item = SAMPLE_PRODUCTS.find((p) => p.id === id);
      return item ? { ...item } : null;
    }
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    if (USE_MOCK) {
      await delay(100);
      const q = query.toLowerCase().trim();
      return SAMPLE_PRODUCTS.filter((p) => {
        const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
        const matchesCat = !category || category === 'all' || p.category.toLowerCase() === category.toLowerCase();
        return matchesQuery && matchesCat;
      });
    }
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    const res = await fetch(`/api/search?${params.toString()}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  async getCategories(): Promise<CategoryItem[]> {
    if (USE_MOCK) {
      await delay(50);
      return [...SAMPLE_CATEGORIES];
    }
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Categories fetch failed');
    return res.json();
  },

  async getDeals(): Promise<DealItem[]> {
    if (USE_MOCK) {
      await delay(60);
      return [...SAMPLE_DEALS];
    }
    const res = await fetch('/api/deals');
    if (!res.ok) throw new Error('Deals fetch failed');
    return res.json();
  },

  async getStudentOffers(): Promise<Product[]> {
    if (USE_MOCK) {
      await delay(70);
      return SAMPLE_PRODUCTS.filter((p) => p.studentDiscountEligible);
    }
    const res = await fetch('/api/student-offers');
    if (!res.ok) throw new Error('Failed to fetch student offers');
    return res.json();
  },

  async getOfferById(offerId: string): Promise<{ product: Product; storePrice: any } | null> {
    if (USE_MOCK) {
      await delay(40);
      for (const prod of SAMPLE_PRODUCTS) {
        for (const price of prod.prices) {
          const generatedOfferId = price.offerId || `${prod.id}-${price.store}`;
          if (generatedOfferId === offerId || `${price.store}-${prod.id}` === offerId) {
            return { product: prod, storePrice: { ...price, offerId: generatedOfferId } };
          }
        }
      }
      return null;
    }
    const res = await fetch(`/api/offers/${offerId}`);
    if (!res.ok) return null;
    return res.json();
  },
};

