import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { workerNav } from './Dashboard';
import { cn } from '@/utils';
import {
  History, Search, Download, Calendar, Filter,
  CheckCircle2, Trash2, Package, MapPin, Scale, ArrowUpRight
} from 'lucide-react';

const historyRecords = [
  { id: 'REC-2024-88', date: '2024-09-15', time: '14:45', type: 'waste', title: 'Post-Lunch Disposal', location: 'Main Canteen', weightKg: 24.0, destination: 'Bio-Gas Plant', notes: 'Completed on schedule' },
  { id: 'REC-2024-87', date: '2024-09-15', time: '12:10', type: 'surplus', title: 'Curry & Chapati Surplus', location: 'Hostel A Mess', weightKg: 12.5, destination: 'NGO Annadaan', notes: 'Temperature verified (68°C)' },
  { id: 'REC-2024-86', date: '2024-09-14', time: '21:30', type: 'waste', title: 'Dinner Clearance', location: 'Hostel B Mess', weightKg: 18.2, destination: 'Compost Yard', notes: 'Segregated wet waste' },
  { id: 'REC-2024-85', date: '2024-09-14', time: '15:20', type: 'surplus', title: 'Fruit Basket Dispatch', location: 'Faculty Canteen', weightKg: 8.0, destination: 'Student Welfare Club', notes: 'Packed in crates' },
  { id: 'REC-2024-84', date: '2024-09-13', time: '14:15', type: 'waste', title: 'Lunch Waste Sweeping', location: 'Hostel C Mess', weightKg: 15.6, destination: 'Bio-Gas Plant', notes: 'Bin sanitized' },
  { id: 'REC-2024-83', date: '2024-09-13', time: '10:00', type: 'waste', title: 'Breakfast Prep Discards', location: 'Library Cafeteria', weightKg: 6.4, destination: 'Compost Yard', notes: 'Peels & organic scraps' },
  { id: 'REC-2024-82', date: '2024-09-12', time: '16:40', type: 'surplus', title: 'Evening Snacks Batch', location: 'Event Hall', weightKg: 14.0, destination: 'Hostel D Common Room', notes: 'Freshly packed' },
  { id: 'REC-2024-81', date: '2024-09-11', time: '14:30', type: 'waste', title: 'Lunch Service Disposal', location: 'Main Canteen', weightKg: 22.8, destination: 'Bio-Gas Plant', notes: 'Scale calibrated' },
];

export default function WorkerHistory() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('September 2024');

  const filteredRecords = historyRecords.filter((rec) => {
    const matchesSearch = rec.title.toLowerCase().includes(search.toLowerCase()) ||
                          rec.location.toLowerCase().includes(search.toLowerCase()) ||
                          rec.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || rec.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalWasteKg = historyRecords.filter(r => r.type === 'waste').reduce((s, r) => s + r.weightKg, 0);
  const totalSurplusKg = historyRecords.filter(r => r.type === 'surplus').reduce((s, r) => s + r.weightKg, 0);

  return (
    <DashboardLayout navItems={workerNav} pageTitle="Collection History">
      <PageHeader
        title="Collection History & Audit Logs"
        description="Comprehensive log of completed waste collections and surplus redistributions."
        icon={History}
        iconColor="text-cyan-500"
        iconBg="bg-cyan-50 dark:bg-cyan-900/20"
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Total Trips Logged</div>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{historyRecords.length} Completed</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 size={13} /> 100% On-Time Completion Rate
          </div>
        </Card>

        <Card>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Waste Diverted (Compost/Biogas)</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalWasteKg.toFixed(1)} kg</div>
          <div className="text-xs text-slate-400 mt-2">Processed sustainably across campus</div>
        </Card>

        <Card>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Surplus Rescued & Delivered</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalSurplusKg.toFixed(1)} kg</div>
          <div className="text-xs text-slate-400 mt-2">Delivered to NGOs & campus shelters</div>
        </Card>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search historical logs by location, ID, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Types</option>
              <option value="waste">Waste Only</option>
              <option value="surplus">Surplus Only</option>
            </select>

            <Button
              variant="secondary"
              onClick={() => showToast('Full audit log CSV exported successfully', 'success')}
            >
              <Download size={14} className="mr-1.5" /> Export Logs
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-navy-900/60 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100 dark:border-navy-700">
              <tr>
                <th className="p-3 pl-4">Record ID</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Type</th>
                <th className="p-3">Location</th>
                <th className="p-3">Measured Weight</th>
                <th className="p-3">Destination</th>
                <th className="p-3 pr-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-700">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 dark:hover:bg-navy-700/40 transition-colors">
                  <td className="p-3 pl-4 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {rec.id}
                  </td>
                  <td className="p-3 text-xs text-slate-600 dark:text-slate-400">
                    <div>{rec.date}</div>
                    <div className="text-[11px] text-slate-400">{rec.time}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                        rec.type === 'surplus'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      )}
                    >
                      {rec.type === 'surplus' ? <Package size={11} /> : <Trash2 size={11} />}
                      <span className="capitalize">{rec.type}</span>
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                    {rec.location}
                  </td>
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-100">
                    {rec.weightKg} kg
                  </td>
                  <td className="p-3 text-xs text-slate-600 dark:text-slate-400">
                    {rec.destination}
                  </td>
                  <td className="p-3 pr-4 text-xs text-slate-500 dark:text-slate-400 italic">
                    {rec.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
