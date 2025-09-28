import { getPriceLevelInfo } from '@/domain/prices/price-levels';
import type { PriceTrend } from '@/types/prices';

interface TrendIndicatorProps {
  trend: PriceTrend;
  currentPrice: number;
}

const TREND_CONFIG: Record<
  PriceTrend,
  { color: string; icon: string; label: string; bg: string }
> = {
  up: { color: 'text-red-600', icon: '📈', label: 'Subiendo', bg: 'bg-red-50' },
  down: { color: 'text-green-600', icon: '📉', label: 'Bajando', bg: 'bg-green-50' },
  stable: { color: 'text-gray-600', icon: '➡️', label: 'Estable', bg: 'bg-gray-50' },
};

export function TrendIndicator({ trend, currentPrice }: TrendIndicatorProps) {
  const { color, icon, label, bg } = TREND_CONFIG[trend];
  const levelInfo = getPriceLevelInfo(currentPrice);

  return (
    <div
      className={`${bg} border-0 rounded-lg p-3 text-center min-w-[100px] shadow-sm`}
    >
      <span className="text-2xl block mb-1">{icon}</span>
      <p className={`text-sm font-medium ${color}`}>{label}</p>
      <p className="text-xs text-gray-600 mt-1">{levelInfo.label}</p>
    </div>
  );
}
