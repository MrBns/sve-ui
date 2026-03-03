export { default as DrawerRoot } from './DrawerRoot.svelte';
export { default as DrawerTrigger } from './DrawerTrigger.svelte';
export { default as DrawerContent } from './DrawerContent.svelte';
export { default as DrawerClose } from './DrawerClose.svelte';
export { default as DrawerTitle } from './DrawerTitle.svelte';
export { createDrawerState } from './drawer.svelte.js';
export type { DrawerState, DrawerSide } from './drawer.svelte.js';

import DrawerRoot from './DrawerRoot.svelte';
import DrawerTrigger from './DrawerTrigger.svelte';
import DrawerContent from './DrawerContent.svelte';
import DrawerClose from './DrawerClose.svelte';
import DrawerTitle from './DrawerTitle.svelte';

/**
 * Drawer namespace for compound component usage:
 * <Drawer.Root side="left">
 *   <Drawer.Trigger>Open Drawer</Drawer.Trigger>
 *   <Drawer.Content>
 *     <Drawer.Title>Navigation</Drawer.Title>
 *     <Drawer.Close>×</Drawer.Close>
 *     Drawer content here
 *   </Drawer.Content>
 * </Drawer.Root>
 */
export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Close: DrawerClose,
  Title: DrawerTitle
};
