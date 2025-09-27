export interface Price {
  date: string;
  hour: number;
  price: number;
  isFallback: boolean;
  timestamp: string;
}

export interface PriceStats {
  _id: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface ContactFormData {
  email: string;
  name: string;
  source?: string;
}