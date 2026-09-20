import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import ToastContainer from '@/components/feedback/ToastContainer';
import CustomCursor from '@/components/cursor/CustomCursor';
import AppRouter from '@/router/AppRouter';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          {/* Global UI overlays */}
          <CustomCursor />
          <ToastContainer />
          {/* Application Router */}
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
