import { useGlassAlertContext } from './GlassAlertContext';
import type { GlassAlertOptions, GlassAlertResult } from '../core/types';

/**
 * Main hook to fire GlassAlerts from any component.
 * Accesses the global GlassAlertProvider state.
 */
export function useGlassAlert() {
  const { fire, close, update, isVisible } = useGlassAlertContext();

  return {
    /** 
     * Fire a new alert. Returns a Promise that resolves with a GlassAlertResult.
     */
    fire: (options: GlassAlertOptions): Promise<GlassAlertResult> => fire(options),
    
    /** 
     * Close the currently active alert programmatically.
     */
    close: (result?: Partial<GlassAlertResult>) => close(result),
    
    /** 
     * Update options of the currently active alert.
     */
    update: (options: Partial<GlassAlertOptions>) => update(options),
    
    /** 
     * Returns true if an alert is currently visible.
     */
    isVisible: () => isVisible(),
  };
}
