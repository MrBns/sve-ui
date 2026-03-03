<script lang="ts">
  import { getContext } from 'svelte';
  import type { PopoverState } from './popover.svelte.js';

  interface PopoverCloseProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: PopoverCloseProps = $props();

  const popover = getContext<PopoverState>('popover');
</script>

<button
  class={className}
  {...restProps}
  data-popover-close
  onclick={popover.closePopover}
  aria-label="Close popover"
  type="button"
>
  {@render children?.()}
</button>
