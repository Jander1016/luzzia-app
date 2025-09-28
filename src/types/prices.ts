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

export type TimeRange = 'today' | '7d' | '30d';
export type PriceTrend = 'up' | 'down' | 'stable';
export type PriceLevel = 'low' | 'medium' | 'high';

export interface PriceLevelInfo {
  label: string;
  level: PriceLevel;
  color: string;
  bgColor: string;
}

export interface FormattedPrice {
  hour: number;
  price: number;
  range: string;
  isFallback: boolean;
}

export interface PriceSummary {
  min: number;
  max: number;
  avg: number;
  bestHours: number[];
  worstHours: number[];
  totalHours: number;
}
