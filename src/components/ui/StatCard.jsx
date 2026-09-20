import { cn } from '@/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ─── StatCard ───────────────────────────────────────────────────
export default function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor = 'text-emerald-500',
  iconBg   = 'bg-emerald-50 dark:bg-emerald-900/20',
  trend,        // { value: number, label: string, direction: 'up'|'down'|'neutral' }
  description,
  className,
  loading = false,
}) {
  const trendColor = trend?.direction === 'up'
    ? 'text-emerald-600 dark:text-emerald-400'
    : trend?.direction === 'down'
    ? 'text-red-500 dark:text-red-400'
    : 'text-slate-400';

  const TrendIcon = trend?.direction === 'up'
    ? TrendingUp
    : trend?.direction === 'down'
    ? TrendingDown
    : Minus;

  if (loading) {
    return (
      <div className={cn('bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 p-5', className)}
           style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="skeleton w-24 h-4 rounded" />
          <div className="skeleton w-10 h-10 rounded-lg" />
        </div>
        <div className="skeleton w-32 h-8 rounded mb-1" />
        <div className="skeleton w-20 h-3 rounded" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-navy-800 rounded-xl border border-slate-200 dark:border-navy-700 p-5 card-hover',
        className
      )}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        {Icon && (
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
            <Icon size={20} className={iconColor} />
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 mb-1">
        <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-slate-400 dark:text-slate-500 mb-0.5">{unit}</span>
        )}
      </div>

      {trend && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
          <TrendIcon size={12} />
          <span>{trend.value}%</span>
          {trend.label && <span className="text-slate-400 font-normal">{trend.label}</span>}
        </div>
      )}

      {description && !trend && (
        <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
      )}
    </div>
  );
}
