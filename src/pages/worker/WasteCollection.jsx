import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import Input from '@/components/ui/Input';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/context/ToastContext';
import { workerNav } from './Dashboard';
import { wasteLocations, foodTypes } from '@/data/wasteReports';
import { cn } from '@/utils';
import {
  Trash2, Scale, QrCode, PlusCircle, CheckCircle2,
  Building, Calendar, Download, RefreshCw, Layers
} from 'lucide-react';

const initialLogs = [
  { id: 'WCL-101', location: 'Main Canteen', type: 'Rice & Grains', weightKg: 14.5, binId: 'BIN-MC-04', time: '14:10', destination: 'Bio-Gas Plant' },
  { id: 'WCL-102', location: 'Hostel A Mess', type: 'Cooked Vegetables', weightKg: 8.2, binId: 'BIN-HA-01', time: '13:45', destination: 'Compost Pit 2' },
  { id: 'WCL-103', location: 'Faculty Canteen', type: 'Bakery & Bread', weightKg: 3.8, binId: 'BIN-FC-02', time: '11:30', destination: 'Animal Feed Unit' },
  { id: 'WCL-104', location: 'Hostel C Mess', type: 'Mixed Food Waste', weightKg: 18.0, binId: 'BIN-HC-03', time: '09:20', destination: 'Bio-Gas Plant' },
];

export default function WasteCollection() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState(initialLogs);
  const [location, setLocation] = useState('Main Canteen');
  const [foodCategory, setFoodCategory] = useState('Rice');
  const [weight, setWeight] = useState('');
  const [binId, setBinId] = useState('BIN-MC-01');
  const [destination, setDestination] = useState('Bio-Gas Plant');
  const [isScanning, setIsScanning] = useState(false);

  const totalCollectedToday = logs.reduce((sum, item) => sum + item.weightKg, 0);
  const dailyTarget = 150;
  const progressPercent = Math.min(100, Math.round((totalCollectedToday / dailyTarget) * 100));

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockBins = ['BIN-MC-04 (Main Canteen)', 'BIN-HA-02 (Hostel A)', 'BIN-HB-01 (Hostel B)', 'BIN-FC-03 (Faculty)'];
      const randomBin = mockBins[Math.floor(Math.random() * mockBins.length)];
      setBinId(randomBin.split(' ')[0]);
      setIsScanning(false);
      showToast(`QR Code Scanned: ${randomBin}`, 'success');
    }, 1000);
  };

  const handleLogCollection = (e) => {
    e.preventDefault();
    if (!weight || parseFloat(weight) <= 0) {
      showToast('Please enter a valid weight in kg', 'error');
      return;
    }

    const newEntry = {
      id: `WCL-${Math.floor(100 + Math.random() * 900)}`,
      location,
      type: foodCategory,
      weightKg: parseFloat(weight),
      binId: binId || 'BIN-GEN-01',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      destination,
    };

    setLogs([newEntry, ...logs]);
    setWeight('');
    showToast(`Successfully logged ${newEntry.weightKg} kg of ${newEntry.type} from ${newEntry.location}`, 'success');
  };

  return (
    <DashboardLayout navItems={workerNav} pageTitle="Waste Collection">
      <PageHeader
        title="Waste Collection & Scale Entry"
        description="Record verified weight measurements from campus bins and dining disposal stations."
        icon={Trash2}
        iconColor="text-emerald-500"
        iconBg="bg-emerald-50 dark:bg-emerald-900/20"
      />

      {/* Progress & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daily Collection Goal</span>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {totalCollectedToday.toFixed(1)} <span className="text-sm font-normal text-slate-500">/ {dailyTarget} kg</span>
              </div>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
              {progressPercent}% Met
            </span>
          </div>
          <ProgressBar value={progressPercent} color="emerald" className="h-2.5 mt-2" />
          <p className="text-xs text-slate-400 mt-2">
            Remaining to target: {(Math.max(0, dailyTarget - totalCollectedToday)).toFixed(1)} kg. All collected waste is processed for biogas & organic compost.
          </p>
        </Card>

        <Card>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Logs Today</div>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{logs.length} collections</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mt-3 font-medium">
            <CheckCircle2 size={14} /> 100% Segregated & Scaled
          </div>
        </Card>
      </div>

      {/* Main Form & Live Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Logger Form */}
        <div className="lg:col-span-5">
          <Card>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-navy-700">
              <Scale className="text-emerald-500" size={20} />
              <CardTitle>Log Weight Measurement</CardTitle>
            </div>

            <form onSubmit={handleLogCollection} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Collection Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {wasteLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Food Category
                  </label>
                  <select
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Disposal Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Bio-Gas Plant">Bio-Gas Plant</option>
                    <option value="Compost Pit 1">Compost Pit 1</option>
                    <option value="Compost Pit 2">Compost Pit 2</option>
                    <option value="Animal Feed Unit">Animal Feed Unit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Scale Reading (Weight in kg) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 12.4"
                    className="w-full pl-3 pr-12 py-2.5 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    KG
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Bin Identifier / QR Code
                  </label>
                  <button
                    type="button"
                    onClick={handleSimulateScan}
                    disabled={isScanning}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <QrCode size={12} /> {isScanning ? 'Scanning...' : 'Scan QR Code'}
                  </button>
                </div>
                <input
                  type="text"
                  value={binId}
                  onChange={(e) => setBinId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2">
                <PlusCircle size={16} className="mr-1.5" /> Save Collection Log
              </Button>
            </form>
          </Card>
        </div>

        {/* Live Logs Table */}
        <div className="lg:col-span-7">
          <Card padding={false}>
            <div className="p-4 border-b border-slate-100 dark:border-navy-700 flex items-center justify-between">
              <div>
                <CardTitle>Today's Waste Logs</CardTitle>
                <CardDescription>Verified entries logged by digital scale sync</CardDescription>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => showToast('Exporting waste log manifest as CSV...', 'info')}
              >
                <Download size={14} className="mr-1" /> Export CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-navy-900/60 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100 dark:border-navy-700">
                  <tr>
                    <th className="p-3 pl-4">ID / Time</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Waste Category</th>
                    <th className="p-3">Weight</th>
                    <th className="p-3 pr-4">Destination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-700">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-navy-700/40 transition-colors">
                      <td className="p-3 pl-4">
                        <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{log.id}</div>
                        <div className="text-[11px] text-slate-400">{log.time}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                        {log.location}
                        <div className="text-[11px] font-mono text-slate-400">{log.binId}</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-navy-700 text-slate-700 dark:text-slate-300">
                          {log.type}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                        {log.weightKg} kg
                      </td>
                      <td className="p-3 pr-4 text-xs text-slate-600 dark:text-slate-400">
                        {log.destination}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
