export { default as ModalRoot } from './ModalRoot.svelte';
export { default as ModalTrigger } from './ModalTrigger.svelte';
export { default as ModalContent } from './ModalContent.svelte';
export { default as ModalClose } from './ModalClose.svelte';
export { default as ModalTitle } from './ModalTitle.svelte';
export { default as ModalDescription } from './ModalDescription.svelte';
export { createModalState } from './modal.svelte.js';
export type { ModalState } from './modal.svelte.js';

import ModalRoot from './ModalRoot.svelte';
import ModalTrigger from './ModalTrigger.svelte';
import ModalContent from './ModalContent.svelte';
import ModalClose from './ModalClose.svelte';
import ModalTitle from './ModalTitle.svelte';
import ModalDescription from './ModalDescription.svelte';

/**
 * Modal namespace for compound component usage:
 * <Modal.Root>
 *   <Modal.Trigger>Open</Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Title>Title</Modal.Title>
 *     <Modal.Description>Description</Modal.Description>
 *     <Modal.Close>Close</Modal.Close>
 *   </Modal.Content>
 * </Modal.Root>
 */
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Close: ModalClose,
  Title: ModalTitle,
  Description: ModalDescription
};
