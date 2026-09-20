import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { roleConfig } from '@/data/users';
import { FadeUp, StaggerContainer } from '@/components/animations';
import { Leaf, ArrowRight, Users, ChefHat, Truck, BookOpen, UserCircle, Wrench } from 'lucide-react';

const roleCards = [
  { key: 'student',            icon: Users,       label: 'Student',              desc: 'Track meals, report waste & view surplus food' },
  { key: 'teaching_staff',     icon: BookOpen,    label: 'Teaching Staff',       desc: 'Monitor events, analytics & sustainability' },
  { key: 'non_teaching_staff', icon: Wrench,      label: 'Non-Teaching Staff',   desc: 'Report waste, track locations & history' },
  { key: 'canteen_manager',    icon: ChefHat,     label: 'Canteen Manager',      desc: 'Full inventory, meals, surplus & analytics' },
  { key: 'worker',             icon: Truck,       label: 'Worker',               desc: 'Assigned tasks, collection & history' },
  { key: 'other',              icon: UserCircle,  label: 'Other User',           desc: 'Report waste, surplus & sustainability' },
];

const roleColors = {
  student:            { ring: 'hover:ring-emerald-400', icon: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
  teaching_staff:     { ring: 'hover:ring-blue-400',    icon: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  non_teaching_staff: { ring: 'hover:ring-purple-400',  icon: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
  canteen_manager:    { ring: 'hover:ring-amber-400',   icon: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
  worker:             { ring: 'hover:ring-cyan-400',    icon: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
  other:              { ring: 'hover:ring-pink-400',    icon: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' },
};

export default function SelectRolePage() {
  const navigate  = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSelectRole = async (roleKey) => {
    try {
      const user = await login(roleKey);
      toast.success('Welcome!', `Signed in as ${user.name}`);
      const path = roleConfig[roleKey]?.path || '/';
      navigate(path);
    } catch {
      toast.error('Login failed', 'Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
            <Leaf size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">
            Food<span className="text-emerald-500">Sense</span>
          </span>
        </div>
      </FadeUp>

      <FadeUp delay={80}>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Select Your Role
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Choose your role to access your personalized portal
          </p>
        </div>
      </FadeUp>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {roleCards.map((role, i) => {
          const Icon   = role.icon;
          const colors = roleColors[role.key];

          return (
            <FadeUp key={role.key} delay={120 + i * 70}>
              <button
                onClick={() => !isLoading && handleSelectRole(role.key)}
                disabled={isLoading}
                className={`
                  w-full text-left p-5 rounded-xl border border-slate-200 dark:border-navy-700
                  bg-white dark:bg-navy-800 card-hover
                  ring-2 ring-transparent transition-all duration-200
                  ${colors.ring}
                  disabled:opacity-60 disabled:cursor-wait
                `}
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{role.label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{role.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span>Enter portal</span>
                  <ArrowRight size={12} />
                </div>
              </button>
            </FadeUp>
          );
        })}
      </div>

      <FadeUp delay={560}>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-10 text-center">
          This is a demo prototype. No real authentication required.
        </p>
      </FadeUp>
    </div>
  );
}
