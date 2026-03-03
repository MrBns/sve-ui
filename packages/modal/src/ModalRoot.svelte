<script lang="ts">
  import { setContext } from 'svelte';
  import { createModalState, type ModalState } from './modal.svelte.js';

  interface ModalRootProps {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let {
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    class: className,
    children,
    ...restProps
  }: ModalRootProps = $props();

  const state = createModalState(controlledOpen ?? defaultOpen);

  $effect(() => {
    if (controlledOpen !== undefined) {
      if (controlledOpen) state.openModal();
      else state.closeModal();
    }
  });

  $effect(() => {
    onOpenChange?.(state.open);
  });

  setContext<ModalState>('modal', state);
</script>

<div class={className} {...restProps}>
  {@render children?.()}
</div>
