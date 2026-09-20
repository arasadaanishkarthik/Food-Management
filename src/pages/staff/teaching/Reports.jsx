import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import { StatusBadge, PriorityBadge } from '@/components/common/Badge';
import { Input, Select } from '@/components/ui/FormElements';
import { teachingStaffNav } from './Dashboard';
import { mockWasteReports } from '@/data/wasteReports';
import { formatDate } from '@/utils';
import { FileText, Search } from 'lucide-react';
import { EmptyState } from '@/components/feedback/Skeleton';

export default function TeachingReports() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = mockWasteReports.filter((r) => {
    const matchSearch = !search || r.foodType.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (!statusFilter || r.status === statusFilter);
  });

  return (
    <DashboardLayout navItems={teachingStaffNav} pageTitle="Reports">
      <PageHeader title="Campus Waste Reports" description={`${mockWasteReports.length} total reports`} icon={FileText} />
      <Card className="mb-5">
        <div className="flex gap-3">
          <Input placeholder="Search…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} wrapperClassName="flex-1" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={['Pending', 'Under Review', 'Resolved']} placeholder="All" wrapperClassName="w-40" />
        </div>
      </Card>
      <Card padding={false}>
        {filtered.length === 0 ? <EmptyState icon={FileText} title="No reports" description="Try adjusting filters." /> : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Food</th><th>Quantity</th><th>Location</th><th>Priority</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</td>
                    <td className="font-medium">{r.foodType}</td>
                    <td className="text-sm">{r.quantity}</td>
                    <td className="text-sm">{r.location}</td>
                    <td><PriorityBadge priority={r.priority} /></td>
                    <td className="text-sm">{formatDate(r.date)}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
