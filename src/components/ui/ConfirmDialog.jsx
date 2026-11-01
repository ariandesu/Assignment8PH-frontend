'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ConfirmDialog({ open, onConfirm, onCancel, title, description, confirmText = 'Confirm' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="bg-white dark:bg-[#16221c] rounded-2xl p-6 shadow-xl border border-sage/50 w-full max-w-md mx-4">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-red-500" />
          <h3 className="font-heading text-lg font-bold text-forest-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-[#16221c] text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
