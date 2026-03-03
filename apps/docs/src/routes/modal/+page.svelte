<script lang="ts">
  import Modal from '@sve-ui/modal';

  // External bind:open pattern
  let basicOpen = $state(false);
  let dangerOpen = $state(false);
</script>

<svelte:head>
  <title>Modal — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Modal</h1>
    <p class="text-slate-400">Focus-trapped dialog. Press Escape or click overlay to close.</p>
  </div>

  <section class="mb-12 flex flex-wrap gap-4">
    <!-- Pattern 1: bind:open (external trigger) -->
    <div>
      <p class="text-xs text-slate-400 mb-2 font-mono">bind:open + external trigger</p>
      <button
        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
        onclick={() => basicOpen = true}
      >
        Open Modal
      </button>
      <Modal
        bind:open={basicOpen}
        title="Modal Title"
        description="This dialog uses bind:open. Focus is trapped inside. Press Escape or click outside to dismiss."
        overlayClass="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        class="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div class="px-6 pb-6">
          {#snippet footer()}
            <div class="flex gap-3 justify-end pt-2 border-t border-slate-700">
              <button
                class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                onclick={() => basicOpen = false}
              >
                Cancel
              </button>
              <button
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg font-medium transition-colors"
                onclick={() => basicOpen = false}
              >
                Confirm
              </button>
            </div>
          {/snippet}
        </div>
      </Modal>
    </div>

    <!-- Pattern 2: inline trigger snippet -->
    <div>
      <p class="text-xs text-slate-400 mb-2 font-mono">{'{#snippet trigger}'} (inline)</p>
      <Modal
        title="Confirm Delete"
        description="This action cannot be undone. Are you sure?"
        overlayClass="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        class="bg-slate-800 border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-sm p-6"
      >
        {#snippet trigger({ toggle })}
          <button
            class="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors"
            onclick={toggle}
          >
            Delete Item
          </button>
        {/snippet}
        <div class="text-4xl mb-4 text-center mt-2">⚠️</div>
        {#snippet footer()}
          <div class="flex gap-3 mt-4">
            <button class="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
              Cancel
            </button>
            <button class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg font-medium transition-colors">
              Delete
            </button>
          </div>
        {/snippet}
      </Modal>
    </div>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import Modal from '@sve-ui/modal';
  let open = $state(false);
<\/script>

<!-- 1️⃣ bind:open — trigger lives outside -->
<button onclick={() => open = true}>Open</button>
<Modal bind:open title="My Dialog" overlayClass="..." class="...">
  <p>Modal body</p>
  {#snippet footer()}
    <button onclick={() => open = false}>Close</button>
  {/snippet}
</Modal>

<!-- 2️⃣ Inline trigger snippet — self-contained -->
<Modal title="Confirm" overlayClass="..." class="...">
  {#snippet trigger({ toggle })}
    <button onclick={toggle}>Open</button>
  {/snippet}
  <p>Modal body</p>
</Modal>`}</pre>
  </section>
</div>
