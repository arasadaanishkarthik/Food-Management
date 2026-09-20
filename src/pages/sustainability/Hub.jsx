import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';
import { sustainabilityMetrics, monthlyImpact } from '@/data/analytics';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import {
  Leaf, Trees, Droplets, HeartHandshake, Award, Sparkles,
  ArrowRight, ShieldCheck, TrendingUp, Users, CheckCircle,
  Sun, Moon, Home, BarChart3, Trophy, Flame
} from 'lucide-react';

export default function SustainabilityHub() {
  const { showToast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [pledgesCount, setPledgesCount] = useState(1482);
  const [hasPledged, setHasPledged] = useState(false);

  const handlePledge = () => {
    if (!hasPledged) {
      setPledgesCount(prev => prev + 1);
      setHasPledged(true);
      showToast('🎉 Thank you for signing the Campus Zero-Waste Pledge!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 text-slate-900 dark:text-slate-100 transition-colors">
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
            <Link to="/sustainability" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-700 text-emerald-600 dark:text-emerald-400 shadow-sm">
              Overview Hub
            </Link>
            <Link to="/sustainability/analytics" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
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
            <Link to="/select-role">
              <Button size="sm" variant="primary">
                Open Portals →
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner with Campus Eco Grade */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 p-6 sm:p-10 text-white shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={14} /> Official Campus Green Report 2024
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Empowering Zero-Waste Dining Across Our Campus
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                Through smart dining inventory, student reporting, and swift surplus food redistribution, our university is setting a benchmark for collegiate environmental leadership.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handlePledge}
                  disabled={hasPledged}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                    hasPledged
                      ? 'bg-emerald-400 text-slate-900 cursor-default'
                      : 'bg-white text-emerald-800 hover:bg-emerald-50 hover:scale-[1.02]'
                  }`}
                >
                  <HeartHandshake size={18} />
                  {hasPledged ? 'Pledge Signed! 🌿' : 'Sign Zero-Waste Pledge'}
                </button>
                <Link to="/sustainability/analytics">
                  <button className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md flex items-center gap-2">
                    <BarChart3 size={18} /> View Detailed Intelligence
                  </button>
                </Link>
              </div>
            </div>

            {/* Campus Sustainability Score Gauge */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-200 block mb-1">
                Campus Sustainability Score
              </span>
              <div className="text-6xl font-black tracking-tighter text-white my-1">
                94<span className="text-2xl text-emerald-300 font-semibold">/100</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-bold my-2">
                <ShieldCheck size={14} /> Grade A+ · Top 5% University Rank
              </div>
              <p className="text-[11px] text-emerald-100/80 mt-2">
                Based on waste diversion efficiency, surplus recovery volume, and student participation.
              </p>
            </div>
          </div>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Leaf size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {sustainabilityMetrics.totalWasteReduced} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Food Waste Diverted</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-2">
              <TrendingUp size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
              {sustainabilityMetrics.co2Saved} <span className="text-xs text-slate-400 font-normal">kg</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">CO2 Emissions Prevented</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-2">
              <HeartHandshake size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              {sustainabilityMetrics.mealsRedistributed}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Surplus Meals Rescued</div>
          </Card>

          <Card className="text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
              <Droplets size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {sustainabilityMetrics.waterSaved.toLocaleString()} <span className="text-xs text-slate-400 font-normal">L</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Water Conserved</div>
          </Card>

          <Card className="text-center col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Trees size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {sustainabilityMetrics.treesEquivalent}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Tree Offsets Equivalent</div>
          </Card>
        </div>

        {/* Monthly Trend Area Chart & Diversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CardTitle>Campus Environmental Impact Trajectory</CardTitle>
                  <CardDescription>Monthly CO2 offset (kg) & meals redistributed to community</CardDescription>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  +34% Improvement YoY
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyImpact} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="mealsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
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
                    <Area type="monotone" dataKey="co2" name="CO2 Saved (kg)" stroke="#10b981" fillOpacity={1} fill="url(#co2Grad)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="meals" name="Meals Saved" stroke="#8b5cf6" fillOpacity={1} fill="url(#mealsGrad)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Waste Diversion Streams */}
          <div className="lg:col-span-4">
            <Card>
              <CardTitle className="mb-1">Where Does Diverted Food Go?</CardTitle>
              <CardDescription className="mb-4">100% circular campus waste pipeline</CardDescription>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-purple-600 dark:text-purple-400">Surplus Food Donation</span>
                    <span>42%</span>
                  </div>
                  <ProgressBar value={42} color="purple" className="h-2" />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Hostels, NGO partners & student shelters</span>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400">Campus Bio-Gas Reactor</span>
                    <span>35%</span>
                  </div>
                  <ProgressBar value={35} color="emerald" className="h-2" />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Clean energy for kitchen water heaters</span>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-amber-600 dark:text-amber-400">Organic Vermi-Composting</span>
                    <span>18%</span>
                  </div>
                  <ProgressBar value={18} color="amber" className="h-2" />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Nutrient fertilizer for campus botanical garden</span>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-blue-600 dark:text-blue-400">Animal Feed Unit</span>
                    <span>5%</span>
                  </div>
                  <ProgressBar value={5} color="blue" className="h-2" />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Safe scraps for local dairy farm partnerships</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Community Champions & Zero-Waste Pledges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Trophy className="text-amber-500" size={20} />
                <CardTitle>Green Champions Leaderboard</CardTitle>
              </div>
              <Link to="/sustainability/achievements" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Hostel A Dining Committee', points: '1,420 pts', rank: '🥇 #1', desc: 'Lowest per-capita plate waste this semester' },
                { name: 'Dr. Priya Menon (Food Tech Dept)', points: '980 pts', rank: '🥈 #2', desc: 'Conducted 4 food optimization audits' },
                { name: 'Arjun Sharma (Student Rep)', points: '860 pts', rank: '🥉 #3', desc: 'Reported 14 surplus instances' },
              ].map((champ, idx) => (
                <div key={champ.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-800/80 border border-slate-100 dark:border-navy-700">
                  <div>
                    <div className="font-semibold text-sm text-slate-800 dark:text-slate-100">{champ.name}</div>
                    <div className="text-xs text-slate-400">{champ.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-amber-500">{champ.rank}</div>
                    <div className="text-xs font-mono font-medium text-slate-500">{champ.points}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Flame className="text-rose-500" size={20} />
                <CardTitle>Campus Zero-Waste Pledge Counter</CardTitle>
              </div>
              <CardDescription>
                Over <strong className="text-slate-700 dark:text-slate-200">{pledgesCount.toLocaleString()}</strong> students and faculty members have taken the pledge to avoid plate waste.
              </CardDescription>

              <div className="my-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-center">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                  Community Pledge Goal (2,000)
                </span>
                <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1 mb-2">
                  {Math.round((pledgesCount / 2000) * 100)}% Reached
                </div>
                <ProgressBar value={Math.round((pledgesCount / 2000) * 100)} color="emerald" className="h-3 max-w-sm mx-auto" />
              </div>
            </div>

            <Button
              onClick={handlePledge}
              disabled={hasPledged}
              variant={hasPledged ? "secondary" : "primary"}
              className="w-full py-3"
            >
              {hasPledged ? 'You Have Pledged for Zero Waste 🌿' : 'Add Your Name to the Pledge'}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
