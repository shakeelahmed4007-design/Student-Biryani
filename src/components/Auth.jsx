import { useState } from 'react';
import BiryaniBowl from './BiryaniBowl';
import { Eye, EyeOff, Sparkles, LogIn, UserPlus } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [signup, setSignup] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (signup && form.name.trim().length < 2) {
      err.name = 'Please enter at least 2 characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = 'Please enter a valid email address.';
    }
    if (form.password.length < 6) {
      err.password = 'Password must be at least 6 characters.';
    }
    setErrors(err);

    if (!Object.keys(err).length) {
      onLogin({
        name: signup ? form.name.trim() : form.email.split('@')[0],
        email: form.email.trim(),
        provider: 'demo',
      });
    }
  }

  function handleQuickFoodieLogin() {
    onLogin({
      name: 'Biryani Lover',
      email: 'foodie@studentbiryani.pk',
      provider: '1-Click Demo',
    });
  }

  return (
    <div className="min-h-full flex flex-col justify-between bg-gradient-to-b from-[var(--theme-accent-light)] via-[var(--theme-bg)] to-[var(--theme-bg)] animate-fadeIn">
      {/* Hero Header */}
      <div className="pt-10 pb-6 px-6 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--theme-accent)]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-[var(--theme-border)] flex items-center justify-center">
            <img
              src="/brand-logo.png"
              alt="Student Biryani"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="px-3 py-1 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[10px] font-extrabold tracking-widest text-[var(--theme-accent-text)]">
            EST. 1969 · KARACHI
          </span>
        </div>

        <div className="max-w-[220px] mx-auto my-3 animate-floaty">
          <BiryaniBowl withSteam={true} />
        </div>

        <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--theme-accent-text)]">
          Slow Dum Cooked with Love
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-[var(--theme-text)] mt-1">
          Student <em className="text-[var(--theme-secondary)] not-italic">Biryani</em>
        </h1>
        <p className="text-xs text-[var(--theme-text-muted)] mt-1">
          A little dum. A lot of joy.
        </p>
      </div>

      {/* Auth Card Bottom Sheet style */}
      <div className="bg-[var(--theme-surface)] rounded-t-[36px] p-6 pb-8 shadow-2xl border-t border-[var(--theme-border)] space-y-4">
        {/* Tabs Segment */}
        <div className="flex p-1 rounded-2xl bg-[var(--theme-border)]/40 border border-[var(--theme-border)]">
          <button
            type="button"
            onClick={() => {
              setSignup(false);
              setErrors({});
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              !signup
                ? 'bg-[var(--theme-surface)] text-[var(--theme-text)] shadow-sm'
                : 'text-[var(--theme-text-muted)]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSignup(true);
              setErrors({});
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              signup
                ? 'bg-[var(--theme-surface)] text-[var(--theme-text)] shadow-sm'
                : 'text-[var(--theme-text-muted)]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} noValidate className="space-y-3.5 pt-2">
          {signup && (
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ali Ahmed"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`input-field pr-12 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] p-1.5"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className="w-full btn-primary justify-center mt-2">
            <span>{signup ? 'Create Foodie Account' : 'Log In & Order'}</span>
            <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
          </button>
        </form>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--theme-border)]" />
          </div>
          <span className="relative bg-[var(--theme-surface)] px-3 text-[11px] text-[var(--theme-text-muted)] font-bold uppercase">
            Quick 1-Tap Demo Access
          </span>
        </div>

        {/* 1-Click Demo Login */}
        <button
          onClick={handleQuickFoodieLogin}
          type="button"
          className="w-full btn-secondary justify-center text-xs py-3.5"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Quick 1-Click Foodie Login (No password)</span>
        </button>

        <p className="text-[11px] text-center text-[var(--theme-text-muted)]/70 pt-2 leading-relaxed">
          Demo ordering environment. Your session is saved securely in your browser.
        </p>
      </div>
    </div>
  );
}
