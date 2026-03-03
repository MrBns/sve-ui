<script lang="ts">
  import { getContext } from 'svelte';
  import type { DropdownState } from './dropdown.svelte.js';

  interface DropdownContentProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DropdownContentProps = $props();

  const dropdown = getContext<DropdownState>('dropdown');

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        dropdown.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        dropdown.moveUp();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        dropdown.selectActive();
        break;
      case 'Escape':
        event.preventDefault();
        dropdown.closeMenu();
        break;
      case 'Tab':
        dropdown.closeMenu();
        break;
    }
  }
</script>

{#if dropdown.open}
  <ul
    class={className}
    {...restProps}
    id={dropdown.menuId}
    role="menu"
    aria-labelledby={dropdown.triggerId}
    data-dropdown-content
    onkeydown={handleKeydown}
  >
    {@render children?.()}
  </ul>
{/if}
