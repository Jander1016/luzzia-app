import type { Price } from "@/types/prices";
import type { TimeRangeStats, TimeRangeType } from "../types/timeRange";
import { TIME_RANGE_DEFINITIONS } from "./timeRangeDefinitions";

export function calculateTimeRangeStats(prices: Price[]): TimeRangeStats {
  
  const stats: Partial<TimeRangeStats> = {}

  TIME_RANGE_DEFINITIONS.forEach(definition => {
    const rangePrices = prices.filter(precio => precio.hour >= definition.startHour && precio.hour < definition.endHour);
  
    if (rangePrices.length <= 0) return

    const priceValues = rangePrices.map(p => p.price);

    stats[definition.type] = {
      avgPrice: priceValues.reduce((sum, precio) => sum + precio, 0) / priceValues.length,
      isActive: false,
      totalHours: rangePrices.length,
      priceRange: {
        min: Math.min(...priceValues),
        max: Math.max(...priceValues),
      },
    }
  });

  return stats as TimeRangeStats;
}
export function getCurrentTimeRange(): TimeRangeType | null {
  const currentHour = new Date().getHours();

  const definition = TIME_RANGE_DEFINITIONS.find(def => currentHour >= def.startHour && currentHour < def.endHour);

  return definition?.type || null; 
}