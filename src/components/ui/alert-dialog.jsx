'use client';

import { forwardRef } from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = forwardRef(function AlertDialogOverlay({ className, ...props }, ref) {
  return <AlertDialogPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/50 backdrop-blur-sm', className)} {...props} />;
});

const AlertDialogContent = forwardRef(function AlertDialogContent({ className, ...props }, ref) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-sage/50 dark:border-white/10 bg-white dark:bg-[#16221c] p-6 shadow-xl animate-fade-in',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});

const AlertDialogHeader = ({ className, ...props }) => <div className={cn('flex items-center gap-3 mb-3', className)} {...props} />;
const AlertDialogFooter = ({ className, ...props }) => <div className={cn('flex gap-3', className)} {...props} />;

const AlertDialogTitle = forwardRef(function AlertDialogTitle({ className, ...props }, ref) {
  return <AlertDialogPrimitive.Title ref={ref} className={cn('font-heading text-lg font-bold text-forest-900 dark:text-white', className)} {...props} />;
});

const AlertDialogDescription = forwardRef(function AlertDialogDescription({ className, ...props }, ref) {
  return <AlertDialogPrimitive.Description ref={ref} className={cn('text-gray-600 dark:text-gray-300 mb-6', className)} {...props} />;
});

const AlertDialogAction = forwardRef(function AlertDialogAction({ className, variant = 'default', ...props }, ref) {
  return <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants({ variant }), className)} {...props} />;
});

const AlertDialogCancel = forwardRef(function AlertDialogCancel({ className, ...props }, ref) {
  return <AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'secondary' }), className)} {...props} />;
});

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
