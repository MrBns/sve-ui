<script lang="ts">
  import { getContext } from 'svelte';
  import type { ModalState } from './modal.svelte.js';

  interface ModalCloseProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: ModalCloseProps = $props();

  const modal = getContext<ModalState>('modal');
</script>

<button
  class={className}
  {...restProps}
  data-modal-close
  onclick={modal.closeModal}
  aria-label="Close dialog"
  type="button"
>
  {@render children?.()}
</button>
