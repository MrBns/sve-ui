<script lang="ts">
  import { getContext } from 'svelte';
  import { focusTrap } from '@sve-ui/shared';
  import type { DrawerState } from './drawer.svelte.js';

  interface DrawerContentProps {
    class?: string;
    overlayClass?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    overlayClass,
    children,
    ...restProps
  }: DrawerContentProps = $props();

  const drawer = getContext<DrawerState>('drawer');

  function handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      drawer.closeDrawer();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      drawer.closeDrawer();
    }
  }
</script>

{#if drawer.open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={overlayClass}
    data-drawer-overlay
    aria-hidden="true"
    onclick={handleOverlayClick}
    role="presentation"
  >
    <div
      use:focusTrap
      class={className}
      {...restProps}
      id={drawer.drawerId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={drawer.titleId}
      data-drawer-content
      data-side={drawer.side}
      onkeydown={handleKeydown}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
