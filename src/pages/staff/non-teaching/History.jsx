import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import { StatusBadge } from "@/components/common/Badge";
import { ntStaffNav } from "./Dashboard";
import { mockWasteReports } from "@/data/wasteReports";
import { formatDate } from "@/utils";
import { History } from "lucide-react";

export default function NTHistory() {
  return (
    <DashboardLayout navItems={ntStaffNav} pageTitle="History">
      <PageHeader title="Activity History" description="Complete history of waste reports and activities." icon={History} />
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Report ID</th><th>Food Type</th><th>Quantity</th><th>Location</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {mockWasteReports.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs text-emerald-600 dark:text-emerald-400">{r.id}</td>
                  <td className="font-medium">{r.foodType}</td>
                  <td className="text-sm">{r.quantity}</td>
                  <td className="text-sm">{r.location}</td>
                  <td className="text-sm">{formatDate(r.date)}</td>
                  <td><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
