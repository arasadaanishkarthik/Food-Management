import { useToast } from '@/context/ToastContext';
import { cn } from '@/utils';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// ─── Toast icons & colors ────────────────────────────────────────
const toastConfig = {
  success: { icon: CheckCircle2, iconClass: 'text-emerald-500', cls: 'toast-success' },
  error:   { icon: XCircle,      iconClass: 'text-red-500',     cls: 'toast-error' },
  warning: { icon: AlertTriangle,iconClass: 'text-amber-500',   cls: 'toast-warning' },
  info:    { icon: Info,         iconClass: 'text-blue-500',    cls: 'toast-info' },
};

// ─── Single Toast ────────────────────────────────────────────────
function Toast({ id, type = 'info', title, message, status }) {
  const { removeToast } = useToast();
  const cfg = toastConfig[type] || toastConfig.info;
  const Icon = cfg.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn('toast', cfg.cls, status === 'entering' ? 'entering' : status === 'exiting' ? 'exiting' : '')}
    >
      <Icon size={18} className={cn('flex-shrink-0 mt-0.5', cfg.iconClass)} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm leading-snug">{title}</p>}
        {message && <p className={cn('text-sm leading-snug', title ? 'mt-0.5 opacity-80' : '')}>{message}</p>}
      </div>
      <button
        onClick={() => removeToast(id)}
        className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity ml-1"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Toast Container ─────────────────────────────────────────────
export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  );
}
