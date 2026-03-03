<script lang="ts">
  import { getContext } from 'svelte';
  import type { PopoverState } from './popover.svelte.js';

  interface PopoverTriggerProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: PopoverTriggerProps = $props();

  const popover = getContext<PopoverState>('popover');
</script>

<button
  class={className}
  {...restProps}
  id={popover.triggerId}
  aria-haspopup="dialog"
  aria-expanded={popover.open}
  aria-controls={popover.contentId}
  data-popover-trigger
  onclick={popover.toggle}
  type="button"
>
  {@render children?.()}
</button>
