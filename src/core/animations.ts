/**
 * GSAP Animation Engine for GlassAlert
 * Uses GSAP best practices from the official gsap-skills:
 * - Transform aliases (x, y, scale, rotation) over raw transform strings
 * - autoAlpha over opacity for fade in/out
 * - Timeline-based sequencing
 * - Built-in eases (back.out, elastic.out, power3.inOut)
 */
import type { GlassAlertAnimation } from './types';

let gsapInstance: any = null;

/** Lazy-load GSAP to avoid import errors when not installed yet */
function getGsap(): any {
  if (gsapInstance) return gsapInstance;
  try {
    gsapInstance = require('gsap');
    return gsapInstance.gsap || gsapInstance.default || gsapInstance;
  } catch {
    return null;
  }
}

/** Set GSAP instance if user provides it (for ESM environments) */
export function setGsap(g: any) {
  gsapInstance = g;
}

// ─── Entrance Animations ────────────────────────────────

export function animateIn(
  popupEl: HTMLElement,
  backdropEl: HTMLElement,
  type: GlassAlertAnimation = 'elastic',
  onComplete?: () => void
) {
  const gsap = getGsap();
  if (!gsap || type === 'none') {
    popupEl.style.opacity = '1';
    popupEl.style.transform = 'none';
    backdropEl.style.opacity = '1';
    onComplete?.();
    return null;
  }

  const tl = gsap.timeline({
    defaults: { duration: 0.5, ease: 'power3.out' },
    onComplete,
  });

  // Backdrop fade in
  tl.fromTo(
    backdropEl,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.35 },
    0
  );

  // Popup entrance based on animation type
  switch (type) {
    case 'elastic':
      tl.fromTo(
        popupEl,
        { autoAlpha: 0, scale: 0.5, y: 40 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        },
        0.1
      );
      break;

    case 'bounce':
      tl.fromTo(
        popupEl,
        { autoAlpha: 0, scale: 0.3, y: -60 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'bounce.out',
        },
        0.1
      );
      break;

    case 'slide':
      tl.fromTo(
        popupEl,
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.1
      );
      break;

    case 'fade':
      tl.fromTo(
        popupEl,
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.1
      );
      break;

    case 'liquid':
      // Liquid glass: morphs from a blob shape
      tl.fromTo(
        popupEl,
        {
          autoAlpha: 0,
          scale: 0.6,
          rotation: -3,
          y: 30,
          filter: 'blur(12px)',
        },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'back.out(1.4)',
        },
        0.1
      );
      break;

    default:
      tl.fromTo(
        popupEl,
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.4 },
        0.1
      );
  }

  return tl;
}

// ─── Exit Animations ────────────────────────────────────

export function animateOut(
  popupEl: HTMLElement,
  backdropEl: HTMLElement,
  type: GlassAlertAnimation = 'elastic',
  onComplete?: () => void
) {
  const gsap = getGsap();
  if (!gsap || type === 'none') {
    popupEl.style.opacity = '0';
    backdropEl.style.opacity = '0';
    onComplete?.();
    return null;
  }

  const tl = gsap.timeline({
    defaults: { duration: 0.35, ease: 'power3.in' },
    onComplete,
  });

  switch (type) {
    case 'elastic':
    case 'liquid':
      tl.to(popupEl, {
        autoAlpha: 0,
        scale: 0.7,
        y: 20,
        filter: type === 'liquid' ? 'blur(8px)' : 'none',
        duration: 0.35,
        ease: 'power3.in',
      }, 0);
      break;

    case 'bounce':
      tl.to(popupEl, {
        autoAlpha: 0,
        scale: 0.5,
        y: -40,
        duration: 0.3,
        ease: 'power2.in',
      }, 0);
      break;

    case 'slide':
      tl.to(popupEl, {
        autoAlpha: 0,
        y: 80,
        duration: 0.3,
        ease: 'power2.in',
      }, 0);
      break;

    case 'fade':
    default:
      tl.to(popupEl, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.25,
      }, 0);
  }

  tl.to(backdropEl, { autoAlpha: 0, duration: 0.3 }, 0.05);

  return tl;
}

// ─── Icon Animations ────────────────────────────────────

export function animateIcon(iconEl: HTMLElement, iconType: string) {
  const gsap = getGsap();
  if (!gsap) return null;

  const tl = gsap.timeline({ delay: 0.3 });

  switch (iconType) {
    case 'success': {
      const circle = iconEl.querySelector('.ga-icon-circle');
      const check = iconEl.querySelector('.ga-icon-check');
      if (circle) {
        tl.fromTo(
          circle,
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' },
          0
        );
      }
      if (check) {
        tl.fromTo(
          check,
          { strokeDashoffset: 50, autoAlpha: 0 },
          { strokeDashoffset: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
          0.3
        );
      }
      // Pulse glow
      tl.fromTo(
        iconEl,
        { filter: 'drop-shadow(0 0 0px rgba(34, 197, 94, 0))' },
        {
          filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))',
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        0.4
      );
      break;
    }

    case 'error': {
      const circle = iconEl.querySelector('.ga-icon-circle');
      const x1 = iconEl.querySelector('.ga-icon-x1');
      const x2 = iconEl.querySelector('.ga-icon-x2');
      if (circle) {
        tl.fromTo(
          circle,
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' },
          0
        );
      }
      if (x1 && x2) {
        tl.fromTo(
          [x1, x2],
          { strokeDashoffset: 30, autoAlpha: 0 },
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0.3
        );
      }
      // Shake
      tl.to(iconEl, { x: -6, duration: 0.06, ease: 'none' }, 0.5)
        .to(iconEl, { x: 6, duration: 0.06, ease: 'none' })
        .to(iconEl, { x: -4, duration: 0.06, ease: 'none' })
        .to(iconEl, { x: 4, duration: 0.06, ease: 'none' })
        .to(iconEl, { x: 0, duration: 0.06, ease: 'none' });
      // Red glow
      tl.fromTo(
        iconEl,
        { filter: 'drop-shadow(0 0 0px rgba(239, 68, 68, 0))' },
        {
          filter: 'drop-shadow(0 0 18px rgba(239, 68, 68, 0.6))',
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        0.5
      );
      break;
    }

    case 'warning': {
      const triangle = iconEl.querySelector('.ga-icon-triangle');
      const excl = iconEl.querySelector('.ga-icon-exclamation');
      if (triangle) {
        tl.fromTo(
          triangle,
          { strokeDashoffset: 300 },
          { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' },
          0
        );
      }
      if (excl) {
        tl.fromTo(
          excl,
          { autoAlpha: 0, y: -5 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: 'bounce.out' },
          0.4
        );
      }
      // Pulsing glow
      tl.fromTo(
        iconEl,
        { filter: 'drop-shadow(0 0 0px rgba(245, 158, 11, 0))' },
        {
          filter: 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.6))',
          duration: 0.6,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        0.3
      );
      break;
    }

    case 'info': {
      const circle = iconEl.querySelector('.ga-icon-circle');
      const iLetter = iconEl.querySelector('.ga-icon-i');
      if (circle) {
        tl.fromTo(
          circle,
          { strokeDashoffset: 200, autoAlpha: 0 },
          { strokeDashoffset: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          0
        );
      }
      if (iLetter) {
        tl.fromTo(
          iLetter,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
          0.3
        );
      }
      // Blue glow
      tl.fromTo(
        iconEl,
        { filter: 'drop-shadow(0 0 0px rgba(59, 130, 246, 0))' },
        {
          filter: 'drop-shadow(0 0 16px rgba(59, 130, 246, 0.5))',
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        0.4
      );
      break;
    }

    case 'question': {
      const circle = iconEl.querySelector('.ga-icon-circle');
      const qMark = iconEl.querySelector('.ga-icon-question');
      if (circle) {
        tl.fromTo(
          circle,
          { strokeDashoffset: 200, autoAlpha: 0 },
          { strokeDashoffset: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          0
        );
      }
      if (qMark) {
        tl.fromTo(
          qMark,
          { autoAlpha: 0, rotation: -20, scale: 0.5 },
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
          },
          0.3
        );
      }
      // Purple glow
      tl.fromTo(
        iconEl,
        { filter: 'drop-shadow(0 0 0px rgba(139, 92, 246, 0))' },
        {
          filter: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.5))',
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        },
        0.4
      );
      break;
    }
  }

  return tl;
}

// ─── Background Animation ───────────────────────────────

export function animateBackground(bgEl: HTMLElement, speed: number = 8) {
  const gsap = getGsap();
  if (!gsap) return null;

  return gsap.to(bgEl, {
    backgroundPosition: '200% 200%',
    duration: speed,
    ease: 'none',
    repeat: -1,
  });
}

// ─── Button Hover Animations ────────────────────────────

export function animateButtonHover(btnEl: HTMLElement, enter: boolean) {
  const gsap = getGsap();
  if (!gsap) return;

  if (enter) {
    gsap.to(btnEl, {
      scale: 1.05,
      y: -2,
      duration: 0.25,
      ease: 'power2.out',
    });
  } else {
    gsap.to(btnEl, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  }
}

// ─── Timer Progress Bar ─────────────────────────────────

export function animateTimerBar(barEl: HTMLElement, duration: number, onComplete?: () => void) {
  const gsap = getGsap();
  if (!gsap) {
    onComplete?.();
    return null;
  }

  return gsap.fromTo(
    barEl,
    { scaleX: 1, transformOrigin: 'left center' },
    {
      scaleX: 0,
      duration: duration / 1000,
      ease: 'none',
      onComplete,
    }
  );
}
