import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import Button from '@/components/common/Button';
import { Input, Select } from '@/components/ui/FormElements';
import { useToast } from '@/context/ToastContext';
import { canteenNav } from './Dashboard';
import { mockWasteReports } from '@/data/wasteReports';
import { formatDate } from '@/utils';
import { FileText, Search, Filter, CheckCircle2, Clock } from 'lucide-react';
import { EmptyState } from '@/components/feedback/Skeleton';
import Modal from '@/components/modals/Modal';

export default function CanteenReports() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [reports, setReports] = useState(mockWasteReports);

  const filtered = reports.filter((r) => {
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.foodType.toLowerCase().includes(search.toLowerCase()) ||
      r.reporterName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    const matchLoc = !locationFilter || r.location === locationFilter;
    return matchSearch && matchStatus && matchLoc;
  });

  const locations = [...new Set(mockWasteReports.map((r) => r.location))];

  const updateStatus = (id, newStatus) => {
    setUpdating(true);
    setTimeout(() => {
      setReports((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r));
      setUpdating(false);
      setSelectedReport(null);
      toast.success('Status Updated', `Report ${id} marked as ${newStatus}.`);
    }, 1200);
  };

  const roleColors = {
    student:            'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    teaching_staff:     'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    non_teaching_staff: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    worker:             'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
    other:              'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  };

  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Waste Reports">
      <PageHeader title="Waste Reports" description={`${filtered.length} reports · Manage and review all submitted waste reports.`} icon={FileText} />

      <Card className="mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Search reports…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} wrapperClassName="flex-1" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={['Pending', 'Under Review', 'Resolved', 'Escalated']}
            placeholder="All Statuses" wrapperClassName="sm:w-44" />
          <Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
            options={locations} placeholder="All Locations" wrapperClassName="sm:w-52" />
        </div>
      </Card>

      <Card padding={false}>
        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title="No reports found" description="Try changing your filters." />
        ) : (
          <div className="hidden md:block overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Reported By</th>
                  <th>Food Type</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</td>
                    <td>
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.reporterName}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[r.reporterRole] || ''}`}>
                          {r.reporterRole.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="font-medium text-slate-800 dark:text-slate-200">{r.foodType}</td>
                    <td className="text-sm">{r.quantity}</td>
                    <td className="text-sm">{r.location}</td>
                    <td className="text-sm">{formatDate(r.date)}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td>
                      <Button size="xs" variant="ghost" onClick={() => setSelectedReport(r)}>Review</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-navy-700">
          {filtered.map((r) => (
            <div key={r.id} className="p-4" onClick={() => setSelectedReport(r)}>
              <div className="flex items-start justify-between mb-1">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</span>
                <StatusBadge status={r.status} />
              </div>
              <div className="font-medium text-slate-800 dark:text-white">{r.foodType}</div>
              <div className="text-xs text-slate-400">{r.reporterName} · {r.location} · {r.quantity}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Review Modal */}
      <Modal open={!!selectedReport} onClose={() => setSelectedReport(null)}
        title={`Review: ${selectedReport?.id}`}
        description={`Submitted by ${selectedReport?.reporterName} on ${selectedReport ? formatDate(selectedReport.date) : ''}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelectedReport(null)}>Close</Button>
            {selectedReport?.status !== 'Resolved' && (
              <Button loading={updating} icon={CheckCircle2}
                onClick={() => updateStatus(selectedReport.id, 'Resolved')}>
                Mark Resolved
              </Button>
            )}
            {selectedReport?.status === 'Pending' && (
              <Button variant="secondary" icon={Clock} loading={updating}
                onClick={() => updateStatus(selectedReport.id, 'Under Review')}>
                Start Review
              </Button>
            )}
          </>
        }
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
                  <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{f.val}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Description</div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{selectedReport.description || 'No description.'}</p>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
