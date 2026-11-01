'use client';

import { useState } from 'react';
import { ImageOff } from 'lucide-react';

// Event thumbnails come from any URL the organiser pastes, so a plain <img>
// with a fallback is more reliable than next/image's host allow-list.
export default function EventImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-sage dark:bg-[#1f2d26] text-forest-500/60 dark:text-gray-500 ${className}`}>
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
  );
}
