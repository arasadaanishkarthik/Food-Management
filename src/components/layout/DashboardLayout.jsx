import { useState } from 'react';
import { cn } from '@/utils';
import Sidebar from './Sidebar';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/common/Avatar';
import { useSidebar } from '@/hooks';
import { getNotificationsForRole } from '@/data/notifications';

// ─── DashboardLayout ─────────────────────────────────────────────
export default function DashboardLayout({ navItems = [], children, pageTitle }) {
  const { user } = useAuth();
  const { isCollapsed, mobileOpen, toggle, close } = useSidebar();

  const notifications = user ? getNotificationsForRole(user.role).filter(n => !n.read) : [];
  const unreadCount   = notifications.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        isCollapsed={isCollapsed}
        mobileOpen={mobileOpen}
        onToggle={toggle}
        onClose={close}
      />

      {/* Main content area */}
      <div
        className={cn(
          'flex-1 min-w-0 transition-all duration-300',
          'lg:ml-[260px]',
          isCollapsed && 'lg:ml-[72px]',
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-[300] flex items-center gap-3 px-4 lg:px-6 h-16 bg-white/80 dark:bg-navy-800/80 backdrop-blur-md border-b border-slate-200 dark:border-navy-700">
          {/* Mobile hamburger */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page title (mobile) */}
          {pageTitle && (
            <h1 className="text-base font-semibold text-slate-800 dark:text-white lg:hidden truncate">
              {pageTitle}
            </h1>
          )}

          {/* Search bar (desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-navy-700 rounded-lg text-slate-400 dark:text-slate-500">
            <Search size={15} />
            <span className="text-sm">Search…</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label={`${unreadCount} unread notifications`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-navy-800" />
              )}
            </button>

            {/* User avatar */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-navy-600">
                <Avatar name={user.name} size="sm" />
                <span className="hidden lg:block text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                  {user.name}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-main animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
