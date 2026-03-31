# GlassAlert Animation ✨

A beautiful, premium glassmorphism alert and modal library for React with smooth GSAP animations. 

Inspired by SweetAlert2 but with a focus on modern liquid glass aesthetics, animated backgrounds, and high-performance GSAP transitions.

![Glassmorphism Demo](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=600)

## Features
- 💎 **Premium Glassmorphism**: High-quality blur, transparency, and luminous border effects.
- 🚀 **GSAP Powered**: Smooth, hardware-accelerated animations for entrances, exits, and icons.
- 🎨 **Animated Backgrounds**: Moving liquid gradients behind the alerts for a "live" feel.
- 📦 **NPM Ready**: Easy to install and use with React (Vue/Angular support coming soon).
- 📱 **Responsive**: Mobile-first design that looks great on any screen.
- 🛠️ **Customizable**: Control blur intensity, glass opacity, colors, animations, and more.

## Installation

```bash
npm install glass-alert-animation gsap @gsap/react
```

Note: `gsap` and `@gsap/react` are peer dependencies and must be installed in your project.

## Quick Start

### 1. Wrap your app with the Provider

```jsx
import { GlassAlertProvider } from 'glass-alert-animation';
import 'glass-alert-animation/styles'; // Don't forget the CSS!

function App() {
  return (
    <GlassAlertProvider>
      <MainComponent />
    </GlassAlertProvider>
  );
}
```

### 2. Use the hook to fire alerts

```jsx
import { useGlassAlert } from 'glass-alert-animation';

function MyComponent() {
  const { fire } = useGlassAlert();

  const handleClick = async () => {
    const result = await fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      animation: 'liquid', // options: elastic, bounce, slide, fade, liquid
      glassBlur: 25,
      glassOpacity: 0.15,
      glassColor: '#6366f1'
    });

    if (result.isConfirmed) {
      fire({
        title: 'Deleted!',
        icon: 'success',
        timer: 2000
      });
    }
  };

  return <button onClick={handleClick}>Delete</button>;
}
```

## API Reference

### GlassAlertOptions

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `''` | The title of the alert. |
| `text` | `string` | `''` | The body text of the alert. |
| `icon` | `string` | `undefined` | success, error, warning, info, question. |
| `animation` | `string` | `'elastic'` | elastic, bounce, slide, fade, liquid. |
| `glassBlur` | `number` | `20` | Intensity of the glass blur in px. |
| `glassOpacity` | `number` | `0.12` | Opacity of the glass background (0-1). |
| `glassColor` | `string` | `'#6366f1'` | Primary glass color. |
| `animatedBackground` | `boolean` | `true` | Enable the moving gradient background. |
| `timer` | `number` | `0` | Auto-close timer in ms. |
| `toast` | `boolean` | `false` | Show as a toast notification. |
| `position` | `string` | `'center'` | center, top, top-start, top-end, bottom, etc. |

## License
MIT © [Your Name/Github]
