<script lang="ts">
  import { getContext } from 'svelte';
  import type { AccordionItemState } from './accordion.svelte.js';

  interface AccordionContentProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    children,
    ...restProps
  }: AccordionContentProps = $props();

  const item = getContext<{ value: string; disabled: boolean; itemState: AccordionItemState }>(
    'accordion-item'
  );
</script>

{#if item.itemState.open}
  <div
    class={className}
    {...restProps}
    id={item.itemState.contentId}
    role="region"
    aria-labelledby={item.itemState.triggerId}
    data-accordion-content
    data-state="open"
  >
    {@render children?.()}
  </div>
{/if}
