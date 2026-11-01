'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, SortAsc } from 'lucide-react';

const CATEGORIES = ['Donation', 'Plantation', 'Cleanup', 'Blood Donation', 'Education', 'Health', 'Other'];
const SORT_OPTIONS = [
  { value: 'eventDate', label: 'Date (Earliest First)' },
  { value: 'createdAt', label: 'Recently Created' },
];

export default function EventFilters({ search, category, location, sort }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#16221c] border border-sage/50 rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            defaultValue={search}
            className="w-full pl-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#0f1b16] text-gray-900 dark:text-white focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#0f1b16] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-forest-500 outline-none"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            {open && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-[#16221c] border border-sage/50 rounded-xl p-4 shadow-lg z-50">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                            category === cat
                              ? 'bg-forest-500 text-white border-forest-500'
                              : 'border-gray-300 dark:border-gray-600 dark:bg-[#0f1b16] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">Sort by</p>
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 transition-colors ${
                          sort === opt.value
                            ? 'text-forest-600 dark:text-forest-400 font-semibold bg-forest-50 dark:bg-[#1f2d26]/30'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
