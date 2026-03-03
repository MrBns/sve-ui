<script lang="ts" generics="T = string">
  import { setContext } from 'svelte';
  import { createAutoCompleteState, type AutoCompleteState, type AutoCompleteOption } from './auto-complete.svelte.js';

  interface AutoCompleteRootProps {
    options: AutoCompleteOption<T>[];
    filterFn?: (option: AutoCompleteOption<T>, query: string) => boolean;
    onSelect?: (value: T) => void;
    defaultValue?: T;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    options,
    filterFn,
    onSelect,
    defaultValue,
    class: className,
    children,
    ...restProps
  }: AutoCompleteRootProps = $props();

  const state = createAutoCompleteState<T>({ options, filterFn, onSelect, defaultValue });
  setContext<AutoCompleteState<T>>('autocomplete', state);
</script>

<div class={className} {...restProps} data-autocomplete-root>
  {@render children?.()}
</div>
