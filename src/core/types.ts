/* ============================================================
 * GlassAlert Types
 * ============================================================ */

/** Icon types for GlassAlert */
export type GlassAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';

/** Position variants */
export type GlassAlertPosition =
  | 'center'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

/** Animation variants */
export type GlassAlertAnimation =
  | 'elastic'
  | 'bounce'
  | 'slide'
  | 'fade'
  | 'liquid'
  | 'none';

/** Dismiss reasons */
export type GlassDismissReason = 'cancel' | 'backdrop' | 'close' | 'esc' | 'timer';

/** Result returned by fire() */
export interface GlassAlertResult<T = any> {
  readonly isConfirmed: boolean;
  readonly isDenied: boolean;
  readonly isDismissed: boolean;
  readonly value?: T;
  readonly dismiss?: GlassDismissReason;
}

/** Glass-specific style options */
export interface GlassStyleOptions {
  /** Blur intensity for the glass effect (px). Default: 20 */
  glassBlur?: number;
  /** Opacity of the glass background (0-1). Default: 0.15 */
  glassOpacity?: number;
  /** Primary glass color (hex/rgb). Default: '#6366f1' */
  glassColor?: string;
  /** Secondary glass color for gradients. Default: '#8b5cf6' */
  glassColorSecondary?: string;
  /** Border luminosity (0-1). Default: 0.3 */
  glassBorderOpacity?: number;
  /** Backdrop blur (px). Default: 8 */
  backdropBlur?: number;
  /** Enable animated background gradient. Default: true */
  animatedBackground?: boolean;
  /** Background animation speed in seconds. Default: 8 */
  backgroundAnimSpeed?: number;
  /** Enable full opacity (high contrast) mode. Default: false */
  isOpaque?: boolean;
}

/** Main options for GlassAlert.fire() */
export interface GlassAlertOptions extends GlassStyleOptions {
  /** Title text (supports HTML when using html prop) */
  title?: string;
  /** Body text */
  text?: string;
  /** Custom HTML content (overrides text) */
  html?: string | React.ReactNode;
  /** Icon type */
  icon?: GlassAlertIcon;
  /** Custom icon color */
  iconColor?: string;
  /** Position of the popup */
  position?: GlassAlertPosition;
  /** Animation type for entrance/exit */
  animation?: GlassAlertAnimation;
  /** Show as toast (non-blocking, auto-dismiss) */
  toast?: boolean;
  
  // --- Lottie Icons ---
  /** Lottie animation URL or imported JSON object */
  lottie?: string | object;
  /** Whether the Lottie animation should play on loop. Default: false */
  lottieLoop?: boolean;
  /** Whether to use bundled Lottie defaults for standard icons. Default: true */
  useLottieIcons?: boolean;
  /** Auto-close timer in milliseconds */
  timer?: number;
  /** Show timer progress bar */
  timerProgressBar?: boolean;
  /** Popup width */
  width?: number | string;
  /** Popup padding */
  padding?: number | string;

  // --- Confirm Button ---
  /** Show confirm button. Default: true */
  showConfirmButton?: boolean;
  /** Confirm button text. Default: 'OK' */
  confirmButtonText?: string;
  /** Confirm button color */
  confirmButtonColor?: string;

  // --- Cancel Button ---
  /** Show cancel button. Default: false */
  showCancelButton?: boolean;
  /** Cancel button text. Default: 'Cancel' */
  cancelButtonText?: string;
  /** Cancel button color */
  cancelButtonColor?: string;

  // --- Deny Button ---
  /** Show deny button. Default: false */
  showDenyButton?: boolean;
  /** Deny button text. Default: 'No' */
  denyButtonText?: string;
  /** Deny button color */
  denyButtonColor?: string;

  // --- Close Button ---
  /** Show close (X) button. Default: false */
  showCloseButton?: boolean;

  // --- Behavior ---
  /** Allow closing by clicking backdrop. Default: true */
  allowOutsideClick?: boolean;
  /** Allow closing by pressing Escape. Default: true */
  allowEscapeKey?: boolean;
  /** Reverse buttons order. Default: false */
  reverseButtons?: boolean;

  // --- Callbacks ---
  /** Called when popup opens */
  willOpen?: () => void;
  /** Called after popup is fully open & animated */
  didOpen?: () => void;
  /** Called when popup starts closing */
  willClose?: () => void;
  /** Called after popup is fully closed */
  didClose?: () => void;

  // --- Footer ---
  /** Footer content */
  footer?: string | React.ReactNode;

  // --- Custom CSS class ---
  customClass?: {
    container?: string;
    popup?: string;
    title?: string;
    icon?: string;
    content?: string;
    actions?: string;
    confirmButton?: string;
    cancelButton?: string;
    denyButton?: string;
    closeButton?: string;
    footer?: string;
  };
}

/** Internal state for the alert queue */
export interface GlassAlertState {
  isOpen: boolean;
  options: GlassAlertOptions;
  resolve: ((result: GlassAlertResult) => void) | null;
}
