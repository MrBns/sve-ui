<script lang="ts">
  import { getContext } from 'svelte';
  import type { AutoCompleteState } from './auto-complete.svelte.js';

  interface AutoCompleteListProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: AutoCompleteListProps = $props();

  const ac = getContext<AutoCompleteState>('autocomplete');
</script>

{#if ac.open && ac.filteredOptions.length > 0}
  <ul
    class={className}
    {...restProps}
    id={ac.listId}
    role="listbox"
    aria-labelledby={ac.inputId}
    data-autocomplete-list
  >
    {@render children?.()}
  </ul>
{/if}
