import { cn } from '@/utils';

// ─── Card Component ─────────────────────────────────────────────
export default function Card({ children, className, hover = false, brandHover = false, padding = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700',
        hover && 'card-hover',
        brandHover && 'card-hover card-hover-brand',
        padding && 'p-5',
        className
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Card subcomponents ─────────────────────────────────────────
export function CardHeader({ children, className, action }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug', className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn('text-sm text-slate-500 dark:text-slate-400 mt-0.5', className)}>
      {children}
    </p>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-slate-100 dark:border-navy-700', className)}>
      {children}
    </div>
  );
}
