import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import type {Price, PriceStats } from '../types/prices';

export function useTodayPrices() {
  return useQuery<Price[], Error>({
    queryKey: ['prices', 'today'],
    queryFn: async (): Promise<Price[]> => {
      const { data } = await apiClient.get('/prices/today');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePriceStats(days: number = 30) {
  return useQuery<PriceStats[], Error>({
    queryKey: ['prices', 'stats', days],
    queryFn: async (): Promise<PriceStats[]> => {
      const { data } = await apiClient.get(`/prices/stats?days=${days}`);
      return data;
    },
  });
}