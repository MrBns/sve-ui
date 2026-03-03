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

Two ways to use it — pick the simplest one for your needs.

```svelte
<script lang="ts">
  import Accordion, { AccordionItem } from '@sve-ui/accordion';
</script>

<!-- 1️⃣ Data-driven (simplest) — just pass an items array -->
<Accordion
  type="single"
  items={[
    { value: 'q1', title: 'What is sve-ui?', content: 'A headless Svelte 5 component library.' },
    { value: 'q2', title: 'How does it work?', content: 'You provide styles, we handle logic.' }
  ]}
  triggerClass="w-full flex justify-between px-4 py-3 font-medium"
  contentClass="px-4 pb-3 text-gray-600"
/>

<!-- 2️⃣ Custom rendering with snippets (no sub-components needed) -->
<Accordion type="single" {items}>
  {#snippet trigger(item, isOpen)}
    <span class="flex justify-between w-full">
      {item.title}
      <span class:rotate-180={isOpen}>↓</span>
    </span>
  {/snippet}
  {#snippet content(item)}
    <p class="px-4 pb-3 text-gray-600">{item.content}</p>
  {/snippet}
</Accordion>

<!-- 3️⃣ AccordionItem children — for rich/different HTML per item -->
<Accordion type="single">
  <AccordionItem value="q1" title="What is sve-ui?" triggerClass="..." contentClass="...">
    <p>Any HTML content here — forms, images, grids, etc.</p>
  </AccordionItem>
  <AccordionItem value="q2" contentClass="...">
    {#snippet trigger(isOpen)}
      {isOpen ? '📂' : '📁'} Custom trigger with icons
    {/snippet}
    <form>Complex form here</form>
  </AccordionItem>
</Accordion>
```

**Props — `Accordion`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | One or many items open at a time |
| `defaultValue` | `string \| string[]` | — | Initially open item(s) |
| `items` | `AccordionItemData[]` | — | Data-driven mode; omit to use children |
| `trigger` | `Snippet<[item, isOpen]>` | — | Custom trigger rendering |
| `content` | `Snippet<[item]>` | — | Custom content rendering |

**Props — `AccordionItem`**

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Unique key |
| `title` | `string` | Trigger text (ignored if `trigger` snippet provided) |
| `trigger` | `Snippet<[isOpen]>` | Custom trigger rendering |
| `children` | `Snippet` | Panel content |

---

### Modal

Single component. Use `bind:open` (external trigger) or the inline `trigger` snippet.

```svelte
<script lang="ts">
  import Modal from '@sve-ui/modal';
  let open = $state(false);
</script>

<!-- 1️⃣ bind:open — trigger lives outside the component -->
<button onclick={() => open = true}>Open Dialog</button>

<Modal
  bind:open
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  overlayClass="fixed inset-0 bg-black/50 flex items-center justify-center"
  class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
>
  {#snippet footer()}
    <div class="flex gap-3 justify-end mt-4">
      <button onclick={() => open = false}>Cancel</button>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Confirm</button>
    </div>
  {/snippet}
</Modal>

<!-- 2️⃣ Inline trigger snippet — fully self-contained -->
<Modal title="Confirm" overlayClass="..." class="...">
  {#snippet trigger({ toggle })}
    <button onclick={toggle}>Open Dialog</button>
  {/snippet}
  <p>Modal body content here</p>
</Modal>
```

**Props — `Modal`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` (bindable) | `false` | Two-way bindable open state |
| `title` | `string` | — | Dialog heading |
| `description` | `string` | — | Short description |
| `trigger` | `Snippet<[{ open, toggle }]>` | — | Inline trigger rendering |
| `header` | `Snippet` | — | Replaces the default title/description header |
| `footer` | `Snippet` | — | Rendered below body content |
| `children` | `Snippet` | — | Dialog body |

---

### Dropdown

Keyboard-navigable menu (`role="menu"`) with outside-click close. Navigate with ↑↓, select with Enter/Space.

```svelte
<script lang="ts">
  import Dropdown, { DropdownItem } from '@sve-ui/dropdown';
</script>

<!-- 1️⃣ Data-driven — pass items array -->
<Dropdown
  items={[
    { label: '✏️ Edit', onSelect: () => console.log('edit') },
    { label: '🗑️ Delete', onSelect: () => console.log('delete') }
  ]}
  contentClass="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg py-1 z-50"
  itemClass="px-4 py-2 hover:bg-gray-100 cursor-pointer"
>
  {#snippet trigger()}
    <button class="px-4 py-2 border rounded-lg">Options ▼</button>
  {/snippet}
</Dropdown>

<!-- 2️⃣ DropdownItem children — full HTML control -->
<Dropdown contentClass="absolute mt-2 w-48 bg-white border rounded-xl shadow-lg py-1 z-50">
  {#snippet trigger()}
    <button class="px-4 py-2 border rounded-lg">Options ▼</button>
  {/snippet}
  <DropdownItem onSelect={edit} class="px-4 py-2 hover:bg-gray-100">✏️ Edit</DropdownItem>
  <DropdownItem onSelect={del} class="px-4 py-2 hover:bg-red-50 text-red-600">🗑️ Delete</DropdownItem>
</Dropdown>
```

---

### Popover

One component. Put your trigger in `{#snippet trigger()}` and content in the default children slot.

```svelte
<script lang="ts">
  import Popover from '@sve-ui/popover';
</script>

<Popover placement="bottom-start" class="w-64 bg-white border rounded-xl shadow-xl p-4 z-50">
  {#snippet trigger()}
    <button class="px-4 py-2 border rounded-lg">More info ℹ️</button>
  {/snippet}

  <h3 class="font-bold mb-2">Popover Title</h3>
  <p class="text-sm text-gray-600">Floating content. Closes on Escape or click outside.</p>
</Popover>
```

**Placement values:** `top | bottom | left | right | top-start | top-end | bottom-start | bottom-end`

---

### Drawer

Side panel overlay supporting `left`, `right`, `top`, and `bottom` positions. Includes focus trapping and ARIA.

```svelte
<script lang="ts">
  import Drawer from '@sve-ui/drawer';
  let open = $state(false);
</script>

<!-- 1️⃣ bind:open — trigger lives outside -->
<button onclick={() => open = true}>Open Drawer</button>

<Drawer
  bind:open
  side="left"
  title="Navigation"
  overlayClass="fixed inset-0 bg-black/50 z-50"
  class="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50"
>
  <nav class="p-6"><!-- Navigation items --></nav>
</Drawer>

<!-- 2️⃣ Inline trigger snippet — self-contained -->
<Drawer side="right" title="Settings" overlayClass="..." class="...">
  {#snippet trigger({ toggle })}
    <button onclick={toggle}>⚙ Settings</button>
  {/snippet}
  <p>Settings content here</p>
</Drawer>
```

**Props — `Drawer`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` (bindable) | `false` | Two-way bindable open state |
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` | Panel position |
| `title` | `string` | — | Panel heading |
| `trigger` | `Snippet<[{ toggle }]>` | — | Inline trigger rendering |

---

### Auto-Complete

Single component. Pass `options`, use `bind:value` for the selected value. Optionally customize option rendering.

```svelte
<script lang="ts">
  import AutoComplete, { type AutoCompleteOption } from '@sve-ui/auto-complete';

  const options: AutoCompleteOption[] = [
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ];
  let selected = $state<string | null>(null);
</script>

<!-- 1️⃣ Default rendering -->
<AutoComplete
  {options}
  bind:value={selected}
  placeholder="Search frameworks..."
  class="relative"
  inputClass="w-full px-4 py-2 border rounded-lg"
  listClass="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50"
  optionClass="px-4 py-2 hover:bg-gray-100 cursor-pointer data-[active]:bg-blue-600 data-[active]:text-white"
/>

<!-- 2️⃣ Custom option rendering with snippets -->
<AutoComplete {options} bind:value={selected}>
  {#snippet option(opt, isActive, isSelected)}
    <div class="px-4 py-2" class:bg-blue-600={isActive} class:text-white={isActive}>
      {opt.label}
      {#if isSelected}<span class="ml-auto">✓</span>{/if}
    </div>
  {/snippet}
</AutoComplete>
```

**Props — `AutoComplete`**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `AutoCompleteOption[]` | — | Array of `{ value, label, disabled? }` |
| `value` | `T \| null` (bindable) | `null` | Two-way bindable selected value |
| `placeholder` | `string` | — | Input placeholder |
| `filterFn` | `(option, query) => boolean` | label contains | Custom filter |
| `option` | `Snippet<[opt, isActive, isSelected]>` | — | Custom option rendering |

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