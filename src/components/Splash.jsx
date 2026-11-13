import BiryaniBowl from './BiryaniBowl';
import { Sparkles } from 'lucide-react';

export default function Splash() {
  return (
    <section className="min-h-full flex flex-col justify-between items-center text-center px-6 py-12 bg-gradient-to-b from-[var(--theme-primary)] via-[var(--theme-primary)] to-[var(--theme-bg)] text-white relative overflow-hidden select-none">
      {/* Background glow circle */}
      <div className="absolute w-72 h-72 rounded-full bg-[var(--theme-accent)]/20 blur-3xl top-1/4 pointer-events-none" />

      {/* Top brand mark */}
      <div className="pt-4 flex items-center gap-2">
        <span className="text-[10px] font-extrabold tracking-widest text-[var(--theme-accent)] uppercase">
          ESTABLISHED 1969 · KARACHI
        </span>
      </div>

      {/* Center hero */}
      <div className="w-full max-w-[280px] my-auto space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-white p-2 mx-auto shadow-2xl border-2 border-white/30 animate-pop flex items-center justify-center">
          <img
            src="/brand-logo.png"
            alt="Student Biryani"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="animate-floaty">
          <BiryaniBowl withSteam={true} />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[var(--theme-accent)] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authentic Dum Flavour</span>
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Student <br />
            <em className="text-[var(--theme-accent)] not-italic">Biryani</em>
          </h1>
          <p className="text-sm text-white/75 mt-2 font-medium">
            A little dum. A lot of joy.
          </p>
        </div>
      </div>

      {/* Bottom loading indicator */}
      <div className="w-full max-w-[200px] pb-6 space-y-2">
        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--theme-accent)] rounded-full animate-[loading_2.6s_ease-out_forwards]" />
        </div>
        <p className="text-[10px] tracking-widest text-white/60 uppercase font-bold">
          WARMING THE DUM DEG...
        </p>
      </div>
    </section>
  );
}
