<script lang="ts">
  import { getContext } from 'svelte';
  import type { DrawerState } from './drawer.svelte.js';

  interface DrawerTriggerProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DrawerTriggerProps = $props();

  const drawer = getContext<DrawerState>('drawer');
</script>

<button
  class={className}
  {...restProps}
  id={drawer.triggerId}
  aria-haspopup="dialog"
  aria-expanded={drawer.open}
  aria-controls={drawer.drawerId}
  data-drawer-trigger
  onclick={drawer.toggleDrawer}
  type="button"
>
  {@render children?.()}
</button>
