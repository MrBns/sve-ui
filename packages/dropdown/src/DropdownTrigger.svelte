<script lang="ts">
  import { getContext } from 'svelte';
  import type { DropdownState } from './dropdown.svelte.js';

  interface DropdownTriggerProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DropdownTriggerProps = $props();

  const dropdown = getContext<DropdownState>('dropdown');

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        dropdown.openMenu();
        dropdown.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        dropdown.openMenu();
        dropdown.moveUp();
        break;
      case 'Escape':
        dropdown.closeMenu();
        break;
    }
  }
</script>

<button
  class={className}
  {...restProps}
  id={dropdown.triggerId}
  aria-haspopup="menu"
  aria-expanded={dropdown.open}
  aria-controls={dropdown.menuId}
  data-dropdown-trigger
  onclick={dropdown.toggle}
  onkeydown={handleKeydown}
  type="button"
>
  {@render children?.()}
</button>
