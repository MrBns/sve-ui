<script lang="ts">
  import { getContext } from 'svelte';
  import type { PopoverState } from './popover.svelte.js';

  interface PopoverContentProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: PopoverContentProps = $props();

  const popover = getContext<PopoverState>('popover');

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      popover.closePopover();
    }
  }
</script>

{#if popover.open}
  <div
    class={className}
    {...restProps}
    id={popover.contentId}
    role="dialog"
    aria-labelledby={popover.triggerId}
    data-popover-content
    data-placement={popover.placement}
    onkeydown={handleKeydown}
  >
    {@render children?.()}
  </div>
{/if}
