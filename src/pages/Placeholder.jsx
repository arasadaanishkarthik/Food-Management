import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { Construction } from "lucide-react";

export default function PlaceholderPage({ title = "Page", description = "This page is coming in a future phase." }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-4">
        <Construction size={28} className="text-emerald-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}
