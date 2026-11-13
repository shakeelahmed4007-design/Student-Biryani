import { useCallback, useEffect, useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PwaProvider } from './context/PwaContext';
import { cities, money } from './data/menu';
import Splash from './components/Splash';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import CheckoutSheet from './components/CheckoutSheet';
import Orders, { orderStage } from './components/Orders';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import ThemeModal from './components/ThemeModal';
import IosInstallModal from './components/IosInstallModal';
import { triggerHaptic } from './utils/haptics';
import { ArrowRight, Smartphone, Tablet, Monitor, Palette } from 'lucide-react';

function readStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function AppContent() {
  const [splash, setSplash] = useState(true);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'tablet' | 'full'
  const [user, setUser] = useState(() => {
    const x = readStorage('be-user', null);
    return x && typeof x.name === 'string' && typeof x.email === 'string' ? x : null;
  });
  const [city, setCity] = useState(() => {
    const x = readStorage('be-city', 'Karachi');
    return cities.includes(x) ? x : 'Karachi';
  });
  const [allOrders, setAllOrders] = useState(() => {
    const x = readStorage('be-orders', []);
    return Array.isArray(x)
      ? x.filter(
          (o) =>
            o &&
            Array.isArray(o.items) &&
            typeof o.createdAt === 'number' &&
            typeof o.total === 'number'
        )
      : [];
  });
  const [tab, setTab] = useState('Menu');
  const [checkout, setCheckout] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [storageWarning, setStorageWarning] = useState(false);

  const { count, subtotal, clear } = useCart();
  const { openThemeModal, activeTheme } = useTheme();

  const email = user?.email?.toLowerCase();
  const orders = allOrders.filter((o) => o.userEmail === email);
  const activeOrdersCount = orders.filter((o) => orderStage(o, now) < 2).length;

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  // Live timer for order tracking
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Storage persistence
  useEffect(() => {
    try {
      localStorage.setItem('be-user', JSON.stringify(user));
      localStorage.setItem('be-city', JSON.stringify(city));
      localStorage.setItem('be-orders', JSON.stringify(allOrders));
    } catch {
      setStorageWarning(true);
    }
  }, [user, city, allOrders]);

  const closeCheckout = useCallback(() => setCheckout(false), []);

  function switchTab(t) {
    triggerHaptic('light');
    setTab(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function placeOrder(order) {
    setAllOrders((prev) => [...prev, { ...order, userEmail: email }]);
    clear();
    setNow(Date.now());
  }

  const shellModeClass =
    viewMode === 'tablet' ? 'fluid-mode' : viewMode === 'full' ? 'full-mode' : '';

  return (
    <div className="min-h-dvh flex flex-col items-center justify-start bg-slate-100 dark:bg-slate-950 text-[var(--theme-text)]">
      {/* ================= DESKTOP UTILITY BAR ================= */}
      <div className="hidden md:flex w-full max-w-4xl items-center justify-between px-6 py-2.5 my-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 text-xs font-semibold">
        <div className="flex items-center gap-3">
          <img
            src="/brand-logo.png"
            alt="Student Biryani"
            className="w-7 h-7 rounded-lg bg-white p-0.5 object-contain shadow-xs border border-slate-200"
          />
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-display font-bold text-sm tracking-tight text-[var(--theme-text)]">
            Student Biryani · Interactive Mobile App
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 dark:text-slate-400 font-normal">
            Theme:{' '}
            <strong className="text-[var(--theme-accent-text)]">{activeTheme.name}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick theme button */}
          <button
            onClick={() => {
              triggerHaptic('light');
              openThemeModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>Theme Colors</span>
          </button>

          {/* Device viewport toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition ${
                viewMode === 'mobile'
                  ? 'bg-white dark:bg-slate-700 shadow-xs text-black dark:text-white font-bold'
                  : 'text-slate-500'
              }`}
              title="Mobile Phone View (440px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Mobile</span>
            </button>

            <button
              onClick={() => setViewMode('tablet')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition ${
                viewMode === 'tablet'
                  ? 'bg-white dark:bg-slate-700 shadow-xs text-black dark:text-white font-bold'
                  : 'text-slate-500'
              }`}
              title="Tablet View (680px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tablet</span>
            </button>

            <button
              onClick={() => setViewMode('full')}
              className={`p-1.5 rounded-lg flex items-center gap-1 transition ${
                viewMode === 'full'
                  ? 'bg-white dark:bg-slate-700 shadow-xs text-black dark:text-white font-bold'
                  : 'text-slate-500'
              }`}
              title="Full Responsive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Full</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= APP PHONE / SHELL CONTAINER ================= */}
      <div
        className={`phone-shell ${shellModeClass} sm:my-3 sm:rounded-[36px] border border-transparent sm:border-slate-300/70 dark:sm:border-slate-800`}
      >
        <div className="flex-1 w-full flex flex-col justify-between relative">
          {splash ? (
            <Splash />
          ) : !user ? (
            <Auth onLogin={setUser} />
          ) : (
            <div
              className={`app-content ${
                count > 0 && tab === 'Menu' ? 'has-cart' : ''
              }`}
            >
              {tab === 'Menu' ? (
                <Dashboard
                  user={user}
                  city={city}
                  setCity={setCity}
                  onNavigate={switchTab}
                />
              ) : tab === 'Orders' ? (
                <Orders orders={orders} now={now} onBrowse={() => switchTab('Menu')} />
              ) : (
                <Profile
                  user={user}
                  city={city}
                  setCity={setCity}
                  orders={orders}
                  storageWarning={storageWarning}
                  onLogout={() => {
                    setUser(null);
                    clear();
                    setTab('Menu');
                  }}
                />
              )}
            </div>
          )}

          {/* ================= FLOATING CART BAR ================= */}
          {!splash && user && !checkout && count > 0 && tab === 'Menu' && (
            <aside className="floating-cart-bar animate-slideUp">
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setCheckout(true);
                }}
                className="w-full p-3 rounded-2xl bg-[var(--theme-primary)] text-white shadow-xl border border-white/20 flex items-center justify-between gap-3 active:scale-[0.98] transition hover:opacity-95"
                aria-label={`View bag with ${count} items, total ${money(subtotal)}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--theme-accent)] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                    {count}
                  </div>
                  <div className="text-left">
                    <p className="font-extrabold text-xs leading-tight text-white">
                      Your Dum Feast Bag
                    </p>
                    <p className="text-[11px] text-white/80">
                      {count} {count === 1 ? 'dish' : 'dishes'} selected · Review order
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs text-[var(--theme-accent)]">
                    {money(subtotal)}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </button>
            </aside>
          )}

          {/* ================= BOTTOM NAVIGATION ================= */}
          {!splash && user && !checkout && (
            <BottomNav
              tab={tab}
              onChange={switchTab}
              activeOrdersCount={activeOrdersCount}
            />
          )}

          {/* ================= CHECKOUT SHEET MODAL ================= */}
          {checkout && (
            <CheckoutSheet
              city={city}
              setCity={setCity}
              onClose={closeCheckout}
              onOrder={placeOrder}
              onTrack={() => {
                setCheckout(false);
                switchTab('Orders');
              }}
            />
          )}
        </div>
      </div>

      {/* Global Theme Selector Modal */}
      <ThemeModal />

      {/* iOS Safari PWA Installation Modal */}
      <IosInstallModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PwaProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </PwaProvider>
    </ThemeProvider>
  );
}
