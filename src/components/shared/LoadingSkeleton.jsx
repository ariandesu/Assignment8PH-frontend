export function LoadingSkeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-sage dark:bg-[#1f2d26] ${className}`} />;
}

export function EventCardSkeleton() {
  return (
    <div className="card h-full flex flex-col">
      <LoadingSkeleton className="h-48 rounded-none" />
      <div className="p-5 space-y-3 flex-1">
        <LoadingSkeleton className="h-3 w-20" />
        <LoadingSkeleton className="h-5 w-3/4" />
        <LoadingSkeleton className="h-3 w-1/2" />
        <LoadingSkeleton className="h-3 w-2/3" />
        <LoadingSkeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-6">
      <LoadingSkeleton className="h-9 w-1/3" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <LoadingSkeleton className="h-64" />
        <LoadingSkeleton className="h-64" />
      </div>
    </div>
  );
}
