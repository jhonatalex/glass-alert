/**
 * Convert Hex color to RGB string (r, g, b)
 * Supports #RGB, #RGBA, #RRGGBB, #RRGGBBAA
 */
export function hexToRgb(hex: string): string | null {
  if (!hex) return null;

  // Remove # if present
  let cleanHex = hex.replace('#', '');

  // Default if not hex
  if (cleanHex.length < 3) return null;

  // Expand short format (#RGB) to full (#RRGGBB)
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  return `${r}, ${g}, ${b}`;
}

/**
 * Ensures color is in RGB format for CSS variables
 * If input is hex, converts it; if already rgb(a), extracts numbers
 */
export function formatRgb(color: string): string {
  if (!color) return '';

  // If already comma separated numbers
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(color)) return color;

  // If hex
  if (color.startsWith('#')) {
    return hexToRgb(color) || '';
  }

  // If rgb/rgba
  const rgbMatch = color.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+).*\)/);
  if (rgbMatch) {
    return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`;
  }

  return color;
}
