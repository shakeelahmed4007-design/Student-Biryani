import { useEffect, useRef, useState } from 'react';
import { cities, money } from '../data/menu';
import { useCart } from '../context/CartContext';
import Stepper from './Stepper';
import { triggerHaptic, playAppSound } from '../utils/haptics';
import {
  X,
  MapPin,
  Phone,
  CheckCircle2,
  Tag,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default function CheckoutSheet({ city, setCity, onClose, onOrder, onTrack }) {
  const { items, subtotal, count } = useCart();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [promo, setPromo] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [method, setMethod] = useState('Cash on Delivery');
  const [success, setSuccess] = useState(null);
  const [busy, setBusy] = useState(false);

  const dialog = useRef(null);
  const heading = useRef(null);
  const processing = useRef(false);

  const discount = discounted ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = 50;
  const total = subtotal + deliveryFee - discount;

  // Keyboard navigation & accessibility
  useEffect(() => {
    dialog.current?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape' && !processing.current) {
        onClose();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useEffect(() => {
    heading.current?.focus();
  }, [step, success]);

  // Validation
  function handleNextStep(e) {
    e.preventDefault();
    const err = {};
    if (step === 0) {
      if (address.trim().length < 8) {
        err.address = 'Please enter your complete address (at least 8 characters).';
      }
      // Pakistani phone validation: 03XX or +923XX
      const cleanedPhone = phone.replace(/[\s-]/g, '');
      if (!/^(?:\+92|0)?3\d{9}$/.test(cleanedPhone)) {
        err.phone = 'Please enter a valid Pakistani mobile number (e.g. 0300 1234567).';
      }
    }
    if (!count) {
      err.cart = 'Your bag is empty. Please add items to proceed.';
    }
    setErrors(err);
    if (!Object.keys(err).length) {
      setStep((s) => s + 1);
    }
  }

  function handleApplyPromo() {
    if (promo.trim().toUpperCase() === 'STUDENT10') {
      setDiscounted(true);
      setPromoError('');
      triggerHaptic('medium');
    } else {
      setPromoError('Invalid promo code. Try "STUDENT10" for 10% off.');
      triggerHaptic('warning');
    }
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (processing.current || !count) return;
    processing.current = true;
    setBusy(true);
    triggerHaptic('medium');

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newOrder = {
      id: `SB-${randomSuffix}`,
      createdAt: Date.now(),
      items: items.map((x) => ({ ...x })),
      subtotal,
      delivery: deliveryFee,
      discount,
      total,
      method,
      city,
      address: address.trim(),
      phone: phone.trim(),
    };

    setTimeout(() => {
      onOrder(newOrder);
      setSuccess(newOrder);
      processing.current = false;
      setBusy(false);
      triggerHaptic('success');
      playAppSound('success');
    }, 700);
  }

  // Summary breakdown block
  const orderSummary = (
    <div className="mt-5 p-4 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-sm space-y-2.5">
      <div className="flex justify-between text-[var(--theme-text-muted)]">
        <span>Items Subtotal ({count} items)</span>
        <span className="font-bold text-[var(--theme-text)]">{money(subtotal)}</span>
      </div>
      <div className="flex justify-between text-[var(--theme-text-muted)]">
        <span>Delivery Fee (Standard Express)</span>
        <span className="font-bold text-[var(--theme-text)]">{money(deliveryFee)}</span>
      </div>
      {discounted && (
        <div className="flex justify-between text-emerald-600 font-bold">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> STUDENT10 (10% Discount)
          </span>
          <span>-{money(discount)}</span>
        </div>
      )}
      <div className="pt-3 border-t border-[var(--theme-border)] flex justify-between items-baseline font-extrabold text-base text-[var(--theme-text)]">
        <span>Total Amount</span>
        <span className="text-lg text-[var(--theme-accent-text)]">{money(total)}</span>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
    >
      <section
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        tabIndex={-1}
        className="w-full max-w-lg max-h-[92dvh] bg-[var(--theme-bg)] text-[var(--theme-text)] rounded-t-[32px] sm:rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp outline-none"
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-[var(--theme-border)] mx-auto mt-3 mb-1 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-2 pb-3 border-b border-[var(--theme-border)] shrink-0">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--theme-accent-text)]">
              {success ? 'Order Confirmed 🎉' : `Step 0${step + 1} of 03`}
            </span>
            <h2
              id="checkout-title"
              ref={heading}
              tabIndex={-1}
              className="font-display text-2xl font-bold leading-tight text-[var(--theme-text)] outline-none"
            >
              {success ? 'Dum is in the Works!' : 'Checkout & Delivery'}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={busy}
            className="w-9 h-9 rounded-full bg-[var(--theme-border)]/50 hover:bg-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] transition"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {success ? (
          <div className="p-6 overflow-y-auto text-center flex-1 space-y-5 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-pop">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-[var(--theme-text)]">
                Dum. Done. Delicious!
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-1.5 max-w-xs mx-auto leading-relaxed">
                Your order has been received by Student Biryani {success.city}. The kitchen is packing your fresh meal!
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-sm text-left space-y-3">
              <div className="flex justify-between items-center pb-2.5 border-b border-[var(--theme-border)]">
                <div>
                  <span className="text-[10px] text-[var(--theme-text-muted)] font-bold">ORDER NUMBER</span>
                  <p className="font-display font-bold text-base text-[var(--theme-text)]">
                    {success.id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[var(--theme-text-muted)] font-bold">ESTIMATED TIME</span>
                  <p className="font-extrabold text-sm text-emerald-600">25–35 mins</p>
                </div>
              </div>

              <div className="text-xs text-[var(--theme-text)] space-y-1">
                <p>
                  <strong>Deliver to:</strong> {success.address}, {success.city}
                </p>
                <p>
                  <strong>Contact:</strong> {success.phone}
                </p>
                <p>
                  <strong>Payment:</strong> {success.method} ·{' '}
                  <span className="font-bold text-[var(--theme-accent-text)]">
                    {money(success.total)}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onTrack}
                className="w-full btn-primary justify-center"
              >
                <span>Track Live Order</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition"
              >
                Back to Food Menu
              </button>
            </div>
          </div>
        ) : (
          /* STEPPER FORM */
          <form onSubmit={step < 2 ? handleNextStep : handlePlaceOrder} className="flex flex-col flex-1 min-h-0">
            {/* Step indicators */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
              {['Location', 'Bag Review', 'Payment'].map((name, i) => (
                <div key={name} className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i <= step
                        ? 'bg-[var(--theme-primary)] text-white'
                        : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`text-xs font-bold hidden sm:inline ${
                      i <= step ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)]'
                    }`}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Scrollable content area */}
            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
              {/* STEP 0: LOCATION & CONTACT */}
              {step === 0 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]">
                    <MapPin className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Where should we deliver your biryani?</span>
                  </div>

                  {/* City Select */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
                      Select Branch City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="input-field"
                    >
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c} Branch
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
                      Complete Street Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. House 14, Street 5, Block 7, Gulshan-e-Iqbal..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`input-field min-h-[75px] resize-none ${
                        errors.address ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 font-semibold mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
                      Mobile Number (For Rider Contact)
                    </label>
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-semibold mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Delivery note banner */}
                  <div className="p-3.5 rounded-2xl bg-[var(--theme-accent-light)]/60 border border-[var(--theme-accent)]/30 text-xs text-[var(--theme-accent-text)] flex items-center justify-between">
                    <div>
                      <p className="font-extrabold">Instant Dum Dispatch</p>
                      <p className="text-[11px] opacity-90">Hot delivery in 25–35 mins</p>
                    </div>
                    <span className="font-extrabold text-sm">{money(deliveryFee)}</span>
                  </div>
                </div>
              )}

              {/* STEP 1: BAG REVIEW & PROMO */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]">
                    <ShoppingBag className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Review your selected feast ({count} items)</span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-sm"
                      >
                        <div className="pr-2">
                          <h4 className="font-bold text-sm text-[var(--theme-text)]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[var(--theme-accent-text)] font-semibold mt-0.5">
                            {money(item.price)} each
                          </p>
                        </div>
                        <div className="w-[100px] shrink-0">
                          <Stepper dish={item} compact={true} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code section */}
                  <div className="p-4 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)]">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--theme-text-muted)] mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      <span>Have a Secret Promo Code?</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try STUDENT10"
                        value={promo}
                        onChange={(e) => {
                          setPromo(e.target.value);
                          setPromoError('');
                        }}
                        className="input-field py-2 flex-1 uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 rounded-xl font-bold text-xs bg-[var(--theme-primary)] text-white hover:opacity-90 active:scale-95 transition"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500 font-semibold mt-1.5">
                        {promoError}
                      </p>
                    )}
                    {discounted && (
                      <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Code STUDENT10 applied! 10% discount subtracted.
                      </p>
                    )}
                  </div>

                  {orderSummary}
                </div>
              )}

              {/* STEP 2: PAYMENT METHOD */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]">
                    <CreditCard className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Choose Payment Method</span>
                  </div>

                  {/* Payment Options Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'Cash on Delivery', icon: Banknote, desc: 'Pay cash at doorstep', badge: 'Popular' },
                      { id: 'JazzCash', icon: Smartphone, desc: 'Mobile account / wallet', badge: 'Instant' },
                      { id: 'Easypaisa', icon: Smartphone, desc: 'Mobile account / wallet', badge: 'Instant' },
                      { id: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa & MasterCard', badge: 'Secure' },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = method === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setMethod(opt.id)}
                          className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[90px] ${
                            isSelected
                              ? 'border-2 border-[var(--theme-accent)] bg-[var(--theme-accent-light)]/40 shadow-sm'
                              : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-accent)]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <Icon className="w-5 h-5 text-[var(--theme-accent-text)]" />
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--theme-border)] text-[var(--theme-text-muted)]">
                              {opt.badge}
                            </span>
                          </div>

                          <div className="mt-2">
                            <p className="font-extrabold text-xs text-[var(--theme-text)]">
                              {opt.id}
                            </p>
                            <p className="text-[10px] text-[var(--theme-text-muted)] mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Delivery summary pill */}
                  <div className="p-3.5 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-muted)] space-y-1">
                    <p className="font-bold text-[var(--theme-text)]">
                      Deliver to: {address}, {city}
                    </p>
                    <p>Contact: {phone}</p>
                  </div>

                  {orderSummary}

                  <p className="text-[11px] text-[var(--theme-text-muted)] text-center leading-relaxed">
                    Demo ordering only. No actual debit/credit cards or money will be deducted.
                  </p>
                </div>
              )}

              {errors.cart && (
                <p className="text-xs text-red-500 font-bold">{errors.cart}</p>
              )}
            </div>

            {/* Bottom Sheet Actions */}
            <div className="px-6 py-4 bg-[var(--theme-surface)] border-t border-[var(--theme-border)] flex items-center gap-3 shrink-0">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={busy}
                  className="px-4 py-3 rounded-2xl border border-[var(--theme-border)] text-xs font-bold text-[var(--theme-text)] hover:bg-[var(--theme-border)]/30 transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="submit"
                disabled={!count || busy}
                className="flex-1 btn-primary justify-center"
              >
                <span>
                  {busy
                    ? 'Packing your dum order...'
                    : step === 0
                    ? 'Review My Bag'
                    : step === 1
                    ? 'Select Payment Method'
                    : `Place Order · ${money(total)}`}
                </span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
