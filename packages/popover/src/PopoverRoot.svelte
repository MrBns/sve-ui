<script lang="ts">
  import { setContext } from 'svelte';
  import { clickOutside } from '@sve-ui/shared';
  import { createPopoverState, type PopoverState, type PopoverPlacement } from './popover.svelte.js';

  interface PopoverRootProps {
    defaultOpen?: boolean;
    placement?: PopoverPlacement;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    defaultOpen = false,
    placement = 'bottom',
    class: className,
    children,
    ...restProps
  }: PopoverRootProps = $props();

  const state = createPopoverState(defaultOpen, placement);
  setContext<PopoverState>('popover', state);
</script>

<div
  class={className}
  {...restProps}
  use:clickOutside={state.closePopover}
  data-popover-root
  style="position: relative; display: inline-block;"
>
  {@render children?.()}
</div>
