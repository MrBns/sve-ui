<script lang="ts">
  import Dropdown, { DropdownItem } from '@sve-ui/dropdown';
  import type { DropdownItemData } from '@sve-ui/dropdown';

  let lastAction = $state('');

  const actionItems: DropdownItemData[] = [
    { label: '✏️ Edit', onSelect: () => lastAction = 'Edit' },
    { label: '📋 Duplicate', onSelect: () => lastAction = 'Duplicate' },
    { label: '📦 Archive', onSelect: () => lastAction = 'Archive' },
    { separator: true, label: '' },
    { label: '🗑️ Delete', onSelect: () => lastAction = 'Delete' }
  ];

  const statusItems: DropdownItemData[] = [
    { label: 'Active', value: 'active', onSelect: () => lastAction = 'Active' },
    { label: 'Paused', value: 'paused', onSelect: () => lastAction = 'Paused' },
    { label: 'Archived', value: 'archived', onSelect: () => lastAction = 'Archived' },
    { label: 'Deleted (disabled)', value: 'deleted', disabled: true }
  ];
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
    <!-- Data-driven mode -->
    <div>
      <p class="text-xs text-slate-400 mb-2 font-mono">Data-driven with <code>items</code> array</p>
      <Dropdown
        items={actionItems}
        contentClass="absolute z-50 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-xl shadow-xl py-1"
        itemClass="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors data-[active]:bg-slate-700"
      >
        {#snippet trigger()}
          <span class="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors cursor-pointer">
            Actions
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </span>
        {/snippet}
      </Dropdown>
    </div>

    <!-- Children mode (DropdownItem) -->
    <div>
      <p class="text-xs text-slate-400 mb-2 font-mono"><code>&lt;DropdownItem&gt;</code> children</p>
      <Dropdown contentClass="absolute z-50 mt-2 w-40 bg-slate-800 border border-slate-600 rounded-xl shadow-xl py-1">
        {#snippet trigger()}
          <span class="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors cursor-pointer">
            <span class="w-2 h-2 rounded-full bg-emerald-300"></span>
            Status
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </span>
        {/snippet}
        {#each statusItems as s}
          <DropdownItem
            disabled={s.disabled}
            onSelect={s.onSelect}
            class="px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors aria-disabled:opacity-40 aria-disabled:cursor-not-allowed"
          >
            {s.label}
          </DropdownItem>
        {/each}
      </Dropdown>
    </div>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import Dropdown, { DropdownItem } from '@sve-ui/dropdown';
<\/script>

<!-- 1️⃣ Data-driven — just pass items -->
<Dropdown items={[
  { label: 'Edit', onSelect: () => {} },
  { label: 'Delete', onSelect: () => {} }
]} contentClass="...">
  {#snippet trigger()}
    <button>Actions ▾</button>
  {/snippet}
</Dropdown>

<!-- 2️⃣ Children — render DropdownItem manually -->
<Dropdown contentClass="...">
  {#snippet trigger()}
    <button>Options ▾</button>
  {/snippet}
  <DropdownItem onSelect={edit}>✏️ Edit</DropdownItem>
  <DropdownItem onSelect={del}>🗑️ Delete</DropdownItem>
</Dropdown>`}</pre>
  </section>
</div>
