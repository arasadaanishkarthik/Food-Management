import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/common/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { otherNav } from './Dashboard';
import { wasteLocations, foodTypes } from '@/data/wasteReports';
import {
  AlertTriangle, Upload, CheckCircle2, Clock, MapPin,
  Sparkles, Info, ArrowLeft, RefreshCw, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

const quickTemplates = [
  { label: 'Event Leftovers', location: 'Event Hall', foodType: 'Biryani', reason: 'Event surplus' },
  { label: 'Meeting Refreshments', location: 'Admin Block', foodType: 'Snacks', reason: 'Excess ordered' },
  { label: 'Cafeteria Discard', location: 'Library Cafeteria', foodType: 'Bread', reason: 'Unconsumed shelf items' },
  { label: 'Department Gathering', location: 'Engineering Block', foodType: 'Rice', reason: 'Over-preparation' },
];

export default function OtherReportWaste() {
  const { showToast } = useToast();
  const [location, setLocation] = useState('Event Hall');
  const [foodType, setFoodType] = useState('Biryani');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [contactName, setContactName] = useState('Ananya Roy');
  const [contactPhone, setContactPhone] = useState('+91 76543 21098');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyTemplate = (tpl) => {
    setLocation(tpl.location);
    setFoodType(tpl.foodType);
    setDescription(`Reported from ${tpl.label} (${tpl.reason}). Good condition, suitable for immediate redistribution if claimed promptly.`);
    showToast(`Applied preset for "${tpl.label}"`, 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity) {
      showToast('Please specify the estimated quantity', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `WR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      setSubmittedId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Waste report successfully submitted to campus operations team!', 'success');
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setQuantity('');
    setDescription('');
    setSubmittedId('');
  };

  return (
    <DashboardLayout navItems={otherNav} pageTitle="Report Waste">
      <PageHeader
        title="Report Campus Food Waste"
        description="Notify the campus sustainability team and dining management about excess or discarded food."
        icon={AlertTriangle}
        iconColor="text-pink-500"
        iconBg="bg-pink-50 dark:bg-pink-900/20"
      />

      {isSubmitted ? (
        <Card className="max-w-xl mx-auto text-center py-10 px-6 border-emerald-500/30">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Report Registered Successfully
          </span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 mb-2">
            Ticket #{submittedId}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            Thank you for being a responsible member of our campus! Operations workers and food redistribution volunteers have been notified.
          </p>

          <div className="p-4 bg-slate-50 dark:bg-navy-900 rounded-xl text-left text-xs text-slate-600 dark:text-slate-300 space-y-1.5 mb-6">
            <div><strong>Location:</strong> {location}</div>
            <div><strong>Food Type & Est. Qty:</strong> {foodType} ({quantity})</div>
            <div><strong>Contact:</strong> {contactName} ({contactPhone})</div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={handleReset}>
              <RefreshCw size={14} className="mr-1.5" /> Submit Another Report
            </Button>
            <Link to="/other/activity">
              <Button variant="primary">
                View My Activity Log →
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <Card>
              <CardTitle className="mb-1">Submit Food Waste Notice</CardTitle>
              <CardDescription className="mb-6">
                Fill in the details below. Our team prioritizes food rescue within 30 minutes of notification.
              </CardDescription>

              {/* Quick Template Presets */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map((tpl) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => applyTemplate(tpl)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-pink-500/50 hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles size={12} className="text-pink-500" /> {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Campus Location *
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-pink-500"
                    >
                      {wasteLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Food Category *
                    </label>
                    <select
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-pink-500"
                    >
                      {foodTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Estimated Quantity (kg, trays, or servings) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 kg or ~20 servings"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Priority / Urgency
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-pink-500"
                    >
                      <option value="low">Low - Routine cleanup</option>
                      <option value="medium">Medium - Within 1-2 hours</option>
                      <option value="high">High - Urgent (Hot/perishable)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Details & Condition of Food
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details such as when it was cooked, packaging condition, or specific pickup instructions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Reporter Name
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                {/* Photo Simulation */}
                <div className="p-4 border-2 border-dashed border-slate-200 dark:border-navy-700 rounded-xl text-center">
                  <Upload size={24} className="mx-auto text-slate-400 mb-1" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Upload Photos (Optional)
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Helps the food rescue crew evaluate food viability
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold"
                  disabled={isSubmitting}
                >
                  <Send size={16} className="mr-1.5" />
                  {isSubmitting ? 'Submitting Report...' : 'Send Waste Notification'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar Guidelines */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <div className="flex items-center gap-2 mb-3 text-pink-600 dark:text-pink-400 font-semibold text-sm">
                <Info size={16} /> Campus Food Rescue Policy
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                  <span><strong>Safe Window:</strong> Prepared food must be reported within 2 hours of meal completion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                  <span><strong>Hygiene Check:</strong> Do not report food that has been touched by consumers directly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                  <span><strong>Redistribution:</strong> Unclaimed food after 3 hours is sent directly to campus composting.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
