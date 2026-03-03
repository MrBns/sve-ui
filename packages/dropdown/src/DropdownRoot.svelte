<script lang="ts">
  import { setContext } from 'svelte';
  import { clickOutside } from '@sve-ui/shared';
  import { createDropdownState, type DropdownState } from './dropdown.svelte.js';

  interface DropdownRootProps {
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: DropdownRootProps = $props();

  const state = createDropdownState();
  setContext<DropdownState>('dropdown', state);
</script>

<div
  class={className}
  {...restProps}
  use:clickOutside={state.closeMenu}
  data-dropdown-root
  style="position: relative;"
>
  {@render children?.()}
</div>
