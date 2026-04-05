import React from 'react';
import { useGlassAlert } from '../src/react';

const App = () => {
  const { fire } = useGlassAlert();
  const [appTheme, setAppTheme] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#0f172a' : '#f8fafc';
    document.body.style.color = newTheme === 'dark' ? '#ffffff' : '#0f172a';
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = appTheme === 'dark' ? '#0f172a' : '#f8fafc';
    document.body.style.color = appTheme === 'dark' ? '#ffffff' : '#0f172a';
    document.body.style.transition = 'all 0.3s ease';
  }, [appTheme]);

  const showAlert = (type: any) => {
    switch (type) {
      case 'success':
        fire({
          title: 'Success!',
          text: 'The operation was completed successfully.',
          icon: 'success',
          animation: 'elastic',
          theme: appTheme
        });
        break;
      case 'error':
        fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          animation: 'bounce',
          theme: appTheme
        });
        break;
      case 'warning':
        fire({
          title: 'Warning!',
          text: 'This action cannot be undone.',
          icon: 'warning',
          animation: 'liquid',
          showCancelButton: true,
          confirmButtonText: 'Yes, proceed',
          theme: appTheme
        });
        break;
      case 'info':
        fire({
          title: 'Information',
          text: 'This is some useful information for you.',
          icon: 'info',
          animation: 'slide',
          theme: appTheme
        });
        break;
      case 'question':
        fire({
          title: 'Question',
          text: 'Are you sure you want to continue?',
          icon: 'question',
          showCancelButton: true,
          animation: 'fade',
          theme: appTheme
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
          timerProgressBar: true,
          theme: appTheme
        });
        break;
      case 'custom':
        fire({
          title: 'Custom Glass',
          text: 'Tailored glassmorphism effect.',
          glassBlur: 40,
          glassOpacity: appTheme === 'dark' ? 0.2 : 0.6,
          glassColor: '#ec4899',
          glassColorSecondary: '#8b5cf6',
          animation: 'liquid',
          showConfirmButton: true,
          theme: appTheme
        });
        break;
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            background: appTheme === 'dark' ? '#f8fafc' : '#0f172a',
            color: appTheme === 'dark' ? '#0f172a' : '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Switch to {appTheme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      <h1>GlassAlert Animation Showcase</h1>
      <p>Beautiful glassmorphism alerts for React with GSAP animations.</p>
      <p>Current Theme: <strong>{appTheme.toUpperCase()}</strong></p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '40px' }}>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('success')}>Success Alert</button>
        <button className="ga-btn ga-btn-deny" onClick={() => showAlert('error')}>Error Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#f59e0b' }} onClick={() => showAlert('warning')}>Warning Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#3b82f6' }} onClick={() => showAlert('info')}>Info Alert</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#8b5cf6' }} onClick={() => showAlert('question')}>Question Alert</button>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('toast')}>Toast Notification</button>
        <button className="ga-btn ga-btn-confirm" onClick={() => showAlert('custom')}>Custom Glass</button>
        <button className="ga-btn ga-btn-confirm" style={{ backgroundColor: '#64748b' }} onClick={() => fire({
          title: 'Opaque Mode',
          text: `This is high contrast mode in ${appTheme} theme.`,
          icon: 'info',
          isOpaque: true,
          theme: appTheme
        })}>Opaque Mode</button>
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
          theme: appTheme
        })}>Emerald Custom</button>
      </div>
    </div>
  );
};

export default App;
