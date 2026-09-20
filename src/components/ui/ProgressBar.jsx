import { cn } from '@/utils';

// ─── ProgressBar ────────────────────────────────────────────────
export default function ProgressBar({
  value = 0,       // 0–100
  max = 100,
  color = 'green', // green | blue | amber | red | purple
  size = 'md',     // sm | md | lg
  label,
  showValue = false,
  animated = true,
  className,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const trackH = { sm: 'h-1', md: 'h-1.5', lg: 'h-2.5' };
  const fillColor = {
    green:  'bg-emerald-500',
    blue:   'bg-blue-500',
    amber:  'bg-amber-500',
    red:    'bg-red-500',
    purple: 'bg-purple-500',
    sky:    'bg-sky-500',
    gradient: 'gradient-brand',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('progress-bar-track', trackH[size])}>
        <div
          className={cn(
            'progress-bar-fill',
            fillColor[color] || fillColor.green,
            animated && 'transition-[width] duration-700 ease-out'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
