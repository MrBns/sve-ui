<script lang="ts">
  const components = [
    {
      name: 'Accordion',
      href: '/accordion',
      description: 'Collapsible content sections with single or multiple open mode.',
      icon: '🗂️',
      badge: 'Accessible'
    },
    {
      name: 'Modal',
      href: '/modal',
      description: 'Focus-trapped dialog overlay with ARIA roles and keyboard dismiss.',
      icon: '🪟',
      badge: 'Focus Trap'
    },
    {
      name: 'Dropdown',
      href: '/dropdown',
      description: 'Keyboard-navigable menu with role="menu" and outside-click close.',
      icon: '📋',
      badge: 'Keyboard Nav'
    },
    {
      name: 'Popover',
      href: '/popover',
      description: 'Floating content panel with placement control and dismiss logic.',
      icon: '💬',
      badge: 'Placement'
    },
    {
      name: 'Drawer',
      href: '/drawer',
      description: 'Side panel overlay supporting left, right, top, and bottom positions.',
      icon: '📐',
      badge: '4 Sides'
    },
    {
      name: 'AutoComplete',
      href: '/auto-complete',
      description: 'Combobox with filtered options, keyboard navigation, and ARIA.',
      icon: '🔍',
      badge: 'Combobox'
    }
  ];
</script>

<svelte:head>
  <title>sve-ui — Headless Svelte 5 Components</title>
  <meta name="description" content="A headless, functional Svelte 5 UI component library built with Bun workspaces." />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden py-24 px-4">
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/50 pointer-events-none"></div>
  <div class="relative max-w-4xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
      <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
      Svelte 5 • Headless • Bun Workspaces
    </div>
    <h1 class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
      sve-ui
    </h1>
    <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
      A headless, accessible Svelte 5 component library. Zero styles. Full control.
      Built with Runes, Snippets, and Bun workspaces.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <a
        href="/accordion"
        class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
      >
        Explore Components
      </a>
      <a
        href="https://github.com/MrBns/sve-ui"
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
      >
        View on GitHub
      </a>
    </div>
  </div>
</section>

<!-- Features -->
<section class="py-16 px-4 border-t border-slate-800">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {#each [
        { icon: '🎨', title: 'Headless', desc: 'Zero opinions on styles' },
        { icon: '♿', title: 'Accessible', desc: 'ARIA & keyboard nav built-in' },
        { icon: '⚡', title: 'Svelte 5', desc: 'Runes & Snippets API' },
        { icon: '📦', title: 'Modular', desc: 'Install only what you need' }
      ] as feature}
        <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
          <div class="text-3xl mb-2">{feature.icon}</div>
          <div class="font-semibold text-white text-sm">{feature.title}</div>
          <div class="text-xs text-slate-400 mt-1">{feature.desc}</div>
        </div>
      {/each}
    </div>

    <!-- Components Grid -->
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Components</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each components as comp}
        <a
          href={comp.href}
          class="group bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5"
        >
          <div class="flex items-start justify-between mb-3">
            <span class="text-3xl">{comp.icon}</span>
            <span class="text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono">
              {comp.badge}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
            {comp.name}
          </h3>
          <p class="text-sm text-slate-400">{comp.description}</p>
          <div class="mt-4 flex items-center gap-1 text-xs text-indigo-400 font-medium">
            View docs
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Quick Install -->
<section class="py-16 px-4 border-t border-slate-800">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-10 text-white">Quick Start</h2>
    <div class="space-y-4">
      {#each [
        { label: 'Install a package', code: 'bun add @sve-ui/accordion' },
        { label: 'Import components', code: "import Accordion from '@sve-ui/accordion';" },
        { label: 'Use in your template', code: '<!-- Simplest: data-driven -->\n<Accordion\n  type="single"\n  items={[\n    { value: \'q1\', title: \'Question\', content: \'Answer\' }\n  ]}\n/>\n\n<!-- Custom rendering with snippets -->\n<Accordion type="single" {items}>\n  {#snippet trigger(item, isOpen)}\n    <span class:open={isOpen}>{item.title}</span>\n  {/snippet}\n</Accordion>' }
      ] as step, i}
        <div class="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
          <div class="flex items-center gap-3 px-4 py-2 border-b border-slate-700 bg-slate-900/50">
            <span class="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
            <span class="text-sm text-slate-400">{step.label}</span>
          </div>
          <pre class="p-4 text-sm text-green-300 font-mono overflow-x-auto">{step.code}</pre>
        </div>
      {/each}
    </div>
  </div>
</section>
