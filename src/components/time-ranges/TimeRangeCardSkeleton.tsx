export function TimeRangeCardSkeleton(){
  return (
    <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="h-3 bg-gray-300 rounded w-32 mb-4"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}