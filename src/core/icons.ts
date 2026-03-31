/**
 * SVG Icon definitions for GlassAlert
 * Each icon is designed to be animated by GSAP (stroke-dasharray/dashoffset)
 */

export const iconSVGs = {
  success: `
    <svg class="ga-icon-svg ga-icon-success" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="ga-icon-circle" cx="40" cy="40" r="34" stroke="currentColor" stroke-width="3.5"
        stroke-dasharray="200" stroke-dashoffset="0" stroke-linecap="round" fill="none"/>
      <path class="ga-icon-check" d="M24 42 L35 53 L56 28" stroke="currentColor" stroke-width="4"
        stroke-dasharray="50" stroke-dashoffset="0" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `,

  error: `
    <svg class="ga-icon-svg ga-icon-error" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="ga-icon-circle" cx="40" cy="40" r="34" stroke="currentColor" stroke-width="3.5"
        stroke-dasharray="200" stroke-dashoffset="0" stroke-linecap="round" fill="none"/>
      <line class="ga-icon-x1" x1="28" y1="28" x2="52" y2="52" stroke="currentColor" stroke-width="4"
        stroke-dasharray="30" stroke-dashoffset="0" stroke-linecap="round"/>
      <line class="ga-icon-x2" x1="52" y1="28" x2="28" y2="52" stroke="currentColor" stroke-width="4"
        stroke-dasharray="30" stroke-dashoffset="0" stroke-linecap="round"/>
    </svg>
  `,

  warning: `
    <svg class="ga-icon-svg ga-icon-warning" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="ga-icon-triangle" d="M40 8 L74 68 L6 68 Z" stroke="currentColor" stroke-width="3.5"
        stroke-dasharray="300" stroke-dashoffset="0" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <g class="ga-icon-exclamation">
        <line x1="40" y1="30" x2="40" y2="48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        <circle cx="40" cy="57" r="2.5" fill="currentColor"/>
      </g>
    </svg>
  `,

  info: `
    <svg class="ga-icon-svg ga-icon-info" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="ga-icon-circle" cx="40" cy="40" r="34" stroke="currentColor" stroke-width="3.5"
        stroke-dasharray="200" stroke-dashoffset="0" stroke-linecap="round" fill="none"/>
      <g class="ga-icon-i">
        <circle cx="40" cy="26" r="3" fill="currentColor"/>
        <line x1="40" y1="34" x2="40" y2="56" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>
  `,

  question: `
    <svg class="ga-icon-svg ga-icon-question" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="ga-icon-circle" cx="40" cy="40" r="34" stroke="currentColor" stroke-width="3.5"
        stroke-dasharray="200" stroke-dashoffset="0" stroke-linecap="round" fill="none"/>
      <g class="ga-icon-question">
        <path d="M30 30 C30 20 50 20 50 30 C50 38 40 38 40 46" stroke="currentColor" stroke-width="4"
          stroke-linecap="round" fill="none"/>
        <circle cx="40" cy="56" r="2.5" fill="currentColor"/>
      </g>
    </svg>
  `,
};

/** Default icon colors */
export const iconColors: Record<string, string> = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  question: '#8b5cf6',
};
