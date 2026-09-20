import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { mockUsers, roleConfig } from '@/data/users';
import Card from '@/components/ui/Card';
import Button from '@/components/common/Button';
import {
  Leaf, Users, BookOpen, Wrench, ChefHat, Truck, UserCircle,
  Lock, Mail, ArrowRight, Sparkles, Check, Shield
} from 'lucide-react';

const roleList = [
  { key: 'student', label: 'Student', icon: Users, email: 'arjun.sharma@college.edu', roleTitle: 'CS Dept (3rd Year)' },
  { key: 'teaching_staff', label: 'Faculty', icon: BookOpen, email: 'priya.menon@college.edu', roleTitle: 'Food Technology Dept' },
  { key: 'non_teaching_staff', label: 'Admin Staff', icon: Wrench, email: 'ramesh.k@college.edu', roleTitle: 'Admin Officer' },
  { key: 'canteen_manager', label: 'Canteen Mgr', icon: ChefHat, email: 'sunita.patel@college.edu', roleTitle: 'Main Canteen' },
  { key: 'worker', label: 'Worker', icon: Truck, email: 'mohan.das@college.edu', roleTitle: 'Waste Operations' },
  { key: 'other', label: 'Community', icon: UserCircle, email: 'ananya.roy@alumni.edu', roleTitle: 'Campus Visitor' },
];

export default function LoginPage() {
  const { role: routeRole } = useParams();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState(routeRole || 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo1234');
  const [rememberMe, setRememberMe] = useState(true);

  // Sync selected role when route param or active role changes
  useEffect(() => {
    const active = roleList.find(r => r.key === selectedRole) || roleList[0];
    setEmail(active.email);
  }, [selectedRole]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(selectedRole, { email });
      toast.success('Welcome back!', `Signed in as ${user.name}`);
      const targetPath = roleConfig[selectedRole]?.path || '/student/dashboard';
      navigate(targetPath);
    } catch {
      toast.error('Login error', 'Please try again.');
    }
  };

  const handleQuickDemoLogin = async (roleKey) => {
    setSelectedRole(roleKey);
    const active = roleList.find(r => r.key === roleKey) || roleList[0];
    try {
      const user = await login(roleKey, { email: active.email });
      toast.success('Demo Access Granted', `Welcome ${user.name}!`);
      const targetPath = roleConfig[roleKey]?.path || '/student/dashboard';
      navigate(targetPath);
    } catch {
      toast.error('Login error', 'Please try again.');
    }
  };

  const currentRoleInfo = roleList.find(r => r.key === selectedRole) || roleList[0];
  const CurrentIcon = currentRoleInfo.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Leaf size={22} />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Food<span className="text-emerald-500">Sense</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sign in to Campus Portal
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Academic DE Lab Prototype · Select a demo persona to login instantly
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Card className="shadow-xl border-slate-200/80 dark:border-navy-700 bg-white dark:bg-navy-800/90 backdrop-blur-xl">
          {/* Persona Switcher Tabs */}
          <div className="mb-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Demo Persona:
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-navy-900 rounded-xl">
              {roleList.map((r) => {
                const isSelected = selectedRole === r.key;
                const Icon = r.icon;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setSelectedRole(r.key)}
                    className={`p-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-navy-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate w-full text-center">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Mini Profile Card */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 rounded-xl mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CurrentIcon size={16} />
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {currentRoleInfo.email}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {currentRoleInfo.roleTitle}
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 bg-white/60 dark:bg-navy-800/60 px-2 py-0.5 rounded">
              Ready
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                />
                <span>Remember session</span>
              </label>
              <Link to="/select-role" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Role directory →
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : `Enter as ${currentRoleInfo.label}`}
            </Button>
          </form>

          {/* Quick 1-Click Launch Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-700 text-center">
            <span className="text-[11px] text-slate-400 block mb-2">Or launch directly:</span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {roleList.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleQuickDemoLogin(r.key)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 dark:bg-navy-900 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-slate-300 hover:text-emerald-600 rounded-md transition-colors"
                >
                  ⚡ {r.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Footer Link to Public Sustainability Hub */}
        <div className="mt-6 text-center space-y-2">
          <Link
            to="/sustainability"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            <Sparkles size={13} /> Browse Public Campus Sustainability Hub
          </Link>
          <p className="text-[11px] text-slate-400">
            © 2024 University Food Wastage Management System (DE Lab Academic Project)
          </p>
        </div>
      </div>
    </div>
  );
}
