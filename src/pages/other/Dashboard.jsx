import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { FadeUp } from '@/components/animations';
import { sustainabilityMetrics } from '@/data/analytics';
import { mockSurplusFood } from '@/data/surplusFood';
import { mockWasteReports } from '@/data/wasteReports';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, AlertTriangle, Package, Activity,
  Sparkles, Leaf, ArrowRight, HeartHandshake, MapPin, Clock
} from 'lucide-react';

export const otherNav = [
  { items: [
    { label: 'Dashboard', path: '/other/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Report Waste', path: '/other/report-waste', icon: AlertTriangle },
    { label: 'Surplus Food', path: '/other/surplus', icon: Package },
    { label: 'My Activity', path: '/other/activity', icon: Activity },
  ]},
];

export default function OtherDashboard() {
  const availableSurplus = mockSurplusFood.filter(s => s.status === 'Available');
  const otherReports = mockWasteReports.filter(r => r.reporterRole === 'other');

  return (
    <DashboardLayout navItems={otherNav} pageTitle="Campus Community Hub">
      <PageHeader
        title="Welcome to Campus Food Care"
        description="Join our zero-waste initiative. Discover available surplus meals, report wasted food, and help create a sustainable campus."
        icon={HeartHandshake}
        iconColor="text-pink-500"
        iconBg="bg-pink-50 dark:bg-pink-900/20"
      />

      {/* Hero Action Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 p-6 md:p-8 text-white shadow-lg mb-6">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Campus Sustainability Initiative
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Every Plate Saved Counts Toward a Greener Tomorrow
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-6 leading-relaxed">
            Spotted excess food at an event or dining area? Have leftover refreshments from a campus meeting? Report it instantly or share surplus meals with peers!
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/other/report-waste">
              <Button className="bg-white text-rose-600 hover:bg-slate-100 font-bold shadow-md border-0">
                <AlertTriangle size={16} className="mr-1.5" /> Report Food Waste
              </Button>
            </Link>
            <Link to="/other/surplus">
              <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-white/30 font-semibold">
                <Package size={16} className="mr-1.5" /> Explore Surplus Food
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FadeUp>
          <StatCard
            title="Available Surplus"
            value={`${availableSurplus.length} Lots`}
            icon={Package}
            iconColor="text-pink-500"
            iconBg="bg-pink-50 dark:bg-pink-900/20"
          />
        </FadeUp>
        <FadeUp delay={70}>
          <StatCard
            title="Campus Food Rescued"
            value={`${sustainabilityMetrics.mealsRedistributed} meals`}
            icon={HeartHandshake}
            trend={{ value: 14, direction: 'up', label: 'this month' }}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50 dark:bg-emerald-900/20"
          />
        </FadeUp>
        <FadeUp delay={140}>
          <StatCard
            title="CO2 Emissions Saved"
            value={`${sustainabilityMetrics.co2Saved} kg`}
            icon={Leaf}
            iconColor="text-teal-500"
            iconBg="bg-teal-50 dark:bg-teal-900/20"
          />
        </FadeUp>
        <FadeUp delay={210}>
          <StatCard
            title="My Contributions"
            value={`${otherReports.length} Reports`}
            icon={Activity}
            iconColor="text-purple-500"
            iconBg="bg-purple-50 dark:bg-purple-900/20"
          />
        </FadeUp>
      </div>

      {/* Two Column Section: Live Surplus & Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Available Surplus Highlights */}
        <div className="lg:col-span-7">
          <Card padding={false}>
            <div className="p-4 border-b border-slate-100 dark:border-navy-700 flex items-center justify-between">
              <div>
                <CardTitle>Available Surplus Meals Nearby</CardTitle>
                <CardDescription>Fresh food batches ready for campus community members</CardDescription>
              </div>
              <Link to="/other/surplus" className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1">
                View All ({availableSurplus.length}) <ArrowRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-navy-700">
              {availableSurplus.slice(0, 3).map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 dark:hover:bg-navy-700/50 transition-colors flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{item.foodName}</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-rose-500" /> {item.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> Till {item.availableTill.slice(11, 16)}</span>
                    </div>
                  </div>
                  <Link to="/other/surplus">
                    <Button size="sm" variant="secondary" className="text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900/20">
                      Claim Meal
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sustainability Action Hub */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <CardTitle>Campus Eco-Impact</CardTitle>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Our campus community has diverted over <strong>{sustainabilityMetrics.totalWasteReduced} kg</strong> of food from landfills, saving the equivalent of <strong>{sustainabilityMetrics.treesEquivalent} mature trees</strong>!
            </p>
            <Link to="/sustainability" className="block">
              <Button variant="secondary" className="w-full text-xs">
                View Campus Sustainability Hub →
              </Button>
            </Link>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-navy-900 text-white border-none">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Organizing an event?</span>
              <span className="text-lg">🍱</span>
            </div>
            <h4 className="font-bold text-sm mb-1 text-slate-100">Plan Ahead for Zero Waste</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Book surplus redistribution in advance for department gatherings, conferences, or student club events.
            </p>
            <Link to="/other/report-waste">
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white w-full border-0 text-xs">
                Notify Surplus Food Team
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
