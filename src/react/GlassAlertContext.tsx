import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { GlassAlertOptions, GlassAlertResult, GlassAlertState } from '../core/types';
import { GlassAlertModal } from './GlassAlertModal';

interface GlassAlertContextValue {
  fire: (options: GlassAlertOptions) => Promise<GlassAlertResult>;
  close: (result?: Partial<GlassAlertResult>) => void;
  update: (options: Partial<GlassAlertOptions>) => void;
  isVisible: () => boolean;
}

const GlassAlertContext = createContext<GlassAlertContextValue | null>(null);

export interface GlassAlertProviderProps {
  children: React.ReactNode;
  /** Default options applied to all alerts */
  defaults?: Partial<GlassAlertOptions>;
}

export function GlassAlertProvider({ children, defaults = {} }: GlassAlertProviderProps) {
  const [state, setState] = useState<GlassAlertState>({
    isOpen: false,
    options: {},
    resolve: null,
  });

  const resolveRef = useRef<((result: GlassAlertResult) => void) | null>(null);
  const optionsRef = useRef<GlassAlertOptions>({});

  const fire = useCallback(
    (options: GlassAlertOptions): Promise<GlassAlertResult> => {
      return new Promise<GlassAlertResult>((resolve) => {
        const merged = { ...defaults, ...options };
        resolveRef.current = resolve;
        optionsRef.current = merged;
        setState({
          isOpen: true,
          options: merged,
          resolve,
        });
      });
    },
    [defaults]
  );

  const close = useCallback((result?: Partial<GlassAlertResult>) => {
    const finalResult: GlassAlertResult = {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
      dismiss: 'close',
      ...result,
    };
    resolveRef.current?.(finalResult);
    resolveRef.current = null;
  }, []);

  const handleResult = useCallback((result: GlassAlertResult) => {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const update = useCallback((newOpts: Partial<GlassAlertOptions>) => {
    setState((prev) => ({
      ...prev,
      options: { ...prev.options, ...newOpts },
    }));
  }, []);

  const isVisible = useCallback(() => state.isOpen, [state.isOpen]);

  const contextValue: GlassAlertContextValue = {
    fire,
    close,
    update,
    isVisible,
  };

  return (
    <GlassAlertContext.Provider value={contextValue}>
      {children}
      <GlassAlertModal
        isOpen={state.isOpen}
        options={state.options}
        onResult={handleResult}
      />
    </GlassAlertContext.Provider>
  );
}

/** Hook to access GlassAlert context. Must be used within GlassAlertProvider. */
export function useGlassAlertContext(): GlassAlertContextValue {
  const ctx = useContext(GlassAlertContext);
  if (!ctx) {
    throw new Error(
      'useGlassAlert must be used within a <GlassAlertProvider>. ' +
        'Wrap your app with <GlassAlertProvider> to use glass alerts.'
    );
  }
  return ctx;
}
