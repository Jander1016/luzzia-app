import type { TimeRangeData } from './types/timeRange';

interface TimeRangeCardProps {
  data: TimeRangeData;
  className?: string;
}

export function TimeRangeCard({ data, className = '' }: TimeRangeCardProps) {
  const { definition, currentPrice, avgPrice, isActive, priceRange } = data;
  const { color, icon, title, hours, description } = definition;
  
  return (
    <div 
      className={`
        relative rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-lg
        ${isActive ? 'border-gray-400 shadow-md scale-[1.02]' : 'border-gray-200'}
        ${color.primary}
        ${className}
      `}
    >
      {/* Badge activo */}
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Ahora
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{icon}</span>
            <h3 className={`text-lg font-semibold ${color.text}`}>{title}</h3>
          </div>
          <p className="text-sm text-gray-600">{hours}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{description}</p>
      
      {/* Precios */}
      <div className="space-y-2">
        {currentPrice && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Precio actual:</span>
            <span className="text-lg font-bold text-gray-900">
              {currentPrice.toFixed(4)} €
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm">
          <span>Promedio:</span>
          <span className="font-semibold">{avgPrice.toFixed(4)} €</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span>Rango:</span>
          <span className="font-medium">
            {priceRange.min.toFixed(4)} - {priceRange.max.toFixed(4)} €
          </span>
        </div>
      </div>
      
      {/* Barra de progreso visual */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Mínimo</span>
          <span>Máximo</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color.primary}`}
            style={{ 
              width: `${((avgPrice - priceRange.min) / (priceRange.max - priceRange.min || 1)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}