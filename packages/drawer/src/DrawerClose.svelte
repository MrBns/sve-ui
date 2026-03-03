<script lang="ts">
  import { getContext } from 'svelte';
  import type { DrawerState } from './drawer.svelte.js';

  interface DrawerCloseProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DrawerCloseProps = $props();

  const drawer = getContext<DrawerState>('drawer');
</script>

<button
  class={className}
  {...restProps}
  data-drawer-close
  onclick={drawer.closeDrawer}
  aria-label="Close drawer"
  type="button"
>
  {@render children?.()}
</button>
