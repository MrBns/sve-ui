export { default as PopoverRoot } from './PopoverRoot.svelte';
export { default as PopoverTrigger } from './PopoverTrigger.svelte';
export { default as PopoverContent } from './PopoverContent.svelte';
export { default as PopoverClose } from './PopoverClose.svelte';
export { createPopoverState } from './popover.svelte.js';
export type { PopoverState, PopoverPlacement } from './popover.svelte.js';

import PopoverRoot from './PopoverRoot.svelte';
import PopoverTrigger from './PopoverTrigger.svelte';
import PopoverContent from './PopoverContent.svelte';
import PopoverClose from './PopoverClose.svelte';

/**
 * Popover namespace for compound component usage:
 * <Popover.Root>
 *   <Popover.Trigger>Info</Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Close>×</Popover.Close>
 *     Popover content here
 *   </Popover.Content>
 * </Popover.Root>
 */
export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose
};
