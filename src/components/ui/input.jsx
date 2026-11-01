import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const fieldClasses =
  'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-forest-500/40 focus:border-forest-500 aria-[invalid=true]:border-red-500 disabled:opacity-60 dark:border-gray-600 dark:bg-[#0f1b16] dark:text-white dark:placeholder:text-gray-500';

const Input = forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return <input ref={ref} type={type} className={cn(fieldClasses, className)} {...props} />;
});

const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(fieldClasses, 'resize-y', className)} {...props} />;
});

export { Input, Textarea, fieldClasses };
