<script lang="ts">
  import { getContext, onMount, onDestroy } from 'svelte';
  import { generateId } from '@sve-ui/shared';
  import type { DropdownState } from './dropdown.svelte.js';

  interface DropdownItemProps {
    disabled?: boolean;
    onSelect?: () => void;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    disabled = false,
    onSelect,
    class: className,
    children,
    ...restProps
  }: DropdownItemProps = $props();

  const dropdown = getContext<DropdownState>('dropdown');
  const itemId = generateId('dropdown-item');

  let index = $state(-1);

  onMount(() => {
    dropdown.registerItem(itemId);
    index = dropdown.items.indexOf(itemId);
  });

  onDestroy(() => {
    dropdown.unregisterItem(itemId);
  });

  const isActive = $derived(dropdown.activeIndex === index);

  function handleClick() {
    if (!disabled) {
      onSelect?.();
      dropdown.closeMenu();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<li
  class={className}
  {...restProps}
  id={itemId}
  role="menuitem"
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  data-dropdown-item
  data-active={isActive ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  {@render children?.()}
</li>
