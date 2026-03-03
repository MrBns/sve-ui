<script lang="ts" generics="T = string">
  import { getContext } from 'svelte';
  import type { AutoCompleteState, AutoCompleteOption } from './auto-complete.svelte.js';

  interface AutoCompleteItemProps {
    option: AutoCompleteOption<T>;
    index: number;
    class?: string;
    children?: import('svelte').Snippet<[{ option: AutoCompleteOption<T>; active: boolean; selected: boolean }]>;
    [key: string]: unknown;
  }

  let {
    option,
    index,
    class: className,
    children,
    ...restProps
  }: AutoCompleteItemProps = $props();

  const ac = getContext<AutoCompleteState<T>>('autocomplete');

  const isActive = $derived(ac.activeIndex === index);
  const isSelected = $derived(ac.selectedValue === option.value);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<li
  class={className}
  {...restProps}
  id={`${ac.listId}-item-${index}`}
  role="option"
  aria-selected={isSelected}
  aria-disabled={option.disabled}
  data-autocomplete-item
  data-active={isActive ? '' : undefined}
  data-selected={isSelected ? '' : undefined}
  data-disabled={option.disabled ? '' : undefined}
  onclick={() => !option.disabled && ac.selectOption(option)}
>
  {#if children}
    {@render children({ option, active: isActive, selected: isSelected })}
  {:else}
    {option.label}
  {/if}
</li>
