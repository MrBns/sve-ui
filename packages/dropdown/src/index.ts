export { default as DropdownRoot } from './DropdownRoot.svelte';
export { default as DropdownTrigger } from './DropdownTrigger.svelte';
export { default as DropdownContent } from './DropdownContent.svelte';
export { default as DropdownItem } from './DropdownItem.svelte';
export { createDropdownState } from './dropdown.svelte.js';
export type { DropdownState } from './dropdown.svelte.js';

import DropdownRoot from './DropdownRoot.svelte';
import DropdownTrigger from './DropdownTrigger.svelte';
import DropdownContent from './DropdownContent.svelte';
import DropdownItem from './DropdownItem.svelte';

/**
 * Dropdown namespace for compound component usage:
 * <Dropdown.Root>
 *   <Dropdown.Trigger>Actions</Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
 *     <Dropdown.Item onSelect={() => {}}>Delete</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown.Root>
 */
export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem
};
