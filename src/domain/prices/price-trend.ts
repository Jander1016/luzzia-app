import type { Price, PriceTrend } from "@/types/prices"

export function getPriceTrend(prices: Price[], currentHour: number): PriceTrend {

  if (prices.length === 0) return "stable"

  const priceMap = new Map<number, number>()
  for (const item of prices) {
    priceMap.set(item.hour, item.price)
  }

  const previusHour = (currentHour - 1 + 24) % 24

  const currentPrice = priceMap.get(currentHour)
  const previousPrice = priceMap.get(previusHour)

  if (!previousPrice || currentPrice === undefined) return "stable"

  const difference = currentPrice - previousPrice

  if (Math.abs(difference) < 0.001) return "stable"

  return difference > 0 ? "up" : "down"
}
