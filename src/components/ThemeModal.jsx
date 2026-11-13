import { useTheme } from '../context/ThemeContext';
import { Palette, Check, Sparkles, X } from 'lucide-react';

export default function ThemeModal() {
  const { theme, setTheme, themes, themeModalOpen, closeThemeModal } = useTheme();

  if (!themeModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeThemeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-modal-title"
    >
      <div className="w-full sm:max-w-md bg-[var(--theme-surface)] text-[var(--theme-text)] rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-[var(--theme-border)] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent-light)] flex items-center justify-center text-[var(--theme-accent-text)]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 id="theme-modal-title" className="font-display text-xl font-bold">
                Select Color Theme
              </h2>
              <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                Instant live preview across the entire app
              </p>
            </div>
          </div>
          <button
            onClick={closeThemeModal}
            className="w-9 h-9 rounded-full bg-[var(--theme-border)]/50 hover:bg-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] transition"
            aria-label="Close theme selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-3">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'border-2 border-[var(--theme-accent)] bg-[var(--theme-accent-light)]/40 shadow-sm'
                    : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 hover:bg-[var(--theme-border)]/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Swatch circle preview */}
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-inner border border-black/10 shrink-0 flex">
                    <span
                      className="w-1/2 h-full"
                      style={{ backgroundColor: t.swatch[0] }}
                    />
                    <span
                      className="w-1/2 h-full"
                      style={{ backgroundColor: t.swatch[1] }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[var(--theme-text)]">
                        {t.name}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--theme-border)] text-[var(--theme-text-muted)]">
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--theme-accent-text)] font-semibold mt-0.5">
                      {t.subtitle}
                    </p>
                    <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">
                      {t.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-3">
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-[var(--theme-accent)] text-white flex items-center justify-center shadow-md animate-pop">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-[var(--theme-border)]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--theme-border)] bg-[var(--theme-bg)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]">
            <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
            <span>5 mouth-watering color palettes</span>
          </div>
          <button
            onClick={closeThemeModal}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--theme-primary)] text-white hover:opacity-90 transition active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
