# ibm-products → Carbon Core: Web Component Migration Prompt

Reusable prompt for migrating a single web component from
`@carbon/ibm-products-web-components` into the Carbon core monorepo. Reference
implementations already in core: `action-set`, `truncated-text`, `resizer`, and
`side-panel`.

---

## Before You Start

**Manual pre-work required before running this prompt:**

1. Copy the component source folder from ibm-products-web-components into:
   `packages/web-components/src/components/{{component-name}}/`
2. If the component has a Carbon core Sass mixin in
   `packages/styles/scss/components/`, note its name — you will reference it in
   Step 5.

Then fill in the two placeholders and paste the prompt below.

| Placeholder          | What to put here                        | Example      |
| -------------------- | --------------------------------------- | ------------ |
| `{{ComponentName}}`  | PascalCase component name               | `SidePanel`  |
| `{{component-name}}` | kebab-case element tag name (no prefix) | `side-panel` |

---

## The Prompt

```
I have manually copied the component source folder from carbon-for-ibm-products into the
Carbon core monorepo. The component is {{ComponentName}}.

Files have been placed at:
  packages/web-components/src/components/{{component-name}}/

The ibm-products custom element prefix is c4p. The Carbon core prefix is cds.

Your job is to convert all files in this directory so they conform to Carbon core conventions.
Do not invent new functionality. Only convert what is already there.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — READ EVERYTHING BEFORE TOUCHING ANYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Read ALL copied files first so you understand what is being migrated.

Then read these Carbon core reference files for conventions:
  packages/web-components/src/components/side-panel/side-panel.ts          complex LitElement pattern
  packages/web-components/src/components/side-panel/side-panel.scss        SCSS host/mixin/extend pattern
  packages/web-components/src/components/action-set/action-set.ts          sub-component / slot pattern
  packages/web-components/src/components/action-set/action-set.scss        ::slotted + @container pattern
  packages/web-components/src/components/truncated-text/truncated-text.ts  simple utility WC pattern
  packages/web-components/src/components/resizer/resizer-handle.ts         ResizeObserver / drag panel
  packages/web-components/src/components/side-panel/__tests__/side-panel-test.js  test format (shadow DOM, slotchange, no sinon)
  packages/web-components/src/components/action-set/__tests__/action-set-test.js  console.warn spy pattern
  packages/web-components/product-migrated-components.mjs                  registry file
  packages/web-components/src/index.ts                                     package exports
  packages/web-components/.storybook/main.ts                               v11 story exclusion
  packages/web-components/.storybook-v12/main.ts                           v12 story inclusion
  docs/style.md
  docs/decisions/0007-ibm-products-to-core-migration.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — AUDIT AND CLEAN THE COMPONENT DIRECTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The copied directory may contain ibm-products-specific files. Apply these rules:

DELETE these files if present:
  ✗ {{component-name}}.test.ts    ibm-products pattern — tests live in __tests__/*.js (see Step 8)
  ✗ {{component-name}}.figma.ts   Figma Code Connect — not part of this migration
  ✗ Any _carbon-imports.scss      ibm-products pattern, no Carbon core equivalent
  ✗ Any _storybook-styles.scss    ibm-products pattern — rename to story-styles.scss if it has
                                   useful layout CSS, otherwise delete

CREATE these files if not already present:
  ✓ story-styles.scss             story-only styles (not shipped with component)
  ✓ __tests__/{{component-name}}-test.js   unit tests (.js, NOT .ts)

KEEP AND MIGRATE (convert in place):
  ✓ {{component-name}}.ts
  ✓ {{component-name}}.scss
  ✓ {{component-name}}.stories.ts
  ✓ {{component-name}}.mdx
  ✓ defs.ts (or constants.ts) if present
  ✓ index.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — CONVERT {{component-name}}.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Apply EVERY conversion in this table:

  ibm-products pattern                         Carbon core replacement
  ─────────────────────────────────────────────────────────────────────────────
  c4p-{{component-name}} (element tag)         cds-{{component-name}}
  C4P{{ComponentName}} (class name)            CDS{{ComponentName}}
  c4p-- (BEM prefix)                           cds--
  c4p.prefix / settings.prefix                 import { prefix } from '../../globals/settings'
  @carbon/web-components/es/globals/...        ../../globals/... (relative)
  @carbon/web-components/es/components/X       ../X/index (relative sibling)
  @carbon/ibm-products-web-components/es/...   ../../globals/... (relative)
  getDevtoolsProps(componentName)              DELETE — not used in Carbon WC
  declare static ['observedAttributes']        DELETE entirely — ibm-products artifact
  @ts-ignore                                   Replace with @ts-expect-error // reason
                                               OR remove entirely if the issue no longer exists
  someRef!.method()                            someRef?.method()
  ownerDocument!.activeElement                 ownerDocument?.activeElement ?? null
  ResizeObserver @ts-ignore                    Remove — ResizeObserver is in DOM lib types
  import { carbonElement }                     import { carbonElement as customElement }
                                                 from '../../globals/decorators/carbon-element'

LitElement lifecycle equivalents:
  componentDidMount    → firstUpdated()
  componentDidUpdate   → updated(changed: Map<string,unknown>)
  componentWillUnmount → disconnectedCallback()

Property decorators:
  Every public prop: @property({ reflect: true, type: String|Boolean|Number })
  Boolean HTML attributes in templates: ?attr=${boolVal}   NOT attr=${boolVal}

Event listeners on document/window — use the mixin, not addEventListener:
  import HostListener from '../../globals/decorators/host-listener';
  import HostListenerMixin from '../../globals/mixins/host-listener';
  class CDS{{ComponentName}} extends HostListenerMixin(LitElement) {
    @HostListener('document:click')
    protected _handleDocumentClick = (e: MouseEvent) => { … };
  }

ResizeObserver pattern:
  private _hResizeObserver: ResizeObserver | null = null;
  connectedCallback() {
    super.connectedCallback();
    this._hResizeObserver = new ResizeObserver(this._handleResize.bind(this));
    this._hResizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._hResizeObserver?.disconnect();
    this._hResizeObserver = null;
    super.disconnectedCallback();
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — index.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This file registers the element and nothing else:

  /**
   * @license
   * Copyright IBM Corp. YYYY, 2026
   * Apache-2.0
   */
  import './{{component-name}}';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — REGISTER IN packages/web-components/src/index.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Add as a COMMENTED-OUT block (component ships in v12, not v11):

  // TODO: uncomment in v12 — remove from product-migrated-components.mjs too
  // export { default as CDS{{ComponentName}} } from
  //   './components/{{component-name}}/{{component-name}}';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4b — REGISTER IN packages/web-components/product-migrated-components.mjs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Add to the productMigratedStoryGlobs array (alphabetical order):

  '../src/components/{{component-name}}/{{component-name}}.stories.ts',

Then verify that packages/web-components/.storybook/main.ts excludes it from v11
and packages/web-components/.storybook-v12/main.ts includes it in v12 — the main.ts
files read from this array so no direct edit should be needed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — {{component-name}}.scss (CRITICAL RULES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The WC Sass architecture differs from ibm-products. Apply every rule below.

── RULE 1: Emit Carbon core mixins at FILE ROOT ─────────────────────────────────
@include the Carbon core mixin at the ROOT of the file — NOT inside :host().
This emits global .cds-- class rules consumed by the LitElement shadow styles.

  @use '@carbon/styles/scss/components/{{component-name}}' as component-styles;
  @include component-styles.{{component-name}};   ← file root, NOT inside :host()

  // If the component uses action-set internally:
  @use '@carbon/styles/scss/components/action-set' as action-set-styles;
  @include action-set-styles.action-set;           ← also at file root

── RULE 2: Use :host() scoping for component-specific overrides ─────────────────
Rules that extend or override the emitted Carbon classes go inside :host():

  $block-class: #{$prefix}--{{component-name}};

  :host(#{$prefix}-{{component-name}}) {
    .#{$block-class} {
      @extend .#{$block-class} !optional;   ← always use !optional
      // component-specific overrides
    }
  }

── RULE 3: ::slotted() only works in the element that OWNS the slot ─────────────
::slotted(cds-button) rules in {{component-name}}.scss that target a slot owned
by a sub-component (e.g. cds-action-set) are SILENTLY IGNORED by the browser.
Place those rules in the sub-component's stylesheet instead.

── RULE 4: @container queries and container-name ────────────────────────────────
Set container-name on the INNER .block div, not on :host():
  .#{$block-class} {
    container-name: {{component-name}};
    container-type: inline-size;
  }
Setting container-type on :host() changes its sizing model and breaks layout.
@container {{component-name}} (...) queries in child elements' stylesheets then
fire correctly even across shadow boundaries.

── RULE 5: Standard @use imports ────────────────────────────────────────────────
  $css--plex: true !default;
  @use 'sass:map';                                         (only if using map.get())
  @use '@carbon/styles/scss/reset';
  @use '@carbon/styles/scss/config' as *;                  provides $prefix
  @use '@carbon/styles/scss/motion' as *;
  @use '@carbon/styles/scss/spacing' as *;
  @use '@carbon/styles/scss/theme' as *;
  @use '@carbon/styles/scss/utilities/convert' as *;
  @use '@carbon/styles/scss/utilities' as *;

  NEVER @use '@carbon/ibm-products-styles/...' — that is the ibm-products
  stylesheet and must not be carried into the core repo.

── RULE 6: display:flex for button rows ─────────────────────────────────────────
Do NOT hardcode display:flex for button rows. It is emitted by .cds--btn-set in
button.scss. In action-set.scss, use:
  @use '../button/button';   ← emits .cds--btn-set { display:flex } globally
Do NOT @extend .cds--btn-set on :host(cds-action-set) — it merges the host
selector into the combined rule and breaks the cascade.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — story-styles.scss
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Story-scoped styles only. Use a unique class prefix so there are no collisions.
This file is NEVER shipped with the component.

  /*
   * Copyright IBM Corp. YYYY, 2026
   * Apache-2.0
   */
  @use '@carbon/styles/scss/type';

  .{{component-name}}-stories__viewport {
    @include type.type-style('body-01');
    // story layout only
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — {{component-name}}.stories.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CSF3 format. Key conventions:

  import { html } from 'lit';
  import './index';                           ← local relative import
  import type { Args, Meta } from '@storybook/web-components';
  import styles from './story-styles.scss?lit';

  const meta: Meta = {
    title: 'Components/{{ComponentName}}',    // Experimental/ for preview
    component: 'cds-{{component-name}}',
  };
  export default meta;

  export const Default = {
    args: { … },
    argTypes: { … },
    render: ({ someProp }) => html`
      <cds-{{component-name}} some-prop=${someProp}></cds-{{component-name}}>
    `,
  };

  Attribute casing: HTML attributes are kebab-case; LitElement maps them to
  camelCase automatically when attribute: 'some-prop' is set on @property.
  Boolean attributes: ?attr=${boolVal}   NOT attr=${boolVal}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8 — __tests__/{{component-name}}-test.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The test file MUST be .js (not .ts). It lives in __tests__/ not at the root.
It uses @open-wc/testing chai-style assertions — NOT vitest, NOT jest.

── IMPORTS ──────────────────────────────────────────────────────────────────────
Tests run against the pre-built es/ output, NOT the raw TypeScript source.
Import the component and any dependencies using the @carbon/web-components/es/
package path — NOT relative paths into src/:

  /**
   * Copyright IBM Corp. YYYY, 2026
   * Apache-2.0
   */
  import { fixture, html, expect } from '@open-wc/testing';
  import '@carbon/web-components/es/components/{{component-name}}/index.js';
  // Additional dependencies the component needs (e.g. slots, slugs):
  import '@carbon/web-components/es/components/button/index.js';

  // Named exports from built files (defs, class default):
  import { SOME_ENUM } from '@carbon/web-components/es/components/{{component-name}}/defs.js';
  import CDS{{ComponentName}} from '@carbon/web-components/es/components/{{component-name}}/{{component-name}}.js';
  import { prefix } from '@carbon/web-components/es/globals/settings.js';

  NEVER use relative src/ imports like '../index.js' or '../../../globals/settings.js'
  — those are TypeScript source files the browser cannot fetch during tests.

── SHADOW DOM QUERIES ───────────────────────────────────────────────────────────
Elements rendered in the component's shadow root require shadowRoot.querySelector:

  // ✗ WRONG — light DOM, returns null for shadow DOM elements:
  const part = el.querySelector('.cds--{{component-name}}__inner');

  // ✓ CORRECT — searches the shadow root:
  const part = el.shadowRoot?.querySelector('.cds--{{component-name}}__inner');

  Light DOM (el.querySelector) is correct ONLY for slotted children you placed
  in the fixture template yourself.

── SLOTCHANGE AND updateComplete ────────────────────────────────────────────────
Slot-driven @state properties (e.g. _hasSubtitle, _hasSlug) are set by
slotchange events that fire after the initial render. After fixture() resolves,
always await el.updateComplete before asserting on anything controlled by a slot:

  const el = await fixture(html`
    <cds-{{component-name}}><div slot="subtitle">text</div></cds-{{component-name}}>
  `);
  await el.updateComplete;   // wait for slotchange → re-render to settle
  const subtitle = el.shadowRoot?.querySelector('.cds--{{component-name}}__subtitle-text');
  expect(subtitle).to.exist;

── CONSOLE SPY PATTERN (no sinon) ───────────────────────────────────────────────
sinon is NOT available in this WTR setup. Use a native reassignment spy:

  describe('Validation warnings', () => {
    let warnMessages;
    let originalWarn;

    beforeEach(() => {
      warnMessages = [];
      originalWarn = console.warn;
      console.warn = (...args) => { warnMessages.push(args.join(' ')); };
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    it('warns when invalid', async () => {
      // ... trigger the warning ...
      expect(warnMessages.length).to.be.greaterThan(0);
      expect(warnMessages[0]).to.include('expected substring');
    });
  });

── FIXTURE CLEANUP ───────────────────────────────────────────────────────────────
@open-wc/testing registers its own afterEach cleanup for every fixture().
NEVER add a manual afterEach that clears document.body.innerHTML — it races
with @open-wc's own removeChild calls and throws a NotFoundError:

  // ✗ WRONG — causes "NotFoundError: The node to be removed is not a child":
  afterEach(() => { document.body.innerHTML = ''; });

  // ✓ CORRECT — @open-wc handles fixture teardown automatically, add nothing.

── BASIC SHAPE ──────────────────────────────────────────────────────────────────
  const prefix = 'cds';
  const blockClass = `${prefix}--{{component-name}}`;

  describe('cds-{{component-name}}', () => {
    it('renders', async () => {
      const el = await fixture(html`
        <cds-{{component-name}}></cds-{{component-name}}>
      `);
      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('cds-{{component-name}}');
    });

    it('reflects attribute to property', async () => {
      const el = await fixture(html`
        <cds-{{component-name}} some-prop="value"></cds-{{component-name}}>
      `);
      expect(el.someProp).to.equal('value');
    });

    it('queries shadow DOM', async () => {
      const el = await fixture(html`<cds-{{component-name}}></cds-{{component-name}}>`);
      const part = el.shadowRoot?.querySelector(`.${blockClass}__inner`);
      expect(part).to.exist;
    });
  });

  Assertion style — NEVER use vitest/jest matchers:
    .to.exist        (not .toBeTruthy())
    .to.be.null      (not .toBeNull())
    .to.equal(v)     (not .toBe(v))
    .to.be.true      (not .toBe(true))

  • Force @state() properties to simulate layout conditions: el._isOpen = true;
    then always await el.updateComplete before asserting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9 — LICENSE HEADERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Update every file header to use the correct year range:
  Copyright IBM Corp. YYYY, 2026   (where YYYY is the file's original year)
  Copyright IBM Corp. 2026         (for brand-new files with no prior history)

DO NOT use 2025 as the second year — work is being done in 2026.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HARD RULES — NEVER VIOLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.  Use cds- prefix everywhere — NEVER c4p-.
2.  Never use @ts-ignore — use @ts-expect-error // reason or remove entirely.
3.  Never use the non-null bang on DOM queries (someRef!) — use optional chaining.
4.  Never add declare static ['observedAttributes'] — ibm-products artifact.
5.  In component source (.ts, .scss): never import from @carbon/web-components/es/... — use relative local paths.
    In test files (.js): ALWAYS import from @carbon/web-components/es/... — never use relative src/ paths.
6.  Never import from @carbon/ibm-products-styles/... — use @carbon/styles/...
7.  Carbon core mixin @include must be at file root — NOT inside :host().
8.  All @extend calls must use !optional.
9.  Tests are .js files in __tests__/ — NOT .ts at the component root.
10. Export in src/index.ts is commented out — ships in v12.
11. product-migrated-components.mjs must list the story glob.
12. Do not invent functionality — only convert what is already there.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before reporting done, confirm ALL of the following:

  ☐ yarn lint inside packages/web-components passes with no new errors
  ☐ yarn build inside packages/web-components succeeds
  ☐ The story appears in v12 Storybook, NOT in v11 Storybook
  ☐ product-migrated-components.mjs lists the story glob
  ☐ src/index.ts export is commented out
  ☐ No c4p- prefix remains anywhere in the migrated files
  ☐ No @ts-ignore comments remain — only @ts-expect-error with a reason
  ☐ No non-null bang operators (!) remain on DOM queries
  ☐ No declare static ['observedAttributes'] remains
  ☐ Test file is __tests__/{{component-name}}-test.js (.js, not .ts)
  ☐ All new/updated files have license year 2026
  ☐ No @use from @carbon/ibm-products-styles or imports from @carbon/web-components/es/
      in component source files (.ts, .scss)
  ☐ Carbon core mixin is @include'd at file root (not inside :host())
  ☐ All @extend rules use !optional
```

---

## Quick Reference: Prefix & Import Conversions

| ibm-products pattern                     | Carbon core replacement                           |
| ---------------------------------------- | ------------------------------------------------- |
| `c4p-{{component-name}}` (tag)           | `cds-{{component-name}}`                          |
| `c4p--{{component-name}}` (BEM)          | `cds--{{component-name}}`                         |
| `C4P{{ComponentName}}` (class)           | `CDS{{ComponentName}}`                            |
| `c4p.prefix` / `settings.prefix`         | `import { prefix } from '../../globals/settings'` |
| `@carbon/web-components/es/globals/...`  | `../../globals/...` (relative)                    |
| `@carbon/web-components/es/components/X` | `../X/index` (relative sibling)                   |
| `@carbon/ibm-products-styles/...`        | `@carbon/styles/...`                              |

---

## Quick Reference: TypeScript Lint Rules

| Forbidden pattern                       | Replacement                                           |
| --------------------------------------- | ----------------------------------------------------- |
| `// @ts-ignore`                         | `// @ts-expect-error // reason` — or remove entirely  |
| `this._el!.focus()`                     | `this._el?.focus()`                                   |
| `ownerDocument!.activeElement`          | `ownerDocument?.activeElement ?? null`                |
| `declare static ['observedAttributes']` | Delete entirely — ibm-products artifact               |
| `as any`                                | Proper type narrowing or typed assertion with comment |

---

## Quick Reference: SCSS Architecture

| Rule                                        | Location                                                      |
| ------------------------------------------- | ------------------------------------------------------------- |
| `@include component-styles.component-name;` | File root — emits global `.cds--` classes                     |
| `@extend .cds--block !optional;`            | Inside `:host(cds-x) .block { }`                              |
| `::slotted(cds-child)`                      | Only in the stylesheet of the element that owns the slot      |
| `container-name: foo;`                      | On the inner `.block` div — NOT on `:host()`                  |
| `@use '../button/button';`                  | In `action-set.scss` — emits `.cds--btn-set { display:flex }` |

---

## Quick Reference: Test Assertions

| vitest/jest style — DO NOT USE      | @open-wc/testing chai style — USE THIS                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| `expect(el).toBeTruthy()`           | `expect(el).to.exist`                                                                    |
| `expect(el).toBeNull()`             | `expect(el).to.be.null`                                                                  |
| `expect(el.p).toBe('v')`            | `expect(el.p).to.equal('v')`                                                             |
| `expect(el.p).toBe(true)`           | `expect(el.p).to.be.true`                                                                |
| `vi.spyOn(...)` / `sinon.stub(...)` | Native reassignment: save `originalWarn = console.warn`, replace, restore in `afterEach` |
| `{{component-name}}.test.ts` (root) | `__tests__/{{component-name}}-test.js`                                                   |

---

## Registry Files

Four files must be updated for every migrated component:

| File                                                      | What to add                                                      |
| --------------------------------------------------------- | ---------------------------------------------------------------- |
| `packages/web-components/product-migrated-components.mjs` | Story glob in `productMigratedStoryGlobs` array (alphabetical)   |
| `packages/web-components/.storybook/main.ts`              | Reads `productMigratedStoryGlobs` — verify exclusion is wired up |
| `packages/web-components/.storybook-v12/main.ts`          | Reads `productMigratedStoryGlobs` — verify inclusion is wired up |
| `packages/web-components/src/index.ts`                    | Commented-out export block with TODO note                        |

> **Note:** `tasks/build.js` does NOT need to be modified.

---

## Reference Implementations

| Component        | Key patterns it demonstrates                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `truncated-text` | Simplest WC pattern: ResizeObserver, `@state`, `@queryAssignedElements`                                                                                 |
| `resizer`        | ResizeObserver with drag; multiple sub-elements; Handle utility type                                                                                    |
| `action-set`     | `::slotted()` scope, `@container` queries, button-width responsive layout, `display:flex` via `../button/button`                                        |
| `side-panel`     | HostListenerMixin, focus trap, animation with `@carbon/motion`, dynamic sub-component `size` prop, `container-name`, multiple `@include` mixins at root |
