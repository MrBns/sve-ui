import { generateId } from '@sve-ui/shared';

export interface DropdownState {
  open: boolean;
  activeIndex: number;
  triggerId: string;
  menuId: string;
  toggle(): void;
  openMenu(): void;
  closeMenu(): void;
  moveUp(): void;
  moveDown(): void;
  selectActive(): void;
  registerItem(id: string): void;
  unregisterItem(id: string): void;
  items: string[];
}

export function createDropdownState(): DropdownState {
  const triggerId = generateId('dropdown-trigger');
  const menuId = generateId('dropdown-menu');

  let open = $state(false);
  let activeIndex = $state(-1);
  let items = $state<string[]>([]);

  return {
    get open() {
      return open;
    },
    get activeIndex() {
      return activeIndex;
    },
    get triggerId() {
      return triggerId;
    },
    get menuId() {
      return menuId;
    },
    get items() {
      return items;
    },
    toggle() {
      open = !open;
      if (!open) activeIndex = -1;
    },
    openMenu() {
      open = true;
    },
    closeMenu() {
      open = false;
      activeIndex = -1;
    },
    moveUp() {
      if (!open) return;
      activeIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
    },
    moveDown() {
      if (!open) {
        open = true;
        activeIndex = 0;
        return;
      }
      activeIndex = activeIndex >= items.length - 1 ? 0 : activeIndex + 1;
    },
    selectActive() {
      // Focus or click the active item
      if (activeIndex >= 0) {
        const itemId = items[activeIndex];
        if (itemId) {
          const el = document.getElementById(itemId);
          el?.click();
        }
      }
    },
    registerItem(id: string) {
      if (!items.includes(id)) {
        items.push(id);
      }
    },
    unregisterItem(id: string) {
      const idx = items.indexOf(id);
      if (idx !== -1) {
        items.splice(idx, 1);
      }
    }
  };
}
