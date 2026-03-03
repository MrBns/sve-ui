<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { createAccordionState, type AccordionState } from './accordion.svelte.js';

  export interface AccordionItemData {
    value: string;
    title: string;
    content?: string;
    disabled?: boolean;
  }

  interface AccordionProps {
    /** 'single' allows only one item open; 'multiple' allows many. */
    type?: 'single' | 'multiple';
    /** Pre-open item(s) on first render. */
    defaultValue?: string | string[];
    /**
     * Data-driven mode: pass an array of items and sve-ui renders them.
     * Omit to use AccordionItem sub-components as children instead.
     */
    items?: AccordionItemData[];
    class?: string;
    /** Applied to each item wrapper when using data-driven mode. */
    itemClass?: string;
    /** Applied to each trigger button when using data-driven mode. */
    triggerClass?: string;
    /** Applied to each content panel when using data-driven mode. */
    contentClass?: string;
    /**
     * Custom trigger rendering — receives (item, isOpen).
     * Falls back to rendering item.title as plain text.
     */
    trigger?: Snippet<[AccordionItemData, boolean]>;
    /**
     * Custom content rendering — receives (item).
     * Falls back to rendering item.content as plain text.
     */
    content?: Snippet<[AccordionItemData]>;
    /** Used when composing with <AccordionItem> sub-components. */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    type = 'single',
    defaultValue,
    items,
    class: className,
    itemClass,
    triggerClass,
    contentClass,
    trigger: triggerSnippet,
    content: contentSnippet,
    children,
    ...restProps
  }: AccordionProps = $props();

  const state = createAccordionState(type, defaultValue);
  // Provide context so AccordionItem children can share this state
  setContext<AccordionState>('accordion', state);

  /** Deterministic IDs derived from the item value string. */
  const tid = (v: string) => `acc-trigger-${v}`;
  const cid = (v: string) => `acc-content-${v}`;
</script>

<div class={className} {...restProps} data-accordion-root>
  {#if items && items.length > 0}
    <!-- ── Data-driven mode ── -->
    {#each items as item}
      {@const open = state.isOpen(item.value)}
      <div
        class={itemClass}
        data-accordion-item
        data-state={open ? 'open' : 'closed'}
        data-disabled={item.disabled ? '' : undefined}
      >
        <button
          id={tid(item.value)}
          type="button"
          class={triggerClass}
          aria-expanded={open}
          aria-controls={cid(item.value)}
          aria-disabled={item.disabled}
          disabled={item.disabled}
          data-accordion-trigger
          data-state={open ? 'open' : 'closed'}
          onclick={() => !item.disabled && state.toggle(item.value)}
        >
          {#if triggerSnippet}
            {@render triggerSnippet(item, open)}
          {:else}
            {item.title}
          {/if}
        </button>

        {#if open}
          <div
            id={cid(item.value)}
            role="region"
            class={contentClass}
            aria-labelledby={tid(item.value)}
            data-accordion-content
            data-state="open"
          >
            {#if contentSnippet}
              {@render contentSnippet(item)}
            {:else}
              {item.content ?? ''}
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <!-- ── Children mode — render <AccordionItem> sub-components ── -->
    {@render children?.()}
  {/if}
</div>
