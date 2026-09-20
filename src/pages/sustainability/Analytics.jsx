import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';
import {
  wasteByMonth, wasteByCategory, locationWaste, sustainabilityMetrics
} from '@/data/analytics';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';
import {
  Leaf, Download, Calendar, Filter, ArrowLeft,
  DollarSign, Droplets, Trees, Wind, Building2, Sun, Moon
} from 'lucide-react';

export default function SustainabilityAnalytics() {
  const { showToast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [timeRange, setTimeRange] = useState('Fall 2024');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-slate-100 transition-colors pb-12">
      {/* Top Public Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md border-b border-slate-200/80 dark:border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <Leaf size={20} />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                EcoCampus
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                Sustainability Center
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-navy-900 p-1 rounded-xl">
            <Link to="/sustainability" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
              Overview Hub
            </Link>
            <Link to="/sustainability/analytics" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-700 text-emerald-600 dark:text-emerald-400 shadow-sm">
              Impact Analytics
            </Link>
            <Link to="/sustainability/achievements" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
              Achievements & Badges
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => showToast('Compiling comprehensive ESG sustainability audit PDF...', 'info')}
            >
              <Download size={14} className="mr-1.5" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Campus Sustainability Intelligence
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Data-backed ecological metrics, food waste trends, and resource conservation analytics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 shadow-sm"
            >
              <option value="Fall 2024">Current Semester (Fall 2024)</option>
              <option value="Spring 2024">Spring 2024</option>
              <option value="Full Year 2024">Academic Year 2023-24</option>
            </select>
          </div>
        </div>

        {/* Financial & Resource Value Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">Total Money Saved</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ₹{sustainabilityMetrics.moneySaved.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">Prevented procurement losses</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">Water Footprint</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Droplets size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {sustainabilityMetrics.waterSaved.toLocaleString()} L
            </div>
            <p className="text-xs text-slate-400 mt-1">Agricultural water preserved</p>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border-teal-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">GHG Avoidance</span>
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Wind size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {sustainabilityMetrics.co2Saved} kg CO2e
            </div>
            <p className="text-xs text-slate-400 mt-1">Methane & landfill mitigation</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent border-purple-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">Reduction Progress</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Leaf size={18} />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {sustainabilityMetrics.wasteReductionPercent}% Less
            </div>
            <p className="text-xs text-slate-400 mt-1">Plate waste drop this year</p>
          </Card>
        </div>

        {/* Chart 1: Monthly Waste vs Target & Chart 2: Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle>Waste Reduction vs Monthly Target</CardTitle>
                  <CardDescription>Target vs actual waste recorded (kg/month)</CardDescription>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wasteByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="waste" name="Actual Waste (kg)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reduced" name="Surplus Rescued (kg)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="target" name="Campus Target Ceiling" stroke="#3b82f6" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card>
              <CardTitle className="mb-1">Food Waste by Category</CardTitle>
              <CardDescription className="mb-3">Distribution of recorded discard streams</CardDescription>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteByCategory}
                      dataKey="kg"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {wasteByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-navy-700">
                {wasteByCategory.slice(0, 4).map((cat) => (
                  <div key={cat.category} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-600 dark:text-slate-400 truncate">{cat.category}: <strong>{cat.percentage}%</strong></span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Location Performance Table */}
        <Card padding={false}>
          <div className="p-4 border-b border-slate-100 dark:border-navy-700 flex items-center justify-between">
            <div>
              <CardTitle>Location-wise Waste & Eco Performance</CardTitle>
              <CardDescription>Monitored dining halls, hostels, and cafeteria units</CardDescription>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-navy-900/60 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100 dark:border-navy-700">
                <tr>
                  <th className="p-3 pl-4">Campus Location</th>
                  <th className="p-3">Monthly Waste (kg)</th>
                  <th className="p-3">Incident Reports</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3 pr-4">Action Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-navy-700">
                {locationWaste.map((loc) => (
                  <tr key={loc.location} className="hover:bg-slate-50/80 dark:hover:bg-navy-700/40">
                    <td className="p-3 pl-4 font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Building2 size={15} className="text-emerald-500 shrink-0" />
                      {loc.location}
                    </td>
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-300">
                      {loc.waste} kg
                    </td>
                    <td className="p-3 text-xs text-slate-500 dark:text-slate-400">
                      {loc.reports} reports logged
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          loc.status === 'High'
                            ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            : loc.status === 'Medium'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        }`}
                      >
                        {loc.status} Waste Level
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-xs text-slate-500 dark:text-slate-400">
                      {loc.status === 'High' ? 'Automated batch size curtailment' : loc.status === 'Medium' ? 'Surplus alert trigger' : 'Optimal operations standard'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
