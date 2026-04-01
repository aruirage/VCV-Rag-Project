"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'glass-card',
          title: 'text-sm font-medium text-foreground',
          description: 'text-xs text-muted-foreground',
          success: 'border-l-4 border-l-green-500',
          error: 'border-l-4 border-l-red-500',
          warning: 'border-l-4 border-l-yellow-500',
          info: 'border-l-4 border-l-blue-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };