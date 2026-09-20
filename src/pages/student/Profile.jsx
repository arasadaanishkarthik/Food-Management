import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { Input, Select } from '@/components/ui/FormElements';
import Avatar from '@/components/common/Avatar';
import ProgressBar from '@/components/ui/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { studentNav } from './Dashboard';
import { studentStats, achievements } from '@/data/analytics';
import { User, Moon, Sun, Bell, Shield, Edit3, Save } from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '', phone: user?.phone || '',
    hostel: user?.hostel || '', department: user?.department || '',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
      toast.success('Profile Updated', 'Your profile has been saved.');
    }, 1200);
  };

  return (
    <DashboardLayout navItems={studentNav} pageTitle="Profile">
      <PageHeader title="My Profile" description="Manage your account settings and preferences." icon={User} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <Avatar name={user?.name} size="2xl" className="mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{user?.email}</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium mb-4">
            <Shield size={11} /> Student
          </div>

          <div className="w-full space-y-2 text-left">
            {[
              { label: 'Roll No', val: user?.rollNo },
              { label: 'Department', val: user?.department },
              { label: 'Year', val: user?.year },
            ].map((f) => (
              <div key={f.label} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-navy-700 last:border-0">
                <span className="text-xs text-slate-400">{f.label}</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{f.val}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 w-full p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{studentStats.sustainabilityPoints}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Sustainability Points</div>
            <div className="mt-2 text-xs text-slate-400">Rank #{studentStats.rank} of {studentStats.totalStudents.toLocaleString()}</div>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Edit Info */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Personal Information</CardTitle>
              {!editing ? (
                <Button variant="secondary" size="sm" icon={Edit3} onClick={() => setEditing(true)}>Edit</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                  <Button size="sm" icon={Save} loading={saving} onClick={handleSave}>Save</Button>
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', field: 'name' },
                { label: 'Phone', field: 'phone' },
                { label: 'Hostel', field: 'hostel' },
                { label: 'Department', field: 'department' },
              ].map((f) => editing ? (
                <Input key={f.field} label={f.label} value={formData[f.field]}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })} />
              ) : (
                <div key={f.field}>
                  <div className="text-xs text-slate-400 mb-0.5">{f.label}</div>
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{formData[f.field] || '—'}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Preferences */}
          <Card>
            <CardTitle className="mb-4">Preferences</CardTitle>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-navy-700">
              <div className="flex items-center gap-3">
                {isDark ? <Moon size={18} className="text-slate-400" /> : <Sun size={18} className="text-amber-500" />}
                <div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Theme</div>
                  <div className="text-xs text-slate-400">{isDark ? 'Dark mode' : 'Light mode'}</div>
                </div>
              </div>
              <button onClick={toggleTheme}
                className={`relative w-11 h-6 rounded-full transition-colors ${isDark ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-slate-400" />
                <div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Notifications</div>
                  <div className="text-xs text-slate-400">Surplus & report updates</div>
                </div>
              </div>
              <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <CardTitle className="mb-4">My Achievements</CardTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  a.earned
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-navy-700/50 border-slate-100 dark:border-navy-700 opacity-50'
                }`}>
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 dark:text-white truncate">{a.title}</div>
                    <div className="text-xs text-slate-400 truncate">{a.description}</div>
                    {a.earned && <div className="text-xs text-emerald-500 mt-0.5">+{a.points} pts earned</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardTitle className="mb-4">Activity Summary</CardTitle>
            <div className="space-y-3">
              {[
                { label: 'Meals Consumed', val: studentStats.mealsConsumed, max: 365, color: 'blue' },
                { label: 'Reports Submitted', val: studentStats.reportsSubmitted, max: 50, color: 'green' },
                { label: 'Surplus Accessed', val: studentStats.surplusAccessed, max: 30, color: 'purple' },
                { label: 'Sustainability Points', val: studentStats.sustainabilityPoints, max: 500, color: 'amber' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-300">{s.label}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">{s.val}</span>
                  </div>
                  <ProgressBar value={s.val} max={s.max} color={s.color} showValue />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
