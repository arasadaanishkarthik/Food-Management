import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import { Input, Select } from '@/components/ui/FormElements';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/context/ToastContext';
import { canteenNav } from './Dashboard';
import { mockInventory, inventorySummary } from '@/data/inventory';
import { cn, formatDate, formatCurrency } from '@/utils';
import { Package, Search, AlertTriangle, TrendingDown, Plus, RefreshCw } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

export default function Inventory() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = mockInventory.filter((item) => {
    const matchSearch = !search || item.item.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || item.category === categoryFilter;
    const matchStatus = !statusFilter || item.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const statusConfig = {
    'In Stock':    { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    'Low Stock':   { color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-900/20' },
    'Critical':    { color: 'text-red-600 dark:text-red-400',        bg: 'bg-red-50 dark:bg-red-900/20' },
    'Out of Stock':{ color: 'text-slate-500',                         bg: 'bg-slate-100 dark:bg-navy-700' },
  };

  const reorder = (item) => {
    toast.success('Reorder Placed', `Reorder request sent for ${item.item}.`);
  };

  const categories = [...new Set(mockInventory.map((i) => i.category))];

  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Inventory">
      <PageHeader
        title="Food Inventory"
        description="Track stock levels, expiry dates, and reorder status for all items."
        icon={Package}
        iconColor="text-blue-500"
        iconBg="bg-blue-50 dark:bg-blue-900/20"
        actions={
          <Button icon={Plus} size="sm" onClick={() => toast.info('Add Item', 'Inventory form would open here.')}>
            Add Item
          </Button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard title="Total Items" value={inventorySummary.totalItems} icon={Package} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        <StatCard title="In Stock" value={inventorySummary.inStock} icon={Package} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" />
        <StatCard title="Critical / Low" value={inventorySummary.critical + inventorySummary.lowStock} icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatCard title="Expiring Soon" value={inventorySummary.expiringSoon} icon={AlertTriangle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
      </div>

      {/* Filters */}
      <Card className="mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Search items…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} wrapperClassName="flex-1" />
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            options={categories} placeholder="All Categories" wrapperClassName="sm:w-44" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={['In Stock', 'Low Stock', 'Critical', 'Out of Stock']}
            placeholder="All Statuses" wrapperClassName="sm:w-44" />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="hidden md:block overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Purchased</th>
                <th>Used</th>
                <th>Remaining</th>
                <th>Usage</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const usagePct = Math.round((item.used / item.purchased) * 100);
                const cfg = statusConfig[item.status] || statusConfig['In Stock'];
                const isLow = item.remaining <= item.minStock;
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.image}</span>
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{item.item}</div>
                          <div className="text-xs text-slate-400">{item.supplier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{item.category}</td>
                    <td className="text-sm">{item.purchased} {item.unit}</td>
                    <td className="text-sm">{item.used} {item.unit}</td>
                    <td>
                      <span className={cn('text-sm font-semibold', isLow ? 'text-red-500' : 'text-slate-700 dark:text-slate-200')}>
                        {item.remaining} {item.unit}
                      </span>
                    </td>
                    <td className="w-32">
                      <ProgressBar value={usagePct} color={usagePct > 90 ? 'red' : usagePct > 70 ? 'amber' : 'green'} size="sm" showValue />
                    </td>
                    <td className="text-sm">{formatDate(item.expiryDate)}</td>
                    <td>
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-full', cfg.color, cfg.bg)}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {isLow && (
                        <Button size="xs" variant="ghost" icon={RefreshCw}
                          onClick={() => reorder(item)}
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                          Reorder
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-navy-700">
          {filtered.map((item) => {
            const usagePct = Math.round((item.used / item.purchased) * 100);
            const isLow = item.remaining <= item.minStock;
            return (
              <div key={item.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.image}</span>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 dark:text-white">{item.item}</div>
                    <div className="text-xs text-slate-400">{item.category}</div>
                  </div>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full',
                    statusConfig[item.status]?.color, statusConfig[item.status]?.bg)}>
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-500 mb-2">
                  <span>Remaining: <strong className={isLow ? 'text-red-500' : ''}>{item.remaining} {item.unit}</strong></span>
                  <span>Expires: {formatDate(item.expiryDate)}</span>
                </div>
                <ProgressBar value={usagePct} color={usagePct > 90 ? 'red' : usagePct > 70 ? 'amber' : 'green'} showValue />
              </div>
            );
          })}
        </div>
      </Card>
    </DashboardLayout>
  );
}
