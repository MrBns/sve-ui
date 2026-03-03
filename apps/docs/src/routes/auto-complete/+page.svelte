<script lang="ts">
  import AutoComplete from '@sve-ui/auto-complete';
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

  // bind:value holds the selected value
  let selectedFramework = $state<string | null>(null);
  let selectedCountry = $state<string | null>(null);
</script>

<svelte:head>
  <title>AutoComplete — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">AutoComplete</h1>
    <p class="text-slate-400">Single component. Pass <code class="text-indigo-300">options</code>, use <code class="text-indigo-300">bind:value</code>. Optional custom rendering via <code class="text-indigo-300">{'{#snippet option}'}</code>.</p>
  </div>

  <section class="mb-12 grid md:grid-cols-2 gap-8">
    <!-- Default rendering -->
    <div>
      <label class="block text-sm font-medium text-slate-300 mb-2">
        Framework
        {#if selectedFramework}
          <span class="text-indigo-300 font-mono ml-2">= {selectedFramework}</span>
        {/if}
      </label>
      <AutoComplete
        options={frameworks}
        bind:value={selectedFramework}
        placeholder="Type to search..."
        class="relative"
        inputClass="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        listClass="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden py-1 max-h-48 overflow-y-auto"
        optionClass="px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors data-[active]:bg-indigo-600 data-[active]:text-white"
      />
    </div>

    <!-- Custom option snippet -->
    <div>
      <label class="block text-sm font-medium text-slate-300 mb-2">
        Country
        {#if selectedCountry}
          <span class="text-emerald-300 font-mono ml-2">= {selectedCountry}</span>
        {/if}
      </label>
      <AutoComplete
        options={countries}
        bind:value={selectedCountry}
        placeholder="Search country..."
        class="relative"
        inputClass="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        listClass="absolute top-full mt-1 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden py-1"
      >
        {#snippet option(opt, isActive, isSelected)}
          <div class="px-4 py-2.5 flex items-center gap-2 cursor-pointer transition-colors
            {isActive ? 'bg-emerald-600 text-white' : 'text-slate-200 hover:bg-slate-700'}">
            <span>🌍</span>
            <span>{opt.label}</span>
            {#if isSelected}<span class="ml-auto text-xs">✓</span>{/if}
          </div>
        {/snippet}
      </AutoComplete>
    </div>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import AutoComplete from '@sve-ui/auto-complete';

  const options = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
  ];
  let selected = $state(null);
<\/script>

<!-- 1️⃣ Default rendering -->
<AutoComplete {options} bind:value={selected} placeholder="Search..." />

<!-- 2️⃣ Custom option snippet -->
<AutoComplete {options} bind:value={selected}>
  {#snippet option(opt, isActive, isSelected)}
    <div class:active={isActive}>
      {opt.label} {#if isSelected}✓{/if}
    </div>
  {/snippet}
</AutoComplete>`}</pre>
  </section>
</div>
