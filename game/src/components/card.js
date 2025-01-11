import React from 'react';
import clsx from 'clsx';

export const Card = ({ className, ...props }) => (
  <div
    className={clsx("rounded-xl border border-slate-700 bg-slate-900 text-slate-50 shadow", 
    className)}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div
    className={clsx("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

export const CardTitle = ({ className, ...props }) => (
  <div
    className={clsx("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={clsx("p-6 pt-0", className)} {...props} />
);

// export { Card, CardHeader, CardTitle, CardContent };