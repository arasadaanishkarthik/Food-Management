import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '@/data/users';

// ─── Auth Context ───────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodsense-user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = (role, credentials = {}) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const roleKeyMap = {
          student: 'student',
          teaching_staff: 'teachingStaff',
          non_teaching_staff: 'nonTeachingStaff',
          canteen_manager: 'canteenManager',
          worker: 'worker',
          other: 'other',
          teachingStaff: 'teachingStaff',
          nonTeachingStaff: 'nonTeachingStaff',
          canteenManager: 'canteenManager',
        };
        const key = roleKeyMap[role] || role;
        const userData = mockUsers[key] || mockUsers.student;
        const loggedUser = { ...userData, role, ...credentials };
        setUser(loggedUser);
        localStorage.setItem('foodsense-user', JSON.stringify(loggedUser));
        setIsLoading(false);
        resolve(loggedUser);
      }, 600); // Snappy simulated loading
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodsense-user');
  };

  const isAuthenticated = !!user;

  const getDashboardPath = () => {
    if (!user) return '/select-role';
    const paths = {
      student:           '/student/dashboard',
      teaching_staff:    '/staff/teaching/dashboard',
      non_teaching_staff:'/staff/non-teaching/dashboard',
      canteen_manager:   '/canteen/dashboard',
      worker:            '/worker/dashboard',
      other:             '/other/dashboard',
    };
    return paths[user.role] || '/select-role';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, getDashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
