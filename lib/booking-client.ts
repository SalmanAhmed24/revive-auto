'use client';

import { BOOKING_URL, TEKMETRIC_SHOP_ID } from './booking';

declare global {
  interface Window {
    tekmetricBooking?: { shopId: string; orgId?: string };
    onShowBooking?: (shopId?: string, orgId?: string) => void;
  }
}

const ORIGIN = 'https://booking.tekmetric.com/iframe';
let loading: Promise<void> | null = null;

/**
 * Loads Tekmetric's modal.js + modal.css once, on demand (first hover, focus or click of a
 * booking button), so the third-party script never costs anything during page load.
 * Same setup as Tekmetric's embed snippet, minus the window.onload wrapper.
 */
export function loadBooking(): Promise<void> {
  if (loading) return loading;
  window.tekmetricBooking = { shopId: TEKMETRIC_SHOP_ID, orgId: undefined };
  const t = Date.now(); // Tekmetric's cache-buster, kept as in their snippet

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${ORIGIN}/modal.css?time=${t}`;
  document.head.appendChild(link);

  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${ORIGIN}/modal.js?time=${t}`;
    script.async = true;
    script.onload = () => (typeof window.onShowBooking === 'function' ? resolve() : reject(new Error('Tekmetric booking unavailable')));
    script.onerror = () => {
      script.remove();
      link.remove();
      loading = null; // allow a retry on the next click
      reject(new Error('Tekmetric booking failed to load'));
    };
    document.body.appendChild(script);
  });
  return loading;
}

/*
 * Tekmetric keeps #tekmetricBookingModal at display:none until its booking app has loaded
 * in the iframe, then shows it; closing (backdrop click or the app's own close) hides it again.
 * We follow that to: show a loading state on the button, pause the page's smooth scroll while
 * it's open, close on Escape, and hand focus back to the button afterwards.
 */
let session: (() => void) | null = null;

function track(trigger: HTMLElement | null) {
  const modal = document.getElementById('tekmetricBookingModal');
  if (!modal) return;
  session?.(); // a new open replaces any previous session
  const root = document.documentElement;
  const isShown = () => getComputedStyle(modal).display !== 'none';
  let shown = false;

  root.classList.add('booking-loading');
  trigger?.setAttribute('aria-busy', 'true');

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && shown) modal.click(); // same as clicking the backdrop (Tekmetric's own close)
  };
  const end = (returnFocus: boolean) => {
    observer.disconnect();
    clearTimeout(timer);
    window.removeEventListener('keydown', onKey);
    root.classList.remove('booking-loading', 'booking-open');
    trigger?.removeAttribute('aria-busy');
    if (shown) window.dispatchEvent(new CustomEvent('booking:close'));
    if (returnFocus) trigger?.focus({ preventScroll: true });
    session = null;
  };
  const check = () => {
    if (!shown && isShown()) {
      shown = true;
      clearTimeout(timer);
      root.classList.remove('booking-loading');
      root.classList.add('booking-open');
      trigger?.removeAttribute('aria-busy');
      window.dispatchEvent(new CustomEvent('booking:open'));
    } else if (shown && !isShown()) end(true);
  };
  const observer = new MutationObserver(check);
  observer.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
  // If the booking app never loads, drop the loading state (the modal stays closed).
  const timer = setTimeout(() => !shown && end(false), 20000);
  window.addEventListener('keydown', onKey);
  session = () => end(false);
  check();
}

/** Opens the Tekmetric booking modal; if Tekmetric can't load, falls back to its booking page. */
export async function openBooking(trigger?: HTMLElement | null) {
  try {
    await loadBooking();
    window.onShowBooking!(TEKMETRIC_SHOP_ID);
    track(trigger ?? null);
  } catch {
    window.location.assign(BOOKING_URL);
  }
}

/** Tekmetric auto-opens the modal when the page URL has ?book — e.g. a "Book" link from Google Business Profile. */
export function autoOpenFromQuery() {
  if (!new URLSearchParams(window.location.search).has('book')) return;
  loadBooking()
    .then(() => track(null))
    .catch(() => {});
}
