import { Utensils, ShoppingBag, User } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

export default function BottomNav({ tab, onChange, activeOrdersCount = 0 }) {
  const navItems = [
    { id: 'Menu', label: 'Explore', icon: Utensils },
    { id: 'Orders', label: 'My Orders', icon: ShoppingBag, badge: activeOrdersCount },
    { id: 'Profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="app-bottom-nav px-3 pt-2 pb-2 bg-[var(--theme-surface)]/95 backdrop-blur-md border-t border-[var(--theme-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="Main application navigation"
    >
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                triggerHaptic('light');
                onChange(item.id);
              }}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-[var(--theme-accent-text)]'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? 'stroke-[2.5] text-[var(--theme-accent)] scale-110'
                      : 'stroke-[1.8]'
                  }`}
                />
                {/* Active orders badge */}
                {Boolean(item.badge) && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] px-1 bg-[var(--theme-secondary)] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight ${
                  isActive
                    ? 'font-extrabold text-[var(--theme-text)]'
                    : 'font-semibold'
                }`}
              >
                {item.label}
              </span>

              {/* Tiny active dot indicator */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] mt-0.5 animate-pop" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
