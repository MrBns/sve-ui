<script lang="ts">
  import { getContext } from 'svelte';
  import type { ModalState } from './modal.svelte.js';

  interface ModalDescriptionProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: ModalDescriptionProps = $props();

  const modal = getContext<ModalState>('modal');
</script>

<p class={className} {...restProps} id={modal.descriptionId} data-modal-description>
  {@render children?.()}
</p>
