<div align="center">
  <h1>
    <span>🎯 sve-ui</span>
  </h1>
  <p><strong>Headless, accessible Svelte 5 UI component library</strong></p>
  <p>
    Zero styles · Full control · Built with Runes, Snippets & Bun workspaces
  </p>

  <p>
    <img alt="Svelte 5" src="https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white"/>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white"/>
    <img alt="Bun" src="https://img.shields.io/badge/Bun-workspaces-fbf0df?logo=bun&logoColor=black"/>
    <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-green"/>
  </p>
</div>

---

## ✨ What is sve-ui?

**sve-ui** is a collection of **headless, unstyled Svelte 5 components**. They provide logic, state management, and full accessibility (ARIA attributes, keyboard navigation, focus management) — **without any opinionated CSS**. You style them however you like.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **🎨 Headless & Unstyled** | Zero CSS opinions. Style with Tailwind, CSS Modules, or plain CSS. |
| **⚡ Svelte 5 Runes** | Uses `$state`, `$props`, `$effect`, `$derived` for reactive state. |
| **🧩 Composition** | Svelte 5 Snippets replace slots for flexible, type-safe composition. |
| **♿ Accessibility First** | ARIA attributes, keyboard navigation, and focus trapping built-in. |
| **📦 Modular** | Install only the packages you need. |

---

## 📦 Packages

| Package | Description | ARIA |
|---------|-------------|------|
| [`@sve-ui/accordion`](#accordion) | Collapsible content sections | `aria-expanded`, `role="region"` |
| [`@sve-ui/modal`](#modal) | Dialog overlay with focus trap | `role="dialog"`, `aria-modal` |
| [`@sve-ui/dropdown`](#dropdown) | Keyboard-navigable menu | `role="menu"`, `aria-haspopup` |
| [`@sve-ui/popover`](#popover) | Floating content panel | `role="dialog"`, `aria-expanded` |
| [`@sve-ui/drawer`](#drawer) | Side panel overlay (4 positions) | `role="dialog"`, `aria-modal` |
| [`@sve-ui/auto-complete`](#auto-complete) | Combobox with filtered options | `role="combobox"`, `aria-autocomplete` |
| [`@sve-ui/shared`](#shared) | Shared utilities & actions | — |

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0
- Svelte 5

### Installation

```bash
# Install a single package
bun add @sve-ui/accordion svelte

# Or install the whole set
bun add @sve-ui/accordion @sve-ui/modal @sve-ui/dropdown @sve-ui/popover @sve-ui/drawer @sve-ui/auto-complete
```

---

## 📖 Components

### Accordion

Accessible collapsible sections supporting `single` (one open at a time) and `multiple` modes.

```svelte
<script lang="ts">
  import { Accordion } from '@sve-ui/accordion';
</script>

<Accordion.Root type="single" defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger class="w-full flex justify-between px-4 py-3 font-medium">
      What is sve-ui?
      <span aria-hidden="true">↓</span>
    </Accordion.Trigger>
    <Accordion.Content class="px-4 pb-3 text-gray-600">
      A headless Svelte 5 component library.
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger class="w-full flex justify-between px-4 py-3 font-medium">
      How does it work?
    </Accordion.Trigger>
    <Accordion.Content class="px-4 pb-3 text-gray-600">
      Components handle logic and accessibility; you provide styles.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

**Props — `Accordion.Root`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Whether one or many items can be open |
| `defaultValue` | `string \| string[]` | — | Initially open item(s) |

**Data attributes** — `[data-state="open|closed"]`, `[data-disabled]`

---

### Modal

Accessible dialog with focus trapping, `role="dialog"`, `aria-modal`, and Escape-to-close.

```svelte
<script lang="ts">
  import { Modal } from '@sve-ui/modal';
</script>

<Modal.Root>
  <Modal.Trigger class="px-4 py-2 bg-blue-600 text-white rounded-lg">
    Open Dialog
  </Modal.Trigger>

  <Modal.Content
    overlayClass="fixed inset-0 bg-black/50 flex items-center justify-center"
    class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
  >
    <Modal.Title class="text-xl font-bold mb-2">Confirm Action</Modal.Title>
    <Modal.Description class="text-gray-500 mb-6">
      Are you sure you want to proceed?
    </Modal.Description>
    <div class="flex gap-3 justify-end">
      <Modal.Close class="px-4 py-2 border rounded-lg">Cancel</Modal.Close>
      <Modal.Close class="px-4 py-2 bg-blue-600 text-white rounded-lg">Confirm</Modal.Close>
    </div>
  </Modal.Content>
</Modal.Root>
```

**Props — `Modal.Root`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `false` | Initial open state |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes |

---

### Dropdown

Keyboard-navigable menu (`role="menu"`) with outside-click close. Navigate with ↑↓, select with Enter/Space.

```svelte
<script lang="ts">
  import { Dropdown } from '@sve-ui/dropdown';
</script>

<Dropdown.Root>
  <Dropdown.Trigger class="px-4 py-2 border rounded-lg flex items-center gap-2">
    Options ▼
  </Dropdown.Trigger>

  <Dropdown.Content class="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg py-1 z-50">
    <Dropdown.Item onSelect={() => console.log('edit')} class="px-4 py-2 hover:bg-gray-100">
      ✏️ Edit
    </Dropdown.Item>
    <Dropdown.Item onSelect={() => console.log('delete')} class="px-4 py-2 hover:bg-red-50 text-red-600">
      🗑️ Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>
```

---

### Popover

Floating content panel with placement support and click-outside close.

```svelte
<script lang="ts">
  import { Popover } from '@sve-ui/popover';
</script>

<Popover.Root placement="bottom-start">
  <Popover.Trigger class="px-4 py-2 border rounded-lg">
    More info ℹ️
  </Popover.Trigger>

  <Popover.Content class="w-64 bg-white border rounded-xl shadow-xl p-4 z-50">
    <div class="flex justify-between items-start mb-2">
      <strong>Popover Title</strong>
      <Popover.Close class="text-gray-400 hover:text-black">×</Popover.Close>
    </div>
    <p class="text-sm text-gray-600">Floating content with placement control.</p>
  </Popover.Content>
</Popover.Root>
```

**Placement values:** `top | bottom | left | right | top-start | top-end | bottom-start | bottom-end`

---

### Drawer

Side panel overlay supporting `left`, `right`, `top`, and `bottom` positions. Includes focus trapping and ARIA.

```svelte
<script lang="ts">
  import { Drawer } from '@sve-ui/drawer';
</script>

<Drawer.Root side="left">
  <Drawer.Trigger class="px-4 py-2 bg-gray-800 text-white rounded-lg">
    Open Drawer
  </Drawer.Trigger>

  <Drawer.Content
    overlayClass="fixed inset-0 bg-black/50 z-50"
    class="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6"
  >
    <div class="flex justify-between items-center mb-6">
      <Drawer.Title class="text-lg font-bold">Navigation</Drawer.Title>
      <Drawer.Close class="text-gray-400 hover:text-black">×</Drawer.Close>
    </div>
    <nav><!-- Navigation items --></nav>
  </Drawer.Content>
</Drawer.Root>
```

**Props — `Drawer.Root`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Panel position |
| `defaultOpen` | `boolean` | `false` | Initial open state |

---

### Auto-Complete

Combobox with filtered options, keyboard navigation (↑↓ Enter Escape), and ARIA combobox pattern.

```svelte
<script lang="ts">
  import { AutoComplete, type AutoCompleteOption } from '@sve-ui/auto-complete';

  const options: AutoCompleteOption[] = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ];
</script>

<AutoComplete.Root {options} onSelect={(v) => console.log('selected:', v)} class="relative">
  <AutoComplete.Input
    placeholder="Search frameworks..."
    class="w-full px-4 py-2 border rounded-lg"
  />
  <AutoComplete.List class="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50">
    {#each options as option, i}
      <AutoComplete.Item
        {option}
        index={i}
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer data-[active]:bg-blue-600 data-[active]:text-white"
      />
    {/each}
  </AutoComplete.List>
</AutoComplete.Root>
```

**Custom item rendering with Snippets:**

```svelte
<AutoComplete.Item {option} index={i}>
  {#snippet children({ option: opt, active, selected })}
    <span class:text-blue-600={selected}>
      {opt.label}
      {#if selected}✓{/if}
    </span>
  {/snippet}
</AutoComplete.Item>
```

---

### Shared

Utilities shared across all packages.

```ts
import { generateId, clickOutside, focusTrap, escapeKey } from '@sve-ui/shared';

// Generate a unique prefixed ID
const id = generateId('my-component'); // "my-component-1-x7k2m"

// Svelte action: close on outside click
<div use:clickOutside={() => close()}>...</div>

// Svelte action: trap focus inside element
<div use:focusTrap>...</div>

// Svelte action: call handler on Escape key
<div use:escapeKey={() => close()}>...</div>
```

---

## 🏗️ Monorepo Structure

```
sve-ui/
├── package.json          # Root — Bun workspaces config
├── bunfig.toml           # Bun configuration
├── tsconfig.json         # Shared TypeScript config
│
├── packages/
│   ├── shared/           # @sve-ui/shared
│   ├── accordion/        # @sve-ui/accordion
│   ├── modal/            # @sve-ui/modal
│   ├── dropdown/         # @sve-ui/dropdown
│   ├── popover/          # @sve-ui/popover
│   ├── drawer/           # @sve-ui/drawer
│   └── auto-complete/    # @sve-ui/auto-complete
│
└── apps/
    └── docs/             # SvelteKit demo app (Tailwind CSS)
```

Each package follows this structure:

```
packages/<name>/
├── package.json          # exports map, peer deps
├── svelte.config.js
├── tsconfig.json
└── src/
    ├── index.ts          # Public API exports
    ├── <Component>.svelte
    └── <component>.svelte.ts  # Rune-based state
```

---

## 🛠️ Development

```bash
# Clone & install
git clone https://github.com/MrBns/sve-ui.git
cd sve-ui
bun install

# Start the docs dev server
bun run dev

# Build all packages
bun run build

# Type-check everything
bun run typecheck
```

---

## 🎨 Styling Guide

All components are **headless** — they ship with zero CSS. Use `class` props and the provided data attributes to style them:

```css
/* Style based on open/closed state */
[data-accordion-trigger][aria-expanded="true"] {
  background: #f0f9ff;
}

/* Use data-state attribute */
[data-state="open"] > .chevron {
  transform: rotate(180deg);
}

/* Active item in dropdown/autocomplete */
[data-active] {
  background: oklch(55% 0.2 250);
  color: white;
}
```

Or with **Tailwind CSS** arbitrary variants:

```svelte
<Accordion.Trigger class="[&[aria-expanded='true']]:text-blue-600 [&[aria-expanded='true']]:bg-blue-50">
  Title
</Accordion.Trigger>
```

---

## 📋 Accessibility Features

| Feature | Implementation |
|---------|----------------|
| ARIA roles | `role="dialog"`, `role="menu"`, `role="region"`, `role="combobox"` |
| ARIA states | `aria-expanded`, `aria-modal`, `aria-selected`, `aria-disabled` |
| ARIA relations | `aria-controls`, `aria-labelledby`, `aria-describedby` |
| Keyboard nav | ↑↓ arrows, Enter, Space, Escape, Tab handling |
| Focus trap | Modal and Drawer trap focus; Escape closes them |
| Focus management | AutoComplete manages `aria-activedescendant` |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR on [GitHub](https://github.com/MrBns/sve-ui).

---

## 📄 License

MIT © [MrBns](https://github.com/MrBns)