import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/utils';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Avatar from '@/components/common/Avatar';
import {
  ChevronLeft, ChevronRight, LogOut, Moon, Sun,
  Leaf, Menu, X,
} from 'lucide-react';

// ─── Sidebar ────────────────────────────────────────────────────
export default function Sidebar({ navItems = [], isCollapsed, mobileOpen, onToggle, onClose }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[190] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'sidebar',
          isCollapsed && !mobileOpen ? 'lg:!w-[72px]' : 'lg:w-[260px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center gap-3 px-4 py-5 border-b border-slate-200 dark:border-navy-700 flex-shrink-0',
          isCollapsed && 'justify-center px-0'
        )}>
          <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf size={16} className="text-white" />
          </div>
          {(!isCollapsed || mobileOpen) && (
            <span className="font-bold text-slate-800 dark:text-white text-base tracking-tight">
              Food<span className="text-emerald-500">Sense</span>
            </span>
          )}
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 no-scrollbar">
          {navItems.map((section) => (
            <div key={section.label || 'default'} className="mb-1">
              {section.label && !isCollapsed && (
                <p className="px-4 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {section.label}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => onClose?.()}
                    className={({ isActive }) =>
                      cn('sidebar-nav-item', isActive && 'active', isCollapsed && 'justify-center px-0 mx-0 rounded-none w-full')
                    }
                    title={isCollapsed ? item.label : undefined}
                  >
                    {Icon && <Icon size={18} className="flex-shrink-0" />}
                    {(!isCollapsed || mobileOpen) && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {(!isCollapsed || mobileOpen) && item.badge && (
                      <span className="ml-auto px-1.5 py-0.5 text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: User + theme + collapse */}
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-navy-700 p-3 space-y-1">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              'sidebar-nav-item w-full',
              isCollapsed && 'justify-center'
            )}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {(!isCollapsed || mobileOpen) && (
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={cn(
              'sidebar-nav-item w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
              isCollapsed && 'justify-center'
            )}
            title="Logout"
          >
            <LogOut size={18} />
            {(!isCollapsed || mobileOpen) && <span>Logout</span>}
          </button>

          {/* User info */}
          {user && (!isCollapsed || mobileOpen) && (
            <div className="flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg bg-slate-50 dark:bg-navy-700">
              <Avatar name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-navy-700 border border-slate-200 dark:border-navy-600 rounded-full items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors shadow-sm z-10"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>
    </>
  );
}
