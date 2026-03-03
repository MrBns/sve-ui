<script lang="ts">
  import type { Snippet } from 'svelte';

  interface DropdownItemProps {
    disabled?: boolean;
    onSelect?: () => void;
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    disabled = false,
    onSelect,
    class: className,
    children,
    ...restProps
  }: DropdownItemProps = $props();

  function handleClick() {
    if (!disabled) onSelect?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
    }
  }
</script>

<li
  role="menuitem"
  class={className}
  aria-disabled={disabled}
  tabindex={disabled ? -1 : 0}
  data-dropdown-item
  data-disabled={disabled ? '' : undefined}
  {...restProps}
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  {@render children?.()}
</li>
