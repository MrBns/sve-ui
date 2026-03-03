<script lang="ts">
  import { Accordion } from '@sve-ui/accordion';
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

  <!-- Single Mode -->
  <section class="mb-12">
    <h2 class="text-lg font-semibold text-indigo-300 mb-4 font-mono">type="single"</h2>
    <Accordion.Root type="single" class="space-y-2">
      {#each [
        { value: 'item-1', title: 'What is sve-ui?', content: 'sve-ui is a headless, unstyled Svelte 5 component library. Components provide logic, state management, and accessibility without any opinionated CSS.' },
        { value: 'item-2', title: 'How does headless work?', content: 'Headless means the component handles all the logic and accessibility, but you bring your own styles. You can use Tailwind, CSS Modules, or plain CSS.' },
        { value: 'item-3', title: 'What are Svelte 5 Runes?', content: 'Runes are Svelte 5\'s new reactivity primitives: $state for reactive variables, $props for component props, $derived for computed values, and $effect for side effects.' }
      ] as item}
        <Accordion.Item value={item.value} class="border border-slate-700 rounded-xl overflow-hidden">
          <Accordion.Trigger class="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:bg-slate-700/50 transition-colors font-medium [&[aria-expanded='true']]:text-indigo-300">
            {item.title}
            <svg
              class="w-4 h-4 text-slate-400 transition-transform [[aria-expanded='true']_&]:rotate-180"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </Accordion.Trigger>
          <Accordion.Content class="px-5 pb-4 text-slate-300 text-sm leading-relaxed border-t border-slate-700/50">
            <div class="pt-3">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </section>

  <!-- Multiple Mode -->
  <section class="mb-12">
    <h2 class="text-lg font-semibold text-indigo-300 mb-4 font-mono">type="multiple"</h2>
    <Accordion.Root type="multiple" defaultValue={['q1']} class="space-y-2">
      {#each [
        { value: 'q1', title: '🚀 Installation', content: 'Run: bun add @sve-ui/accordion svelte' },
        { value: 'q2', title: '📖 Basic Usage', content: 'Import { Accordion } from "@sve-ui/accordion" and use the compound component API.' },
        { value: 'q3', title: '🎨 Styling', content: 'Use the data-state attribute to style open/closed states. E.g., [data-state="open"] { ... }' }
      ] as item}
        <Accordion.Item value={item.value} class="border border-slate-700 rounded-xl overflow-hidden">
          <Accordion.Trigger class="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:bg-slate-700/50 transition-colors font-medium">
            {item.title}
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
          </Accordion.Trigger>
          <Accordion.Content class="px-5 pb-4 text-slate-300 text-sm border-t border-slate-700/50">
            <div class="pt-3 font-mono text-green-300 bg-slate-900 rounded-lg p-3 mt-1">{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </section>

  <!-- Code Example -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import { Accordion } from '@sve-ui/accordion';
<\/script>

<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger class="...">
      Click to expand
    </Accordion.Trigger>
    <Accordion.Content class="...">
      Content goes here
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}</pre>
  </section>
</div>
