import { Link } from 'react-router-dom';
import { cn } from '@/utils';
import { ChevronRight } from 'lucide-react';

// ─── PageHeader ─────────────────────────────────────────────────
export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  actions,
  className,
  icon: Icon,
  iconColor = 'text-emerald-500',
  iconBg    = 'bg-emerald-50 dark:bg-emerald-900/20',
}) {
  return (
    <div className={cn('mb-6', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 mb-2 text-xs text-slate-400 dark:text-slate-500" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} />}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-emerald-500 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-600 dark:text-slate-300 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
              <Icon size={20} className={iconColor} />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
