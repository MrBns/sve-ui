<script lang="ts">
  import { setContext } from 'svelte';
  import { createAccordionState, type AccordionState } from './accordion.svelte.js';

  interface AccordionRootProps {
    type?: 'single' | 'multiple';
    defaultValue?: string | string[];
    class?: string;
    id?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    type = 'single',
    defaultValue,
    class: className,
    children,
    ...restProps
  }: AccordionRootProps = $props();

  const state = createAccordionState(type, defaultValue);
  setContext<AccordionState>('accordion', state);
</script>

<div class={className} {...restProps} data-accordion-root>
  {@render children?.()}
</div>
