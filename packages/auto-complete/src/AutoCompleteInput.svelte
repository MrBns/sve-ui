<script lang="ts">
  import { getContext } from 'svelte';
  import type { AutoCompleteState } from './auto-complete.svelte.js';

  interface AutoCompleteInputProps {
    placeholder?: string;
    class?: string;
    [key: string]: unknown;
  }

  let { placeholder, class: className, ...restProps }: AutoCompleteInputProps = $props();

  const ac = getContext<AutoCompleteState>('autocomplete');

  function handleInput(event: Event) {
    ac.setInputValue((event.target as HTMLInputElement).value);
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        ac.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        ac.moveUp();
        break;
      case 'Enter':
        event.preventDefault();
        ac.confirmSelection();
        break;
      case 'Escape':
        event.preventDefault();
        ac.closeList();
        break;
    }
  }

  function handleFocus() {
    if (ac.inputValue) {
      ac.openList();
    }
  }
</script>

<input
  class={className}
  {...restProps}
  id={ac.inputId}
  type="text"
  role="combobox"
  aria-autocomplete="list"
  aria-expanded={ac.open}
  aria-controls={ac.listId}
  aria-activedescendant={ac.activeIndex >= 0 ? `${ac.listId}-item-${ac.activeIndex}` : undefined}
  value={ac.inputValue}
  {placeholder}
  autocomplete="off"
  data-autocomplete-input
  oninput={handleInput}
  onkeydown={handleKeydown}
  onfocus={handleFocus}
/>
