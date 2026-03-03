<script lang="ts">
  import { getContext } from 'svelte';
  import type { ModalState } from './modal.svelte.js';

  interface ModalTriggerProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: ModalTriggerProps = $props();

  const modal = getContext<ModalState>('modal');
</script>

<button
  class={className}
  {...restProps}
  aria-haspopup="dialog"
  aria-expanded={modal.open}
  aria-controls={modal.dialogId}
  data-modal-trigger
  onclick={modal.toggleModal}
  type="button"
>
  {@render children?.()}
</button>
