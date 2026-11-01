export function LoadingSkeleton({ className = '' }) {
  // Loading skeletons for event cards, details pages, manage events and joined events

  return (
    <div
      className={`animate-pulse rounded-xl bg-sage dark:bg-[#1f2d26] h-full w-full ${className}`}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#16221c] rounded-2xl border border-sage/50 overflow-hidden flex flex-col h-full">
      <div className="h-48 bg-sage dark:bg-[#1f2d26] animate-pulse" />
      <div className="p-5">
        <div className="h-4 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded mb-3 w-3/4" />
        <div className="flex gap-2 mb-4">
          <div className="h-3 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-24" />
          <div className="h-3 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-1/3" />
        </div>
        <div className="h-16 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded" />
        <div className="mt-4 flex gap-3">
          <div className="h-8 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-1/3" />
          <div className="h-8 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-1/3" />
          <div className="h-8 bg-sage/40 dark:bg-[#1f2d26]/40 animate-pulse rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
