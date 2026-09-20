import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/common/Button';
import { Input, Select, Textarea } from '@/components/ui/FormElements';
import { useToast } from '@/context/ToastContext';
import { generateReportId } from '@/utils';
import { foodTypes, wasteReasons, wasteLocations } from '@/data/wasteReports';
import { studentNav } from './Dashboard';
import { AlertTriangle, CheckCircle2, Upload, X } from 'lucide-react';

const initialForm = {
  foodType: '', quantity: '', unit: 'kg', location: '', reason: '',
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toTimeString().slice(0, 5),
  description: '', image: null,
};

export default function ReportWaste() {
  const { toast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.foodType)   e.foodType = 'Please select a food type';
    if (!form.quantity)   e.quantity = 'Please enter quantity';
    if (!form.location)   e.location = 'Please select a location';
    if (!form.reason)     e.reason = 'Please select a reason';
    if (!form.date)       e.date = 'Please select a date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const id = generateReportId('FW');
      setSuccess(id);
      setLoading(false);
      toast.success('Report Submitted!', `Report ${id} has been submitted for review.`);
    }, 1800);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSuccess(null);
    setErrors({});
  };

  if (success) {
    return (
      <DashboardLayout navItems={studentNav} pageTitle="Report Waste">
        <div className="max-w-lg mx-auto mt-16 text-center">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Report Submitted!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">Your waste report has been received and is under review.</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl mb-8">
            <span className="text-sm text-slate-500 dark:text-slate-400">Report ID:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{success}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleReset} variant="primary">Submit Another Report</Button>
            <Button onClick={() => window.location.href = '/student/reports'} variant="secondary">View My Reports</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={studentNav} pageTitle="Report Waste">
      <PageHeader
        title="Report Food Waste"
        description="Help us track and reduce campus food waste by submitting a detailed report."
        icon={AlertTriangle}
        iconColor="text-amber-500"
        iconBg="bg-amber-50 dark:bg-amber-900/20"
      />

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Select
                label="Food Type"
                required
                value={form.foodType}
                onChange={(e) => { setForm({ ...form, foodType: e.target.value }); setErrors({ ...errors, foodType: '' }); }}
                options={foodTypes}
                placeholder="Select food type"
                error={errors.foodType}
              />
              <div className="flex gap-2">
                <Input
                  label="Quantity"
                  required
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="0.0"
                  value={form.quantity}
                  onChange={(e) => { setForm({ ...form, quantity: e.target.value }); setErrors({ ...errors, quantity: '' }); }}
                  error={errors.quantity}
                  wrapperClassName="flex-1"
                />
                <Select
                  label="Unit"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  options={['kg', 'g', 'L', 'plates', 'packets']}
                  wrapperClassName="w-24"
                />
              </div>
            </div>

            <Select
              label="Location"
              required
              value={form.location}
              onChange={(e) => { setForm({ ...form, location: e.target.value }); setErrors({ ...errors, location: '' }); }}
              options={wasteLocations}
              placeholder="Select location"
              error={errors.location}
            />

            <Select
              label="Reason for Waste"
              required
              value={form.reason}
              onChange={(e) => { setForm({ ...form, reason: e.target.value }); setErrors({ ...errors, reason: '' }); }}
              options={wasteReasons}
              placeholder="Select reason"
              error={errors.reason}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Date" required type="date" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
              <Input label="Time" type="time" value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>

            <Textarea
              label="Description"
              rows={3}
              placeholder="Provide additional details about the food waste..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              hint="Optional: Describe the situation, appearance, or any relevant context."
            />

            {/* Image upload (simulated) */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                Photo (Optional)
              </label>
              {form.image ? (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 truncate flex-1">{form.image}</span>
                  <button type="button" onClick={() => setForm({ ...form, image: null })} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 dark:border-navy-600 rounded-xl cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors group">
                  <Upload size={24} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm text-slate-400 dark:text-slate-500">Click to upload photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    if (e.target.files[0]) setForm({ ...form, image: e.target.files[0].name });
                  }} />
                </label>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <Button type="button" variant="ghost" onClick={handleReset}>Reset Form</Button>
              <Button type="submit" loading={loading} icon={AlertTriangle} className="min-w-[140px]">
                {loading ? 'Submitting…' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
