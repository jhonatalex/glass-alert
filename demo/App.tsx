import React from 'react';
import { useGlassAlert } from '../src/react';

const App = () => {
  const { fire } = useGlassAlert();

  const showAlert = (type: any) => {
    switch (type) {
      case 'success':
        fire({
          title: 'Success!',
          text: 'The operation was completed successfully.',
          icon: 'success',
          animation: 'elastic'
        });
        break;
      case 'error':
        fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          animation: 'bounce'
        });
        break;
      case 'warning':
        fire({
          title: 'Warning!',
          text: 'This action cannot be undone.',
          icon: 'warning',
          animation: 'liquid',
          showCancelButton: true,
          confirmButtonText: 'Yes, proceed'
        });
        break;
      case 'info':
        fire({
          title: 'Information',
          text: 'This is some useful information for you.',
          icon: 'info',
          animation: 'slide'
        });
        break;
      case 'question':
        fire({
          title: 'Question',
          text: 'Are you sure you want to continue?',
          icon: 'question',
          showCancelButton: true,
          animation: 'fade'
        });
        break;
      case 'toast':
        fire({
          title: 'New Notification',
          text: 'Someone liked your post!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true
        });
        break;
      case 'custom':
        fire({
          title: 'Custom Glass',
          text: 'Tailored glassmorphism effect.',
          glassBlur: 40,
          glassOpacity: 0.2,
          glassColor: '#ec4899',
          glassColorSecondary: '#8b5cf6',
          animation: 'liquid',
          showConfirmButton: true
        });
        break;
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>GlassAlert Animation Showcase</h1>
      <p>Beautiful glassmorphism alerts for React with GSAP animations.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '40px' }}>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('success')}>Success Alert</button>
        <button className="ga-btn ga-btn-deny" onClick={() => showAlert('error')}>Error Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#f59e0b' }} onClick={() => showAlert('warning')}>Warning Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#3b82f6' }} onClick={() => showAlert('info')}>Info Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#8b5cf6' }} onClick={() => showAlert('question')}>Question Alert</button>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('toast')}>Toast Notification</button>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('custom')}>Custom Glass</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#64748b' }} onClick={() => fire({
          title: 'GSAP SVG Fallback',
          text: 'This alert uses the classic GSAP SVG icon instead of Lottie.',
          icon: 'success',
          useLottieIcons: false
        })}>Old GSAP Icon</button>
        <button className="ga-btn ga-btn-confirm" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={() => fire({
          title: 'Premium Emerald Glass',
          text: 'Custom background and button colors while keeping the glass effect!',
          icon: 'success',
          glassColor: '#10b981',
          glassColorSecondary: '#047857',
          confirmButtonColor: '#f59e0b',
          cancelButtonColor: '#ef4444',
          showCancelButton: true,
          confirmButtonText: 'Looks Great!',
        })}>Emerald Custom</button>
      </div>
    </div>
  );
};

export default App;
