import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import { StatusBadge, PriorityBadge } from '@/components/common/Badge';
import { Input, Select } from '@/components/ui/FormElements';
import { useToast } from '@/context/ToastContext';
import { mockWasteReports } from '@/data/wasteReports';
import { studentNav } from './Dashboard';
import { formatDate, truncate } from '@/utils';
import { FileText, Search, Filter, Eye } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import { EmptyState } from '@/components/feedback/Skeleton';

export default function MyReports() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Show all reports for demo (student sees their own)
  const allReports = mockWasteReports;

  const filtered = allReports.filter((r) => {
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.foodType.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout navItems={studentNav} pageTitle="My Reports">
      <PageHeader
        title="My Waste Reports"
        description={`${allReports.length} total reports submitted`}
        icon={FileText}
      />

      {/* Filters */}
      <Card className="mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search by ID, food type, location…"
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={['Pending', 'Under Review', 'Resolved', 'Escalated']}
            placeholder="All Statuses"
            wrapperClassName="sm:w-44"
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title="No reports found" description="Try adjusting your search or filters." />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Food Type</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</td>
                      <td className="font-medium text-slate-800 dark:text-slate-200">{r.foodType}</td>
                      <td>{r.quantity}</td>
                      <td className="text-sm">{r.location}</td>
                      <td className="text-sm">{formatDate(r.date)}</td>
                      <td><PriorityBadge priority={r.priority} /></td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <button onClick={() => setSelectedReport(r)}
                          className="btn btn-ghost btn-sm text-slate-500 hover:text-emerald-600 px-2">
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-navy-700">
              {filtered.map((r) => (
                <div key={r.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</span>
                      <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{r.foodType}</div>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>{r.quantity}</span>
                    <span>{r.location}</span>
                    <span>{formatDate(r.date)}</span>
                  </div>
                  <button onClick={() => setSelectedReport(r)} className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                    View details →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Report Detail Modal */}
      <Modal
        open={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={`Report ${selectedReport?.id}`}
        description={`Submitted on ${selectedReport ? formatDate(selectedReport.date) : ''}`}
        size="md"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Food Type', val: selectedReport.foodType },
                { label: 'Quantity', val: selectedReport.quantity },
                { label: 'Location', val: selectedReport.location },
                { label: 'Reason', val: selectedReport.reason },
                { label: 'Date', val: formatDate(selectedReport.date) },
                { label: 'Time', val: selectedReport.time },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{f.val}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Description</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selectedReport.description || 'No description provided.'}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Status:</span>
              <StatusBadge status={selectedReport.status} />
              <span className="text-xs text-slate-400 ml-2">Priority:</span>
              <PriorityBadge priority={selectedReport.priority} />
            </div>
            {selectedReport.notes && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">Reviewer Notes</div>
                <p className="text-sm text-blue-600 dark:text-blue-300">{selectedReport.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
