<script lang="ts">
  import { Dropdown } from '@sve-ui/dropdown';

  let lastAction = $state('');
</script>

<svelte:head>
  <title>Dropdown — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Dropdown</h1>
    <p class="text-slate-400">Menu with role="menu", keyboard navigation (↑↓ Enter Escape), and click-outside close.</p>
  </div>

  {#if lastAction}
    <div class="mb-6 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-300 text-sm font-mono">
      Selected: {lastAction}
    </div>
  {/if}

  <section class="mb-12 flex flex-wrap gap-6 items-start">
    <!-- Basic Dropdown -->
    <Dropdown.Root>
      <Dropdown.Trigger class="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
        Actions
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </Dropdown.Trigger>
      <Dropdown.Content class="absolute z-50 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-xl shadow-xl py-1 overflow-hidden">
        <Dropdown.Item
          onSelect={() => lastAction = 'Edit'}
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors data-[active]:bg-slate-700"
        >
          ✏️ Edit
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() => lastAction = 'Duplicate'}
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors data-[active]:bg-slate-700"
        >
          📋 Duplicate
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={() => lastAction = 'Archive'}
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors data-[active]:bg-slate-700"
        >
          📦 Archive
        </Dropdown.Item>
        <div class="my-1 border-t border-slate-700"></div>
        <Dropdown.Item
          onSelect={() => lastAction = 'Delete'}
          class="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer transition-colors"
        >
          🗑️ Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>

    <!-- Status Dropdown -->
    <Dropdown.Root>
      <Dropdown.Trigger class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-300"></span>
        Status
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </Dropdown.Trigger>
      <Dropdown.Content class="absolute z-50 mt-2 w-40 bg-slate-800 border border-slate-600 rounded-xl shadow-xl py-1">
        {#each [
          { label: 'Active', color: 'bg-emerald-400' },
          { label: 'Paused', color: 'bg-yellow-400' },
          { label: 'Archived', color: 'bg-slate-400' },
          { label: 'Deleted', color: 'bg-red-400' }
        ] as status}
          <Dropdown.Item
            onSelect={() => lastAction = status.label}
            class="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors"
          >
            <span class="w-2 h-2 rounded-full {status.color}"></span>
            {status.label}
          </Dropdown.Item>
        {/each}
      </Dropdown.Content>
    </Dropdown.Root>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import { Dropdown } from '@sve-ui/dropdown';
<\/script>

<Dropdown.Root>
  <Dropdown.Trigger class="...">Options</Dropdown.Trigger>
  <Dropdown.Content class="...">
    <Dropdown.Item onSelect={() => console.log('Edit')}>
      Edit
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>`}</pre>
  </section>
</div>
