<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clickOutside } from '@sve-ui/shared';
  import { generateId } from '@sve-ui/shared';

  export type PopoverPlacement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';

  interface PopoverProps {
    /** Two-way bindable open state. */
    open?: boolean;
    /** Where the content panel appears relative to the trigger. */
    placement?: PopoverPlacement;
    /** CSS class for the floating content panel. */
    class?: string;
    /**
     * Required: renders the trigger element.
     *
     * @example
     * <Popover>
     *   {#snippet trigger()}
     *     <button>More info ℹ️</button>
     *   {/snippet}
     *   <p>Popover content</p>
     * </Popover>
     */
    trigger: Snippet;
    /** Popover panel content. */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    placement = 'bottom',
    class: className,
    trigger: triggerSnippet,
    children,
    ...restProps
  }: PopoverProps = $props();

  const contentId = generateId('popover');
  const triggerId = `${contentId}-trigger`;
</script>

<div
  use:clickOutside={() => (open = false)}
  style="position: relative; display: inline-block;"
  data-popover-root
>
  <!-- Trigger wrapper — forwards aria attributes -->
  <button
    id={triggerId}
    type="button"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={contentId}
    data-popover-trigger
    onclick={() => (open = !open)}
    style="all: unset; display: contents;"
  >
    {@render triggerSnippet()}
  </button>

  {#if open}
    <div
      id={contentId}
      class={className}
      {...restProps}
      role="dialog"
      aria-labelledby={triggerId}
      data-popover-content
      data-placement={placement}
      onkeydown={(e) => e.key === 'Escape' && (open = false)}
    >
      {@render children?.()}
    </div>
  {/if}
</div>
