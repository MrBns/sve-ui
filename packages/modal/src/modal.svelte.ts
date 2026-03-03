import { generateId } from '@sve-ui/shared';

export interface ModalState {
  open: boolean;
  dialogId: string;
  titleId: string;
  descriptionId: string;
  openModal(): void;
  closeModal(): void;
  toggleModal(): void;
}

export function createModalState(defaultOpen = false): ModalState {
  let open = $state(defaultOpen);
  const dialogId = generateId('modal');
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-desc`;

  return {
    get open() {
      return open;
    },
    get dialogId() {
      return dialogId;
    },
    get titleId() {
      return titleId;
    },
    get descriptionId() {
      return descriptionId;
    },
    openModal() {
      open = true;
    },
    closeModal() {
      open = false;
    },
    toggleModal() {
      open = !open;
    }
  };
}
