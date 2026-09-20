import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { FadeUp } from '@/components/animations';
import { canteenStats, wasteByMonth, wasteByCategory, consumptionTrend } from '@/data/analytics';
import { mockWasteReports } from '@/data/wasteReports';
import { mockSurplusFood } from '@/data/surplusFood';
import { formatDate } from '@/utils';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Calendar, Utensils, Recycle,
  FileText, BarChart3, User, ChefHat, TrendingDown, TrendingUp,
  AlertTriangle, ArrowRight, Clock,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export const canteenNav = [
  { items: [
    { label: 'Dashboard', path: '/canteen/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Inventory', path: '/canteen/inventory', icon: Package },
    { label: 'Meal Planning', path: '/canteen/meals', icon: Calendar },
    { label: 'Surplus', path: '/canteen/surplus', icon: Recycle },
    { label: 'Waste Reports', path: '/canteen/reports', icon: FileText },
    { label: 'Analytics', path: '/canteen/analytics', icon: BarChart3 },
  ]},
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-xl p-3 shadow-lg">
        <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="text-xs">
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CanteenDashboard() {
  const pendingReports = mockWasteReports.filter((r) => r.status === 'Pending' || r.status === 'Under Review').length;
  const availableSurplus = mockSurplusFood.filter((s) => s.status === 'Available').length;

  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Dashboard">
      <PageHeader
        title="Canteen Operations Dashboard"
        description="Real-time overview of food production, consumption, and waste metrics."
        icon={ChefHat}
        iconColor="text-amber-500"
        iconBg="bg-amber-50 dark:bg-amber-900/20"
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-soft" />
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Live</span>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <FadeUp delay={0}>
          <StatCard title="Meals Prepared" value={canteenStats.mealsPrepared.toLocaleString()} icon={Utensils}
            trend={{ value: 3, label: 'vs yesterday', direction: 'up' }}
            iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        </FadeUp>
        <FadeUp delay={70}>
          <StatCard title="Meals Served" value={canteenStats.mealsServed.toLocaleString()} icon={ChefHat}
            trend={{ value: 2, label: 'vs yesterday', direction: 'up' }}
            iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" />
        </FadeUp>
        <FadeUp delay={140}>
          <StatCard title="Food Wasted" value={`${canteenStats.foodWastedKg} kg`} icon={AlertTriangle}
            trend={{ value: 8, label: 'vs yesterday', direction: 'down' }}
            iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        </FadeUp>
        <FadeUp delay={210}>
          <StatCard title="Surplus Food" value={`${canteenStats.surplusKg} kg`} icon={Recycle}
            description={`${availableSurplus} items available`}
            iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        </FadeUp>
        <FadeUp delay={280}>
          <StatCard title="Efficiency" value={`${canteenStats.efficiency}%`} icon={TrendingUp}
            description="Waste: 5.4%" iconColor="text-cyan-500" iconBg="bg-cyan-50 dark:bg-cyan-900/20" />
        </FadeUp>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Consumption Trend */}
        <FadeUp delay={100} className="lg:col-span-2">
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Weekly Consumption Overview</CardTitle>
              <CardDescription>Prepared vs Served vs Wasted (in meals)</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={consumptionTrend} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="prepared" fill="#60a5fa" name="Prepared" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="served" fill="#10b981" name="Served" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="wasted" fill="#f87171" name="Wasted" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        {/* Waste by Category */}
        <FadeUp delay={180}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste by Category</CardTitle>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={wasteByCategory} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                    dataKey="kg" nameKey="category" paddingAngle={3}>
                    {wasteByCategory.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} kg`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {wasteByCategory.slice(0, 4).map((c) => (
                  <div key={c.category} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex-1 truncate">{c.category}</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeUp>
      </div>

      {/* Second row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Waste trend over months */}
        <FadeUp delay={120}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste Reduction Progress</CardTitle>
              <CardDescription>Monthly waste vs target</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={wasteByMonth}>
                  <defs>
                    <linearGradient id="wasteG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="waste" stroke="#f87171" fill="url(#wasteG)" strokeWidth={2} name="Waste (kg)" />
                  <Area type="monotone" dataKey="target" stroke="#10b981" fill="none" strokeDasharray="5 5" strokeWidth={1.5} name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        {/* Quick stats + recent reports */}
        <FadeUp delay={180}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0" action={
              <Link to="/canteen/reports" className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <div className="p-5 space-y-3">
              {mockWasteReports.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors">
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

      {/* Reduction targets */}
      <FadeUp delay={200}>
        <Card>
          <CardTitle className="mb-4">Monthly Reduction Targets</CardTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Rice/Grains Waste', current: 65, target: 100, color: 'green' },
              { label: 'Vegetable Waste', current: 72, target: 100, color: 'blue' },
              { label: 'Surplus Redistribution', current: 89, target: 100, color: 'purple' },
              { label: 'Overall Waste Reduction', current: 34, target: 100, color: 'amber' },
            ].map((t) => (
              <div key={t.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">{t.label}</span>
                  <span className="font-bold text-slate-800 dark:text-white">{t.current}%</span>
                </div>
                <ProgressBar value={t.current} max={t.target} color={t.color} size="lg" />
              </div>
            ))}
          </div>
        </Card>
      </FadeUp>
    </DashboardLayout>
  );
}
