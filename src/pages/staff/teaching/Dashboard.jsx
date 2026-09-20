import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import { FadeUp } from '@/components/animations';
import { canteenStats, wasteByMonth } from '@/data/analytics';
import { mockWasteReports } from '@/data/wasteReports';
import { formatDate } from '@/utils';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, BarChart3, User,
  BookOpen, Users, AlertTriangle, TrendingDown, ArrowRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const teachingStaffNav = [
  { items: [
    { label: 'Dashboard', path: '/staff/teaching/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Reports', path: '/staff/teaching/reports', icon: FileText },
    { label: 'Analytics', path: '/staff/teaching/analytics', icon: BarChart3 },
  ]},
];

export default function TeachingDashboard() {
  return (
    <DashboardLayout navItems={teachingStaffNav} pageTitle="Dashboard">
      <PageHeader
        title="Teaching Staff Dashboard"
        description="Monitor campus food waste and sustainability analytics."
        icon={BookOpen}
        iconColor="text-blue-500"
        iconBg="bg-blue-50 dark:bg-blue-900/20"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp delay={0}>
          <StatCard title="Reports Reviewed" value="24" icon={FileText}
            trend={{ value: 6, label: 'this week', direction: 'up' }}
            iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        </FadeUp>
        <FadeUp delay={70}>
          <StatCard title="Total Waste" value={`${canteenStats.foodWastedKg} kg`} icon={AlertTriangle}
            trend={{ value: 14, label: 'vs last month', direction: 'down' }}
            iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        </FadeUp>
        <FadeUp delay={140}>
          <StatCard title="Waste Reduced" value="34%" icon={TrendingDown}
            description="Semester target: 40%"
            iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" />
        </FadeUp>
        <FadeUp delay={210}>
          <StatCard title="Events Tracked" value="12" icon={Users}
            description="Campus events this month"
            iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        </FadeUp>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <FadeUp delay={100}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Monthly Waste Trend</CardTitle>
              <CardDescription>Campus-wide food waste over 7 months</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={wasteByMonth}>
                  <defs>
                    <linearGradient id="tWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="waste" stroke="#10b981" fill="url(#tWaste)" strokeWidth={2} name="Waste (kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        <FadeUp delay={160}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0" action={
              <Link to="/staff/teaching/reports" className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
            }>
              <CardTitle>Recent Waste Reports</CardTitle>
            </CardHeader>
            <div className="p-5 space-y-3">
              {mockWasteReports.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{r.foodType}</div>
                    <div className="text-xs text-slate-400">{r.location} · {r.quantity}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>
      </div>
    </DashboardLayout>
  );
}
