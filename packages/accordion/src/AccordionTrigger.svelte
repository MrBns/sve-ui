<script lang="ts">
  import { getContext } from 'svelte';
  import type { AccordionState, AccordionItemState } from './accordion.svelte.js';

  interface AccordionTriggerProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    children,
    ...restProps
  }: AccordionTriggerProps = $props();

  const accordion = getContext<AccordionState>('accordion');
  const item = getContext<{ value: string; disabled: boolean; itemState: AccordionItemState }>(
    'accordion-item'
  );

  function handleClick() {
    if (!item.disabled) {
      accordion.toggle(item.value);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<button
  class={className}
  {...restProps}
  id={item.itemState.triggerId}
  aria-expanded={item.itemState.open}
  aria-controls={item.itemState.contentId}
  aria-disabled={item.disabled}
  disabled={item.disabled}
  data-accordion-trigger
  data-state={item.itemState.open ? 'open' : 'closed'}
  onclick={handleClick}
  onkeydown={handleKeydown}
  type="button"
>
  {@render children?.()}
</button>
