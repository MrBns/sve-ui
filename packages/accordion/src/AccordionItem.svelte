<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import type { AccordionState } from './accordion.svelte.js';

  interface AccordionItemProps {
    /** Unique key for this item; used for open/close tracking and ARIA IDs. */
    value: string;
    /** Plain-text label shown in the trigger button. Ignored if `trigger` snippet is provided. */
    title?: string;
    disabled?: boolean;
    class?: string;
    triggerClass?: string;
    contentClass?: string;
    /**
     * Custom trigger rendering — receives (isOpen: boolean).
     * When provided, `title` prop is ignored.
     *
     * @example
     * <AccordionItem value="q1">
     *   {#snippet trigger(isOpen)}
     *     <span class:open={isOpen}>My custom trigger</span>
     *   {/snippet}
     *   Content here
     * </AccordionItem>
     */
    trigger?: Snippet<[boolean]>;
    /** Content rendered inside the collapsible panel. */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    title,
    disabled = false,
    class: className,
    triggerClass,
    contentClass,
    trigger: triggerSnippet,
    children,
    ...restProps
  }: AccordionItemProps = $props();

  const accordion = getContext<AccordionState>('accordion');

  const tId = `acc-trigger-${value}`;
  const cId = `acc-content-${value}`;

  const open = $derived(accordion.isOpen(value));
</script>

<div
  class={className}
  {...restProps}
  data-accordion-item
  data-state={open ? 'open' : 'closed'}
  data-disabled={disabled ? '' : undefined}
>
  <button
    id={tId}
    type="button"
    class={triggerClass}
    aria-expanded={open}
    aria-controls={cId}
    aria-disabled={disabled}
    disabled={disabled}
    data-accordion-trigger
    data-state={open ? 'open' : 'closed'}
    onclick={() => !disabled && accordion.toggle(value)}
  >
    {#if triggerSnippet}
      {@render triggerSnippet(open)}
    {:else}
      {title ?? value}
    {/if}
  </button>

  {#if open}
    <div
      id={cId}
      role="region"
      class={contentClass}
      aria-labelledby={tId}
      data-accordion-content
      data-state="open"
    >
      {@render children?.()}
    </div>
  {/if}
</div>

