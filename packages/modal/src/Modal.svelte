<script lang="ts">
  import type { Snippet } from 'svelte';
  import { focusTrap } from '@sve-ui/shared';
  import { generateId } from '@sve-ui/shared';

  interface TriggerContext {
    open: boolean;
    toggle: () => void;
  }

  interface ModalProps {
    /**
     * Two-way bindable open state.
     *
     * @example
     * <script>
     *   let open = $state(false);
     * <\/script>
     * <button onclick={() => open = true}>Open</button>
     * <Modal bind:open>...</Modal>
     */
    open?: boolean;
    /** Dialog title — rendered as an <h2> and wired to aria-labelledby. */
    title?: string;
    /** Short description — rendered as a <p> and wired to aria-describedby. */
    description?: string;
    /** CSS class for the dialog panel. */
    class?: string;
    /** CSS class for the backdrop overlay. */
    overlayClass?: string;
    /**
     * Inline trigger — receives `{ open, toggle }`.
     * Use this when you want the trigger to live inside this component.
     * Alternatively, manage `bind:open` externally.
     *
     * @example
     * <Modal title="Confirm">
     *   {#snippet trigger({ toggle })}
     *     <button onclick={toggle}>Open</button>
     *   {/snippet}
     *   <p>Are you sure?</p>
     * </Modal>
     */
    trigger?: Snippet<[TriggerContext]>;
    /** Replaces the default title/description header area. */
    header?: Snippet;
    /** Rendered below the main content. */
    footer?: Snippet;
    /** Main dialog body content. */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    title,
    description,
    class: className,
    overlayClass,
    trigger: triggerSnippet,
    header: headerSnippet,
    footer: footerSnippet,
    children,
    ...restProps
  }: ModalProps = $props();

  const titleId = generateId('modal-title');
  const descId = generateId('modal-desc');
  const dialogId = generateId('modal');

  function close() {
    open = false;
  }

  function toggle() {
    open = !open;
  }
</script>

<!-- Inline trigger (optional) -->
{#if triggerSnippet}
  {@render triggerSnippet({ open, toggle })}
{/if}

<!-- Dialog portal -->
{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={overlayClass}
    data-modal-overlay
    role="presentation"
    aria-hidden="true"
    onclick={(e) => e.target === e.currentTarget && close()}
  >
    <div
      use:focusTrap
      {...restProps}
      id={dialogId}
      class={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      data-modal-content
      onkeydown={(e) => e.key === 'Escape' && close()}
    >
      <!-- Header -->
      {#if headerSnippet}
        {@render headerSnippet()}
      {:else if title}
        <h2 id={titleId} data-modal-title>{title}</h2>
      {/if}

      <!-- Description -->
      {#if description}
        <p id={descId} data-modal-description>{description}</p>
      {/if}

      <!-- Body -->
      {@render children?.()}

      <!-- Footer -->
      {#if footerSnippet}
        {@render footerSnippet()}
      {/if}
    </div>
  </div>
{/if}
