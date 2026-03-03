<script lang="ts" generics="T = string">
  import type { Snippet } from 'svelte';
  import { clickOutside } from '@sve-ui/shared';
  import { generateId } from '@sve-ui/shared';

  export interface AutoCompleteOption<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
  }

  interface AutoCompleteProps {
    /** Array of selectable options. */
    options: AutoCompleteOption<T>[];
    /**
     * Two-way bindable selected value.
     * Setting this to `null` clears the selection.
     *
     * @example
     * <AutoComplete {options} bind:value={selected} />
     */
    value?: T | null;
    placeholder?: string;
    /** Override the default label-contains filter. */
    filterFn?: (option: AutoCompleteOption<T>, query: string) => boolean;
    /** Called when an option is selected. */
    onSelect?: (value: T) => void;
    class?: string;
    inputClass?: string;
    listClass?: string;
    optionClass?: string;
    /**
     * Custom option rendering — receives (option, isActive, isSelected).
     * Defaults to rendering option.label.
     *
     * @example
     * <AutoComplete {options} bind:value>
     *   {#snippet option(opt, isActive, isSelected)}
     *     <span class:bold={isSelected}>{opt.label}</span>
     *   {/snippet}
     * </AutoComplete>
     */
    option?: Snippet<[AutoCompleteOption<T>, boolean, boolean]>;
    [key: string]: unknown;
  }

  let {
    options,
    value = $bindable<T | null>(null),
    placeholder,
    filterFn,
    onSelect,
    class: className,
    inputClass,
    listClass,
    optionClass,
    option: optionSnippet,
    ...restProps
  }: AutoCompleteProps = $props();

  const inputId = generateId('ac-input');
  const listId = generateId('ac-list');

  const defaultFilter = (opt: AutoCompleteOption<T>, q: string) =>
    opt.label.toLowerCase().includes(q.toLowerCase());

  const filter = filterFn ?? defaultFilter;

  let query = $state('');
  let open = $state(false);
  let activeIndex = $state(-1);

  const filtered = $derived(query ? options.filter((o) => filter(o, query)) : options);

  // Sync query display when value changes externally
  $effect(() => {
    if (value !== null && value !== undefined) {
      const found = options.find((o) => o.value === value);
      if (found && found.label !== query) query = found.label;
    }
  });

  function selectOption(opt: AutoCompleteOption<T>) {
    if (opt.disabled) return;
    value = opt.value;
    query = opt.label;
    open = false;
    activeIndex = -1;
    onSelect?.(opt.value);
  }

  function handleInput(e: Event) {
    query = (e.target as HTMLInputElement).value;
    open = query.length > 0;
    activeIndex = -1;
    if (!query) value = null;
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          open = true;
          activeIndex = 0;
        } else {
          activeIndex = activeIndex >= filtered.length - 1 ? 0 : activeIndex + 1;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeIndex = activeIndex <= 0 ? filtered.length - 1 : activeIndex - 1;
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          selectOption(filtered[activeIndex]);
        } else {
          open = false;
        }
        break;
      case 'Escape':
        e.preventDefault();
        open = false;
        activeIndex = -1;
        break;
    }
  }
</script>

<div
  class={className}
  use:clickOutside={() => { open = false; activeIndex = -1; }}
  style="position: relative;"
  data-autocomplete-root
>
  <input
    id={inputId}
    type="text"
    class={inputClass}
    role="combobox"
    aria-autocomplete="list"
    aria-expanded={open}
    aria-controls={listId}
    aria-activedescendant={activeIndex >= 0 ? `${listId}-item-${activeIndex}` : undefined}
    value={query}
    {placeholder}
    autocomplete="off"
    data-autocomplete-input
    {...restProps}
    oninput={handleInput}
    onkeydown={handleKeydown}
    onfocus={() => { if (query) open = true; }}
  />

  {#if open && filtered.length > 0}
    <ul
      id={listId}
      role="listbox"
      class={listClass}
      aria-labelledby={inputId}
      data-autocomplete-list
    >
      {#each filtered as opt, i}
        {@const isActive = activeIndex === i}
        {@const isSelected = value === opt.value}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          id={`${listId}-item-${i}`}
          role="option"
          class={optionClass}
          aria-selected={isSelected}
          aria-disabled={opt.disabled}
          data-autocomplete-item
          data-active={isActive ? '' : undefined}
          data-selected={isSelected ? '' : undefined}
          data-disabled={opt.disabled ? '' : undefined}
          onclick={() => selectOption(opt)}
        >
          {#if optionSnippet}
            {@render optionSnippet(opt, isActive, isSelected)}
          {:else}
            {opt.label}
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
