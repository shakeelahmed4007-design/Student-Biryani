
export default function BiryaniBowl({ className = '', withSteam = false }) {
  return (
    <div
      className={`relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-[var(--theme-border)]/50 bg-gradient-to-br from-amber-100 to-amber-200/50 ${className}`}
    >
      <img
        src="/dishes/chicken.png"
        alt="Student Biryani signature dum biryani"
        className="w-full h-full object-cover"
      />
      {withSteam && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none opacity-80">
          <span className="w-1.5 h-7 bg-white/70 rounded-full blur-[2px] animate-steam" />
          <span className="w-2 h-9 bg-white/60 rounded-full blur-[2px] animate-steam [animation-delay:0.4s]" />
          <span className="w-1.5 h-6 bg-white/70 rounded-full blur-[2px] animate-steam [animation-delay:0.8s]" />
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
