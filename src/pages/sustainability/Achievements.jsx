import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/context/ToastContext';
import { useTheme } from '@/context/ThemeContext';
import { achievements } from '@/data/analytics';
import {
  Leaf, Trophy, Award, Sparkles, CheckCircle2, Lock,
  Flame, Gift, Star, ArrowRight, Sun, Moon, ShieldCheck
} from 'lucide-react';

const challenges = [
  { id: 'CHL-1', title: 'Zero Plate Waste Week', target: '7 consecutive zero-waste meals', progress: 5, total: 7, reward: '150 Eco Points', endsIn: '3 days left' },
  { id: 'CHL-2', title: 'Community Surplus Rescue', target: 'Claim or redistribute 3 surplus packs', progress: 3, total: 3, reward: '200 Eco Points', endsIn: 'Completed 🎉' },
  { id: 'CHL-3', title: 'Campus Waste Spotter', target: 'Submit 5 verified food waste reports', progress: 4, total: 5, reward: '100 Eco Points', endsIn: '5 days left' },
];

const rewards = [
  { id: 'RWD-1', title: 'Campus Green Café ₹100 Coupon', points: 300, icon: '☕', desc: 'Valid at Library & Main Canteen beverage kiosks' },
  { id: 'RWD-2', title: 'Eco-Friendly Steel Water Bottle', points: 600, icon: '🍶', desc: 'Custom laser engraved Campus Sustainability edition' },
  { id: 'RWD-3', title: 'Botanical Garden Tree Dedication', points: 1000, icon: '🌳', desc: 'A sapling planted in your honor with GPS certificate' },
];

export default function SustainabilityAchievements() {
  const { showToast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [userPoints, setUserPoints] = useState(480);

  const handleClaimReward = (reward) => {
    if (userPoints < reward.points) {
      showToast(`You need ${reward.points - userPoints} more Eco Points to redeem this reward!`, 'error');
      return;
    }
    setUserPoints(prev => prev - reward.points);
    showToast(`🎉 Successfully redeemed "${reward.title}"! Voucher code sent to your campus email.`, 'success');
  };

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
            <Link to="/sustainability/analytics" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
              Impact Analytics
            </Link>
            <Link to="/sustainability/achievements" className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-700 text-emerald-600 dark:text-emerald-400 shadow-sm">
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
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Star size={14} className="fill-emerald-500 text-emerald-500" />
              <span>{userPoints} Eco Points</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Tier Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Trophy size={14} /> Level 3 · Sustainability Champion
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Gamified Campus Eco-Leaderboard
            </h1>
            <p className="text-white/90 text-xs sm:text-sm max-w-xl leading-relaxed">
              Earn Eco Points by reporting food waste, rescuing surplus cafeteria meals, and attending green events. Redeem points for real campus perks!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center shrink-0 w-full sm:w-auto">
            <span className="text-xs text-amber-100 uppercase tracking-wider font-semibold block mb-1">
              Next Tier: Eco Guardian (600 pts)
            </span>
            <div className="text-2xl font-black">{userPoints} / 600 pts</div>
            <ProgressBar value={Math.round((userPoints / 600) * 100)} color="emerald" className="h-2.5 w-48 mx-auto mt-2 bg-white/20" />
          </div>
        </div>

        {/* Section 1: Badges Showcase */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Award className="text-emerald-500" size={20} /> Campus Eco Badges
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Unlock official green credentials for your profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <Card
                key={ach.id}
                className={`transition-all hover:shadow-md ${
                  ach.earned
                    ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent'
                    : 'opacity-70 border-dashed'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 ${
                    ach.earned ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-slate-100 dark:bg-navy-700'
                  }`}>
                    {ach.icon}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{ach.title}</h3>
                      {ach.earned ? (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full shrink-0">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-0.5 shrink-0">
                          <Lock size={10} /> Locked
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {ach.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span>+{ach.points} Eco Points</span>
                      {ach.earned && <span className="text-slate-400 font-normal">Earned {ach.earnedAt}</span>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: Active Challenges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Flame className="text-rose-500" size={20} /> Active Sustainability Challenges
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Compete with friends and dorm blocks to win extra points</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((chl) => {
              const isDone = chl.progress >= chl.total;
              return (
                <Card key={chl.id} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                        <Flame size={13} /> {chl.endsIn}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                        {chl.reward}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{chl.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{chl.target}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                        <span>Progress: {chl.progress} / {chl.total}</span>
                        <span>{Math.round((chl.progress / chl.total) * 100)}%</span>
                      </div>
                      <ProgressBar value={Math.round((chl.progress / chl.total) * 100)} color={isDone ? 'emerald' : 'rose'} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-700">
                    <div className={`text-xs font-semibold text-center py-1.5 rounded-lg ${
                      isDone ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-50 text-slate-600 dark:bg-navy-900 dark:text-slate-400'
                    }`}>
                      {isDone ? 'Challenge Completed ✅' : 'In Progress'}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 3: Rewards Store */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Gift className="text-purple-500" size={20} /> Eco-Points Rewards Store
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Trade your sustainability points for sustainable campus merchandise</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((rwd) => {
              const canAfford = userPoints >= rwd.points;
              return (
                <Card key={rwd.id} className="flex flex-col justify-between">
                  <div>
                    <div className="text-3xl mb-2">{rwd.icon}</div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{rwd.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{rwd.desc}</p>
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
                      Cost: {rwd.points} Eco Points
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-700">
                    <Button
                      variant={canAfford ? 'primary' : 'secondary'}
                      size="sm"
                      className="w-full"
                      onClick={() => handleClaimReward(rwd)}
                    >
                      {canAfford ? 'Redeem Voucher' : `Need ${rwd.points - userPoints} more pts`}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
