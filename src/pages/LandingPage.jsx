import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '@/hooks';
import { cn } from '@/utils';
import {
  Leaf, Menu, X, ArrowRight, TrendingDown, Users, ChefHat,
  Truck, BookOpen, Wrench, UserCircle, BarChart3, Recycle,
  Bell, AlertTriangle, Package, LineChart, Shield, Zap,
  CheckCircle2, ChevronRight, Globe, Award, Star,
} from 'lucide-react';

// ─── Animated counter ──────────────────────────────────────────
function Counter({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Scroll Reveal wrapper ─────────────────────────────────────
function Reveal({ children, delay = 0, className }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Impact', href: '#impact' },
    { label: 'Portals', href: '#portals' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-[400] transition-all duration-300',
      scrolled
        ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-navy-700/80'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
              <Leaf size={16} className="text-white" />
            </div>
            <span className={cn(
              'text-lg font-bold transition-colors',
              scrolled ? 'text-slate-800 dark:text-white' : 'text-white'
            )}>
              Food<span className="text-emerald-400">Sense</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-emerald-400',
                  scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white/80'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/select-role"
              className={cn(
                'text-sm font-medium transition-colors px-4 py-2 rounded-lg',
                scrolled ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-500' : 'text-white/80 hover:text-white'
              )}
            >
              Login
            </Link>
            <Link
              to="/select-role"
              className="btn btn-primary btn-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn('md:hidden p-2 rounded-lg', scrolled ? 'text-slate-700 dark:text-white' : 'text-white')}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-navy-800 rounded-xl mb-4 p-4 shadow-lg border border-slate-200 dark:border-navy-700 animate-scale-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-navy-700 flex gap-2">
              <Link to="/select-role" className="btn btn-secondary btn-sm flex-1 justify-center" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/select-role" className="btn btn-primary btn-sm flex-1 justify-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  const flowSteps = ['Prepared', 'Served', 'Consumed', 'Surplus', 'Redistribute', 'Reduce'];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % flowSteps.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-950/40" />
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-soft" />
              <span className="text-emerald-400 text-xs font-medium">Campus Sustainability Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-fade-up">
              Turn Campus{' '}
              <span className="text-gradient-brand">Food Waste</span>{' '}
              Into Campus Impact.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '100ms' }}>
              A smarter campus platform to monitor food consumption, report wastage, manage surplus food, and build sustainable food practices.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <button onClick={() => navigate('/select-role')} className="btn btn-primary btn-lg group">
                Get Started
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#impact" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}>
                Explore Impact
              </a>
            </div>

            {/* Micro stats */}
            <div className="flex flex-wrap gap-6 mt-10 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {[
                { val: '2,840 kg', label: 'Food Saved' },
                { val: '18.6%', label: 'Waste Reduced' },
                { val: '1,240+', label: 'Meals Redistributed' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated flow visual */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-xs text-slate-500 font-medium mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" />
                Food Lifecycle Flow — Live Simulation
              </div>

              {/* Flow steps */}
              <div className="space-y-2">
                {flowSteps.map((step, i) => (
                  <div
                    key={step}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl transition-all duration-500',
                      activeStep === i
                        ? 'bg-emerald-500/15 border border-emerald-500/30'
                        : 'bg-white/3 border border-transparent opacity-40'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300',
                      activeStep === i ? 'gradient-brand text-white' : 'bg-white/10 text-white/50'
                    )}>
                      {i + 1}
                    </div>
                    <span className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      activeStep === i ? 'text-emerald-300' : 'text-slate-500'
                    )}>
                      {step}
                    </span>
                    {activeStep === i && (
                      <CheckCircle2 size={14} className="ml-auto text-emerald-400 animate-scale-in" />
                    )}
                  </div>
                ))}
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10">
                {[
                  { label: 'Prepared', val: '480', unit: 'meals', color: 'text-blue-400' },
                  { label: 'Consumed', val: '448', unit: 'meals', color: 'text-emerald-400' },
                  { label: 'Wasted', val: '32', unit: 'meals', color: 'text-red-400' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={cn('text-xl font-bold', s.color)}>{s.val}</div>
                    <div className="text-xs text-slate-500">{s.unit}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-navy-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-navy-700 animate-float hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <TrendingDown size={16} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-white">Waste -34%</div>
                  <div className="text-xs text-slate-400">This semester</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}

// ─── Impact Stats ──────────────────────────────────────────────
function ImpactStats() {
  const stats = [
    { end: 2840, suffix: ' kg', label: 'Food Saved This Semester', icon: '🌿', color: 'text-emerald-500' },
    { end: 34, suffix: '%', label: 'Waste Reduction Achieved', icon: '📉', color: 'text-blue-500' },
    { end: 1240, suffix: '+', label: 'Meals Redistributed', icon: '🍱', color: 'text-purple-500' },
    { end: 4200, suffix: ' kg', label: 'CO₂ Emissions Saved', icon: '🌍', color: 'text-amber-500' },
  ];

  return (
    <section id="impact" className="py-20 bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Real Impact</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            Numbers That Drive Change
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}
              className="bg-slate-50 dark:bg-navy-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-navy-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className={cn('text-3xl font-bold mb-1', s.color)}>
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────
function ProblemSection() {
  const problems = [
    { icon: AlertTriangle, title: 'Overproduction', desc: 'Canteens prepare more food than needed with no data to optimize quantities.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { icon: Bell, title: 'Unreported Waste', desc: 'Food wasted daily goes untracked, making systematic reduction impossible.', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Package, title: 'Untimely Surplus', desc: 'Surplus food expires before redistribution channels can be activated.', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: BarChart3, title: 'Lack of Data', desc: 'No analytics to identify patterns, peak waste times, or high-waste categories.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">The Problem</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            Food Waste Is A Campus-Wide Problem
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Every day, hundreds of kilograms of food are wasted across college campuses with no system to monitor, report, or reduce it.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 80}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', p.bg)}>
                  <Icon size={22} className={p.color} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Report', desc: 'Students, staff, and canteen managers report food waste incidents with details.', icon: Bell, color: 'bg-emerald-500' },
    { num: '02', title: 'Monitor', desc: 'All reports are centralized. Canteen managers and staff view real-time dashboards.', icon: LineChart, color: 'bg-blue-500' },
    { num: '03', title: 'Manage', desc: 'Surplus food is listed for redistribution. Workers collect waste from locations.', icon: Package, color: 'bg-purple-500' },
    { num: '04', title: 'Reduce', desc: 'Analytics drive data-backed decisions to reduce future waste systematically.', icon: TrendingDown, color: 'bg-amber-500' },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Process</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">How It Works</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-200 via-blue-200 via-purple-200 to-amber-200 dark:from-emerald-900 dark:via-blue-900 dark:via-purple-900 dark:to-amber-900" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={i * 100} className="text-center relative">
                <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white relative z-10', step.color)}>
                  <Icon size={24} />
                </div>
                <div className="text-3xl font-black text-slate-100 dark:text-navy-700 mb-2">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Portals Section ──────────────────────────────────────────
function PortalsSection() {
  const portals = [
    { icon: Users, label: 'Student', desc: 'Track meals, report waste, claim surplus food', color: 'bg-emerald-500', path: '/student/dashboard' },
    { icon: BookOpen, label: 'Teaching Staff', desc: 'Monitor events, analytics & sustainability activities', color: 'bg-blue-500', path: '/staff/teaching/dashboard' },
    { icon: Wrench, label: 'Non-Teaching Staff', desc: 'Report waste, manage locations & history', color: 'bg-purple-500', path: '/staff/non-teaching/dashboard' },
    { icon: ChefHat, label: 'Canteen Manager', desc: 'Full inventory, meal planning & analytics', color: 'bg-amber-500', path: '/canteen/dashboard' },
    { icon: Truck, label: 'Worker', desc: 'Assigned tasks, waste & surplus collection', color: 'bg-cyan-500', path: '/worker/dashboard' },
    { icon: UserCircle, label: 'Other User', desc: 'Report waste, access surplus & sustainability', color: 'bg-pink-500', path: '/other/dashboard' },
  ];

  return (
    <section id="portals" className="py-20 bg-slate-50 dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Role-Based Access</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            One Platform. Every Campus Role.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Tailored dashboards and tools for every stakeholder in the campus food ecosystem.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.label} delay={i * 70}>
                <Link to={p.path} className="group block bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 hover:shadow-lg hover:-translate-y-1 transition-all hover:border-emerald-300 dark:hover:border-emerald-700">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white', p.color)}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1.5">{p.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                    <span>Enter Portal</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: Bell, title: 'Smart Waste Reporting', desc: 'Multi-role reporting with photo uploads, location tracking, and automatic categorization.' },
    { icon: Recycle, title: 'Surplus Management', desc: 'Real-time surplus food listing with redistribution workflows and collection tracking.' },
    { icon: BarChart3, title: 'Consumption Monitoring', desc: 'Track prepared vs. served vs. consumed quantities with trend analysis.' },
    { icon: LineChart, title: 'Waste Analytics', desc: 'Visual analytics dashboards with category breakdowns and reduction targets.' },
    { icon: Truck, title: 'Collection Tracking', desc: 'Assign and track waste collection tasks with location-based management.' },
    { icon: Globe, title: 'Sustainability Insights', desc: 'CO₂ impact metrics, achievement badges, and campus sustainability scorecards.' },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Features</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            Everything You Need to Reduce Food Waste
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 70}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-md">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview ────────────────────────────────────────
function DashboardPreview() {
  return (
    <section className="py-20 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Product Preview</span>
          <h2 className="text-3xl font-bold text-white mt-2">
            Built for Real-World Campus Operations
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-navy-700/50 border-b border-navy-600">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-navy-600 rounded text-xs text-slate-400 px-3 py-1 max-w-xs">
                  foodsense.campus/canteen/dashboard
                </div>
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { label: 'Meals Prepared', val: '1,840', icon: '🍽️', color: 'border-blue-500/30' },
                { label: 'Meals Served', val: '1,720', icon: '✅', color: 'border-emerald-500/30' },
                { label: 'Food Wasted', val: '36 kg', icon: '⚠️', color: 'border-red-500/30' },
                { label: 'Surplus Food', val: '18 kg', icon: '♻️', color: 'border-amber-500/30' },
              ].map((s) => (
                <div key={s.label} className={cn('bg-navy-700/50 rounded-xl p-4 border', s.color)}>
                  <div className="text-xl mb-2">{s.icon}</div>
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
              {/* Chart placeholder */}
              <div className="md:col-span-3 bg-navy-700/50 rounded-xl p-4 border border-navy-600">
                <div className="text-xs text-slate-400 mb-3">Waste Trend — Last 7 Days</div>
                <div className="flex items-end gap-2 h-24">
                  {[65, 80, 55, 70, 45, 60, 38].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t" style={{ height: `${h}%`, background: `rgba(16, 185, 129, ${0.3 + (i * 0.1)})` }} />
                      <div className="text-xs text-slate-600">
                        {['M','T','W','T','F','S','S'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-navy-700/50 rounded-xl p-4 border border-navy-600">
                <div className="text-xs text-slate-400 mb-3">Waste by Category</div>
                {[
                  { label: 'Rice', pct: 28, color: 'bg-emerald-400' },
                  { label: 'Veg', pct: 20, color: 'bg-blue-400' },
                  { label: 'Dal', pct: 15, color: 'bg-purple-400' },
                ].map((c) => (
                  <div key={c.label} className="mb-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{c.label}</span><span>{c.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-600 rounded-full overflow-hidden">
                      <div className={cn('h-full rounded-full', c.color)} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────
function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-white dark:bg-navy-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full mb-6">
            <Award size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-medium">Ready to make a difference?</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Build a Less Wasteful Campus?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of students, staff, and canteen managers making data-driven decisions to eliminate campus food waste.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/select-role')} className="btn btn-primary btn-lg group">
              Get Started Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#impact" className="btn btn-secondary btn-lg">
              Explore Impact
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Food<span className="text-emerald-400">Sense</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Campus food wastage management platform built for sustainability.
            </p>
          </div>
          {[
            { title: 'Portals', links: ['Student', 'Teaching Staff', 'Canteen Manager', 'Worker'] },
            { title: 'Features', links: ['Waste Reporting', 'Surplus Management', 'Analytics', 'Sustainability'] },
            { title: 'Resources', links: ['About', 'How It Works', 'Impact', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to="/select-role" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">© 2024 FoodSense. Built for DE Lab Academic Project.</p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Leaf size={12} className="text-emerald-600" />
            <span>Built for a sustainable campus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ImpactStats />
      <ProblemSection />
      <HowItWorks />
      <PortalsSection />
      <FeaturesSection />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
