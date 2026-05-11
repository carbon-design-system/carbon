# Scoped custom elements

## Overview

The `scoped-elements` build output provides a version of Carbon web components
that use
[scoped custom element registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md)
instead of the global custom element registry. This allows multiple versions of
Carbon web components to coexist on the same page without naming conflicts.

## When to use scoped elements

Use the `scoped-elements` build output when:

- **Multiple versions**: You need to use different versions of Carbon web
  components on the same page (e.g., during a gradual migration)
- **Micro-frontends**: Your application uses a micro-frontend architecture where
  different teams may use different versions of Carbon
- **Third-party integration**: You're integrating with third-party code that may
  also use Carbon web components
- **Avoiding conflicts**: You want to prevent custom element naming conflicts in
  complex applications

## How it works

### Standard build (`es/`)

The standard build uses the `@customElement` decorator to register components
globally:

```typescript
@customElement('cds-button')
class CDSButton extends LitElement {
  // Component implementation
}
```

This registers the component in the global `customElements` registry, which
means only one version of `cds-button` can exist on a page.

### Scoped elements build (`scoped-elements/`)

The `scoped-elements` build transforms components to:

1. **Remove global registration**: The `@customElement` decorator is stripped
   out, so components are not automatically registered globally
2. **Add scoped registries**: Each component that uses child components gets its
   own private custom element registry
3. **Isolate dependencies**: Child components are registered only within their
   parent's shadow DOM scope

This transformation is performed by the `scopedElementsDecoratorStripPlugin`
during the build process.

## Installation

The `scoped-elements` build is included in the `@carbon/web-components` package:

```bash
npm install @carbon/web-components
```

## Usage

### Basic usage

Import components from the `scoped-elements` directory instead of `es`:

```javascript
// Instead of:
// import '@carbon/web-components/es/components/button/button.js';

// Use:
import CDSButton from '@carbon/web-components/scoped-elements/components/button/button.js';
```

### Scoped subcomponents

For components with child dependencies, the scoped build automatically creates
private registries:

```javascript
import CDSDropdown from '@carbon/web-components/scoped-elements/components/dropdown/dropdown.js';

// The dropdown component will automatically register its child components
// (like dropdown-item) in its own scoped registry
customElements.define('cds-dropdown', CDSDropdown);
```

## Complete example with the accordion component

```html
<div data-scoped-accordion-root>
  <cds-accordion-skeleton count="3" open></cds-accordion-skeleton>
  <cds-accordion>
    <cds-accordion-item title="Section 1">
      <p>Rendered from a scoped registry.</p>
    </cds-accordion-item>
    <cds-accordion-item title="Section 2">
      <p>Not defined in the global registry.</p>
    </cds-accordion-item>
  </cds-accordion>
</div>
```

```js
import CDSAccordion from '@carbon/web-components/scoped-elements/components/accordion/accordion.js';
import CDSAccordionItem from '@carbon/web-components/scoped-elements/components/accordion/accordion-item.js';
import CDSAccordionSkeleton from '@carbon/web-components/scoped-elements/components/accordion/accordion-skeleton.js';

/**
 *
 * When using the scoped-elements build, components are not automatically
 * registered globally. This array contains the accordion component family
 * (accordion, accordion-item, and accordion-skeleton) with their tag names
 * and class constructors for manual registration.
 *
 */
const elements = [
  ['cds-accordion', CDSAccordion],
  ['cds-accordion-item', CDSAccordionItem],
  ['cds-accordion-skeleton', CDSAccordionSkeleton],
];

const defineElements = (registry) => {
  elements.forEach(([tagName, elementClass]) => {
    if (!registry.get(tagName)) {
      registry.define(tagName, elementClass);
    }
  });
};

const root = document.querySelector('[data-scoped-accordion-root]');

/**
 *
 * Wraps the root element in a shadow DOM with a scoped custom element registry.
 *
 */
if (root) {
  const host = document.createElement('div');
  const markup = root.outerHTML;
  const fallbackRoot = root;

  root.replaceWith(host);

  try {
    const registry = new CustomElementRegistry();
    defineElements(registry);

    // Attach shadow DOM with the scoped registry
    // Components inside this shadow root will use the scoped registry
    // instead of the global customElements registry.
    const shadowRoot = host.attachShadow({
      mode: 'open',
      customElementRegistry: registry,
    });

    shadowRoot.innerHTML = markup;

    if (typeof registry.upgrade === 'function') {
      registry.upgrade(shadowRoot);
    }
  } catch (error) {
    host.replaceWith(fallbackRoot);
    throw error;
  }
}
```
