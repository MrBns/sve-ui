<script lang="ts">
  import { Drawer } from '@sve-ui/drawer';
</script>

<svelte:head>
  <title>Drawer — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Drawer</h1>
    <p class="text-slate-400">Side panel overlay with focus trap and 4 placement options.</p>
  </div>

  <section class="mb-12 flex flex-wrap gap-4">
    {#each [
      { side: 'left', label: '← Left', color: 'bg-indigo-600 hover:bg-indigo-500' },
      { side: 'right', label: 'Right →', color: 'bg-purple-600 hover:bg-purple-500' },
      { side: 'top', label: '↑ Top', color: 'bg-teal-600 hover:bg-teal-500' },
      { side: 'bottom', label: '↓ Bottom', color: 'bg-rose-600 hover:bg-rose-500' }
    ] as config}
      <Drawer.Root side={config.side as 'left' | 'right' | 'top' | 'bottom'}>
        <Drawer.Trigger class="px-5 py-2.5 {config.color} text-white rounded-xl font-medium transition-colors">
          {config.label}
        </Drawer.Trigger>
        <Drawer.Content
          overlayClass="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          class="fixed bg-slate-800 border-slate-600 shadow-2xl z-50
            {config.side === 'left' ? 'left-0 top-0 h-full w-80 border-r' : ''}
            {config.side === 'right' ? 'right-0 top-0 h-full w-80 border-l' : ''}
            {config.side === 'top' ? 'top-0 left-0 w-full h-64 border-b' : ''}
            {config.side === 'bottom' ? 'bottom-0 left-0 w-full h-64 border-t' : ''}
          "
        >
          <div class="flex items-center justify-between p-5 border-b border-slate-700">
            <Drawer.Title class="text-lg font-semibold text-white capitalize">{config.side} Drawer</Drawer.Title>
            <Drawer.Close class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </Drawer.Close>
          </div>
          <div class="p-5">
            <p class="text-slate-300 text-sm mb-4">
              This drawer slides in from the <strong class="text-white">{config.side}</strong>.
              Press Escape or click the overlay to close.
            </p>
            <nav class="space-y-1">
              {#each ['Dashboard', 'Projects', 'Team', 'Settings', 'Help'] as item}
                <a
                  href="#"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
                  onclick={(e) => e.preventDefault()}
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  {item}
                </a>
              {/each}
            </nav>
          </div>
        </Drawer.Content>
      </Drawer.Root>
    {/each}
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import { Drawer } from '@sve-ui/drawer';
<\/script>

<Drawer.Root side="left">
  <Drawer.Trigger class="...">Open Drawer</Drawer.Trigger>
  <Drawer.Content overlayClass="..." class="...">
    <Drawer.Title>Navigation</Drawer.Title>
    <Drawer.Close>×</Drawer.Close>
    Drawer content here
  </Drawer.Content>
</Drawer.Root>`}</pre>
  </section>
</div>
