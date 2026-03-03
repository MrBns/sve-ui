export { default as AccordionRoot } from './AccordionRoot.svelte';
export { default as AccordionItem } from './AccordionItem.svelte';
export { default as AccordionTrigger } from './AccordionTrigger.svelte';
export { default as AccordionContent } from './AccordionContent.svelte';
export { createAccordionState } from './accordion.svelte.js';
export type { AccordionState, AccordionItemState } from './accordion.svelte.js';

import AccordionRoot from './AccordionRoot.svelte';
import AccordionItem from './AccordionItem.svelte';
import AccordionTrigger from './AccordionTrigger.svelte';
import AccordionContent from './AccordionContent.svelte';

/**
 * Accordion namespace for compound component usage:
 * <Accordion.Root>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Title</Accordion.Trigger>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
};
