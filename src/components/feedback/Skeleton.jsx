import { cn } from '@/utils';

// ─── Skeleton shapes ────────────────────────────────────────────
export function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton', className)} {...props} />;
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4 rounded', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 p-5', className)}>
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-28 h-4 rounded" />
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
      <Skeleton className="w-24 h-8 rounded mb-2" />
      <Skeleton className="w-20 h-3 rounded" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-navy-700">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3 bg-slate-50 dark:bg-navy-700 border-b border-slate-200 dark:border-navy-600">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1 rounded" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3.5 border-b border-slate-100 dark:border-navy-700 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={cn('h-4 rounded', c === 0 ? 'w-1/3' : 'flex-1')} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }) {
  const sizeMap = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  return <Skeleton className={cn('rounded-full', sizeMap[size])} />;
}

// ─── Empty State ────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {Icon && (
        <div className="w-16 h-16 bg-slate-100 dark:bg-navy-700 rounded-2xl flex items-center justify-center mb-4">
          <Icon size={28} className="text-slate-400 dark:text-slate-500" />
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── Error State ─────────────────────────────────────────────────
export function ErrorState({ title = 'Something went wrong', description, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-400 max-w-xs">{description}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 btn btn-secondary btn-sm"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
