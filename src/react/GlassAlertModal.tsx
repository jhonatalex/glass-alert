import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { GlassAlertOptions, GlassAlertResult, GlassDismissReason } from '../core/types';
import { mergeOptions } from '../core/defaults';
import { 
  animateIn, 
  animateOut, 
  animateIcon, 
  animateTimerBar,
  animateButtonHover 
} from '../core/animations';
import { iconSVGs } from '../core/icons';
import Lottie from 'lottie-react';
import successLottie from '../assets/lotties/success.json';
import errorLottie from '../assets/lotties/error.json';
import warningLottie from '../assets/lotties/warning.json';
import infoLottie from '../assets/lotties/info.json';
import questionLottie from '../assets/lotties/question.json';

const defaultLotties: Record<string, object> = {
  success: successLottie,
  error: errorLottie,
  warning: warningLottie,
  info: infoLottie,
  question: questionLottie
};
interface GlassAlertModalProps {
  isOpen: boolean;
  options: GlassAlertOptions;
  onResult: (result: GlassAlertResult) => void;
}

export const GlassAlertModal: React.FC<GlassAlertModalProps> = ({ isOpen, options, onResult }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const mergedOptions = useMemo(() => mergeOptions(options), [options]);
  const {
    title, text, html, icon, position, animation, toast, timer, timerProgressBar,
    width, padding, showConfirmButton, confirmButtonText, confirmButtonColor,
    showCancelButton, cancelButtonText, cancelButtonColor, showDenyButton,
    denyButtonText, denyButtonColor, showCloseButton, allowOutsideClick,
    allowEscapeKey, reverseButtons, footer, customClass,
    glassBlur, glassOpacity, glassColor, glassColorSecondary, glassBorderOpacity,
    backdropBlur, animatedBackground, backgroundAnimSpeed
  } = mergedOptions;

  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const timerBarRef = useRef<HTMLDivElement>(null);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback((reason: GlassDismissReason, value?: any) => {
    if (isClosing) return;
    setIsClosing(true);
    
    mergedOptions.willClose?.();

    if (overlayRef.current && popupRef.current) {
      animateOut(popupRef.current, overlayRef.current, animation, () => {
        setIsClosing(false);
        setShouldRender(false);
        onResult({
          isConfirmed: reason === 'close' && value === undefined, // Simple close
          isDenied: reason === 'cancel' && value === 'deny',
          isDismissed: reason !== 'close' || value !== undefined,
          value,
          dismiss: reason,
        });
        mergedOptions.didClose?.();
      });
    } else {
      setIsClosing(false);
      setShouldRender(false);
      onResult({ isConfirmed: false, isDenied: false, isDismissed: true, dismiss: reason });
    }
  }, [isClosing, animation, mergedOptions, onResult]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldRender && !isClosing && overlayRef.current && popupRef.current) {
      mergedOptions.willOpen?.();
      
      const anim = animateIn(popupRef.current, overlayRef.current, animation, () => {
        mergedOptions.didOpen?.();
      });

      if (icon && iconRef.current) {
        animateIcon(iconRef.current, icon);
      }

      if (timer && timer > 0) {
        if (timerProgressBar && timerBarRef.current) {
          animateTimerBar(timerBarRef.current, timer, () => {
            handleClose('timer');
          });
        } else {
          timerId.current = setTimeout(() => {
            handleClose('timer');
          }, timer);
        }
      }

      return () => {
        if (timerId.current) clearTimeout(timerId.current);
        anim?.kill();
      };
    }
  }, [shouldRender, isClosing, animation, icon, timer, timerProgressBar, mergedOptions, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allowEscapeKey && e.key === 'Escape' && isOpen && !isClosing) {
        handleClose('esc');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allowEscapeKey, isOpen, isClosing, handleClose]);

  if (!shouldRender) return null;

  const glassVars = {
    '--ga-glass-blur': `${glassBlur}px`,
    '--ga-glass-opacity': glassOpacity,
    '--ga-backdrop-blur': `${backdropBlur}px`,
    '--ga-glass-border-opacity': glassBorderOpacity,
    '--ga-bg-speed': `${backgroundAnimSpeed}s`,
  } as React.CSSProperties;

  if (glassColor) {
    // Basic hex/rgb to rgb numbers would be better, but for now we rely on the user or default
    // We'll stick to CSS variables if they were passed as strings
  }

  const renderIcon = () => {
    if (!icon && !mergedOptions.lottie) return null;

    const isDefaultLottie = mergedOptions.useLottieIcons && icon && defaultLotties[icon];
    
    if (mergedOptions.lottie || isDefaultLottie) {
      const animationData = typeof mergedOptions.lottie === 'object'
        ? mergedOptions.lottie
        : isDefaultLottie ? defaultLotties[icon!] : null;

      if (animationData) {
        return (
          <div className={`ga-icon-wrapper ga-icon-type-${icon || 'custom'} ${customClass?.icon || ''}`}>
            <Lottie 
              animationData={animationData} 
              loop={mergedOptions.lottieLoop} 
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      }
    }

    if (!icon) return null;
    const svgContent = iconSVGs[icon];
    return (
      <div 
        ref={iconRef}
        className={`ga-icon-wrapper ga-icon-type-${icon} ${customClass?.icon || ''}`}
        style={{ color: mergedOptions.iconColor }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  };

  const overlayClasses = [
    'ga-overlay',
    isOpen && !isClosing ? 'ga-visible' : '',
    `ga-pos-${position}`,
    toast ? 'ga-toast' : '',
    customClass?.container || ''
  ].join(' ');

  const popupStyle: React.CSSProperties = {
    width: width || (toast ? 'auto' : '440px'),
    padding: padding || (toast ? '16px 24px' : '32px'),
    ...glassVars
  };

  return createPortal(
    <div ref={overlayRef} className={overlayClasses}>
      <div 
        className="ga-backdrop" 
        onClick={() => allowOutsideClick && !isClosing && handleClose('backdrop')}
      />
      
      {animatedBackground && !toast && <div className="ga-animated-bg" />}
      
      <div 
        ref={popupRef} 
        className={`ga-popup ${isOpen && !isClosing ? 'ga-visible' : ''} ${customClass?.popup || ''}`}
        style={popupStyle}
        onClick={() => {
          if (toast && !isClosing) handleClose('close');
        }}
      >
        {showCloseButton && (
          <button 
            className={`ga-close-btn ${customClass?.closeButton || ''}`}
            onClick={() => handleClose('close')}
          >
            &times;
          </button>
        )}

        {renderIcon()}

        <div className="ga-toast-body">
          {title && (
            <h2 className={`ga-title ${customClass?.title || ''}`}>
              {title}
            </h2>
          )}

          <div className={`ga-content ${customClass?.content || ''}`}>
            {html ? (
              typeof html === 'string' ? <div dangerouslySetInnerHTML={{ __html: html }} /> : html
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>

        {(showConfirmButton || showCancelButton || showDenyButton) && (
          <div className={`ga-actions ${reverseButtons ? 'ga-reverse' : ''} ${customClass?.actions || ''}`}>
            {showDenyButton && (
              <button
                className={`ga-btn ga-btn-deny ${customClass?.denyButton || ''}`}
                style={{ backgroundColor: denyButtonColor }}
                onMouseEnter={(e) => animateButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => animateButtonHover(e.currentTarget, false)}
                onClick={() => handleClose('cancel', 'deny')}
              >
                {denyButtonText}
              </button>
            )}
            {showCancelButton && (
              <button
                className={`ga-btn ga-btn-cancel ${customClass?.cancelButton || ''}`}
                style={{ backgroundColor: cancelButtonColor }}
                onMouseEnter={(e) => animateButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => animateButtonHover(e.currentTarget, false)}
                onClick={() => handleClose('cancel')}
              >
                {cancelButtonText}
              </button>
            )}
            {showConfirmButton && (
              <button
                className={`ga-btn ga-btn-confirm ${customClass?.confirmButton || ''}`}
                style={{ backgroundColor: confirmButtonColor }}
                onMouseEnter={(e) => animateButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => animateButtonHover(e.currentTarget, false)}
                onClick={() => handleClose('close')}
              >
                {confirmButtonText}
              </button>
            )}
          </div>
        )}

        {footer && (
          <div className={`ga-footer ${customClass?.footer || ''}`}>
            {typeof footer === 'string' ? <div dangerouslySetInnerHTML={{ __html: footer }} /> : footer}
          </div>
        )}

        {timerProgressBar && timer && timer > 0 && (
          <div className="ga-timer-bar-wrapper">
            <div ref={timerBarRef} className="ga-timer-bar" />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
