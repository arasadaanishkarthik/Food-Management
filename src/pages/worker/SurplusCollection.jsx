import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/modals/Modal';
import { useToast } from '@/context/ToastContext';
import { workerNav } from './Dashboard';
import { mockSurplusFood } from '@/data/surplusFood';
import { cn } from '@/utils';
import {
  Package, Truck, CheckCircle2, Clock, MapPin,
  ThermometerSun, ShieldCheck, Users, ArrowRight,
  Sparkles, Check
} from 'lucide-react';

export default function SurplusCollection() {
  const { showToast } = useToast();
  const [surplusList, setSurplusList] = useState(mockSurplusFood);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [tempReading, setTempReading] = useState('65');
  const [packagingCheck, setPackagingCheck] = useState(true);
  const [hygieneVerified, setHygieneVerified] = useState(true);

  const handleUpdateStatus = (id, newStatus, recipient = null) => {
    setSurplusList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              claimedBy: recipient || item.claimedBy,
            }
          : item
      )
    );
    showToast(`Surplus ${id} status updated to ${newStatus}`, 'success');
  };

  const openPickupModal = (item) => {
    setSelectedItem(item);
    setIsPickupModalOpen(true);
  };

  const confirmPickup = () => {
    if (!selectedItem) return;
    handleUpdateStatus(selectedItem.id, 'Collected', selectedItem.claimedBy || 'Campus Redistribution Unit');
    setIsPickupModalOpen(false);
    showToast(`Picked up ${selectedItem.foodName} (${selectedItem.quantity})! Safe transport initiated.`, 'success');
  };

  return (
    <DashboardLayout navItems={workerNav} pageTitle="Surplus Collection">
      <PageHeader
        title="Surplus Food Pickup & Redistribution"
        description="Safely pick up excess food batches, conduct temperature & hygiene checks, and transfer to distribution channels."
        icon={Package}
        iconColor="text-purple-500"
        iconBg="bg-purple-50 dark:bg-purple-900/20"
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Package size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Ready For Pickup</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {surplusList.filter((s) => s.status === 'Available' || s.status === 'Claimed').length} Lots
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Truck size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">In Transit / Collected</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {surplusList.filter((s) => s.status === 'Collected').length} Batches
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Redistributed Successfully</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {surplusList.filter((s) => s.status === 'Redistributed').length} Batches
            </div>
          </div>
        </Card>
      </div>

      {/* Surplus Batch Grid */}
      <div className="space-y-4">
        {surplusList.map((item) => {
          const isCollected = item.status === 'Collected';
          const isRedistributed = item.status === 'Redistributed';
          const isReady = item.status === 'Available' || item.status === 'Claimed';

          return (
            <Card key={item.id} className="transition-all hover:border-purple-300 dark:hover:border-purple-800/60">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300">
                      {item.id}
                    </span>
                    <span
                      className={cn(
                        'text-xs font-semibold px-2.5 py-0.5 rounded-full',
                        item.status === 'Available' && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                        item.status === 'Claimed' && 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                        item.status === 'Collected' && 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                        item.status === 'Redistributed' && 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400">· Prepared by {item.preparedBy}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {item.foodName} <span className="text-sm font-normal text-slate-500">({item.quantity} · ~{item.servings} servings)</span>
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                      <MapPin size={13} className="text-purple-500" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> Pickup window: {item.availableFrom.slice(11, 16)} - {item.availableTill.slice(11, 16)}
                    </span>
                    {item.claimedBy && (
                      <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium">
                        <Users size={13} /> Destination: {item.claimedBy}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-navy-700">
                  {isReady && (
                    <Button
                      variant="primary"
                      onClick={() => openPickupModal(item)}
                      className="w-full sm:w-auto"
                    >
                      <Truck size={15} className="mr-1.5" /> Start Pickup
                    </Button>
                  )}

                  {isCollected && (
                    <Button
                      variant="secondary"
                      onClick={() => handleUpdateStatus(item.id, 'Redistributed')}
                      className="w-full sm:w-auto text-purple-600 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <CheckCircle2 size={15} className="mr-1.5" /> Mark Delivered
                    </Button>
                  )}

                  {isRedistributed && (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <Check size={14} /> Completed
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Safety & Pickup Modal */}
      {selectedItem && (
        <Modal
          isOpen={isPickupModalOpen}
          onClose={() => setIsPickupModalOpen(false)}
          title={`Safety Checklist & Pickup: ${selectedItem.foodName}`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
              <div className="font-semibold text-purple-900 dark:text-purple-200 text-sm">
                Batch {selectedItem.id} ({selectedItem.quantity})
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Pickup point: {selectedItem.location} | Assigned Destination: {selectedItem.claimedBy || 'Campus Surplus Shelf / NGO Partner'}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Safety & Hygiene Verification
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1.5">
                    <ThermometerSun size={14} className="text-amber-500" /> Food Temperature (°C):
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Safe Standard (Above 60°C for Hot)</span>
                </label>
                <input
                  type="number"
                  value={tempReading}
                  onChange={(e) => setTempReading(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={packagingCheck}
                  onChange={(e) => setPackagingCheck(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <span>Thermal insulated food-grade containers secured & sealed</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-700 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={hygieneVerified}
                  onChange={(e) => setHygieneVerified(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                />
                <span>Visual freshness and sensory test passed (No off-odors)</span>
              </label>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-navy-700">
              <Button
                variant="ghost"
                onClick={() => setIsPickupModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmPickup}
                disabled={!packagingCheck || !hygieneVerified}
                className="flex-1"
              >
                <ShieldCheck size={16} className="mr-1.5" /> Confirm Safe Pickup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
