<script lang="ts">
  import { getContext, setContext, onDestroy } from 'svelte';
  import type { AccordionState, AccordionItemState } from './accordion.svelte.js';

  interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    disabled = false,
    class: className,
    children,
    ...restProps
  }: AccordionItemProps = $props();

  const accordion = getContext<AccordionState>('accordion');
  const itemState: AccordionItemState = accordion.registerItem(value);

  setContext('accordion-item', { value, disabled, itemState });

  onDestroy(() => {
    accordion.unregisterItem(value);
  });
</script>

<div
  class={className}
  {...restProps}
  data-accordion-item
  data-state={itemState.open ? 'open' : 'closed'}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
