import { useState, useEffect, useRef } from 'react';
import { categories, cities, menu, money } from '../data/menu';
import DishArt from './DishArt';
import Stepper from './Stepper';
import BiryaniBowl from './BiryaniBowl';
import { useTheme } from '../context/ThemeContext';
import { usePwa } from '../context/PwaContext';
import { triggerHaptic } from '../utils/haptics';
import {
  Search,
  X,
  Menu as MenuIcon,
  MapPin,
  Clock,
  Star,
  Tag,
  Palette,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Percent,
  Download,
} from 'lucide-react';

export default function Dashboard({ user, city, setCity, onNavigate }) {
  const { openThemeModal, activeTheme } = useTheme();
  const { isInstalled, installApp } = usePwa();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [spiceFilter, setSpiceFilter] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const drawerRef = useRef(null);
  const menuButton = useRef(null);

  // Close drawer on escape & trap focus
  useEffect(() => {
    if (!drawer) return;
    drawerRef.current?.querySelector('button')?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setDrawer(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawer]);

  // Filter dishes
  const filteredDishes = menu.filter((d) => {
    const matchesCategory = category === 'All' || d.category === category;
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase().trim()) ||
      d.category.toLowerCase().includes(search.toLowerCase().trim()) ||
      d.note.toLowerCase().includes(search.toLowerCase().trim());
    const matchesSpice = !spiceFilter || d.spice >= 2;
    const matchesBudget = !budgetFilter || d.price <= 500;
    return matchesCategory && matchesSearch && matchesSpice && matchesBudget;
  });

  const handleCopyCode = () => {
    triggerHaptic('medium');
    navigator.clipboard?.writeText('STUDENT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="animate-fadeIn">
      {/* ================= CLEAN STICKY APP HEADER ================= */}
      <header className="app-header px-4 pt-3 pb-3 bg-[var(--theme-surface)]/95 backdrop-blur-md border-b border-[var(--theme-border)] shadow-xs">
        {/* Top row: Brand & Quick actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setSpiceFilter(false);
                setBudgetFilter(false);
              }}
              className="w-11 h-11 rounded-2xl bg-white p-1 border border-[var(--theme-border)] shadow-xs shrink-0 flex items-center justify-center hover:scale-105 active:scale-95 transition"
              aria-label="Student Biryani home"
            >
              <img
                src="/brand-logo.png"
                alt="Student Biryani"
                className="w-full h-full object-contain"
              />
            </button>

            <div className="min-w-0">
              <h1 className="font-display font-bold text-base leading-tight text-[var(--theme-text)] truncate">
                Student Biryani
              </h1>
              {/* City selector dropdown pill */}
              <div className="flex items-center gap-1 text-xs text-[var(--theme-accent-text)] font-bold">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--theme-accent)]" />
                <select
                  value={city}
                  onChange={(e) => {
                    triggerHaptic('light');
                    setCity(e.target.value);
                  }}
                  className="bg-transparent cursor-pointer outline-none font-bold text-xs"
                  aria-label="Delivery city"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Install App button if not installed */}
            {!isInstalled && (
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  installApp();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-500/20 active:scale-95 transition"
                title="Install Mobile App"
              >
                <Download className="w-3.5 h-3.5" />
                <span>App</span>
              </button>
            )}

            {/* Theme Switcher Button */}
            <button
              onClick={() => {
                triggerHaptic('light');
                openThemeModal();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[var(--theme-accent-light)] border border-[var(--theme-accent)]/30 text-[var(--theme-accent-text)] font-extrabold text-xs shadow-xs active:scale-95 transition"
              title="Change Theme Colors"
              aria-label="Change theme colors"
            >
              <Palette className="w-3.5 h-3.5" />
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: activeTheme.accentColor }}
              />
            </button>

            {/* Drawer menu toggle button */}
            <button
              ref={menuButton}
              onClick={() => {
                triggerHaptic('light');
                setDrawer(true);
              }}
              className="w-8 h-8 rounded-full bg-[var(--theme-border)]/40 hover:bg-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text)] transition active:scale-90"
              aria-label="Open menu drawer"
            >
              <MenuIcon className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Search input bar */}
        <div className="mt-2.5 relative">
          <div className="flex items-center w-full rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)] px-3 py-2 shadow-inner focus-within:border-[var(--theme-accent)] transition">
            <Search className="w-4 h-4 text-[var(--theme-text-muted)] shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Search chicken biryani, beef, raita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]/70 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="w-5 h-5 rounded-full bg-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] text-xs"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= DRAWER NAVIGATION ================= */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDrawer(false);
          }}
        >
          <aside
            ref={drawerRef}
            className="w-4/5 max-w-[320px] h-full bg-[var(--theme-surface)] text-[var(--theme-text)] p-5 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideUp"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
          >
            <div>
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-xs border border-[var(--theme-border)] flex items-center justify-center shrink-0">
                    <img
                      src="/brand-logo.png"
                      alt="Student Biryani"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base leading-tight">
                      Student Biryani
                    </h2>
                    <p className="text-[11px] text-[var(--theme-accent-text)] font-semibold">
                      Authentic Dum Biryani
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawer(false)}
                  className="w-8 h-8 rounded-full bg-[var(--theme-border)]/50 flex items-center justify-center text-[var(--theme-text-muted)]"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User greeting card */}
              <div className="mt-3.5 p-3 rounded-2xl bg-[var(--theme-accent-light)]/40 border border-[var(--theme-accent)]/20">
                <p className="text-xs text-[var(--theme-text-muted)]">Signed in as</p>
                <p className="font-bold text-sm text-[var(--theme-text)] mt-0.5">
                  {user.name}
                </p>
                <p className="text-xs text-[var(--theme-accent-text)] truncate">
                  {user.email}
                </p>
              </div>

              {/* Navigation links */}
              <nav className="mt-4 space-y-1.5">
                <button
                  onClick={() => {
                    setDrawer(false);
                    setSearch('');
                    setCategory('All');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[var(--theme-border)]/30 text-left font-bold text-xs transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] flex items-center justify-center text-xs">
                      01
                    </span>
                    <span>Explore Full Menu</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                </button>

                <button
                  onClick={() => {
                    setDrawer(false);
                    onNavigate('Orders');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[var(--theme-border)]/30 text-left font-bold text-xs transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] flex items-center justify-center text-xs">
                      02
                    </span>
                    <span>My Past Orders</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                </button>

                <button
                  onClick={() => {
                    setDrawer(false);
                    onNavigate('Profile');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-[var(--theme-border)]/30 text-left font-bold text-xs transition"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] flex items-center justify-center text-xs">
                      03
                    </span>
                    <span>My Profile & Settings</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />
                </button>

                {/* Install App button in Drawer */}
                {!isInstalled && (
                  <button
                    onClick={() => {
                      setDrawer(false);
                      installApp();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-left font-bold text-xs transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4" />
                      <span>Install Mobile App</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase">1-Tap</span>
                  </button>
                )}
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="pt-4 border-t border-[var(--theme-border)] text-xs text-[var(--theme-text-muted)] space-y-1">
              <p className="font-bold text-[var(--theme-text)]">Student Biryani Karachi</p>
              <p>📞 Helpline: (021) 111-788-336</p>
              <p>✨ 100% Halal Fresh Ingredients</p>
            </div>
          </aside>
        </div>
      )}

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="px-3.5 pt-3 space-y-4">
        {/* PROMO BANNER (Compact & Clean) */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--theme-accent-light)] via-[var(--theme-surface)] to-[var(--theme-accent-light)] border border-[var(--theme-accent)]/30 p-4 sm:p-5 shadow-xs">
          <div className="relative z-10 max-w-[62%] sm:max-w-[65%]">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)] text-white text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
              <Percent className="w-3 h-3" />
              <span>Student Deal</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight text-[var(--theme-text)]">
              Flat 10% Off <br />
              <em className="text-[var(--theme-secondary)] not-italic">
                On Every Dum!
              </em>
            </h2>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-medium">
              Use promo code at checkout
            </p>

            {/* Interactive Coupon Code Button */}
            <button
              onClick={handleCopyCode}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-primary)] text-white font-extrabold text-xs shadow-sm active:scale-95 transition"
              aria-label="Copy promo code STUDENT10"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span>Code Copied! ✓</span>
                </>
              ) : (
                <>
                  <Tag className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                  <span>STUDENT10</span>
                  <span className="text-[10px] opacity-75 font-normal">(Tap to copy)</span>
                </>
              )}
            </button>
          </div>

          {/* Clean biryani bowl graphic */}
          <div className="absolute -right-3 -bottom-3 w-32 sm:w-36 rotate-6 pointer-events-none opacity-95">
            <BiryaniBowl withSteam={true} />
          </div>
        </section>

        {/* CATEGORY TABS & FILTER BAR */}
        <section className="space-y-2">
          {/* Category Horizontal Scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-3.5 px-3.5 category-scroll">
            {categories.map((c) => {
              const isSelected = category === c;
              return (
                <button
                  key={c}
                  onClick={() => {
                    triggerHaptic('light');
                    setCategory(c);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-sm scale-[1.02]'
                      : 'bg-[var(--theme-surface)] text-[var(--theme-text)] border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {c === 'All' && '✨ '}
                  {c === 'Chicken' && '🍗 '}
                  {c === 'Beef' && '🥩 '}
                  {c === 'Mutton' && '🍖 '}
                  {c === 'Sides' && '🥣 '}
                  {c === 'Drinks' && '🥤 '}
                  {c}
                </button>
              );
            })}
          </div>

          {/* Quick Filter Chips (Spicy & Budget) */}
          <div className="flex items-center justify-between gap-2 px-0.5">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => {
                  triggerHaptic('light');
                  setSpiceFilter(!spiceFilter);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition ${
                  spiceFilter
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-text-muted)] border-[var(--theme-border)]'
                }`}
              >
                <span>🌶️ Spicy Only</span>
                {spiceFilter && <Check className="w-3 h-3 stroke-[3]" />}
              </button>

              <button
                onClick={() => {
                  triggerHaptic('light');
                  setBudgetFilter(!budgetFilter);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition ${
                  budgetFilter
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-text-muted)] border-[var(--theme-border)]'
                }`}
              >
                <span>💰 Under Rs. 500</span>
                {budgetFilter && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>

            {/* Reset link */}
            {(category !== 'All' || spiceFilter || budgetFilter || search) && (
              <button
                onClick={() => {
                  triggerHaptic('light');
                  setCategory('All');
                  setSpiceFilter(false);
                  setBudgetFilter(false);
                  setSearch('');
                }}
                className="text-xs font-bold text-[var(--theme-secondary)] hover:underline shrink-0"
              >
                Reset
              </button>
            )}
          </div>
        </section>

        {/* ================= CLEAN DISHES GRID ================= */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h2 className="font-display text-lg font-bold text-[var(--theme-text)]">
              Fresh Dum Menu
            </h2>
            <span className="text-xs text-[var(--theme-text-muted)] font-semibold">
              {filteredDishes.length} items
            </span>
          </div>

          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {filteredDishes.map((dish) => (
                <article
                  key={dish.id}
                  className="rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:shadow-sm animate-fadeIn"
                >
                  <div className="p-2 pb-0">
                    {/* Dish Image (Square, Sharp, No Bleed) */}
                    <div className="relative">
                      <DishArt dish={dish} />

                      {/* Rating pill */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {dish.rating}
                      </span>

                      {/* Spice indicator badge */}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center gap-0.5">
                        {dish.spice === 0 ? 'Mild' : '🌶️'.repeat(dish.spice)}
                      </span>
                    </div>

                    {/* Dish Content (Clean, Legible Typography) */}
                    <div className="mt-2.5 px-1">
                      <span className="text-[10px] font-extrabold tracking-wider uppercase text-[var(--theme-accent-text)] block">
                        {dish.badge || dish.category}
                      </span>

                      <h3 className="font-bold text-xs sm:text-sm text-[var(--theme-text)] mt-0.5 line-clamp-1 leading-snug">
                        {dish.name}
                      </h3>

                      <p className="text-xs text-[var(--theme-text-muted)] mt-0.5 line-clamp-1">
                        {dish.portion}
                      </p>
                    </div>
                  </div>

                  {/* Single Line Footer: Price on Left, Stepper on Right! */}
                  <div className="p-2 sm:p-2.5 pt-2 mt-2 border-t border-[var(--theme-border)]/60 flex items-center justify-between gap-1.5">
                    <strong className="text-sm sm:text-base font-extrabold text-[var(--theme-text)]">
                      {money(dish.price)}
                    </strong>

                    <div className="shrink-0">
                      <Stepper dish={dish} compact={true} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Clean Empty State */
            <div className="py-10 px-4 text-center rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[var(--theme-accent-light)] flex items-center justify-center mx-auto mb-3 text-[var(--theme-accent-text)]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-base font-bold text-[var(--theme-text)]">
                No dishes found
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-1 max-w-xs mx-auto">
                No items match your active filters. Try searching something else or clearing filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                  setSpiceFilter(false);
                  setBudgetFilter(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl font-bold text-xs bg-[var(--theme-primary)] text-white active:scale-95 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* TRUST BADGES & APP FOOTER */}
        <section className="pt-3 pb-6 text-center border-t border-[var(--theme-border)]/80">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold text-[var(--theme-text-muted)]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Halal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Slow Dum Deg
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Fast Delivery
            </span>
          </div>
          <p className="text-[10px] tracking-widest text-[var(--theme-text-muted)]/70 uppercase font-bold mt-2.5">
            STUDENT BIRYANI ✳ A LITTLE DUM, A LOT OF JOY
          </p>
        </section>
      </main>
    </div>
  );
}
