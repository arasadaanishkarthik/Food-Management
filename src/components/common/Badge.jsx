import { cn, statusColor, priorityColor } from '@/utils';

// ─── Badge Component ────────────────────────────────────────────
const variants = {
  green:  'badge-green',
  amber:  'badge-amber',
  red:    'badge-red',
  blue:   'badge-blue',
  purple: 'badge-purple',
  gray:   'badge-gray',
  sky:    'badge-sky',
};

export default function Badge({ variant = 'gray', children, dot = false, className }) {
  return (
    <span className={cn('badge', variants[variant], className)}>
      {dot && (
        <span className={cn(
          'inline-block w-1.5 h-1.5 rounded-full flex-shrink-0',
          variant === 'green'  && 'bg-emerald-500',
          variant === 'amber'  && 'bg-amber-500',
          variant === 'red'    && 'bg-red-500',
          variant === 'blue'   && 'bg-blue-500',
          variant === 'purple' && 'bg-purple-500',
          variant === 'sky'    && 'bg-sky-500',
          variant === 'gray'   && 'bg-slate-400',
        )} />
      )}
      {children}
    </span>
  );
}

// Convenience: StatusBadge auto-picks color by status string
export function StatusBadge({ status, ...props }) {
  const cls = statusColor[status] || 'badge-gray';
  const variantKey = cls.replace('badge-', '');
  return <Badge variant={variantKey} dot {...props}>{status}</Badge>;
}

// PriorityBadge
export function PriorityBadge({ priority, ...props }) {
  const cls = priorityColor[priority] || 'badge-gray';
  const variantKey = cls.replace('badge-', '');
  return (
    <Badge variant={variantKey} {...props}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
