<script lang="ts">
  import { Modal } from '@sve-ui/modal';
</script>

<svelte:head>
  <title>Modal — sve-ui</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <div class="mb-10">
    <a href="/" class="text-sm text-slate-400 hover:text-white transition-colors">← Back</a>
    <h1 class="text-4xl font-bold text-white mt-4 mb-2">Modal</h1>
    <p class="text-slate-400">Focus-trapped dialog with ARIA roles. Press Escape or click overlay to close.</p>
  </div>

  <!-- Demo -->
  <section class="mb-12 flex flex-wrap gap-4">
    <!-- Basic Modal -->
    <Modal.Root>
      <Modal.Trigger class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors">
        Open Modal
      </Modal.Trigger>
      <Modal.Content
        overlayClass="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        class="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <Modal.Title class="text-xl font-semibold text-white">Modal Title</Modal.Title>
            <Modal.Close class="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </Modal.Close>
          </div>
          <Modal.Description class="text-slate-300 text-sm leading-relaxed mb-6">
            This is a headless modal. Focus is trapped inside. Press Escape or click outside to dismiss.
          </Modal.Description>
          <div class="flex gap-3 justify-end">
            <Modal.Close class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
              Cancel
            </Modal.Close>
            <Modal.Close class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg font-medium transition-colors">
              Confirm
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>

    <!-- Danger Modal -->
    <Modal.Root>
      <Modal.Trigger class="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors">
        Delete Item
      </Modal.Trigger>
      <Modal.Content
        overlayClass="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        class="bg-slate-800 border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <div class="p-6">
          <div class="text-4xl mb-4 text-center">⚠️</div>
          <Modal.Title class="text-lg font-semibold text-white text-center mb-2">Confirm Delete</Modal.Title>
          <Modal.Description class="text-slate-400 text-sm text-center mb-6">
            This action cannot be undone. Are you sure?
          </Modal.Description>
          <div class="flex gap-3">
            <Modal.Close class="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
              Cancel
            </Modal.Close>
            <Modal.Close class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg font-medium transition-colors">
              Delete
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  </section>

  <!-- Code -->
  <section>
    <h2 class="text-lg font-semibold text-slate-300 mb-3">Usage</h2>
    <pre class="bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto">{`<script lang="ts">
  import { Modal } from '@sve-ui/modal';
<\/script>

<Modal.Root>
  <Modal.Trigger class="...">Open</Modal.Trigger>
  <Modal.Content overlayClass="..." class="...">
    <Modal.Title>Title</Modal.Title>
    <Modal.Description>Description</Modal.Description>
    <Modal.Close>Close</Modal.Close>
  </Modal.Content>
</Modal.Root>`}</pre>
  </section>
</div>
