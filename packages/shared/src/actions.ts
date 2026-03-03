/**
 * Svelte action that calls a callback when a click occurs outside the element.
 */
export function clickOutside(
  node: HTMLElement,
  callback: (event: MouseEvent) => void
) {
  function handleClick(event: MouseEvent) {
    if (!node.contains(event.target as Node)) {
      callback(event);
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

/**
 * Svelte action that traps focus within the element.
 * Useful for modals, drawers, and other overlay components.
 */
export function focusTrap(node: HTMLElement) {
  const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'details > summary'
  ].join(', ');

  function getFocusableElements(): HTMLElement[] {
    return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  node.addEventListener('keydown', handleKeydown);

  // Focus the first focusable element on mount
  const firstFocusable = getFocusableElements()[0];
  firstFocusable?.focus();

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
    }
  };
}

/**
 * Svelte action that handles closing on Escape key press.
 */
export function escapeKey(node: HTMLElement, callback: () => void) {
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      callback();
    }
  }

  node.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
    }
  };
}
