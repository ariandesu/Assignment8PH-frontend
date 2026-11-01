import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0f1b16] disabled:pointer-events-none disabled:opacity-70 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-forest-500 text-white hover:bg-forest-600',
        outline:
          'border border-gray-300 dark:border-gray-600 text-forest-500 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-white/10 hover:text-forest-600 dark:hover:text-white',
        secondary: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#16221c] text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'text-gray-700 dark:text-gray-200 hover:bg-sage/40 dark:hover:bg-white/10',
        accent: 'bg-orange text-forest-900 hover:brightness-95',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-3 py-2 text-sm',
        lg: 'px-8 py-3.5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const Button = forwardRef(function Button({ className, variant, size, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { Button, buttonVariants };
