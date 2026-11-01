import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const Card = forwardRef(function Card({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      ref={ref}
      className={cn('bg-white dark:bg-[#16221c] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden', className)}
      {...props}
    />
  );
});

const CardHeader = forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn('text-center mb-8', className)} {...props} />;
});

const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
  return <h1 ref={ref} className={cn('font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-forest-900 dark:text-white', className)} {...props} />;
});

const CardDescription = forwardRef(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn('text-gray-600 dark:text-gray-400 mt-2', className)} {...props} />;
});

const CardContent = forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn('p-5', className)} {...props} />;
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
