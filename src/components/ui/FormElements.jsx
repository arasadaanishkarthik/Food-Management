import { cn } from '@/utils';
import { forwardRef } from 'react';

// ─── Input ──────────────────────────────────────────────────────
export const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, iconRight: IconRight, className, wrapperClassName, id, ...props },
  ref
) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Icon size={16} />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'form-input',
            Icon && 'pl-9',
            IconRight && 'pr-9',
            error && 'border-red-400 focus:border-red-400 focus:shadow-none',
            className
          )}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconRight size={16} />
          </span>
        )}
      </div>
      {error  && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
});

// ─── Select ─────────────────────────────────────────────────────
export const Select = forwardRef(function Select(
  { label, error, hint, options = [], placeholder = 'Select…', wrapperClassName, className, id, ...props },
  ref
) {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'form-input appearance-none',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")]',
          'bg-no-repeat bg-[right_10px_center]',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      {error  && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
});

// ─── Textarea ────────────────────────────────────────────────────
export const Textarea = forwardRef(function Textarea(
  { label, error, hint, rows = 3, wrapperClassName, className, id, ...props },
  ref
) {
  const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn('form-input resize-y', error && 'border-red-400', className)}
        {...props}
      />
      {error  && <p className="text-xs text-red-500">{error}</p>}
      {!error && hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
});
