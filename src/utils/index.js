import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── cn — class name utility ────────────────────────────────────
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ─── Format numbers ─────────────────────────────────────────────
export function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatCurrency(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

// ─── Format dates ───────────────────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
}

// ─── Status helpers ─────────────────────────────────────────────
export const statusColor = {
  Pending:       'badge-amber',
  'Under Review':'badge-blue',
  Resolved:      'badge-green',
  Escalated:     'badge-red',
  Available:     'badge-green',
  Claimed:       'badge-blue',
  Redistributed: 'badge-purple',
  Collected:     'badge-sky',
  Expired:       'badge-gray',
  'In Stock':    'badge-green',
  'Low Stock':   'badge-amber',
  Critical:      'badge-red',
  'Out of Stock':'badge-red',
};

export const priorityColor = {
  low:    'badge-gray',
  medium: 'badge-amber',
  high:   'badge-red',
};

// ─── Get initials from name ──────────────────────────────────────
export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// ─── Generate report ID ─────────────────────────────────────────
export function generateReportId(prefix = 'WR') {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${year}-${seq}`;
}

// ─── Stagger delay string ────────────────────────────────────────
export function staggerDelay(index, baseMs = 80) {
  return { animationDelay: `${index * baseMs}ms` };
}

// ─── Truncate text ───────────────────────────────────────────────
export function truncate(str, len = 80) {
  if (!str || str.length <= len) return str;
  return str.slice(0, len).trimEnd() + '…';
}
