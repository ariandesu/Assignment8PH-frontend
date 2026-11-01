'use client';

import { useState } from 'react';

// Profile picture with an initials fallback when the photo URL is missing or broken
export default function Avatar({ src, name, className = 'w-9 h-9 text-sm' }) {
  const [failed, setFailed] = useState(false);
  const initials = (name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name || 'Profile picture'}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${className} rounded-full object-cover border-2 border-sage dark:border-forest-400/40`}
      />
    );
  }

  return (
    <span
      className={`${className} rounded-full bg-forest-500 text-white font-semibold flex items-center justify-center border-2 border-sage dark:border-forest-400/40`}
    >
      {initials}
    </span>
  );
}
