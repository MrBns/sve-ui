<script lang="ts">
  import { AutoComplete } from '@sve-ui/auto-complete';
  import type { AutoCompleteOption } from '@sve-ui/auto-complete';

  const frameworks: AutoCompleteOption[] = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'astro', label: 'Astro' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'remix', label: 'Remix' }
  ];

  const countries: AutoCompleteOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' }
  ];

  let selectedFramework = $state('');
  let selectedCountry = $state('');
</script>

<svelte:head>
  <title>AutoComplete — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">AutoComplete</h1>
    <p class="text-slate-400">Combobox with filtered options, keyboard navigation (↑↓ Enter Escape), and ARIA.</p>
  </div>

  <section class="mb-12 grid md:grid-cols-2 gap-8">
    <!-- Framework Search -->
    <div>
      <label class="block text-sm font-medium text-slate-300 mb-2">Search Framework</label>
      {#if selectedFramework}
        <p class="mb-2 text-xs text-indigo-300 font-mono">Selected: {selectedFramework}</p>
      {/if}
      <AutoComplete.Root
        options={frameworks}
        onSelect={(v) => selectedFramework = v}
        class="relative"
      >
        <AutoComplete.Input
          placeholder="Type to search..."
          class="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <AutoComplete.List class="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden py-1 max-h-48 overflow-y-auto">
          {#each frameworks as option, i}
            <AutoComplete.Item
              {option}
              index={i}
              class="px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors data-[active]:bg-indigo-600 data-[active]:text-white data-[selected]:text-indigo-300"
            />
          {/each}
        </AutoComplete.List>
      </AutoComplete.Root>
    </div>

    <!-- Country Search -->
    <div>
      <label class="block text-sm font-medium text-slate-300 mb-2">Search Country</label>
      {#if selectedCountry}
        <p class="mb-2 text-xs text-emerald-300 font-mono">Selected: {selectedCountry}</p>
      {/if}
      <AutoComplete.Root
        options={countries}
        onSelect={(v) => selectedCountry = v}
        class="relative"
      >
        <AutoComplete.Input
          placeholder="Search country..."
          class="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        />
        <AutoComplete.List class="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden py-1">
          {#each countries as option, i}
            <AutoComplete.Item
              {option}
              index={i}
              class="px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors data-[active]:bg-emerald-600 data-[active]:text-white"
            >
              {#snippet children({ option: opt })}
                <span>🌍 {opt.label}</span>
              {/snippet}
            </AutoComplete.Item>
          {/each}
        </AutoComplete.List>
      </AutoComplete.Root>
    </div>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import { AutoComplete } from '@sve-ui/auto-complete';

  const options = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
  ];
<\/script>

<AutoComplete.Root {options} onSelect={(v) => console.log(v)}>
  <AutoComplete.Input placeholder="Search..." />
  <AutoComplete.List>
    {#each options as option, i}
      <AutoComplete.Item {option} index={i} />
    {/each}
  </AutoComplete.List>
</AutoComplete.Root>`}</pre>
  </section>
</div>
