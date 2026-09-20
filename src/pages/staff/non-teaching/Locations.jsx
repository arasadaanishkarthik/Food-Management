import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import { ntStaffNav } from "./Dashboard";
import { MapPin, AlertTriangle } from "lucide-react";
import { cn } from "@/utils";

const locations = [
  { name: "Main Canteen", reports: 12, kg: 28, severity: "High", lastReport: "2 hours ago" },
  { name: "Hostel Block A", reports: 6, kg: 14, severity: "Medium", lastReport: "1 day ago" },
  { name: "Faculty Cafeteria", reports: 3, kg: 6, severity: "Low", lastReport: "3 hours ago" },
  { name: "Sports Complex", reports: 8, kg: 18, severity: "Medium", lastReport: "5 hours ago" },
  { name: "Library Canteen", reports: 2, kg: 4, severity: "Low", lastReport: "2 days ago" },
  { name: "Hostel Block B", reports: 5, kg: 11, severity: "Medium", lastReport: "1 day ago" },
  { name: "Admin Block", reports: 1, kg: 2, severity: "Low", lastReport: "3 days ago" },
  { name: "Event Hall", reports: 4, kg: 9, severity: "Medium", lastReport: "4 hours ago" },
];

const severityConfig = {
  High: { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800" },
  Medium: { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800" },
  Low: { color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-800" },
};

export default function Locations() {
  return (
    <DashboardLayout navItems={ntStaffNav} pageTitle="Waste Locations">
      <PageHeader title="Waste Locations" description="Campus-wide waste reporting by location." icon={MapPin} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {locations.map((l) => {
          const cfg = severityConfig[l.severity];
          return (
            <Card key={l.name} className={cn("border", cfg.border)}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cfg.bg)}>
                  <MapPin size={18} className={cfg.color} />
                </div>
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", cfg.color, cfg.bg)}>
                  {l.severity}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{l.name}</h3>
              <div className="text-xs text-slate-400 mb-3">Last report: {l.lastReport}</div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-50 dark:bg-navy-700 rounded-lg p-2">
                  <div className="text-lg font-bold text-slate-800 dark:text-white">{l.reports}</div>
                  <div className="text-xs text-slate-400">Reports</div>
                </div>
                <div className="bg-slate-50 dark:bg-navy-700 rounded-lg p-2">
                  <div className="text-lg font-bold text-red-500">{l.kg} kg</div>
                  <div className="text-xs text-slate-400">Waste</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
