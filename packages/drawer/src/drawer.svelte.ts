import { generateId } from '@sve-ui/shared';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerState {
  open: boolean;
  side: DrawerSide;
  drawerId: string;
  triggerId: string;
  titleId: string;
  openDrawer(): void;
  closeDrawer(): void;
  toggleDrawer(): void;
}

export function createDrawerState(
  defaultOpen = false,
  side: DrawerSide = 'left'
): DrawerState {
  const drawerId = generateId('drawer');
  const triggerId = `${drawerId}-trigger`;
  const titleId = `${drawerId}-title`;

  let open = $state(defaultOpen);

  return {
    get open() {
      return open;
    },
    get side() {
      return side;
    },
    get drawerId() {
      return drawerId;
    },
    get triggerId() {
      return triggerId;
    },
    get titleId() {
      return titleId;
    },
    openDrawer() {
      open = true;
    },
    closeDrawer() {
      open = false;
    },
    toggleDrawer() {
      open = !open;
    }
  };
}
