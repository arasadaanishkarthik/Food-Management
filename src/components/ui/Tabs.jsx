import { cn } from '@/utils';
import { useState } from 'react';

// ─── Tabs Component ─────────────────────────────────────────────
export default function Tabs({ tabs = [], value, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-slate-100 dark:bg-navy-700 rounded-lg', className)}
         role="tablist">
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        const Icon = tab.icon;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-white dark:bg-navy-600 text-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            )}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'ml-1 px-1.5 py-0.5 text-xs rounded-full',
                isActive
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-slate-200 dark:bg-navy-600 text-slate-500 dark:text-slate-400'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Pill Tabs (underline style) ────────────────────────────────
export function PillTabs({ tabs = [], value, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-0 border-b border-slate-200 dark:border-navy-700', className)}
         role="tablist">
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        const Icon = tab.icon;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 -mb-px whitespace-nowrap',
              isActive
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            )}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
