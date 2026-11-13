import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';
import { triggerHaptic, playAppSound } from '../utils/haptics';

export default function Stepper({ dish, compact = true }) {
  const { cart, change } = useCart();
  const qty = cart[dish.id] || 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    triggerHaptic('light');
    playAppSound('add');
    change(dish.id, 1);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    triggerHaptic('light');
    playAppSound('remove');
    change(dish.id, -1);
  };

  if (qty > 0) {
    return (
      <div
        className="flex items-center justify-between rounded-xl bg-[var(--theme-primary)] text-white font-bold shadow-md transition-all animate-pop h-8 px-1 min-w-[78px]"
        aria-label={`${dish.name} quantity: ${qty}`}
      >
        <button
          type="button"
          onClick={handleRemove}
          className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/20 active:scale-90 transition text-white"
          aria-label={`Remove one ${dish.name}`}
        >
          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <span className="font-extrabold text-xs px-1 min-w-[16px] text-center" aria-live="polite">
          {qty}
        </span>

        <button
          type="button"
          disabled={qty >= 99}
          onClick={handleAdd}
          className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/20 active:scale-90 transition text-white disabled:opacity-40"
          aria-label={`Add one ${dish.name}`}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="h-8 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] text-white shadow-sm active:scale-95 transition"
      aria-label={`Add ${dish.name} to bag`}
    >
      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
      <span>ADD</span>
    </button>
  );
}
