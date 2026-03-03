<script lang="ts">
  import { getContext } from 'svelte';
  import { focusTrap } from '@sve-ui/shared';
  import type { ModalState } from './modal.svelte.js';

  interface ModalContentProps {
    class?: string;
    overlayClass?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    overlayClass,
    children,
    ...restProps
  }: ModalContentProps = $props();

  const modal = getContext<ModalState>('modal');

  function handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      modal.closeModal();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      modal.closeModal();
    }
  }
</script>

{#if modal.open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={overlayClass}
    data-modal-overlay
    aria-hidden="true"
    onclick={handleOverlayClick}
    role="presentation"
  >
    <div
      use:focusTrap
      class={className}
      {...restProps}
      id={modal.dialogId}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modal.titleId}
      aria-describedby={modal.descriptionId}
      data-modal-content
      onkeydown={handleKeydown}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
