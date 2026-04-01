# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
