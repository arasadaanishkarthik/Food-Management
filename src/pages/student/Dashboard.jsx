import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { FadeUp } from '@/components/animations';
import { useAuth } from '@/context/AuthContext';
import { studentStats, wasteByMonth, achievements } from '@/data/analytics';
import { mockWasteReports } from '@/data/wasteReports';
import { mockSurplusFood } from '@/data/surplusFood';
import { formatDate } from '@/utils';
import {
  LayoutDashboard, AlertTriangle, FileText, Package, User,
  Utensils, Recycle, TrendingDown, Star, ArrowRight, Leaf,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export const studentNav = [
  { items: [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Report Waste', path: '/student/report-waste', icon: AlertTriangle },
    { label: 'My Reports', path: '/student/reports', icon: FileText },
    { label: 'Surplus Food', path: '/student/surplus', icon: Package },
    { label: 'Profile', path: '/student/profile', icon: User },
  ]},
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const myReports = mockWasteReports.filter((r) => r.reportedBy === 'USR-001').slice(0, 3);
  const availableSurplus = mockSurplusFood.filter((s) => s.status === 'Available').slice(0, 3);

  return (
    <DashboardLayout navItems={studentNav} pageTitle="Dashboard">
      <PageHeader
        title={`Good evening, ${user?.name?.split(' ')[0] ?? 'Student'} 👋`}
        description="Here's your food sustainability summary for today."
        icon={Leaf}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp delay={0}>
          <StatCard title="Meals Consumed" value={studentStats.mealsConsumed} icon={Utensils}
            trend={{ value: 4, label: 'vs last month', direction: 'up' }}
            iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        </FadeUp>
        <FadeUp delay={80}>
          <StatCard title="Food Waste" value={`${studentStats.foodWasteKg} kg`} icon={AlertTriangle}
            trend={{ value: 12, label: 'vs last month', direction: 'down' }}
            iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        </FadeUp>
        <FadeUp delay={160}>
          <StatCard title="Reports Submitted" value={studentStats.reportsSubmitted} icon={FileText}
            description="This semester" iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" />
        </FadeUp>
        <FadeUp delay={240}>
          <StatCard title="Surplus Accessed" value={studentStats.surplusAccessed} icon={Package}
            description="Meals claimed" iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        </FadeUp>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Waste Trend Chart */}
        <FadeUp delay={100} className="lg:col-span-2">
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste Trend</CardTitle>
              <CardDescription>Monthly food waste reports across campus</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={wasteByMonth}>
                  <defs>
                    <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13 }}
                    labelStyle={{ color: 'var(--color-text-primary)', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="waste" stroke="#10b981" strokeWidth={2} fill="url(#wasteGrad)" name="Waste (kg)" />
                  <Area type="monotone" dataKey="reduced" stroke="#2563eb" strokeWidth={2} fill="none" strokeDasharray="4 4" name="Reduced (kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        {/* Sustainability Score */}
        <FadeUp delay={200}>
          <Card>
            <CardTitle className="mb-4">Sustainability Score</CardTitle>
            <div className="flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center mb-4 relative">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{studentStats.sustainabilityPoints}</div>
                  <div className="text-xs text-slate-400">points</div>
                </div>
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="44" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="4" />
                  <circle cx="48" cy="48" r="44" fill="none" stroke="#10b981" strokeWidth="4"
                    strokeDasharray={`${(studentStats.sustainabilityPoints / 500) * 276} 276`} strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">
                You're ranked <strong className="text-slate-700 dark:text-slate-200">#{studentStats.rank}</strong> out of {studentStats.totalStudents.toLocaleString()} students
              </p>
              <div className="w-full space-y-2">
                {achievements.filter(a => a.earned).slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg">
                    <span className="text-lg">{a.icon}</span>
                    <div>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{a.title}</div>
                      <div className="text-xs text-slate-400">+{a.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeUp>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <FadeUp delay={150}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0" action={
              <Link to="/student/reports" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <div className="p-5 space-y-3">
              {myReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 dark:bg-navy-700/50 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{r.foodType}</span>
                      <span className="text-xs text-slate-400">{r.quantityKg} kg</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{r.id} · {formatDate(r.date)}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
              {myReports.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No reports yet.</p>
              )}
            </div>
          </Card>
        </FadeUp>

        {/* Available Surplus */}
        <FadeUp delay={200}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0" action={
              <Link to="/student/surplus" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }>
              <CardTitle>Available Surplus</CardTitle>
            </CardHeader>
            <div className="p-5 space-y-3">
              {availableSurplus.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-50 dark:bg-navy-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{s.foodName}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.location} · {s.servings} servings</div>
                  </div>
                  <Link to="/student/surplus" className="btn btn-ghost btn-sm text-emerald-600 dark:text-emerald-400 px-3">
                    Claim
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>
      </div>
    </DashboardLayout>
  );
}
