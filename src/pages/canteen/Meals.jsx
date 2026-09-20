import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle } from '@/components/ui/Card';
import { canteenNav } from './Dashboard';
import { mockMeals, weeklyMenu, mealTypes } from '@/data/meals';
import { cn } from '@/utils';
import { Calendar, Utensils, Users, AlertTriangle } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import Tabs from '@/components/ui/Tabs';

const mealTypeIcons = { Breakfast: '🌅', Lunch: '☀️', Snacks: '🍃', Dinner: '🌙' };

export default function CanteenMeals() {
  const [activeTab, setActiveTab] = useState('Breakfast');

  const tabs = mealTypes.map((t) => ({ label: `${mealTypeIcons[t]} ${t}`, value: t }));
  const meals = mockMeals[activeTab] || [];

  return (
    <DashboardLayout navItems={canteenNav} pageTitle="Meal Planning">
      <PageHeader title="Meal Planning" description="Manage and optimize daily meals across all serving periods." icon={Calendar} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} className="mb-5" />

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        {meals.map((meal) => {
          const wastedPct = Math.round((meal.wasted / meal.prepared) * 100);
          const servedPct = Math.round((meal.served / meal.prepared) * 100);
          return (
            <Card key={meal.id} hover>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{meal.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {meal.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-navy-700 text-slate-500 dark:text-slate-400 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800 dark:text-white">₹{meal.cost}</div>
                  <div className="text-xs text-slate-400">per serving</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                {[
                  { label: 'Prepared', val: meal.prepared, color: 'text-blue-500' },
                  { label: 'Served', val: meal.served, color: 'text-emerald-500' },
                  { label: 'Wasted', val: meal.wasted, color: 'text-red-500' },
                ].map((s) => (
                  <div key={s.label} className="p-2 bg-slate-50 dark:bg-navy-700/50 rounded-lg">
                    <div className={cn('text-lg font-bold', s.color)}>{s.served ?? s.val}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <ProgressBar value={servedPct} label={`Served ${servedPct}%`} color="green" showValue />
                <ProgressBar value={wastedPct} label={`Wasted ${wastedPct}%`} color={wastedPct > 10 ? 'red' : 'amber'} showValue />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly menu */}
      <Card padding={false}>
        <div className="p-5 border-b border-slate-100 dark:border-navy-700">
          <CardTitle>Weekly Menu Overview</CardTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>🌅 Breakfast</th>
                <th>☀️ Lunch</th>
                <th>🍃 Snacks</th>
                <th>🌙 Dinner</th>
              </tr>
            </thead>
            <tbody>
              {weeklyMenu.map((day) => (
                <tr key={day.day}>
                  <td className="font-semibold text-slate-800 dark:text-slate-200">{day.day}</td>
                  <td className="text-sm">{day.breakfast.join(', ')}</td>
                  <td className="text-sm">{day.lunch.join(', ')}</td>
                  <td className="text-sm">{day.snacks.join(', ')}</td>
                  <td className="text-sm">{day.dinner.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
