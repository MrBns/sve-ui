/**
 * Generates a unique ID with an optional prefix.
 */
let counter = 0;

export function generateId(prefix = 'sve'): string {
  return `${prefix}-${++counter}-${Math.random().toString(36).slice(2, 7)}`;
}
