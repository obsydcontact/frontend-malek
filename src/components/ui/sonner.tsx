'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'rounded-[20px] border border-border bg-white shadow-soft-lg font-sans',
          title: 'text-primary font-medium',
          description: 'text-gray',
        },
      }}
    />
  );
}
