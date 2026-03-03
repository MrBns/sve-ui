<script lang="ts">
  import type { Snippet } from 'svelte';
  import { focusTrap } from '@sve-ui/shared';
  import { generateId } from '@sve-ui/shared';

  export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

  interface DrawerProps {
    /**
     * Two-way bindable open state.
     *
     * @example
     * <script>
     *   let open = $state(false);
     * <\/script>
     * <button onclick={() => open = true}>Open Drawer</button>
     * <Drawer bind:open side="left" title="Navigation">
     *   <nav>...</nav>
     * </Drawer>
     */
    open?: boolean;
    /** Which edge the drawer slides in from. */
    side?: DrawerSide;
    /** Plain-text title shown in the default header. Ignored if `header` snippet is provided. */
    title?: string;
    /** CSS class for the drawer panel. */
    class?: string;
    /** CSS class for the backdrop overlay. */
    overlayClass?: string;
    /**
     * Optional inline trigger — receives `{ toggle }`.
     * Use this when you want the trigger to live inside this component.
     * Alternatively manage `bind:open` externally.
     *
     * @example
     * <Drawer side="left" title="Nav">
     *   {#snippet trigger({ toggle })}
     *     <button onclick={toggle}>☰ Menu</button>
     *   {/snippet}
     *   <nav>...</nav>
     * </Drawer>
     */
    trigger?: Snippet<[{ toggle: () => void }]>;
    /** Replaces the default title + close-button header. */
    header?: Snippet;
    /** Main drawer body content. */
    children?: Snippet;
    /** Rendered at the bottom of the drawer panel. */
    footer?: Snippet;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    side = 'left',
    title,
    class: className,
    overlayClass,
    trigger: triggerSnippet,
    header: headerSnippet,
    children,
    footer: footerSnippet,
    ...restProps
  }: DrawerProps = $props();

  const drawerId = generateId('drawer');
  const titleId = `${drawerId}-title`;

  function close() {
    open = false;
  }

  function toggle() {
    open = !open;
  }
</script>

<!-- Inline trigger (optional) -->
{#if triggerSnippet}
  {@render triggerSnippet({ toggle })}
{/if}

<!-- Drawer overlay + panel -->
{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={overlayClass}
    data-drawer-overlay
    role="presentation"
    aria-hidden="true"
    onclick={(e) => e.target === e.currentTarget && close()}
  >
    <div
      use:focusTrap
      {...restProps}
      id={drawerId}
      class={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      data-drawer-content
      data-side={side}
      onkeydown={(e) => e.key === 'Escape' && close()}
    >
      <!-- Header -->
      {#if headerSnippet}
        {@render headerSnippet()}
      {:else if title}
        <div data-drawer-header style="display: flex; align-items: center; justify-content: space-between;">
          <h2 id={titleId} data-drawer-title>{title}</h2>
          <button
            type="button"
            onclick={close}
            aria-label="Close drawer"
            data-drawer-close
          >
            ×
          </button>
        </div>
      {/if}

      <!-- Body -->
      {@render children?.()}

      <!-- Footer -->
      {#if footerSnippet}
        {@render footerSnippet()}
      {/if}
    </div>
  </div>
{/if}
