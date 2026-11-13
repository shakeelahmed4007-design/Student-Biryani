import { usePwa } from '../context/PwaContext';
import { Share, PlusSquare, X, Smartphone } from 'lucide-react';

export default function IosInstallModal() {
  const { showIosGuide, closeIosGuide } = usePwa();

  if (!showIosGuide) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeIosGuide();
      }}
    >
      <div className="w-full max-w-sm bg-[var(--theme-surface)] text-[var(--theme-text)] rounded-3xl p-5 shadow-2xl border border-[var(--theme-border)] space-y-4 animate-slideUp">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent-light)] text-[var(--theme-accent-text)] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[var(--theme-text)]">
                Install on iPhone / iPad
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)]">
                Add Student Biryani to Home Screen
              </p>
            </div>
          </div>
          <button
            onClick={closeIosGuide}
            className="w-8 h-8 rounded-full bg-[var(--theme-border)]/50 flex items-center justify-center text-[var(--theme-text-muted)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-[var(--theme-text)]">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
            <div className="w-7 h-7 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
              <Share className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold">Step 1: Tap Share Button</p>
              <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">
                In Safari browser at the bottom, tap the share icon.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[var(--theme-bg)] border border-[var(--theme-border)]">
            <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
              <PlusSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold">Step 2: Add to Home Screen</p>
              <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">
                Scroll down and tap <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={closeIosGuide}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-[var(--theme-primary)] text-white"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

