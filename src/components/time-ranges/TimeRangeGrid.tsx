import { useTimeRanges } from '../../hooks/use-time-ranges';
import { TimeRangeCard } from './TimeCardRange';
import { TimeRangeCardSkeleton } from './TimeRangeCardSkeleton';

export function TimeRangesGrid() {
  const { data, isLoading, error } = useTimeRanges();
  
  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-800">No se pudieron cargar los rangos horarios</p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <TimeRangeCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((timeRange) => (
        <TimeRangeCard 
          key={timeRange.definition.type}
          data={timeRange}
        />
      ))}
    </div>
  );
}