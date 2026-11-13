export default function DishArt({ dish, className = '' }) {
  const imgSrc = `/dishes/${dish?.id}.png`;

  return (
    <div
      className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-900 border border-[var(--theme-border)]/40 ${className}`}
    >
      <img
        src={imgSrc}
        alt={dish?.name || 'Student Biryani dish'}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          // Fallback if image path fails
          e.currentTarget.style.display = 'none';
        }}
      />
      {/* Soft gradient edge at the bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
    </div>
  );
}
