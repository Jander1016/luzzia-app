import { useMemo } from 'react';
import { useTodayPrices } from '@/hooks/use-prices';
import type { TimeRangeData,  TimeRangeType } from '../components/time-ranges/types/timeRange';
import  { TIME_RANGE_DEFINITIONS } from '../components/time-ranges/utils/timeRangeDefinitions';
import { calculateTimeRangeStats } from '../components/time-ranges/utils/timeRangeCalculations';

export function useTimeRanges(): {
  data: TimeRangeData[];
  isLoading: boolean;
  error: Error | null;
  currentRange: TimeRangeType | null;
} {
  const { data: prices, isLoading, error } = useTodayPrices();
  
  const timeRangeData = useMemo((): TimeRangeData[] => {
    if (!prices?.length) return [];
    
    const stats = calculateTimeRangeStats(prices);
    const currentHour = new Date().getHours();
    
    return TIME_RANGE_DEFINITIONS.map(definition => {
      const rangeStats = stats[definition.type];
      const isActive = currentHour >= definition.startHour && currentHour < definition.endHour;
      const currentPrice = isActive 
        ? prices.find(p => p.hour === currentHour)?.price
        : undefined;
        
      return {
        definition,
        currentPrice,
        avgPrice: rangeStats.avgPrice,
        isActive,
        totalHours: rangeStats.totalHours,
        priceRange: rangeStats.priceRange
      };
    });
  }, [prices]);
  
  const currentRange = useMemo((): TimeRangeType | null => {
    const currentHour = new Date().getHours();
    const definition = TIME_RANGE_DEFINITIONS.find(
      def => currentHour >= def.startHour && currentHour < def.endHour
    );
    return definition?.type || null;
  }, []);
  
  return {
    data: timeRangeData,
    isLoading,
    error,
    currentRange
  };
}