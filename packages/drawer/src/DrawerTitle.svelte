<script lang="ts">
  import { getContext } from 'svelte';
  import type { DrawerState } from './drawer.svelte.js';

  interface DrawerTitleProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DrawerTitleProps = $props();

  const drawer = getContext<DrawerState>('drawer');
</script>

<h2 class={className} {...restProps} id={drawer.titleId} data-drawer-title>
  {@render children?.()}
</h2>
