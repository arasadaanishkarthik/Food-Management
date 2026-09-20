import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription, CardHeader } from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { canteenNav } from './Dashboard';
import {
  wasteByMonth, wasteByCategory, consumptionTrend, locationWaste,
  monthlyImpact, sustainabilityMetrics,
} from '@/data/analytics';
import { BarChart3, TrendingDown, Globe, Zap } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { FadeUp } from '@/components/animations';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';

const TooltipStyle = {
  contentStyle: {
    background: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    fontSize: 12,
  },
};

export default function CanteenAnalytics() {
  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Analytics">
      <PageHeader
        title="Waste Analytics"
        description="Comprehensive data analytics for informed food management decisions."
        icon={BarChart3}
        iconColor="text-purple-500"
        iconBg="bg-purple-50 dark:bg-purple-900/20"
      />

      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp delay={0}>
          <StatCard title="Total Waste Reduced" value={`${sustainabilityMetrics.totalWasteReduced} kg`}
            icon={TrendingDown} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20"
            trend={{ value: sustainabilityMetrics.wasteReductionPercent, label: 'reduction', direction: 'down' }} />
        </FadeUp>
        <FadeUp delay={70}>
          <StatCard title="CO₂ Saved" value={`${sustainabilityMetrics.co2Saved} kg`}
            icon={Globe} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20"
            description="CO₂ equivalent" />
        </FadeUp>
        <FadeUp delay={140}>
          <StatCard title="Meals Redistributed" value={sustainabilityMetrics.mealsRedistributed.toLocaleString()}
            icon={Zap} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        </FadeUp>
        <FadeUp delay={210}>
          <StatCard title="Money Saved" value={`₹${(sustainabilityMetrics.moneySaved / 1000).toFixed(1)}K`}
            icon={TrendingDown} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20"
            description="from waste reduction" />
        </FadeUp>
      </div>

      {/* Row 1: Line chart + Pie */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <FadeUp delay={100} className="lg:col-span-2">
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste Trend — Monthly</CardTitle>
              <CardDescription>Waste vs reduced vs target over 7 months</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={230}>
                <LineChart data={wasteByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip {...TooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="waste" stroke="#f87171" strokeWidth={2.5} dot={false} name="Waste (kg)" />
                  <Line type="monotone" dataKey="reduced" stroke="#10b981" strokeWidth={2.5} dot={false} name="Reduced (kg)" />
                  <Line type="monotone" dataKey="target" stroke="#60a5fa" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Target (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        <FadeUp delay={180}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste Composition</CardTitle>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={wasteByCategory} cx="50%" cy="50%" outerRadius={70}
                    dataKey="kg" nameKey="category" paddingAngle={2}>
                    {wasteByCategory.map((e) => <Cell key={e.category} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} kg`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
                {wasteByCategory.map((c) => (
                  <div key={c.category} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.category}</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 ml-auto">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </FadeUp>
      </div>

      {/* Row 2: Location + Consumption area */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <FadeUp delay={120}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>Waste by Location</CardTitle>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={locationWaste} layout="vertical" barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.1)" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="location" tick={{ fontSize: 10, fill: '#94a3b8' }} width={110} axisLine={false} tickLine={false} />
                  <Tooltip {...TooltipStyle} />
                  <Bar dataKey="waste" fill="#10b981" radius={[0, 4, 4, 0]} name="Waste (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>

        <FadeUp delay={180}>
          <Card padding={false}>
            <CardHeader className="p-5 pb-0">
              <CardTitle>CO₂ & Meal Impact</CardTitle>
              <CardDescription>Monthly sustainability metrics</CardDescription>
            </CardHeader>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyImpact}>
                  <defs>
                    <linearGradient id="co2G" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="mealG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip {...TooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="co2" stroke="#10b981" fill="url(#co2G)" strokeWidth={2} name="CO₂ Saved (kg)" />
                  <Area type="monotone" dataKey="meals" stroke="#8b5cf6" fill="url(#mealG)" strokeWidth={2} name="Meals Saved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeUp>
      </div>

      {/* Waste reduction targets */}
      <FadeUp delay={200}>
        <Card>
          <CardTitle className="mb-4">Category-wise Reduction Progress</CardTitle>
          <div className="space-y-4">
            {wasteByCategory.map((c, i) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                    <span className="text-slate-600 dark:text-slate-300">{c.category}</span>
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-white">{c.kg} kg wasted</span>
                </div>
                <ProgressBar
                  value={c.kg}
                  max={200}
                  color={c.kg > 150 ? 'red' : c.kg > 100 ? 'amber' : 'green'}
                  size="md"
                />
              </div>
            ))}
          </div>
        </Card>
      </FadeUp>
    </DashboardLayout>
  );
}
