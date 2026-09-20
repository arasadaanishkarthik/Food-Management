import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { otherNav } from './Dashboard';
import { cn } from '@/utils';
import {
  Activity, Award, Sparkles, CheckCircle2, AlertTriangle,
  Package, Calendar, Leaf, Heart, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const myActivities = [
  { id: 'ACT-001', type: 'report', title: 'Reported Refrigerator Malfunction & Milk Spoilage', date: '2024-09-05', location: 'Library Cafeteria', status: 'Resolved', impact: 'Saved 8L from improper disposal' },
  { id: 'ACT-002', type: 'claim', title: 'Claimed Fresh Fruit Basket for Study Circle', date: '2024-09-14', location: 'Faculty Canteen', status: 'Completed', impact: 'Rescued 12 kg fresh produce' },
  { id: 'ACT-003', type: 'report', title: 'Reported Leftover Dinner Biryani from Event', date: '2024-09-10', location: 'Event Hall', status: 'Under Review', impact: 'Diverted 12 kg to food bank' },
];

export default function OtherActivity() {
  const { showToast } = useToast();
  const [filter, setFilter] = useState('All');

  const filteredActivities = myActivities.filter((act) => {
    if (filter === 'Reports') return act.type === 'report';
    if (filter === 'Claims') return act.type === 'claim';
    return true;
  });

  return (
    <DashboardLayout navItems={otherNav} pageTitle="My Activity & Impact">
      <PageHeader
        title="My Activity & Environmental Impact"
        description="Track your contributions to the campus zero-waste mission and your earned eco-badges."
        icon={Activity}
        iconColor="text-pink-500"
        iconBg="bg-pink-50 dark:bg-pink-900/20"
      />

      {/* Impact Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center gap-4 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-transparent border-pink-500/20">
          <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md">
            <Leaf size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">CO2 Footprint Offset</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">32.4 kg CO2</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Package size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Food Rescued</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">32.0 kg</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent border-purple-500/20">
          <div className="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-md">
            <Award size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Eco Level</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">Community Ally ⭐</div>
          </div>
        </Card>
      </div>

      {/* Activity Filter & Timeline */}
      <Card padding={false}>
        <div className="p-4 border-b border-slate-100 dark:border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Contribution History</CardTitle>
            <CardDescription>Your reported incidents and claimed meals</CardDescription>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-navy-900 rounded-lg">
            {['All', 'Reports', 'Claims'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  'px-3 py-1 text-xs font-semibold rounded-md transition-all',
                  filter === tab
                    ? 'bg-white dark:bg-navy-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-navy-700">
          {filteredActivities.map((act) => (
            <div key={act.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-navy-700/30 transition-colors">
              <div className="flex items-start gap-3.5">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                    act.type === 'report' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30' : 'bg-pink-50 text-pink-600 dark:bg-pink-900/30'
                  )}
                >
                  {act.type === 'report' ? <AlertTriangle size={20} /> : <Package size={20} />}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-slate-400 font-semibold">{act.id}</span>
                    <span className="text-xs font-medium text-slate-400">· {act.date} · {act.location}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{act.title}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                    <Sparkles size={12} /> {act.impact}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
