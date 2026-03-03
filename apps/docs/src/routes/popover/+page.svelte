<script lang="ts">
  import Popover from '@sve-ui/popover';
</script>

<svelte:head>
  <title>Popover — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Popover</h1>
    <p class="text-slate-400">Floating panels with click-outside close and placement support. One component, no sub-components.</p>
  </div>

  <section class="mb-12 flex flex-wrap gap-6 items-start">
    <!-- Info Popover -->
    <Popover
      placement="bottom-start"
      class="w-72 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4"
    >
      {#snippet trigger()}
        <button class="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          Info
        </button>
      {/snippet}
      <h3 class="font-semibold text-white text-sm mb-2">About Popovers</h3>
      <p class="text-slate-300 text-sm leading-relaxed">
        One component. Pass a <code class="text-indigo-300">{'{#snippet trigger()}'}</code> and put your content in the default slot.
      </p>
      <div class="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span class="text-xs text-slate-400">Escape or click outside to close</span>
      </div>
    </Popover>

    <!-- User Card Popover -->
    <Popover
      placement="bottom"
      class="w-64 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl overflow-hidden"
    >
      {#snippet trigger()}
        <button class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-medium transition-colors">
          <div class="w-6 h-6 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-900 text-xs font-bold">U</div>
          Profile
        </button>
      {/snippet}
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 h-16"></div>
      <div class="px-4 pb-4 -mt-6">
        <div class="w-12 h-12 rounded-full bg-indigo-300 border-2 border-slate-800 flex items-center justify-center text-indigo-900 font-bold text-lg mb-2">U</div>
        <div class="font-semibold text-white">User Name</div>
        <div class="text-xs text-slate-400 mb-3">user@example.com</div>
        <div class="flex gap-2">
          <button class="flex-1 text-xs py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">View Profile</button>
          <button class="flex-1 text-xs py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Sign Out</button>
        </div>
      </div>
    </Popover>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import Popover from '@sve-ui/popover';
<\/script>

<Popover placement="bottom" class="...panel styles...">
  {#snippet trigger()}
    <button>Click me</button>
  {/snippet}

  <!-- Content goes here — any HTML -->
  <h3>Popover title</h3>
  <p>Some information here.</p>
</Popover>`}</pre>
  </section>
</div>
