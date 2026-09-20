import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardTitle } from '@/components/ui/Card';
import { FadeUp } from '@/components/animations';
import { workerStats } from '@/data/analytics';
import { mockWorkerTasks } from '@/data/wasteReports';
import { cn, formatDate } from '@/utils';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, Trash2, Package, History,
  Truck, CheckCircle2, Clock, AlertCircle, MapPin,
} from 'lucide-react';

export const workerNav = [
  { items: [
    { label: 'Dashboard', path: '/worker/dashboard', icon: LayoutDashboard, end: true },
    { label: 'My Tasks', path: '/worker/tasks', icon: ClipboardList },
    { label: 'Waste Collection', path: '/worker/waste-collection', icon: Trash2 },
    { label: 'Surplus Collection', path: '/worker/surplus-collection', icon: Package },
    { label: 'History', path: '/worker/history', icon: History },
  ]},
];

const taskStatusConfig = {
  'Pending':     { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', icon: Clock },
  'In Progress': { color: 'text-blue-500',  bg: 'bg-blue-50 dark:bg-blue-900/20',   icon: Truck },
  'Completed':   { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: CheckCircle2 },
  'Missed':      { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', icon: AlertCircle },
};

export default function WorkerDashboard() {
  const pending = mockWorkerTasks.filter((t) => t.status === 'Pending').length;
  const inProgress = mockWorkerTasks.filter((t) => t.status === 'In Progress').length;
  const completed = mockWorkerTasks.filter((t) => t.status === 'Completed').length;

  return (
    <DashboardLayout navItems={workerNav} pageTitle="Dashboard">
      <PageHeader
        title="Worker Dashboard"
        description="Your assigned tasks and collection summary for today."
        icon={Truck}
        iconColor="text-cyan-500"
        iconBg="bg-cyan-50 dark:bg-cyan-900/20"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp><StatCard title="Assigned Tasks" value={mockWorkerTasks.length} icon={ClipboardList} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" /></FadeUp>
        <FadeUp delay={70}><StatCard title="Waste Collected" value={`${workerStats.wasteCollectedKg} kg`} icon={Trash2} trend={{ value: 8, direction: 'up', label: 'today' }} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/20" /></FadeUp>
        <FadeUp delay={140}><StatCard title="Surplus Collected" value={`${workerStats.surplusCollectedKg} kg`} icon={Package} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" /></FadeUp>
        <FadeUp delay={210}><StatCard title="Completed Today" value={completed} icon={CheckCircle2} iconColor="text-cyan-500" iconBg="bg-cyan-50 dark:bg-cyan-900/20" /></FadeUp>
      </div>

      {/* Today's tasks */}
      <FadeUp>
        <Card padding={false}>
          <div className="p-5 border-b border-slate-100 dark:border-navy-700 flex items-center justify-between">
            <CardTitle>Today's Tasks</CardTitle>
            <Link to="/worker/tasks" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-navy-700">
            {mockWorkerTasks.slice(0, 5).map((task) => {
              const cfg = taskStatusConfig[task.status] || taskStatusConfig.Pending;
              const Icon = cfg.icon;
              return (
                <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-navy-700/50 transition-colors">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', cfg.bg)}>
                    <Icon size={18} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800 dark:text-slate-200 truncate">{task.title}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <MapPin size={11} /> <span>{task.location}</span>
                      <span>·</span>
                      <Clock size={11} /> <span>{task.scheduledTime}</span>
                    </div>
                  </div>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0', cfg.color, cfg.bg)}>
                    {task.status}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </FadeUp>
    </DashboardLayout>
  );
}
