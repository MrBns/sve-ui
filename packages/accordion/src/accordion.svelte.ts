/**
 * Lightweight accordion state using a reactive Set.
 * No item registration needed — any AccordionItem just reads
 * and writes through this shared state via Svelte context.
 */
export function createAccordionState(
  type: 'single' | 'multiple' = 'single',
  defaultValue?: string | string[]
) {
  const initial = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : [];

  let openSet = $state(new Set<string>(initial));

  return {
    get type() {
      return type;
    },
    isOpen(value: string): boolean {
      return openSet.has(value);
    },
    toggle(value: string): void {
      if (type === 'single') {
        openSet = openSet.has(value) ? new Set() : new Set([value]);
      } else {
        const next = new Set(openSet);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        openSet = next;
      }
    }
  };
}

export type AccordionState = ReturnType<typeof createAccordionState>;
