import { money } from '../data/menu';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  Flame,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export function orderStage(order, now) {
  const age = now - order.createdAt;
  return age >= 120000 ? 2 : age >= 60000 ? 1 : 0;
}

export default function Orders({ orders, now, onBrowse }) {
  const { change } = useCart();

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      change(item.id, item.quantity);
    });
    onBrowse();
  };

  return (
    <main className="px-4 pt-6 pb-4 animate-fadeIn space-y-5">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--theme-accent-text)]">
          Live Tracking & History
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-[var(--theme-text)] mt-1">
          Your Biryani <em className="text-[var(--theme-secondary)] not-italic">Orders</em>
        </h1>
        <p className="text-xs text-[var(--theme-text-muted)] mt-1">
          Track active kitchen orders and re-order your favourites
        </p>
      </div>

      {!orders.length ? (
        /* Empty State */
        <div className="py-14 px-6 text-center rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-[var(--theme-accent-light)] flex items-center justify-center mx-auto mb-4 text-[var(--theme-accent-text)]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--theme-text)]">
            No Orders Yet
          </h2>
          <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 max-w-xs mx-auto leading-relaxed">
            Your stomach deserves some hot, fragrant dum biryani! Browse our fresh menu and place your first demo order.
          </p>
          <button
            onClick={onBrowse}
            className="mt-6 px-6 py-3 rounded-2xl btn-primary mx-auto"
          >
            <span>Explore Dum Menu</span>
            <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
          </button>
        </div>
      ) : (
        /* Orders list */
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-light)]/60 border border-[var(--theme-accent)]/20 text-xs text-[var(--theme-accent-text)] font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              Real-time demo tracker: Preparing (0-1m) ➔ On the way (1-2m) ➔ Delivered (2m+).
            </span>
          </div>

          {[...orders].reverse().map((o) => {
            const stage = orderStage(o, now);
            const statusConfig = [
              { label: 'Preparing in Kitchen', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', icon: Flame },
              { label: 'Rider On the Way', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', icon: Truck },
              { label: 'Delivered Fresh', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', icon: CheckCircle },
            ][stage];
            const StatusIcon = statusConfig.icon;

            return (
              <article
                key={o.id}
                className="p-5 rounded-3xl bg-[var(--theme-card)] border border-[var(--theme-card-border)] shadow-sm space-y-4 transition hover:shadow-md"
              >
                {/* Order Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--theme-text-muted)]">
                      {new Date(o.createdAt).toLocaleString('en-PK', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                    <h3 className="font-display font-bold text-base text-[var(--theme-text)]">
                      Order #{o.id}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${statusConfig.color}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{statusConfig.label}</span>
                  </span>
                </div>

                {/* Progress bar steps */}
                <div className="relative py-2">
                  <div className="flex justify-between items-center relative z-10">
                    {['Kitchen Dum', 'On The Way', 'Delivered'].map((stepName, idx) => {
                      const isComplete = idx <= stage;
                      return (
                        <div key={stepName} className="flex flex-col items-center gap-1.5">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                              isComplete
                                ? 'bg-[var(--theme-primary)] text-white scale-105'
                                : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
                            }`}
                          >
                            {idx < stage ? '✓' : idx + 1}
                          </span>
                          <span
                            className={`text-[10px] font-bold ${
                              isComplete
                                ? 'text-[var(--theme-text)]'
                                : 'text-[var(--theme-text-muted)]'
                            }`}
                          >
                            {stepName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Connecting line */}
                  <div className="absolute top-5 left-8 right-8 h-0.5 bg-[var(--theme-border)] -z-0" />
                  <div
                    className="absolute top-5 left-8 h-0.5 bg-[var(--theme-primary)] transition-all duration-700 -z-0"
                    style={{
                      width: stage === 0 ? '0%' : stage === 1 ? '50%' : 'calc(100% - 64px)',
                    }}
                  />
                </div>

                {/* Items breakdown */}
                <div className="p-3 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]/60 text-xs space-y-1.5">
                  <p className="font-extrabold text-[var(--theme-text-muted)] uppercase text-[10px]">
                    Items in order:
                  </p>
                  <ul className="space-y-1">
                    {o.items.map((it) => (
                      <li key={it.id} className="flex justify-between font-medium text-[var(--theme-text)]">
                        <span>
                          {it.quantity}× {it.name}
                        </span>
                        <span className="font-bold">{money(it.price * it.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer details & Reorder */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-[var(--theme-text-muted)]">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      <span>{o.city} · {o.method}</span>
                    </p>
                    <p className="font-extrabold text-sm text-[var(--theme-text)] mt-0.5">
                      Total: {money(o.total)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReorder(o)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--theme-accent-light)] hover:bg-[var(--theme-accent)] hover:text-white text-[var(--theme-accent-text)] text-xs font-bold transition shadow-sm active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
