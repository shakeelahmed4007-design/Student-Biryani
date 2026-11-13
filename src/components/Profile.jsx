import { useState } from 'react';
import { cities } from '../data/menu';
import { useTheme } from '../context/ThemeContext';
import { usePwa } from '../context/PwaContext';
import { triggerHaptic } from '../utils/haptics';
import {
  User,
  MapPin,
  Palette,
  LogOut,
  Sparkles,
  ShoppingBag,
  Award,
  ChevronRight,
  ShieldAlert,
  Smartphone,
  Download,
  Share2,
  CheckCircle,
  RefreshCw,
  HardDrive,
} from 'lucide-react';

export default function Profile({
  user,
  city,
  setCity,
  orders,
  onLogout,
  storageWarning,
}) {
  const { openThemeModal, activeTheme } = useTheme();
  const { isInstalled, isInstallable, installApp } = usePwa();
  const [clearing, setClearing] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShareApp = async () => {
    triggerHaptic('medium');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Student Biryani · کراچی کی اصل پہچان',
          text: 'Order the most delicious Karachi Dum Biryani fresh and hot!',
          url: window.location.origin,
        });
        return;
      } catch {
        // User cancelled share
      }
    }
    // Fallback copy link
    navigator.clipboard?.writeText(window.location.origin);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleClearCache = () => {
    triggerHaptic('warning');
    setClearing(true);
    if ('caches' in window) {
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)));
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <main className="px-4 pt-6 pb-6 animate-fadeIn space-y-5">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--theme-accent-text)]">
          Account & Preferences
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-[var(--theme-text)] mt-1">
          Foodie <em className="text-[var(--theme-secondary)] not-italic">Profile</em>
        </h1>
        <p className="text-xs text-[var(--theme-text-muted)] mt-1">
          Manage your personal dining settings and app preferences
        </p>
      </div>

      {/* User Card */}
      <div className="p-6 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] shadow-sm text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[var(--theme-accent)]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Avatar */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[var(--theme-primary)] to-[var(--theme-accent)] text-white font-display text-3xl font-bold flex items-center justify-center mx-auto shadow-lg border-2 border-white/20">
          {user.name.slice(0, 1).toUpperCase()}
        </div>

        <h2 className="font-display text-xl font-bold text-[var(--theme-text)] mt-3">
          {user.name}
        </h2>
        <p className="text-xs text-[var(--theme-text-muted)] mt-0.5 break-all">
          {user.email}
        </p>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] text-xs font-extrabold mt-3">
          <Award className="w-3.5 h-3.5" />
          <span>VIP Biryani Lover</span>
        </span>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-[var(--theme-border)]">
          <div className="p-2 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
            <span className="text-[10px] font-bold text-[var(--theme-text-muted)] block">
              Orders
            </span>
            <strong className="text-base font-extrabold text-[var(--theme-text)]">
              {orders.length}
            </strong>
          </div>

          <div className="p-2 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
            <span className="text-[10px] font-bold text-[var(--theme-text-muted)] block">
              Dum Points
            </span>
            <strong className="text-base font-extrabold text-[var(--theme-accent-text)]">
              {orders.length * 150}
            </strong>
          </div>

          <div className="p-2 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
            <span className="text-[10px] font-bold text-[var(--theme-text-muted)] block">
              Favorite
            </span>
            <strong className="text-xs font-extrabold text-[var(--theme-text)] block truncate">
              Dum Biryani
            </strong>
          </div>
        </div>
      </div>

      {/* MOBILE APP CENTER (PWA & Native Options) */}
      <div className="p-5 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[var(--theme-text)]">
              Mobile App Center
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)]">
              Native Mobile App & PWA Settings
            </p>
          </div>
        </div>

        {/* Install / Installed Status */}
        <div className="p-3.5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isInstalled ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <Download className="w-5 h-5 text-[var(--theme-accent)] shrink-0" />
            )}
            <div>
              <p className="text-xs font-bold text-[var(--theme-text)]">
                {isInstalled ? 'App Installed on Device' : 'Install as Mobile App'}
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)]">
                {isInstalled
                  ? 'Running in native standalone app mode'
                  : 'Add to home screen for 1-tap ordering'}
              </p>
            </div>
          </div>

          {!isInstalled && (
            <button
              onClick={() => {
                triggerHaptic('medium');
                installApp();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-bold shadow-sm active:scale-95 transition shrink-0"
            >
              Install App
            </button>
          )}
        </div>

        {/* Share with Friends */}
        <button
          onClick={handleShareApp}
          className="w-full p-3.5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-between text-left hover:border-[var(--theme-accent)] transition active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[var(--theme-text)]">
                Share App with Friends & Family
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)]">
                {shared ? 'Link copied to clipboard! ✓' : 'Share on WhatsApp, SMS or Socials'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[var(--theme-text-muted)]" />
        </button>

        {/* App Meta Details */}
        <div className="pt-2 border-t border-[var(--theme-border)] text-[11px] text-[var(--theme-text-muted)] space-y-1.5">
          <div className="flex justify-between">
            <span>App Version:</span>
            <strong className="text-[var(--theme-text)]">v1.0.0 (Capacitor & PWA)</strong>
          </div>
          <div className="flex justify-between">
            <span>Offline Dum Cache:</span>
            <span className="text-emerald-600 font-bold">Active & Ready</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span>Storage Maintenance:</span>
            <button
              onClick={handleClearCache}
              disabled={clearing}
              className="text-xs font-semibold text-[var(--theme-secondary)] hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${clearing ? 'animate-spin' : ''}`} />
              <span>{clearing ? 'Reloading...' : 'Clear Cache'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="p-4 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--theme-text)]">
                App Color Theme
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)]">
                Active: {activeTheme.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              openThemeModal();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
          >
            <span>Change</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Delivery City Preference */}
      <div className="p-4 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] shadow-sm space-y-2">
        <label
          htmlFor="profile-city"
          className="block text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] flex items-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span>Default Delivery Branch</span>
        </label>
        <select
          id="profile-city"
          value={city}
          onChange={(e) => {
            triggerHaptic('light');
            setCity(e.target.value);
          }}
          className="input-field"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c} Branch (Active)
            </option>
          ))}
        </select>
      </div>

      {/* Demo Notice */}
      <div className="p-4 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-muted)] leading-relaxed space-y-1">
        <p className="font-bold text-[var(--theme-text)]">About Student Biryani App</p>
        <p>
          Configured as a modern hybrid application with PWA installation, native haptics, offline cache, and Capacitor Android export.
        </p>
      </div>

      {storageWarning && (
        <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 text-xs font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Local storage is unavailable; changes persist for this session only.</span>
        </div>
      )}

      {/* Logout button */}
      <button
        onClick={() => {
          triggerHaptic('medium');
          onLogout();
        }}
        className="w-full btn-secondary text-red-600 hover:text-red-700 border-red-200 dark:border-red-950 justify-center"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of Demo Account</span>
      </button>

      <p className="text-center text-[11px] text-[var(--theme-text-muted)]/70 font-semibold tracking-wider uppercase pt-2">
        STUDENT BIRYANI ✳ A LITTLE DUM, A LOT OF JOY
      </p>
    </main>
  );
}
