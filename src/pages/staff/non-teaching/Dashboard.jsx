import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import { FadeUp } from '@/components/animations';
import { mockWasteReports } from '@/data/wasteReports';
import { formatDate } from '@/utils';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, MapPin, History, User, Wrench,
  AlertTriangle, CheckCircle2, Clock, ArrowRight,
} from 'lucide-react';

export const ntStaffNav = [
  { items: [
    { label: 'Dashboard', path: '/staff/non-teaching/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Report Waste', path: '/staff/non-teaching/report', icon: AlertTriangle },
    { label: 'Waste Locations', path: '/staff/non-teaching/locations', icon: MapPin },
    { label: 'History', path: '/staff/non-teaching/history', icon: History },
  ]},
];

export default function NTDashboard() {
  const myReports = mockWasteReports.slice(0, 3);
  return (
    <DashboardLayout navItems={ntStaffNav} pageTitle="Dashboard">
      <PageHeader title="Non-Teaching Staff Dashboard" description="Manage waste reporting and location tracking." icon={Wrench} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp><StatCard title="Reports Filed" value="18" icon={FileText} trend={{ value: 3, direction: 'up', label: 'this week' }} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" /></FadeUp>
        <FadeUp delay={70}><StatCard title="Waste Collected" value="84 kg" icon={CheckCircle2} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" /></FadeUp>
        <FadeUp delay={140}><StatCard title="Active Locations" value="6" icon={MapPin} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" /></FadeUp>
        <FadeUp delay={210}><StatCard title="Pending Tasks" value="2" icon={Clock} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" /></FadeUp>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <FadeUp>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0" action={
              <Link to="/staff/non-teaching/history" className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <div className="p-5 space-y-3">
              {myReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-navy-700/50">
                  <div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.foodType}</div>
                    <div className="text-xs text-slate-400">{r.location} · {formatDate(r.date)}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>

        <FadeUp delay={100}>
          <Card>
            <CardTitle className="mb-4">Active Waste Locations</CardTitle>
            <div className="space-y-3">
              {[
                { loc: 'Main Canteen', count: 4, severity: 'High', color: 'text-red-500' },
                { loc: 'Hostel Block A', count: 2, severity: 'Medium', color: 'text-amber-500' },
                { loc: 'Faculty Cafeteria', count: 1, severity: 'Low', color: 'text-emerald-500' },
                { loc: 'Sports Complex', count: 3, severity: 'Medium', color: 'text-amber-500' },
                { loc: 'Library Canteen', count: 1, severity: 'Low', color: 'text-emerald-500' },
              ].map((l) => (
                <div key={l.loc} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-navy-700/50">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{l.loc}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{l.count} reports</span>
                    <span className={`text-xs font-medium ${l.color}`}>{l.severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>
      </div>
    </DashboardLayout>
  );
}
