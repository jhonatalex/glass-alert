# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.9] - 2026-04-05

### Fixed
- **Light Theme Contrast**: Optimized text colors for the light theme to ensure maximum readability.
  - Text now automatically switches to black (solid black) when using `theme: 'light'`.
  - Added a **"white glow" contrast shadow** to black text in light mode for better separation from glass backgrounds.
  - Fixed button text colors in light mode which remained white in previous versions.
- **CSS Variable System**: Refactored the internal variable system to make themes more robust and prevent inheritance issues in third-party projects.

## [0.1.8] - 2026-04-05

### Added
- **Theme Support (Light & Dark)**: Added support for theme variants to adapt popups to different UI environments.
  - New `theme` property (`'light' | 'dark'`). Defaults to `dark`.
  - **Light Theme**: optimized with slate-800 text, higher glass opacity, and adjusted shadows for readability on light backgrounds.
  - **Theme-aware Opaque Mode**: `isOpaque` now adapts to the theme (white for light, dark for dark).
- **Demo Enhancement**: Added a theme switcher to the official showcase to test alerts in both modes.
- **Improved Contrast**: Better shadow depth and border luminosity for light mode.


## [0.1.7] - 2026-04-01

### Fixed
- **Build optimization**: Made `lottie-react` an external dependency to prevent bundling `lottie-web` internals.
  - Package size reduced from **752 kB → 77 kB** (90% smaller).
  - Suppressed Rollup `eval` warning caused by `lottie-web`'s expression engine.

## [0.1.6] - 2026-04-01

### Added
- **Custom Lottie Support**: Fully customizable Lottie animations.
  - Support for remote Lottie JSON URLs (strings).
  - Support for imported Lottie JSON objects.
  - New `lottieLoop` property to control animation looping.
  - New `useLottieIcons` property to toggle built-in Lottie icons.
- **Documentation**: Comprehensive API reference for Lottie options in README and documentation site.

## [0.1.4] - 2026-03-31

### Added
- **Opaque Mode**: Added `isOpaque` property for better readability on busy backgrounds.
  - When `true`, it creates a high-contrast blend of the theme color and black.
  - Disables transparency and backdrop filters for maximum legibility.
- **Improved Contrast**: Better shadow depth for opaque popups.

## [0.1.3] - 2026-03-31

### Added
- **Dynamic Color Customization**: Added support for custom colors for glass background and all action buttons.
  - `glassColor`: Primary glass accent color.
  - `glassColorSecondary`: Secondary color for gradients.
  - `confirmButtonColor`: Custom color for the confirm button.
  - `cancelButtonColor`: Custom color for the cancel button.
  - `denyButtonColor`: Custom color for the deny button.
- **Improved Responsiveness**: Better button handling on mobile devices.
- **Documentation**: Updated README with the new configuration properties.

## [0.1.2] - 2026-03-31

### Added
- **GSAP Animations**: Initial implementation of high-performance animations.
- **Lottie Support**: Integration with `lottie-react` for premium animated icons.

## [0.1.0] - 2026-03-30
- Initial release of GlassAlert Animation library.
