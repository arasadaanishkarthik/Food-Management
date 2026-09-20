import { cn } from '@/utils';
import { Loader2 } from 'lucide-react';

// ─── Button Component ───────────────────────────────────────────
const variantMap = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'btn-danger',
  outline:   'border border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent',
  link:      'underline-offset-2 hover:underline text-emerald-600 dark:text-emerald-400 bg-transparent p-0',
};

const sizeMap = {
  xs: 'btn-sm text-xs px-2.5 py-1.5 gap-1',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  icon: Icon,
  iconRight: IconRight,
  children,
  className,
  disabled,
  fullWidth = false,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        'btn',
        variantMap[variant],
        sizeMap[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin flex-shrink-0" />
      ) : Icon ? (
        <Icon size={size === 'sm' || size === 'xs' ? 14 : 16} className="flex-shrink-0" />
      ) : null}
      {children && <span>{children}</span>}
      {IconRight && !loading && (
        <IconRight size={size === 'sm' || size === 'xs' ? 14 : 16} className="flex-shrink-0" />
      )}
    </button>
  );
}
