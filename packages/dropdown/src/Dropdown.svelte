<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clickOutside } from '@sve-ui/shared';
  import { generateId } from '@sve-ui/shared';

  export interface DropdownItemData {
    label: string;
    value?: string;
    disabled?: boolean;
    /** Renders a visual separator before this item. */
    separator?: boolean;
    onSelect?: () => void;
  }

  interface DropdownProps {
    /**
     * Data-driven mode: pass items and sve-ui renders the list.
     * Omit to render <DropdownItem> children manually.
     */
    items?: DropdownItemData[];
    /** Two-way bindable open state. */
    open?: boolean;
    class?: string;
    /** CSS class for the `<ul>` menu panel. */
    contentClass?: string;
    /** CSS class applied to each `<li>` in data-driven mode. */
    itemClass?: string;
    /**
     * Required: renders the trigger button content.
     *
     * @example
     * <Dropdown>
     *   {#snippet trigger()}
     *     Options ▾
     *   {/snippet}
     *   ...
     * </Dropdown>
     */
    trigger: Snippet;
    /**
     * Optional: custom item rendering in data-driven mode — receives (item, isActive).
     * Defaults to rendering item.label.
     */
    item?: Snippet<[DropdownItemData, boolean]>;
    /** Children (use <DropdownItem> components). */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    items,
    open = $bindable(false),
    class: className,
    contentClass,
    itemClass,
    trigger: triggerSnippet,
    item: itemSnippet,
    children,
    ...restProps
  }: DropdownProps = $props();

  const menuId = generateId('dd-menu');
  const triggerId = generateId('dd-trigger');

  let triggerEl = $state<HTMLButtonElement | undefined>(undefined);
  let menuEl = $state<HTMLUListElement | undefined>(undefined);
  /** Only used for data-driven mode keyboard nav. */
  let activeIdx = $state(-1);

  const focusableItems = $derived(
    items ? items.filter((i) => !i.disabled && !i.separator) : []
  );

  function handleTriggerKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      open = true;
      // For data-driven: pre-select first/last
      if (items) {
        activeIdx = e.key === 'ArrowDown' ? 0 : focusableItems.length - 1;
      } else {
        // For children: focus first/last DOM item
        requestAnimationFrame(() => {
          const els = getMenuItems();
          e.key === 'ArrowDown' ? els[0]?.focus() : els[els.length - 1]?.focus();
        });
      }
    }
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  function handleMenuKeydown(e: KeyboardEvent) {
    if (items) {
      // Data-driven keyboard navigation
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          activeIdx = activeIdx >= focusableItems.length - 1 ? 0 : activeIdx + 1;
          break;
        case 'ArrowUp':
          e.preventDefault();
          activeIdx = activeIdx <= 0 ? focusableItems.length - 1 : activeIdx - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIdx >= 0) {
            focusableItems[activeIdx]?.onSelect?.();
            closeMenu();
          }
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        case 'Tab':
          closeMenu();
          break;
      }
    } else {
      // Children-based: use DOM focus movement
      const menuItems = getMenuItems();
      const focused = document.activeElement as HTMLElement;
      const idx = menuItems.indexOf(focused);
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          menuItems[idx + 1 < menuItems.length ? idx + 1 : 0]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          menuItems[idx - 1 >= 0 ? idx - 1 : menuItems.length - 1]?.focus();
          break;
        case 'Escape':
          e.preventDefault();
          closeMenu();
          break;
        case 'Tab':
          closeMenu();
          break;
      }
    }
  }

  function closeMenu() {
    open = false;
    activeIdx = -1;
    triggerEl?.focus();
  }

  function getMenuItems(): HTMLElement[] {
    return Array.from(
      menuEl?.querySelectorAll<HTMLElement>(
        '[data-dropdown-item]:not([aria-disabled="true"])'
      ) ?? []
    );
  }

  function selectItem(item: DropdownItemData) {
    if (!item.disabled) {
      item.onSelect?.();
      closeMenu();
    }
  }
</script>

<div
  class={className}
  {...restProps}
  use:clickOutside={closeMenu}
  style="position: relative;"
  data-dropdown-root
>
  <button
    bind:this={triggerEl}
    id={triggerId}
    type="button"
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls={menuId}
    data-dropdown-trigger
    onclick={() => { open = !open; if (!open) { activeIdx = -1; } }}
    onkeydown={handleTriggerKeydown}
  >
    {@render triggerSnippet()}
  </button>

  {#if open}
    <ul
      bind:this={menuEl}
      id={menuId}
      role="menu"
      class={contentClass}
      aria-labelledby={triggerId}
      data-dropdown-content
      onkeydown={handleMenuKeydown}
    >
      {#if items}
        <!-- Data-driven mode -->
        {#each items as item, i}
          {#if item.separator}
            <li role="separator" data-dropdown-separator></li>
          {:else}
            {@const realIdx = focusableItems.indexOf(item)}
            {@const isActive = activeIdx === realIdx}
            <li
              role="menuitem"
              class={itemClass}
              aria-disabled={item.disabled}
              tabindex={item.disabled ? -1 : 0}
              data-dropdown-item
              data-active={isActive ? '' : undefined}
              data-disabled={item.disabled ? '' : undefined}
              onclick={() => selectItem(item)}
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectItem(item);
                }
              }}
            >
              {#if itemSnippet}
                {@render itemSnippet(item, isActive)}
              {:else}
                {item.label}
              {/if}
            </li>
          {/if}
        {/each}
      {:else}
        <!-- Children mode — render <DropdownItem> components -->
        {@render children?.()}
      {/if}
    </ul>
  {/if}
</div>
