import type { GlassAlertOptions } from './types';

export const defaultOptions: Required<
  Pick<
    GlassAlertOptions,
    | 'position'
    | 'animation'
    | 'toast'
    | 'timer'
    | 'timerProgressBar'
    | 'theme'
    | 'showConfirmButton'
    | 'confirmButtonText'
    | 'confirmButtonColor'
    | 'showCancelButton'
    | 'cancelButtonText'
    | 'cancelButtonColor'
    | 'showDenyButton'
    | 'denyButtonText'
    | 'denyButtonColor'
    | 'showCloseButton'
    | 'allowOutsideClick'
    | 'allowEscapeKey'
    | 'reverseButtons'
    | 'useLottieIcons'
    | 'lottieLoop'
    | 'glassBlur'
    | 'glassOpacity'
    | 'glassColor'
    | 'glassColorSecondary'
    | 'glassBorderOpacity'
    | 'backdropBlur'
    | 'animatedBackground'
    | 'backgroundAnimSpeed'
    | 'isOpaque'
  >
> = {
  position: 'center',
  animation: 'elastic',
  toast: false,
  timer: 0,
  timerProgressBar: false,
  theme: 'dark',

  showConfirmButton: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '',
  showCancelButton: false,
  cancelButtonText: 'Cancel',
  cancelButtonColor: '',
  showDenyButton: false,
  denyButtonText: 'No',
  denyButtonColor: '',
  showCloseButton: false,

  allowOutsideClick: true,
  allowEscapeKey: true,
  reverseButtons: false,
  
  useLottieIcons: true,
  lottieLoop: false,

  // Glass defaults
  glassBlur: 20,
  glassOpacity: 0.12,
  glassColor: '#6366f1',
  glassColorSecondary: '#8b5cf6',
  glassBorderOpacity: 0.25,
  backdropBlur: 8,
  animatedBackground: true,
  backgroundAnimSpeed: 8,
  isOpaque: false,
};

/** Merge user options with defaults */
export function mergeOptions(opts: GlassAlertOptions): GlassAlertOptions & typeof defaultOptions {
  const merged = { ...defaultOptions, ...opts };
  if (opts.toast && opts.showConfirmButton === undefined) {
    merged.showConfirmButton = false;
  }
  return merged;
}
