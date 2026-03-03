export { default as AutoCompleteRoot } from './AutoCompleteRoot.svelte';
export { default as AutoCompleteInput } from './AutoCompleteInput.svelte';
export { default as AutoCompleteList } from './AutoCompleteList.svelte';
export { default as AutoCompleteItem } from './AutoCompleteItem.svelte';
export { createAutoCompleteState } from './auto-complete.svelte.js';
export type { AutoCompleteState, AutoCompleteOption } from './auto-complete.svelte.js';

import AutoCompleteRoot from './AutoCompleteRoot.svelte';
import AutoCompleteInput from './AutoCompleteInput.svelte';
import AutoCompleteList from './AutoCompleteList.svelte';
import AutoCompleteItem from './AutoCompleteItem.svelte';

/**
 * AutoComplete namespace for compound component usage:
 * <AutoComplete.Root options={...}>
 *   <AutoComplete.Input placeholder="Search..." />
 *   <AutoComplete.List>
 *     {#each state.filteredOptions as option, i}
 *       <AutoComplete.Item {option} index={i} />
 *     {/each}
 *   </AutoComplete.List>
 * </AutoComplete.Root>
 */
export const AutoComplete = {
  Root: AutoCompleteRoot,
  Input: AutoCompleteInput,
  List: AutoCompleteList,
  Item: AutoCompleteItem
};
