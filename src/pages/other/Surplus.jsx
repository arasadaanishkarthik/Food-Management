import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import Modal from '@/components/modals/Modal';
import { useToast } from '@/context/ToastContext';
import { otherNav } from './Dashboard';
import { mockSurplusFood } from '@/data/surplusFood';
import { cn } from '@/utils';
import {
  Package, Search, Filter, MapPin, Clock, Users,
  CheckCircle2, Sparkles, AlertCircle, QrCode, Share2
} from 'lucide-react';

export default function OtherSurplus() {
  const { showToast } = useToast();
  const [surplusItems, setSurplusItems] = useState(mockSurplusFood);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimName, setClaimName] = useState('Ananya Roy');
  const [claimOrg, setClaimOrg] = useState('Community / Visitor');
  const [claimedPass, setClaimedPass] = useState(null);

  const filteredItems = surplusItems.filter((item) => {
    const matchesSearch = item.foodName.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenClaim = (item) => {
    setSelectedItem(item);
    setClaimedPass(null);
    setIsClaimModalOpen(true);
  };

  const confirmClaim = () => {
    if (!selectedItem) return;
    const passCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    setSurplusItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, status: 'Claimed', claimedBy: `${claimName} (${claimOrg})` }
          : item
      )
    );
    setClaimedPass(passCode);
    showToast(`Claim confirmed for ${selectedItem.foodName}! Pass: ${passCode}`, 'success');
  };

  return (
    <DashboardLayout navItems={otherNav} pageTitle="Available Surplus">
      <PageHeader
        title="Campus Surplus Food Portal"
        description="Fresh, edible surplus meals made available across campus kitchens for students, staff, and visitors."
        icon={Package}
        iconColor="text-pink-500"
        iconBg="bg-pink-50 dark:bg-pink-900/20"
      />

      {/* Filter and Search Bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search surplus meals, dietary tags, or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:border-pink-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400 ml-1" />
            <span className="text-xs text-slate-400 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-pink-500"
            >
              <option value="All">All Categories</option>
              <option value="Rice">Rice & Biryani</option>
              <option value="Dal">Dal & Curries</option>
              <option value="Bread">Bread & Bakery</option>
              <option value="Fruits">Fruits & Produce</option>
              <option value="Curry">Special Curries</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Grid of Surplus Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isAvailable = item.status === 'Available';

          return (
            <Card
              key={item.id}
              className={cn(
                'flex flex-col justify-between transition-all hover:shadow-lg',
                !isAvailable && 'opacity-75 border-slate-200/60 dark:border-navy-700/60'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-slate-400">{item.id}</span>
                  <span
                    className={cn(
                      'text-xs font-semibold px-2.5 py-0.5 rounded-full',
                      item.status === 'Available' && 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                      item.status === 'Claimed' && 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                      item.status === 'Redistributed' && 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                      item.status === 'Collected' && 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1">
                  {item.foodName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-700 text-slate-600 dark:text-slate-300 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.allergens && item.allergens !== 'None' && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      Contains: {item.allergens}
                    </span>
                  )}
                </div>

                {/* Info Pills */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-navy-700 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Available Quantity:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{item.quantity} (~{item.servings} servings)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <MapPin size={12} className="text-pink-500" /> {item.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pickup Until:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <Clock size={12} /> {item.availableTill.slice(11, 16)} Today
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-700">
                {isAvailable ? (
                  <Button
                    variant="primary"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                    onClick={() => handleOpenClaim(item)}
                  >
                    Claim Food Lot
                  </Button>
                ) : (
                  <div className="text-xs text-slate-400 text-center py-2 bg-slate-50 dark:bg-navy-900 rounded-lg">
                    Claimed by {item.claimedBy || 'Redistribution Partner'}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Claim Modal */}
      {selectedItem && (
        <Modal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          title={claimedPass ? 'Surplus Pickup Pass' : `Claim Surplus: ${selectedItem.foodName}`}
        >
          {claimedPass ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pickup Pass Generated</h3>
                <p className="text-xs text-slate-400 mt-0.5">Show this pass at the pickup station</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-xl max-w-xs mx-auto">
                <div className="font-mono text-xl font-extrabold text-pink-600 dark:text-pink-400 tracking-wider">
                  {claimedPass}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <strong>Pickup Point:</strong> {selectedItem.location}<br />
                  <strong>Valid Till:</strong> {selectedItem.availableTill.slice(11, 16)} Today
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setIsClaimModalOpen(false)}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              >
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800/40 text-xs text-pink-900 dark:text-pink-200">
                You are claiming <strong>{selectedItem.foodName} ({selectedItem.quantity})</strong> from <strong>{selectedItem.location}</strong>.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Recipient Name / Representative
                </label>
                <input
                  type="text"
                  value={claimName}
                  onChange={(e) => setClaimName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Organization / Purpose
                </label>
                <input
                  type="text"
                  value={claimOrg}
                  onChange={(e) => setClaimOrg(e.target.value)}
                  placeholder="e.g. Student Club, Evening Study Group, Campus Guest"
                  className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-navy-700">
                <Button variant="ghost" onClick={() => setIsClaimModalOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmClaim} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white">
                  Confirm & Generate Pass
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </DashboardLayout>
  );
}
