export type { ActionReturn } from 'svelte/action';

export interface BaseProps {
  class?: string;
  id?: string;
  [key: string]: unknown;
}
