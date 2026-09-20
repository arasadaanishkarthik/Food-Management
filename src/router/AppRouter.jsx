import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

// ─── Lazy pages ──────────────────────────────────────────────────
const LandingPage     = lazy(() => import('@/pages/LandingPage'));
const SelectRolePage  = lazy(() => import('@/pages/SelectRolePage'));
const LoginPage       = lazy(() => import('@/pages/LoginPage'));

// Student
const StudentDashboard  = lazy(() => import('@/pages/student/Dashboard'));
const StudentReport     = lazy(() => import('@/pages/student/ReportWaste'));
const StudentReports    = lazy(() => import('@/pages/student/MyReports'));
const StudentSurplus    = lazy(() => import('@/pages/student/Surplus'));
const StudentProfile    = lazy(() => import('@/pages/student/Profile'));

// Teaching Staff
const TeachingDashboard = lazy(() => import('@/pages/staff/teaching/Dashboard'));
const TeachingReports   = lazy(() => import('@/pages/staff/teaching/Reports'));
const TeachingAnalytics = lazy(() => import('@/pages/staff/teaching/Analytics'));

// Non-Teaching Staff
const NTDashboard       = lazy(() => import('@/pages/staff/non-teaching/Dashboard'));
const NTReport          = lazy(() => import('@/pages/staff/non-teaching/Report'));
const NTLocations       = lazy(() => import('@/pages/staff/non-teaching/Locations'));
const NTHistory         = lazy(() => import('@/pages/staff/non-teaching/History'));

// Canteen Manager
const CanteenDashboard  = lazy(() => import('@/pages/canteen/Dashboard'));
const CanteenInventory  = lazy(() => import('@/pages/canteen/Inventory'));
const CanteenMeals      = lazy(() => import('@/pages/canteen/Meals'));
const CanteenSurplus    = lazy(() => import('@/pages/canteen/Surplus'));
const CanteenReports    = lazy(() => import('@/pages/canteen/Reports'));
const CanteenAnalytics  = lazy(() => import('@/pages/canteen/Analytics'));

// Worker
const WorkerDashboard   = lazy(() => import('@/pages/worker/Dashboard'));
const WorkerTasks       = lazy(() => import('@/pages/worker/Tasks'));
const WorkerWaste       = lazy(() => import('@/pages/worker/WasteCollection'));
const WorkerSurplus     = lazy(() => import('@/pages/worker/SurplusCollection'));
const WorkerHistory     = lazy(() => import('@/pages/worker/History'));

// Other
const OtherDashboard    = lazy(() => import('@/pages/other/Dashboard'));
const OtherReport       = lazy(() => import('@/pages/other/ReportWaste'));
const OtherSurplus      = lazy(() => import('@/pages/other/Surplus'));
const OtherActivity     = lazy(() => import('@/pages/other/Activity'));

// Sustainability
const SustainabilityHub = lazy(() => import('@/pages/sustainability/Hub'));
const SustainabilityAnalytics = lazy(() => import('@/pages/sustainability/Analytics'));
const SustainabilityAchievements = lazy(() => import('@/pages/sustainability/Achievements'));

// ─── Page Loading Fallback ───────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center animate-pulse-soft">
          <span className="text-white text-lg">🌿</span>
        </div>
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

// ─── Protected Route ─────────────────────────────────────────────
function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/select-role" replace />;
}

// ─── App Router ──────────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"              element={<LandingPage />} />
          <Route path="/select-role"   element={<SelectRolePage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/login/:role"   element={<LoginPage />} />

          {/* Student */}
          <Route path="/student/dashboard"    element={<Protected><StudentDashboard /></Protected>} />
          <Route path="/student/report-waste" element={<Protected><StudentReport /></Protected>} />
          <Route path="/student/reports"      element={<Protected><StudentReports /></Protected>} />
          <Route path="/student/surplus"      element={<Protected><StudentSurplus /></Protected>} />
          <Route path="/student/profile"      element={<Protected><StudentProfile /></Protected>} />

          {/* Teaching Staff */}
          <Route path="/staff/teaching/dashboard" element={<Protected><TeachingDashboard /></Protected>} />
          <Route path="/staff/teaching/reports"   element={<Protected><TeachingReports /></Protected>} />
          <Route path="/staff/teaching/analytics" element={<Protected><TeachingAnalytics /></Protected>} />

          {/* Non-Teaching Staff */}
          <Route path="/staff/non-teaching/dashboard" element={<Protected><NTDashboard /></Protected>} />
          <Route path="/staff/non-teaching/report"    element={<Protected><NTReport /></Protected>} />
          <Route path="/staff/non-teaching/locations" element={<Protected><NTLocations /></Protected>} />
          <Route path="/staff/non-teaching/history"   element={<Protected><NTHistory /></Protected>} />

          {/* Canteen Manager */}
          <Route path="/canteen/dashboard"  element={<Protected><CanteenDashboard /></Protected>} />
          <Route path="/canteen/inventory"  element={<Protected><CanteenInventory /></Protected>} />
          <Route path="/canteen/meals"      element={<Protected><CanteenMeals /></Protected>} />
          <Route path="/canteen/surplus"    element={<Protected><CanteenSurplus /></Protected>} />
          <Route path="/canteen/reports"    element={<Protected><CanteenReports /></Protected>} />
          <Route path="/canteen/analytics"  element={<Protected><CanteenAnalytics /></Protected>} />

          {/* Worker */}
          <Route path="/worker/dashboard"          element={<Protected><WorkerDashboard /></Protected>} />
          <Route path="/worker/tasks"              element={<Protected><WorkerTasks /></Protected>} />
          <Route path="/worker/waste-collection"   element={<Protected><WorkerWaste /></Protected>} />
          <Route path="/worker/surplus-collection" element={<Protected><WorkerSurplus /></Protected>} />
          <Route path="/worker/history"            element={<Protected><WorkerHistory /></Protected>} />

          {/* Other User */}
          <Route path="/other/dashboard"    element={<Protected><OtherDashboard /></Protected>} />
          <Route path="/other/report-waste" element={<Protected><OtherReport /></Protected>} />
          <Route path="/other/surplus"      element={<Protected><OtherSurplus /></Protected>} />
          <Route path="/other/activity"     element={<Protected><OtherActivity /></Protected>} />

          {/* Sustainability Center */}
          <Route path="/sustainability"              element={<SustainabilityHub />} />
          <Route path="/sustainability/analytics"   element={<SustainabilityAnalytics />} />
          <Route path="/sustainability/achievements" element={<SustainabilityAchievements />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
