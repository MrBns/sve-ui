<script lang="ts">
  import Accordion, { AccordionItem } from '@sve-ui/accordion';
  import type { AccordionItemData } from '@sve-ui/accordion';

  const faqItems: AccordionItemData[] = [
    { value: 'item-1', title: 'What is sve-ui?', content: 'sve-ui is a headless, unstyled Svelte 5 component library. Components provide logic, state management, and accessibility without any opinionated CSS.' },
    { value: 'item-2', title: 'How does headless work?', content: 'Headless means the component handles all the logic and accessibility, but you bring your own styles. You can use Tailwind, CSS Modules, or plain CSS.' },
    { value: 'item-3', title: 'What are Svelte 5 Runes?', content: 'Runes are Svelte 5\'s new reactivity primitives: $state for reactive variables, $props for component props, $derived for computed values, and $effect for side effects.' }
  ];

  const installItems: AccordionItemData[] = [
    { value: 'install', title: '🚀 Installation', content: 'Run: bun add @sve-ui/accordion svelte' },
    { value: 'usage', title: '📖 Basic Usage', content: 'Import Accordion from "@sve-ui/accordion" and pass an items array or use AccordionItem children.' },
    { value: 'styling', title: '🎨 Styling', content: 'Use the data-state attribute: [data-state="open"] { ... } or Tailwind: data-[state=open]:text-indigo-400' }
  ];
</script>

<svelte:head>
  <title>Accordion — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Accordion</h1>
    <p class="text-slate-400">Collapsible sections with keyboard navigation and ARIA attributes.</p>
  </div>

  <!-- Data-driven mode (simplest) -->
  <section class="mb-12">
    <h2 class="text-lg font-semibold text-indigo-300 mb-1 font-mono">Data-driven — pass an <code>items</code> array</h2>
    <p class="text-sm text-slate-400 mb-4">No sub-components needed. Just pass your data.</p>
    <Accordion
      type="single"
      items={faqItems}
      class="space-y-2"
      itemClass="border border-slate-700 rounded-xl overflow-hidden"
      triggerClass="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:bg-slate-700/50 transition-colors font-medium"
      contentClass="px-5 pb-4 pt-3 text-slate-300 text-sm leading-relaxed border-t border-slate-700/50"
    />
  </section>

  <!-- Data-driven with custom trigger snippet -->
  <section class="mb-12">
    <h2 class="text-lg font-semibold text-indigo-300 mb-1 font-mono">Data-driven + <code>{'{#snippet trigger}'}</code></h2>
    <p class="text-sm text-slate-400 mb-4">Custom trigger HTML without needing sub-components.</p>
    <Accordion type="multiple" defaultValue={['install']} items={installItems} class="space-y-2">
      {#snippet trigger(item, isOpen)}
        <span class="flex items-center justify-between w-full">
          <span class="font-medium {isOpen ? 'text-indigo-300' : 'text-white'}">{item.title}</span>
          <svg
            class="w-4 h-4 text-slate-400 transition-transform {isOpen ? 'rotate-180' : ''}"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      {/snippet}
      {#snippet content(item)}
        <div class="pt-3 font-mono text-green-300 bg-slate-900 rounded-lg p-3">{item.content}</div>
      {/snippet}
    </Accordion>
  </section>

  <!-- AccordionItem children — for different content per item -->
  <section class="mb-12">
    <h2 class="text-lg font-semibold text-indigo-300 mb-1 font-mono">Children mode — <code>&lt;AccordionItem&gt;</code></h2>
    <p class="text-sm text-slate-400 mb-4">When each item needs unique HTML content (no <code>.Root</code> / <code>.Trigger</code> / <code>.Content</code> needed).</p>
    <Accordion type="single" class="space-y-2">
      <AccordionItem
        value="custom-1"
        title="Item with rich content"
        class="border border-slate-700 rounded-xl overflow-hidden"
        triggerClass="w-full px-5 py-4 text-left text-white hover:bg-slate-700/50 font-medium"
        contentClass="px-5 pb-4 border-t border-slate-700/50"
      >
        <div class="pt-3 flex items-center gap-3">
          <span class="text-2xl">🎉</span>
          <p class="text-slate-300 text-sm">Any <strong class="text-white">HTML</strong> can go here — forms, images, grids, you name it.</p>
        </div>
      </AccordionItem>

      <AccordionItem
        value="custom-2"
        class="border border-slate-700 rounded-xl overflow-hidden"
        triggerClass="w-full px-5 py-4 text-left text-white hover:bg-slate-700/50 font-medium"
        contentClass="px-5 pb-4 border-t border-slate-700/50"
      >
        {#snippet trigger(isOpen)}
          <span class="flex items-center gap-2">
            <span class="text-lg">{isOpen ? '📂' : '📁'}</span>
            Custom trigger snippet with icons
          </span>
        {/snippet}
        <p class="pt-3 text-slate-300 text-sm">The trigger slot receives <code class="text-indigo-300">isOpen: boolean</code> for animated icons etc.</p>
      </AccordionItem>
    </Accordion>
  </section>

  <!-- Code Example -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import Accordion, { AccordionItem } from '@sve-ui/accordion';
<\/script>

<!-- 1️⃣ Simplest: data-driven -->
<Accordion type="single" items={[
  { value: 'q1', title: 'Question', content: 'Answer' }
]} />

<!-- 2️⃣ Custom rendering via snippets -->
<Accordion type="single" {items}>
  {#snippet trigger(item, isOpen)}
    <span class:open={isOpen}>{item.title}</span>
  {/snippet}
  {#snippet content(item)}
    <p class="...">{item.content}</p>
  {/snippet}
</Accordion>

<!-- 3️⃣ Different HTML per item using AccordionItem -->
<Accordion type="single">
  <AccordionItem value="q1" title="Question 1">
    <p>Any HTML answer here</p>
  </AccordionItem>
  <AccordionItem value="q2">
    {#snippet trigger(isOpen)}
      {isOpen ? '▲' : '▼'} Custom trigger
    {/snippet}
    <form>...</form>
  </AccordionItem>
</Accordion>`}</pre>
  </section>
</div>
