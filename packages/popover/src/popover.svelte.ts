import { generateId } from '@sve-ui/shared';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface PopoverState {
  open: boolean;
  placement: PopoverPlacement;
  triggerId: string;
  contentId: string;
  toggle(): void;
  openPopover(): void;
  closePopover(): void;
}

export function createPopoverState(
  defaultOpen = false,
  placement: PopoverPlacement = 'bottom'
): PopoverState {
  const triggerId = generateId('popover-trigger');
  const contentId = generateId('popover-content');

  let open = $state(defaultOpen);

  return {
    get open() {
      return open;
    },
    get placement() {
      return placement;
    },
    get triggerId() {
      return triggerId;
    },
    get contentId() {
      return contentId;
    },
    toggle() {
      open = !open;
    },
    openPopover() {
      open = true;
    },
    closePopover() {
      open = false;
    }
  };
}
