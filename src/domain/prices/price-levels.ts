import type { PriceLevelInfo } from "@/types/prices";

 const LEVELS: Record<string, PriceLevelInfo> = {
  low: { label: 'Muy económico', level: 'low', color: 'text-green-600', bgColor: 'bg-green-50' },
  medium: { label: 'Precio moderado', level: 'medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  high: { label: 'Precio elevado', level: 'high', color: 'text-red-600', bgColor: 'bg-red-50' }
};

export function getPriceLevelInfo(price: number): PriceLevelInfo{
  if(price < 0.08) return LEVELS.low
  if(price < 0.12) return LEVELS.medium
  return LEVELS.high
}

