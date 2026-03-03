<script lang="ts">
  import { setContext } from 'svelte';
  import { createDrawerState, type DrawerState, type DrawerSide } from './drawer.svelte.js';

  interface DrawerRootProps {
    defaultOpen?: boolean;
    side?: DrawerSide;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    defaultOpen = false,
    side = 'left',
    class: className,
    children,
    ...restProps
  }: DrawerRootProps = $props();

  const state = createDrawerState(defaultOpen, side);
  setContext<DrawerState>('drawer', state);
</script>

<div class={className} {...restProps} data-drawer-root>
  {@render children?.()}
</div>
