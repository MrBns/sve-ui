<script lang="ts">
  import { getContext } from 'svelte';
  import type { ModalState } from './modal.svelte.js';

  interface ModalTitleProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: ModalTitleProps = $props();

  const modal = getContext<ModalState>('modal');
</script>

<h2 class={className} {...restProps} id={modal.titleId} data-modal-title>
  {@render children?.()}
</h2>
