import { usePriceStats } from '../../hooks/use-prices'

export function PriceStats() {
  const { data: stats, isLoading } = usePriceStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  const todayStats = stats?.[0];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        label="Precio medio"
        value={todayStats?.avgPrice}
        color="blue"
        format={(v) => `${v.toFixed(4)} €`}
      />
      <StatCard 
        label="Más barato"
        value={todayStats?.minPrice}
        color="green"
        format={(v) => `${v.toFixed(4)} €`}
      />
      <StatCard 
        label="Más caro"
        value={todayStats?.maxPrice}
        color="red"
        format={(v) => `${v.toFixed(4)} €`}
      />
      <StatCard 
        label="Horas analizadas"
        value={24}
        color="purple"
        format={(v) => `${v}h`}
      />
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color, 
  format 
}: { 
  label: string; 
  value?: number; 
  color: 'blue' | 'green' | 'red' | 'purple'; 
  format: (v: number) => string; 
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <p className="text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold">
        {value !== undefined ? format(value) : '--'}
      </p>
    </div>
  );
}