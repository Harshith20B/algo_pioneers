// Button.jsx
import React from 'react';
import clsx from 'clsx';

const buttonVariants = {
  variants: {
    default: "bg-blue-600 text-slate-50 shadow hover:bg-blue-600/90",
    destructive: "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90",
    outline: "border border-slate-700 bg-slate-900 text-slate-50 shadow-sm hover:bg-slate-800",
    secondary: "bg-slate-800 text-slate-50 shadow-sm hover:bg-slate-700",
  },
  sizes: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  }
};

export const Button = ({
  variant = "default",
  size = "default",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variants[variant],
        buttonVariants.sizes[size],
        className
      )}
      {...props}
    />
  );
};
