'use client'

import { Suspense } from "react"
import { ErrorBoundary } from 'react-error-boundary';
import { es } from 'date-fns/locale'
import { format } from "date-fns"

import { useTodayPrices } from "@/hooks/use-prices"
import { CurrentPriceSkeleton } from "./CurrentPriceSkeleton"
import { CurrentPriceError } from "./CurrentPriceError"
import type { PriceTrend } from "@/types/prices"
import { getPriceTrend } from "@/domain/prices/price-trend"
import { getPriceLevelInfo } from "@/domain/prices/price-levels"
import { TrendIndicator } from "./TrendIndicator";

interface CurrentPriceProps {
  className?: string
}

export function CurrentPrice({ className = '' }: CurrentPriceProps){

  return (
    <ErrorBoundary fallback={<CurrentPriceError />}>
      <Suspense fallback={<CurrentPriceSkeleton />}>
        {currentPriceContent({ className })}
      </Suspense>
    </ErrorBoundary>
  )
}

function currentPriceContent({ className }: CurrentPriceProps) {
  const { data: prices, error } = useTodayPrices()

  const currentHour = new Date().getHours()
  const currentPrice = prices?.find(p => p.hour === currentHour)

  if (error || !currentPrice) {
    return <CurrentPriceError />
  }

  const trend: PriceTrend = getPriceTrend(prices!, currentHour)
  const currentRange = `${currentHour.toString().padStart(2, '0')}:00-${(currentHour + 1).toString().padStart(2, '0')}:00`;
  const priceLevelInfo = getPriceLevelInfo(currentPrice.price);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm  text-gray-600 mb-1">
             ⚡ Precio actual • {format(new Date(), "d 'de' MMMM", { locale: es })}
          </p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-3xl font-semibold text-gray-900">
              {currentPrice.price.toFixed(4)} €/kWh
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {currentRange} • {priceLevelInfo.label}
          </p>
        </div>
        <TrendIndicator trend={trend} currentPrice={currentPrice.price} />
      </div>
    </div>
  )
}