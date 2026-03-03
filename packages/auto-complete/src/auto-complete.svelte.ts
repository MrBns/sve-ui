import { generateId } from '@sve-ui/shared';

export interface AutoCompleteOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface AutoCompleteState<T = string> {
  inputValue: string;
  open: boolean;
  activeIndex: number;
  selectedValue: T | null;
  filteredOptions: AutoCompleteOption<T>[];
  inputId: string;
  listId: string;
  setInputValue(value: string): void;
  selectOption(option: AutoCompleteOption<T>): void;
  openList(): void;
  closeList(): void;
  moveUp(): void;
  moveDown(): void;
  confirmSelection(): void;
  reset(): void;
}

export function createAutoCompleteState<T = string>(options: {
  options: AutoCompleteOption<T>[];
  filterFn?: (option: AutoCompleteOption<T>, query: string) => boolean;
  onSelect?: (value: T) => void;
  defaultValue?: T;
}): AutoCompleteState<T> {
  const { options: allOptions, filterFn, onSelect, defaultValue } = options;

  const inputId = generateId('autocomplete-input');
  const listId = generateId('autocomplete-list');

  const defaultOption = defaultValue
    ? allOptions.find((o) => o.value === defaultValue)
    : undefined;

  let inputValue = $state(defaultOption?.label ?? '');
  let open = $state(false);
  let activeIndex = $state(-1);
  let selectedValue = $state<T | null>(defaultValue ?? null);

  const defaultFilter = (option: AutoCompleteOption<T>, query: string) =>
    option.label.toLowerCase().includes(query.toLowerCase());

  const filter = filterFn ?? defaultFilter;

  const filteredOptions = $derived(
    inputValue ? allOptions.filter((o) => filter(o, inputValue)) : allOptions
  );

  return {
    get inputValue() {
      return inputValue;
    },
    get open() {
      return open;
    },
    get activeIndex() {
      return activeIndex;
    },
    get selectedValue() {
      return selectedValue;
    },
    get filteredOptions() {
      return filteredOptions;
    },
    get inputId() {
      return inputId;
    },
    get listId() {
      return listId;
    },
    setInputValue(value: string) {
      inputValue = value;
      open = value.length > 0;
      activeIndex = -1;
    },
    selectOption(option: AutoCompleteOption<T>) {
      inputValue = option.label;
      selectedValue = option.value;
      open = false;
      activeIndex = -1;
      onSelect?.(option.value);
    },
    openList() {
      open = true;
    },
    closeList() {
      open = false;
      activeIndex = -1;
    },
    moveUp() {
      if (!open) return;
      activeIndex = activeIndex <= 0 ? filteredOptions.length - 1 : activeIndex - 1;
    },
    moveDown() {
      if (!open) {
        open = true;
        activeIndex = 0;
        return;
      }
      activeIndex = activeIndex >= filteredOptions.length - 1 ? 0 : activeIndex + 1;
    },
    confirmSelection() {
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        const option = filteredOptions[activeIndex];
        if (option && !option.disabled) {
          inputValue = option.label;
          selectedValue = option.value;
          open = false;
          activeIndex = -1;
          onSelect?.(option.value);
        }
      } else {
        open = false;
      }
    },
    reset() {
      inputValue = '';
      selectedValue = null;
      open = false;
      activeIndex = -1;
    }
  };
}
