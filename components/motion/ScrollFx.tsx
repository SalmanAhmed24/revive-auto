'use client';

import { useEffect } from 'react';

type G = typeof import('gsap').gsap;
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger;

/**
 * All GSAP / ScrollTrigger choreography, shared by every page via `data-fx` section keys.
 *
 * Performance contract (mobile Core Web Vitals):
 *  - GSAP is code-split and only loaded on the visitor's first scroll/touch/pointer/key.
 *  - Each section's animations are wired up lazily, just before it scrolls into view,
 *    so no single long task measures the whole page.
 *  - Everything uses gsap.from(), so with JS off (or before init) all content is visible.
 *  - Play-once reveals use toggleActions 'play none none none' instead of `once: true`:
 *    `once` triggers kill themselves during ScrollTrigger.refresh() when already scrolled past,
 *    which can crash GSAP's refresh loop after a jump (fast scroll, anchor, back/forward).
 */
export default function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let teardown = () => {};

    const start = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      if (cancelled) return;
      teardown = setup(gsap, ScrollTrigger);
    };

    // Every effect here is scroll-driven, so GSAP loads on the first sign of intent
    // (scroll, wheel, touch, pointer, key) rather than on a timer. Nothing runs during
    // initial load, keeping the main thread free for first paint and interactivity.
    const events = ['scroll', 'wheel', 'touchstart', 'pointermove', 'pointerdown', 'keydown'] as const;
    const kick = () => {
      events.forEach((e) => window.removeEventListener(e, kick));
      start();
    };
    events.forEach((e) => window.addEventListener(e, kick, { passive: true, once: true }));
    // Reloaded mid-page: start right away so sections already in view animate correctly.
    if (window.scrollY > 0) kick();

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, kick));
      teardown();
    };
  }, []);

  return null;
}

function setup(gsap: G, ScrollTrigger: ST) {
  const desktop = window.matchMedia('(min-width: 900px)').matches;
  const ctx = gsap.context(() => {});
  const add = (fn: () => void) => ctx.add(fn);

  // ── Hero (already on screen): scroll-out parallax only ──
  if (document.querySelector('.hero')) add(() => {
    const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-copy]', { yPercent: -18, autoAlpha: 0.15, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__img', { yPercent: 12, scale: 1.12, ease: 'none', scrollTrigger: st });
    gsap.to('.ro-wrap', { yPercent: -30, rotate: 3, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__year', { yPercent: -25, ease: 'none', scrollTrigger: st });
  });

  // Desktop only: marquee skews with scroll velocity (the loop itself is pure CSS).
  if (desktop && document.querySelector('.marquee__track')) {
    add(() => {
      const track = document.querySelector<HTMLElement>('.marquee__track');
      if (!track) return;
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });
      let t: number | undefined;
      ScrollTrigger.create({
        onUpdate: (self) => {
          skew(gsap.utils.clamp(-8, 8, -self.getVelocity() / 300));
          window.clearTimeout(t);
          t = window.setTimeout(() => skew(0), 120);
        },
      });
    });
  }

  // ── Section initialisers, run lazily ──
  const reveals = (root: Element) => {
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } });
    });
    root.querySelectorAll<HTMLElement>('[data-split]').forEach((h) => {
      gsap.from(h.querySelectorAll('.w__i'), {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
    root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((list) => {
      gsap.from(list.children, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        scrollTrigger: { trigger: list, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  };

  const inits: Record<string, (s: HTMLElement) => void> = {
    guide: (s) => {
      reveals(s);
      const cards = s.querySelector('[data-guide]');
      if (!cards) return;
      gsap
        .timeline({ scrollTrigger: { trigger: cards, start: 'top 85%', toggleActions: 'play none none none' } })
        .from(cards.querySelectorAll('.gcard'), { y: 50, rotateX: -20, autoAlpha: 0, transformPerspective: 800, stagger: 0.14, duration: 0.8, ease: 'expo.out', clearProps: 'all' })
        .from(cards.querySelectorAll('.gcard__lamp'), { scale: 0, stagger: 0.14, duration: 0.5, ease: 'back.out(3)' }, '<0.25');
    },
    incl: (s) => {
      reveals(s);
      const list = s.querySelector('[data-incl]');
      if (!list) return;
      gsap.from(list.querySelectorAll('.incl__item'), {
        y: 24,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.6,
        scrollTrigger: { trigger: list, start: 'top 88%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(
        list,
        { '--draw': 0 },
        { '--draw': 1, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: list, start: 'top 88%', toggleActions: 'play none none none' } },
      );
    },
    signs: (s) => {
      reveals(s);
      const words = s.querySelectorAll('.scrub__w');
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: s.querySelector('[data-scrub]'), start: 'top 85%', end: 'bottom 45%', scrub: 0.4 },
          },
        );
      }
    },
    pricing: (s) => {
      const row = s.querySelector('[data-pricing]');
      if (!row) return;
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' } })
        .from(row.querySelectorAll('.pricing__label, .pricing__text'), { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: 'expo.out' })
        .from(row.querySelector('.pricing__stamp'), { scale: 2.6, rotate: -30, autoAlpha: 0, duration: 0.55, ease: 'back.out(2.4)' }, '-=0.3');
    },
    more: (s) => reveals(s),
    reach: (s) => {
      reveals(s);
      const v = s.querySelector('[data-visit]');
      if (!v) return;
      gsap
        .timeline({ scrollTrigger: { trigger: v, start: 'top 82%', toggleActions: 'play none none none' } })
        .from(v, { y: 60, autoAlpha: 0, duration: 0.9, ease: 'expo.out', clearProps: 'transform,opacity,visibility' })
        .from(v.querySelector('.visit__map'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.2, ease: 'expo.inOut' }, '<0.1')
        .from(v.querySelector('.visit__map-img'), { scale: 1.25, duration: 1.6, ease: 'expo.out' }, '<0.2')
        .from(v.querySelectorAll('.visit__name, .visit__row, .visit__label, .visit__towns, .visit__dir'), { x: -20, autoAlpha: 0, stagger: 0.07, duration: 0.5 }, '<0.1')
        .from(v.querySelector('.pin__dot'), { y: -80, autoAlpha: 0, duration: 0.8, ease: 'bounce.out' }, '-=0.5')
        .from(v.querySelector('.pin__label'), { y: 10, scale: 0.6, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.5)' }, '-=0.2');
    },
    message: (s) => reveals(s),
    note: (s) => {
      const box = s.querySelector('[data-note]');
      if (!box) return;
      gsap
        .timeline({ scrollTrigger: { trigger: box, start: 'top 85%', toggleActions: 'play none none none' } })
        .fromTo(box.querySelector('.note__border'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' })
        .from(box.querySelectorAll('.note__head > *, .note__text, .magnetic'), { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7 }, '<0.3');
    },
    story: (s) => {
      reveals(s);
      const ch = s.querySelector('[data-chapters]');
      if (!ch) return;
      gsap.fromTo(
        ch.querySelector('.chapters__fill'),
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: ch, start: 'top 80%', end: 'bottom 60%', scrub: 0.6 } },
      );
      ch.querySelectorAll<HTMLElement>('.chapter').forEach((c) => {
        gsap
          .timeline({ scrollTrigger: { trigger: c, start: 'top 82%', toggleActions: 'play none none none' } })
          .from(c.querySelector('.chapter__dot'), { scale: 0, duration: 0.5, ease: 'back.out(3)' })
          .from(c.querySelector('.chapter__year'), { yPercent: 60, autoAlpha: 0, duration: 0.8, ease: 'expo.out' }, '<0.1')
          .from([c.querySelector('.chapter__title'), c.querySelector('.chapter__text')], { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, '<0.15');
      });
    },
    euro: (s) => {
      reveals(s);
      const script = s.querySelector('[data-euro-script]');
      if (script) {
        gsap.from(script, {
          clipPath: 'inset(-20% 100% -30% 0%)',
          duration: 1.2,
          ease: 'power2.inOut',
          delay: 0.5,
          scrollTrigger: { trigger: script, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
      const list = s.querySelector('[data-checklist]');
      if (list) {
        gsap
          .timeline({ scrollTrigger: { trigger: list, start: 'top 88%', toggleActions: 'play none none none' } })
          .from(list.querySelectorAll('.checklist__item'), { x: -20, autoAlpha: 0, stagger: 0.08, duration: 0.5 })
          .from(list.querySelectorAll('.checkbox path'), { strokeDashoffset: 24, stagger: 0.08, duration: 0.4 }, '-=0.4');
      }
    },
    careers: (s) => {
      reveals(s);
      const form = s.querySelector('[data-apply]');
      if (form) {
        gsap
          .timeline({ scrollTrigger: { trigger: form, start: 'top 85%', toggleActions: 'play none none none' } })
          .from(form, { y: 60, rotate: 1.5, autoAlpha: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity,visibility' })
          .from(form.querySelector('.cform__script'), { clipPath: 'inset(-30% 100% -40% 0%)', duration: 0.9, ease: 'power2.inOut', clearProps: 'clipPath' }, '-=0.5')
          .from(form.querySelectorAll('.cform__field, .btn'), { y: 18, autoAlpha: 0, stagger: 0.06, duration: 0.5, clearProps: 'transform,opacity,visibility' }, '-=0.6');
      }
    },
    finance: (s) => {
      reveals(s);
      const cards = s.querySelector('[data-fin-opts]');
      if (cards) {
        gsap
          .timeline({ scrollTrigger: { trigger: cards, start: 'top 85%', toggleActions: 'play none none none' } })
          .from(cards.querySelectorAll('.fin-opt'), { y: 60, rotate: (i: number) => [-2, 1.5, -1][i % 3], autoAlpha: 0, stagger: 0.14, duration: 0.9, ease: 'expo.out', clearProps: 'transform,opacity,visibility' })
          .from(cards.querySelectorAll('.fin-opt__rule'), { scaleX: 0, stagger: 0.14, duration: 0.7, ease: 'power2.out', clearProps: 'transform' }, '<0.3')
          .from(cards.querySelectorAll('.fin-opt__name'), { yPercent: 40, autoAlpha: 0, stagger: 0.14, duration: 0.6, clearProps: 'transform,opacity,visibility' }, '<');
      }
      const script = s.querySelector('[data-fin-script]');
      if (script) {
        gsap.from(script, {
          clipPath: 'inset(-30% 100% -40% 0%)',
          duration: 1.4,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
          scrollTrigger: { trigger: script, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    },
    'page-hero': (s) => {
      const st = { trigger: s, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(s.querySelector('.page-hero__img'), { yPercent: 14, scale: 1.1, ease: 'none', scrollTrigger: st });
      gsap.to(s.querySelector('.page-hero__inner'), { yPercent: -12, autoAlpha: 0.2, ease: 'none', scrollTrigger: st });
      const ghost = s.querySelector('.page-hero__ghost');
      if (ghost) gsap.to(ghost, { yPercent: -30, ease: 'none', scrollTrigger: st });
    },
    how: (s) => {
      reveals(s);
      const steps = s.querySelector('[data-how]');
      if (!steps) return;
      const st = { trigger: steps, start: 'top 82%', toggleActions: 'play none none none' };
      gsap
        .timeline({ scrollTrigger: st })
        .from(steps.querySelectorAll('.how__step'), { y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out' })
        .from(steps.querySelectorAll('.how__num'), { yPercent: 100, autoAlpha: 0, duration: 0.6, stagger: 0.15 }, '<0.15')
        .from(steps.querySelectorAll('.how__arrow'), { x: -20, autoAlpha: 0, duration: 0.5, stagger: 0.15 }, '<0.2')
        .from(steps.querySelector('.how__stamp'), { scale: 2.4, rotate: -30, autoAlpha: 0, duration: 0.6, ease: 'back.out(2.4)' }, '-=0.2');
      gsap.fromTo(
        steps.querySelector('.how__progress'),
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 85%', end: 'bottom 50%', scrub: 0.6 } },
      );
    },
    svc: (s) => {
      reveals(s);
      s.querySelectorAll<HTMLElement>('[data-svc-card]').forEach((card, i) => {
        const st = { trigger: card, start: 'top 88%', toggleActions: 'play none none none' };
        const tl = gsap.timeline({ scrollTrigger: st, delay: desktop ? (i % 2) * 0.12 : 0 });
        tl.from(card, { y: 60, autoAlpha: 0, duration: 0.9, ease: 'expo.out', clearProps: 'all' })
          .from(card.querySelector('.svc-card__media'), { clipPath: 'inset(0% 100% 0% 0%)', duration: 1, ease: 'expo.inOut' }, '<')
          .from(card.querySelector('.svc-card__img'), { scale: 1.35, duration: 1.4, ease: 'expo.out' }, '<0.2')
          .from(card.querySelector('.svc-card__no'), { x: -30, autoAlpha: 0, duration: 0.5 }, '<0.3')
          .from(card.querySelectorAll('.svc-card__list li'), { x: -14, autoAlpha: 0, stagger: 0.07, duration: 0.45 }, '<0.1')
          .from(card.querySelectorAll('.svc-card__list path'), { strokeDashoffset: 24, stagger: 0.07, duration: 0.35 }, '<0.1');
      });
    },
    proof: (s) => {
      reveals(s);
      gsap.from(s.querySelectorAll('[data-seal]'), {
        scale: 0.55,
        rotate: -120,
        autoAlpha: 0,
        duration: 1.3,
        ease: 'back.out(1.6)',
        stagger: 0.12,
        clearProps: 'all',
        scrollTrigger: { trigger: s.querySelector('[data-seals]'), start: 'top 88%', toggleActions: 'play none none none' },
      });
      s.querySelectorAll('.seal__ring').forEach((ring, i) => {
        gsap.to(ring, {
          rotate: i % 2 ? -200 : 200,
          ease: 'none',
          scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
    },
    services: (s) => {
      reveals(s);
      const menu = s.querySelector('[data-menu]');
      if (!menu) return;
      gsap
        .timeline({ scrollTrigger: { trigger: menu, start: 'top 82%', toggleActions: 'play none none none' } })
        .from(menu, { y: 80, rotateX: 8, autoAlpha: 0, duration: 1.1, ease: 'expo.out', transformPerspective: 1200 })
        .from(menu.querySelector('.menu__title'), { y: 30, autoAlpha: 0, duration: 0.7 }, '-=0.6')
        .from(menu.querySelectorAll('[data-menu-row]'), { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.05 }, '-=0.5')
        .from(menu.querySelectorAll('.menu__dots'), { scaleX: 0, transformOrigin: 'left', duration: 0.6, stagger: 0.04 }, '-=0.7');
    },
    process: (s) => {
      reveals(s);
      const track = s.querySelector<HTMLElement>('[data-process-track]');
      const pin = s.querySelector<HTMLElement>('.process__pin');
      if (!track || !pin) return;
      if (desktop) {
        const dist = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        // The pin adds scroll length below — re-measure everything already wired.
        ScrollTrigger.refresh();
      } else {
        gsap.from(track.children, {
          y: 50,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.9,
          scrollTrigger: { trigger: track, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    },
    why: (s) => {
      reveals(s);
      const media = s.querySelector('[data-clip-reveal]');
      if (media) {
        const st = { trigger: media, start: 'top 82%', toggleActions: 'play none none none' };
        gsap.from(media.querySelector('.why__img-wrap'), {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: st,
        });
        const stamp = media.querySelector('.why__stamp');
        if (stamp) gsap.from(stamp, {
          scale: 2.2,
          rotate: -25,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.9,
          ease: 'back.out(2)',
          scrollTrigger: st,
        });
        gsap.fromTo(
          media.querySelector('[data-parallax-img]'),
          { yPercent: -8, scale: 1.15 },
          { yPercent: 8, scale: 1.15, ease: 'none', scrollTrigger: { trigger: media, scrub: true } },
        );
      }
      const list = s.querySelector('[data-checklist]');
      if (list) {
        gsap
          .timeline({ scrollTrigger: { trigger: list, start: 'top 88%', toggleActions: 'play none none none' } })
          .from(list.querySelectorAll('.checklist__item'), { x: -20, autoAlpha: 0, stagger: 0.08, duration: 0.5 })
          .from(list.querySelectorAll('.checkbox path'), { strokeDashoffset: 24, stagger: 0.08, duration: 0.4 }, '-=0.4');
      }
      const tl = s.querySelector('[data-timeline]');
      if (tl) {
        gsap.fromTo(
          tl.querySelector('[data-timeline-bar]'),
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 88%', end: 'bottom 55%', scrub: 0.6 } },
        );
        gsap.from(tl.querySelectorAll('.timeline__item'), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: { trigger: tl, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    },
    reviews: (s) => {
      reveals(s);
      const t = s.querySelector('[data-tickets]');
      if (!t) return;
      gsap.from(t.querySelectorAll('.ticket'), {
        y: desktop ? -140 : -60,
        rotate: (i: number) => (i ? 18 : -18),
        autoAlpha: 0,
        duration: 1.2,
        ease: 'bounce.out',
        stagger: 0.2,
        clearProps: 'all',
        scrollTrigger: { trigger: t, start: 'top 82%', toggleActions: 'play none none none' },
      });
    },
    metro: (s) => {
      reveals(s);
      const radar = s.querySelector('[data-radar]');
      if (!radar) return;
      gsap.from(radar.querySelectorAll('circle, .r-ray'), {
        scale: 0,
        transformOrigin: '200px 200px',
        duration: 1.2,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: radar, start: 'top 82%', toggleActions: 'play none none none' },
      });
      gsap.from(radar.querySelectorAll('.radar__pin'), {
        y: 12,
        scale: 0.4,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'back.out(2.2)',
        stagger: 0.12,
        delay: 0.3,
        scrollTrigger: { trigger: radar, start: 'top 82%', toggleActions: 'play none none none' },
      });
    },
    faq: (s) => reveals(s),
    cta: (s) => {
      reveals(s);
      const card = s.querySelector('[data-cta]');
      if (!card) return;
      gsap.fromTo(
        card,
        { scale: 0.9, borderRadius: 48 },
        { scale: 1, borderRadius: 8, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 45%', scrub: true } },
      );
    },
  };

  // Wire each section ~one viewport before it arrives. Sections already past the fold
  // (e.g. a reload mid-page) are wired immediately; ScrollTrigger plays them as needed.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const init = inits[el.dataset.fx!];
        if (init) add(() => init(el));
      });
    },
    { rootMargin: '0px 0px 100% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-fx]').forEach((el) => io.observe(el));

  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);

  return () => {
    io.disconnect();
    ctx.revert();
  };
}
