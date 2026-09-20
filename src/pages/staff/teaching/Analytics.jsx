import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { teachingStaffNav } from './Dashboard';
import { wasteByMonth, wasteByCategory } from '@/data/analytics';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function TeachingAnalytics() {
  return (
    <DashboardLayout navItems={teachingStaffNav} pageTitle="Analytics">
      <PageHeader title="Analytics Overview" description="Campus-wide waste trend and category analysis." icon={BarChart3} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding={false}>
          <CardHeader className="p-5 pb-0">
            <CardTitle>Waste vs Reduced</CardTitle>
            <CardDescription>7-month comparison</CardDescription>
          </CardHeader>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={wasteByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="waste" stroke="#f87171" strokeWidth={2} dot={false} name="Waste (kg)" />
                <Line type="monotone" dataKey="reduced" stroke="#10b981" strokeWidth={2} dot={false} name="Reduced (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card padding={false}>
          <CardHeader className="p-5 pb-0">
            <CardTitle>Waste by Category</CardTitle>
          </CardHeader>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={wasteByCategory} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.1)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 10, fill: '#94a3b8' }} width={90} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="kg" radius={[0, 4, 4, 0]} name="Waste (kg)">
                  {wasteByCategory.map((e) => <Cell key={e.category} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
