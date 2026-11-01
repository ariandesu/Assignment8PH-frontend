'use client';

import { useEffect, useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/lib/utils';

export default function EventFilters({ values, onChange }) {
  const [search, setSearch] = useState(values.search);
  const [location, setLocation] = useState(values.location);

  // Keep inputs in sync when the URL changes (back/forward)
  useEffect(() => setSearch(values.search), [values.search]);
  useEffect(() => setLocation(values.location), [values.location]);

  // Debounce typing so we don't request on every key press
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== values.search || location !== values.location) onChange({ search, location });
    }, 400);
    return () => clearTimeout(t);
  }, [search, location]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasFilters = values.search || values.location || values.category;

  return (
    <div className="card p-4 sm:p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title"
            className="input pl-10"
            aria-label="Search events by title"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location, e.g. Mirpur"
            className="input pl-10"
            aria-label="Filter events by location"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['', ...EVENT_CATEGORIES].map((cat) => {
          const active = values.category === cat;
          return (
            <button
              key={cat || 'all'}
              type="button"
              onClick={() => onChange({ category: cat })}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                active
                  ? 'bg-forest-500 text-white border-forest-500'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-sage/50 dark:hover:bg-white/10'
              }`}
            >
              {cat || 'All types'}
            </button>
          );
        })}
        {hasFilters && (
          <button
            type="button"
            onClick={() => onChange({ search: '', location: '', category: '' })}
            className="ml-auto inline-flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            <X className="w-4 h-4" /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
