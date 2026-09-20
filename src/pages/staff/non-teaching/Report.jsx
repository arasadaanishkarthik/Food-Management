import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import { Input, Select, Textarea } from "@/components/ui/FormElements";
import { useToast } from "@/context/ToastContext";
import { ntStaffNav } from "./Dashboard";
import { foodTypes, wasteReasons, wasteLocations } from "@/data/wasteReports";
import { generateReportId } from "@/utils";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const initial = { foodType: "", quantity: "", unit: "kg", location: "", reason: "", date: new Date().toISOString().slice(0, 10), time: new Date().toTimeString().slice(0, 5), description: "" };

export default function NTReport() {
  const { toast } = useToast();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.foodType) e.foodType = "Required";
    if (!form.quantity) e.quantity = "Required";
    if (!form.location) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setSuccess(generateReportId("FW")); setLoading(false); toast.success("Report Submitted!"); }, 1600);
  };

  if (success) return (
    <DashboardLayout navItems={ntStaffNav} pageTitle="Report Waste">
      <div className="max-w-lg mx-auto mt-20 text-center">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Report Submitted!</h2>
        <div className="text-lg font-bold text-emerald-600 mb-6">{success}</div>
        <Button onClick={() => { setForm(initial); setSuccess(null); }}>Submit Another</Button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout navItems={ntStaffNav} pageTitle="Report Waste">
      <PageHeader title="Report Food Waste" icon={AlertTriangle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Select label="Food Type" required value={form.foodType} onChange={(e) => setForm({ ...form, foodType: e.target.value })} options={foodTypes} placeholder="Select food type" error={errors.foodType} />
              <div className="flex gap-2">
                <Input label="Quantity" required type="number" min="0.1" step="0.1" placeholder="0.0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} error={errors.quantity} wrapperClassName="flex-1" />
                <Select label="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} options={["kg", "g", "L", "plates"]} wrapperClassName="w-24" />
              </div>
            </div>
            <Select label="Location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} options={wasteLocations} placeholder="Select location" error={errors.location} />
            <Select label="Reason" required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} options={wasteReasons} placeholder="Select reason" />
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <Input label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <Textarea label="Description" rows={3} placeholder="Additional details..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setForm(initial)}>Reset</Button>
              <Button type="submit" loading={loading}>Submit Report</Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
