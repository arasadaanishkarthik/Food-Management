import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/modals/Modal';
import { useToast } from '@/context/ToastContext';
import { workerNav } from './Dashboard';
import { mockWorkerTasks } from '@/data/wasteReports';
import { cn } from '@/utils';
import {
  ClipboardList, Search, Filter, CheckCircle2, Clock, Truck,
  AlertCircle, MapPin, Scale, FileText, ArrowRight, Check,
} from 'lucide-react';

const statusConfig = {
  'Pending':     { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/40', icon: Clock },
  'In Progress': { color: 'text-blue-500',  bg: 'bg-blue-50 dark:bg-blue-900/20',   border: 'border-blue-200 dark:border-blue-800/40', icon: Truck },
  'Completed':   { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/40', icon: CheckCircle2 },
  'Missed':      { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/40', icon: AlertCircle },
};

const priorityConfig = {
  high: { label: 'High Priority', color: 'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200' },
  medium: { label: 'Medium', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200' },
  low: { label: 'Low', color: 'text-slate-600 bg-slate-50 dark:bg-slate-900/30 border-slate-200' },
};

export default function WorkerTasks() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState(mockWorkerTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualWeightInput, setActualWeightInput] = useState('');
  const [workerNotesInput, setWorkerNotesInput] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.location.toLowerCase().includes(search.toLowerCase()) ||
                          task.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesType = typeFilter === 'All' || task.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              completedAt: newStatus === 'Completed' ? new Date().toISOString().replace('T', ' ').slice(0, 16) : t.completedAt,
              actualKg: newStatus === 'Completed' && actualWeightInput ? parseFloat(actualWeightInput) : t.actualKg || t.estimatedKg,
              notes: workerNotesInput ? `${t.notes ? t.notes + ' | ' : ''}${workerNotesInput}` : t.notes,
            }
          : t
      )
    );
    showToast(`Task ${taskId} status updated to "${newStatus}"`, 'success');
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setActualWeightInput(task.actualKg ? String(task.actualKg) : String(task.estimatedKg || ''));
    setWorkerNotesInput('');
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout navItems={workerNav} pageTitle="My Tasks">
      <PageHeader
        title="Assigned Tasks"
        description="View and execute your scheduled waste and surplus collection tasks."
        icon={ClipboardList}
        iconColor="text-blue-500"
        iconBg="bg-blue-50 dark:bg-blue-900/20"
      />

      {/* Top Filter Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {['All', 'Pending', 'In Progress', 'Completed'].map((st) => {
          const count = st === 'All' ? tasks.length : tasks.filter((t) => t.status === st).length;
          const isSelected = statusFilter === st;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'bg-white dark:bg-navy-800 border-slate-200/80 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 text-slate-700 dark:text-slate-300'
              )}
            >
              <div className="text-xs text-slate-400 font-medium">{st} Tasks</div>
              <div className="text-2xl font-bold mt-1">{count}</div>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by task title, location, or task ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-slate-200 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400 ml-1" />
            <span className="text-xs text-slate-400 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Types</option>
              <option value="waste">Waste Collection</option>
              <option value="surplus">Surplus Pickup</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Task List Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <ClipboardList size={22} />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">No tasks found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your filters or search query.</p>
          </Card>
        ) : (
          filteredTasks.map((task) => {
            const cfg = statusConfig[task.status] || statusConfig.Pending;
            const pCfg = priorityConfig[task.priority] || priorityConfig.medium;
            const StatusIcon = cfg.icon;

            return (
              <Card
                key={task.id}
                className={cn(
                  'border transition-all hover:shadow-md cursor-pointer',
                  task.status === 'Completed' ? 'opacity-85' : ''
                )}
                onClick={() => openTaskModal(task)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', cfg.bg)}>
                      <StatusIcon size={20} className={cfg.color} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-medium text-slate-400">{task.id}</span>
                        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full border', pCfg.color)}>
                          {pCfg.label}
                        </span>
                        <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full capitalize', task.type === 'surplus' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300')}>
                          {task.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">{task.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1"><MapPin size={13} className="text-emerald-500" /> {task.location} ({task.zone})</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> {task.scheduledTime}</span>
                        <span className="flex items-center gap-1"><Scale size={13} /> Est: {task.estimatedKg} kg {task.actualKg ? `(Actual: ${task.actualKg} kg)` : ''}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border', cfg.color, cfg.bg, cfg.border)}>
                      {task.status}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openTaskModal(task);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Task Details: ${selectedTask.id}`}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{selectedTask.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Assigned to: {selectedTask.assignedWorker}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-navy-900/70 rounded-xl text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Location</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{selectedTask.location}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Zone / Section</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{selectedTask.zone}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Schedule</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{selectedTask.scheduledTime}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Est. Quantity</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{selectedTask.estimatedKg} kg</span>
              </div>
            </div>

            {selectedTask.notes && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                <span className="font-semibold block mb-0.5">Special Instructions:</span>
                {selectedTask.notes}
              </div>
            )}

            {/* Status Change & Weight Entry */}
            <div className="border-t border-slate-100 dark:border-navy-700 pt-4 space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
                Update Actual Weight (kg):
              </label>
              <div className="relative">
                <Scale size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  step="0.1"
                  value={actualWeightInput}
                  onChange={(e) => setActualWeightInput(e.target.value)}
                  placeholder="Enter scale weight in kg"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
                Add Worker Log Note:
              </label>
              <textarea
                rows={2}
                value={workerNotesInput}
                onChange={(e) => setWorkerNotesInput(e.target.value)}
                placeholder="e.g. Segregated organic compost, bin cleaned..."
                className="w-full p-2.5 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
              />

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedTask.status !== 'In Progress' && selectedTask.status !== 'Completed' && (
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      handleStatusChange(selectedTask.id, 'In Progress');
                      setIsModalOpen(false);
                    }}
                  >
                    <Truck size={15} className="mr-1" /> Start Task
                  </Button>
                )}
                {selectedTask.status !== 'Completed' && (
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      handleStatusChange(selectedTask.id, 'Completed');
                      setIsModalOpen(false);
                    }}
                  >
                    <CheckCircle2 size={15} className="mr-1" /> Mark as Completed
                  </Button>
                )}
                {selectedTask.status === 'Completed' && (
                  <div className="w-full py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-lg text-center flex items-center justify-center gap-1.5">
                    <Check size={14} /> Completed on {selectedTask.completedAt || 'Today'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
