import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import { StatusBadge } from '@/components/common/Badge';
import { Input, Select } from '@/components/ui/FormElements';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { mockSurplusFood } from '@/data/surplusFood';
import { studentNav } from './Dashboard';
import { cn } from '@/utils';
import { Package, Search, MapPin, Clock, Users, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import { EmptyState } from '@/components/feedback/Skeleton';

export default function Surplus() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(new Set());

  const filtered = mockSurplusFood.filter((s) => {
    const matchSearch = !search ||
      s.foodName.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleClaim = () => {
    setClaiming(true);
    setTimeout(() => {
      setClaimed((prev) => new Set([...prev, selectedItem.id]));
      setClaiming(false);
      setSelectedItem(null);
      toast.success('Surplus Claimed!', `${selectedItem.foodName} has been reserved for you.`);
    }, 1500);
  };

  const tagColors = {
    vegetarian: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    vegan: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    hot: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    fresh: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    healthy: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
  };

  return (
    <DashboardLayout navItems={studentNav} pageTitle="Surplus Food">
      <PageHeader
        title="Available Surplus Food"
        description="Claim available surplus food from campus locations before it expires."
        icon={Package}
        iconColor="text-purple-500"
        iconBg="bg-purple-50 dark:bg-purple-900/20"
      />

      {/* Filters */}
      <Card className="mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input placeholder="Search food or location…" icon={Search}
            value={search} onChange={(e) => setSearch(e.target.value)} wrapperClassName="flex-1" />
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            options={['Available', 'Claimed', 'Redistributed', 'Collected']}
            placeholder="All Statuses" wrapperClassName="sm:w-44" />
        </div>
      </Card>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <Card><EmptyState icon={Package} title="No surplus food found" description="Check back later or adjust your filters." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const isClaimed = claimed.has(item.id) || item.status !== 'Available';
            return (
              <div
                key={item.id}
                className={cn(
                  'bg-white dark:bg-navy-800 rounded-xl border p-5 transition-all',
                  isClaimed
                    ? 'border-slate-100 dark:border-navy-700 opacity-60'
                    : 'border-slate-200 dark:border-navy-700 card-hover cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700'
                )}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => !isClaimed && setSelectedItem(item)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{item.foodName}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">{item.category}</div>
                  </div>
                  <StatusBadge status={claimed.has(item.id) ? 'Claimed' : item.status} />
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                    <Package size={13} className="text-slate-400" />
                    <span>{item.quantity} · {item.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Clock size={13} className="text-slate-400" />
                    <span>Till {new Date(item.availableTill).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={cn('text-xs px-2 py-0.5 rounded-full font-medium', tagColors[tag] || 'bg-slate-100 text-slate-500 dark:bg-navy-700 dark:text-slate-400')}>
                      {tag}
                    </span>
                  ))}
                </div>

                {!isClaimed ? (
                  <Button fullWidth size="sm" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>
                    View & Claim
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-2 text-sm text-slate-400">
                    <CheckCircle2 size={14} /> <span>Already Claimed</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.foodName}
        description={`Available at ${selectedItem?.location}`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelectedItem(null)}>Cancel</Button>
            <Button loading={claiming} onClick={handleClaim}>Claim Surplus</Button>
          </>
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Quantity', val: selectedItem.quantity },
                { label: 'Servings', val: `${selectedItem.servings} servings` },
                { label: 'Location', val: selectedItem.location },
                { label: 'Category', val: selectedItem.category },
                { label: 'Prepared By', val: selectedItem.preparedBy },
                { label: 'Contact', val: selectedItem.contactPerson },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{f.val}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Description</div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{selectedItem.description}</p>
            </div>
            {selectedItem.allergens !== 'None' && (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">⚠ Allergens</div>
                <p className="text-sm text-amber-600 dark:text-amber-300">{selectedItem.allergens}</p>
              </div>
            )}
            <div className="p-3 bg-slate-50 dark:bg-navy-700 rounded-lg">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Clock size={12} /> Availability Window</div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {new Date(selectedItem.availableFrom).toLocaleString()} → {new Date(selectedItem.availableTill).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
