'use client';

import { forwardRef } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

const Label = forwardRef(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn('block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5', className)}
      {...props}
    />
  );
});

export { Label };
