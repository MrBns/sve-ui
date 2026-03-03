<script lang="ts">
  import '../app.css';

  interface LayoutProps {
    children?: import('svelte').Snippet;
  }

  let { children }: LayoutProps = $props();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/accordion', label: 'Accordion' },
    { href: '/modal', label: 'Modal' },
    { href: '/dropdown', label: 'Dropdown' },
    { href: '/popover', label: 'Popover' },
    { href: '/drawer', label: 'Drawer' },
    { href: '/auto-complete', label: 'AutoComplete' }
  ];
</script>

<div class="min-h-screen flex flex-col">
  <header class="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2">
        <span class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          sve-ui
        </span>
        <span class="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded-full">v0.0.1</span>
      </a>
      <nav class="hidden md:flex items-center gap-1">
        {#each navItems as item}
          <a
            href={item.href}
            class="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            {item.label}
          </a>
        {/each}
      </nav>
      <a
        href="https://github.com/MrBns/sve-ui"
        target="_blank"
        rel="noopener noreferrer"
        class="text-slate-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </a>
    </div>
  </header>

  <main class="flex-1">
    {@render children?.()}
  </main>

  <footer class="border-t border-slate-700 py-8 text-center text-slate-400 text-sm">
    <p>Built with ❤️ using Svelte 5 + Bun • <span class="text-indigo-400">sve-ui</span></p>
  </footer>
</div>
