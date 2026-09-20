import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import Button from '@/components/common/Button';
import { Input, Select } from '@/components/ui/FormElements';
import { useToast } from '@/context/ToastContext';
import { canteenNav } from './Dashboard';
import { mockSurplusFood } from '@/data/surplusFood';
import { formatDate, cn } from '@/utils';
import { Recycle, Search, ArrowRight, MapPin, Clock, Users, Plus } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import { EmptyState } from '@/components/feedback/Skeleton';

const workflowSteps = ['Created', 'Available', 'Redistribution', 'Collected', 'Completed'];

export default function CanteenSurplus() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [items, setItems] = useState(mockSurplusFood);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const filtered = items.filter((s) => {
    const matchSearch = !search || s.foodName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const nextStatus = {
    'Available': 'Redistribution',
    'Redistribution': 'Collected',
    'Collected': 'Completed',
  };

  const advanceStatus = (id, next) => {
    setUpdating(true);
    setTimeout(() => {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: next } : i));
      setUpdating(false);
      setSelected(null);
      toast.success('Status Advanced', `Surplus item moved to ${next}.`);
    }, 1200);
  };

  const stepIndex = (status) => workflowSteps.indexOf(status);

  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Surplus">
      <PageHeader title="Surplus Management" description="Manage surplus food redistribution workflow." icon={Recycle}
        iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20"
        actions={<Button icon={Plus} size="sm" onClick={() => toast.info('Add Surplus', 'Form would open here.')}>Add Surplus</Button>}
      />

      {/* Workflow status bar */}
      <Card className="mb-5">
        <div className="flex items-center justify-between">
          {workflowSteps.map((step, i) => {
            const count = items.filter((s) => s.status === step).length;
            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all',
                    count > 0 ? 'gradient-brand text-white' : 'bg-slate-100 dark:bg-navy-700 text-slate-400')}>
                    {count}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{step}</div>
                </div>
                {i < workflowSteps.length - 1 && (
                  <div className="flex-shrink-0 w-4 sm:w-8">
                    <ArrowRight size={14} className="text-slate-300 dark:text-navy-600 mx-auto" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Search surplus…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} wrapperClassName="flex-1" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={workflowSteps} placeholder="All Statuses" wrapperClassName="sm:w-44" />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card><EmptyState icon={Recycle} title="No surplus items" description="Add surplus food to start redistributing." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const si = stepIndex(item.status);
            return (
              <Card key={item.id} hover padding={false}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">{item.foodName}</h3>
                      <div className="text-xs text-slate-400 mt-0.5">{item.category}</div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  {/* Workflow progress */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {workflowSteps.map((step, i) => (
                      <div key={step} className={cn('flex-1 h-1 rounded-full transition-all', i <= si ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-navy-600')} />
                    ))}
                  </div>

                  <div className="space-y-1.5 text-sm mb-4">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Users size={13} className="text-slate-400" />{item.quantity} · {item.servings} servings
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin size={13} className="text-slate-400" />{item.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <Clock size={13} className="text-slate-400" />
                      Till {new Date(item.availableTill).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {nextStatus[item.status] && (
                    <Button fullWidth size="sm" variant="secondary" onClick={() => setSelected(item)}>
                      Advance → {nextStatus[item.status]}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}
        title="Advance Surplus Status"
        description={`Move "${selected?.foodName}" to next stage?`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button>
            <Button loading={updating} onClick={() => advanceStatus(selected.id, nextStatus[selected.status])}>
              Move to {nextStatus[selected?.status]}
            </Button>
          </>
        }
      >
        {selected && (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <p>Current status: <strong>{selected.status}</strong></p>
            <p>Next status: <strong className="text-emerald-600 dark:text-emerald-400">{nextStatus[selected.status]}</strong></p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
