import { generateId } from '@sve-ui/shared';

export interface AccordionItemState {
  id: string;
  triggerId: string;
  contentId: string;
  open: boolean;
}

export interface AccordionState {
  type: 'single' | 'multiple';
  items: Map<string, AccordionItemState>;
  registerItem(value: string): AccordionItemState;
  unregisterItem(value: string): void;
  isOpen(value: string): boolean;
  toggle(value: string): void;
  open(value: string): void;
  close(value: string): void;
}

export function createAccordionState(
  type: 'single' | 'multiple' = 'single',
  defaultValue?: string | string[]
): AccordionState {
  let items = $state(new Map<string, AccordionItemState>());

  function isOpen(value: string): boolean {
    return items.get(value)?.open ?? false;
  }

  function toggle(value: string): void {
    const item = items.get(value);
    if (!item) return;

    if (type === 'single') {
      // Close all other items first
      for (const [key, v] of items) {
        if (key !== value) {
          v.open = false;
        }
      }
    }
    item.open = !item.open;
  }

  function open(value: string): void {
    const item = items.get(value);
    if (!item) return;

    if (type === 'single') {
      for (const v of items.values()) {
        v.open = false;
      }
    }
    item.open = true;
  }

  function close(value: string): void {
    const item = items.get(value);
    if (!item) return;
    item.open = false;
  }

  function registerItem(value: string): AccordionItemState {
    const id = generateId('accordion-item');
    const triggerId = `${id}-trigger`;
    const contentId = `${id}-content`;

    let initialOpen = false;
    if (Array.isArray(defaultValue)) {
      initialOpen = defaultValue.includes(value);
    } else if (typeof defaultValue === 'string') {
      initialOpen = defaultValue === value;
    }

    const itemState: AccordionItemState = $state({
      id,
      triggerId,
      contentId,
      open: initialOpen
    });

    items.set(value, itemState);
    return itemState;
  }

  function unregisterItem(value: string): void {
    items.delete(value);
  }

  return {
    get type() {
      return type;
    },
    get items() {
      return items;
    },
    registerItem,
    unregisterItem,
    isOpen,
    toggle,
    open,
    close
  };
}
