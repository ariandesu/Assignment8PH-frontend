'use client';

import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const photo = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

// Shown when an organiser's thumbnail URL is missing or stops working
const CATEGORY_FALLBACKS = {
  Cleanup: photo('1618477461853-cf6ed80faba5'),
  Plantation: photo('1611843467160-25afb8df1074'),
  Donation: photo('1532629345422-7515f3d16bb6'),
  'Blood Donation': photo('1615461066841-6116e61058f4'),
  Education: photo('1503676260728-1c00da094a0b'),
  Health: photo('1576091160550-2173dba999ef'),
  Other: photo('1559027615-cd4628902d4a'),
};

// Event thumbnails come from any URL the organiser pastes, so a plain <img>
// with a fallback is more reliable than next/image's host allow-list.
export default function EventImage({ src, alt, category, className = '' }) {
  const fallback = category ? CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.Other : null;
  const [current, setCurrent] = useState(src || fallback);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (fallback && current !== fallback) setCurrent(fallback);
    else setFailed(true);
  };

  if (!current || failed) {
    return (
      <div className={`flex items-center justify-center bg-sage dark:bg-[#1f2d26] text-forest-500/60 dark:text-gray-500 ${className}`}>
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={current} alt={alt} loading="lazy" onError={handleError} className={`object-cover ${className}`} />
  );
}
