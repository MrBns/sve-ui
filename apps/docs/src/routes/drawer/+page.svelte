<script lang="ts">
  import Drawer from '@sve-ui/drawer';
  import type { DrawerSide } from '@sve-ui/drawer';

  const sides: DrawerSide[] = ['left', 'right', 'top', 'bottom'];
  const colors: Record<DrawerSide, string> = {
    left: 'bg-indigo-600 hover:bg-indigo-500',
    right: 'bg-purple-600 hover:bg-purple-500',
    top: 'bg-teal-600 hover:bg-teal-500',
    bottom: 'bg-rose-600 hover:bg-rose-500'
  };
  const labels: Record<DrawerSide, string> = {
    left: '← Left',
    right: 'Right →',
    top: '↑ Top',
    bottom: '↓ Bottom'
  };
  const panelClass: Record<DrawerSide, string> = {
    left: 'fixed left-0 top-0 h-full w-80 border-r',
    right: 'fixed right-0 top-0 h-full w-80 border-l',
    top: 'fixed top-0 left-0 w-full h-64 border-b',
    bottom: 'fixed bottom-0 left-0 w-full h-64 border-t'
  };

  // External bind:open example
  let navOpen = $state(false);
</script>

<svelte:head>
  <title>Drawer — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Drawer</h1>
    <p class="text-slate-400">Side panel overlay. Use <code class="text-indigo-300">bind:open</code> or the inline <code class="text-indigo-300">{'{#snippet trigger}'}</code>.</p>
  </div>

  <!-- Inline trigger snippets (4 sides) -->
  <section class="mb-10">
    <h2 class="text-sm font-semibold text-slate-400 mb-4 font-mono">Inline trigger snippet — 4 sides</h2>
    <div class="flex flex-wrap gap-4">
      {#each sides as side}
        <Drawer
          {side}
          title="{side.charAt(0).toUpperCase() + side.slice(1)} Drawer"
          overlayClass="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          class="bg-slate-800 border-slate-600 shadow-2xl z-50 {panelClass[side]}"
        >
          {#snippet trigger({ toggle })}
            <button class="px-5 py-2.5 {colors[side]} text-white rounded-xl font-medium transition-colors">
              {labels[side]}
            </button>
          {/snippet}
          <div class="p-5">
            <p class="text-slate-300 text-sm mb-4">
              Slides in from the <strong class="text-white">{side}</strong>. Press Escape or click overlay to close.
            </p>
            <nav class="space-y-1">
              {#each ['Dashboard', 'Projects', 'Team', 'Settings'] as item}
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
        </Drawer>
      {/each}
    </div>
  </section>

  <!-- bind:open (external trigger) -->
  <section class="mb-12">
    <h2 class="text-sm font-semibold text-slate-400 mb-4 font-mono">bind:open — external trigger</h2>
    <button
      class="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
      onclick={() => navOpen = true}
    >
      ☰ Open Nav Drawer
    </button>
    <Drawer
      bind:open={navOpen}
      side="left"
      title="Navigation"
      overlayClass="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      class="fixed bg-slate-800 border-r border-slate-600 shadow-2xl z-50 left-0 top-0 h-full w-72"
    >
      <div class="p-5">
        <nav class="space-y-1">
          {#each ['Home', 'Products', 'Pricing', 'About', 'Contact'] as item}
            <a
              href="#"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm"
              onclick={(e) => e.preventDefault()}
            >
              {item}
            </a>
          {/each}
        </nav>
      </div>
    </Drawer>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import Drawer from '@sve-ui/drawer';
  let open = $state(false);
<\/script>

<!-- 1️⃣ bind:open — trigger lives outside -->
<button onclick={() => open = true}>Open Drawer</button>
<Drawer bind:open side="left" title="Nav" overlayClass="..." class="...">
  <nav>...</nav>
</Drawer>

<!-- 2️⃣ Inline trigger snippet — self-contained -->
<Drawer side="right" title="Settings" overlayClass="..." class="...">
  {#snippet trigger({ toggle })}
    <button onclick={toggle}>⚙ Settings</button>
  {/snippet}
  <p>Settings content here</p>
</Drawer>`}</pre>
  </section>
</div>
