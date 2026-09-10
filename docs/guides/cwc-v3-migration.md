<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Carbon Web Components: v3 migration guide](#carbon-web-components-v3-migration-guide)
  - [What changes](#what-changes)
  - [The `carbonElement` decorator is removed](#the-carbonelement-decorator-is-removed)
    - [Option A — use Lit's `customElement`](#option-a--use-lits-customelement)
    - [Option B — pure class and `defineCustomElement`](#option-b--pure-class-and-definecustomelement)
  - [The `es-custom` build is removed](#the-es-custom-build-is-removed)
    - [A custom tag name, for individual elements](#a-custom-tag-name-for-individual-elements)
    - [A prefixed build, for the whole package](#a-prefixed-build-for-the-whole-package)
    - [A scoped registry, for isolation](#a-scoped-registry-for-isolation)
  - [The WCA manifest is replaced by CEM](#the-wca-manifest-is-replaced-by-cem)
  - [Form participation moves to `ElementInternals`](#form-participation-moves-to-elementinternals)
    - [Try it today](#try-it-today)
    - [What you get](#what-you-get)
    - [What changes when it becomes the default](#what-changes-when-it-becomes-the-default)
    - [If you built a workaround, remove it](#if-you-built-a-workaround-remove-it)
  - [Deprecations at a glance](#deprecations-at-a-glance)
  - [Codemods](#codemods)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Carbon Web Components: v3 migration guide

The next major release introduces a new registration model that is side-effect
free. Importing a class file no longer self-registers the component, the
registration must be explicit.

Everything the new model needs is available in v2 today, so you can write
v3-ready code before the breaking changes are released. The `carbonElement`
decorator, the `es-custom` build, and the WCA manifest are deprecated in v2 and
keep working unchanged until v3 removes them.

The rationale for the new model is captured in
[ADR 0007: Provide pure class exports and opt-in registration](../decisions/0007-provide-pure-class-exports-for-web-components.md).
For the registration API with running examples, see the
[component registration](https://web-components.carbondesignsystem.com/?path=/docs/introduction-component-registration--overview)
page in Storybook.

## What changes

In v2, every component registered itself as a side effect of being imported.
Each class carried a self-registering decorator (`carbonElement`) that called
`customElements.define()` as the module evaluated.

In v3 the class files are pure. Importing one gives you the class and nothing
else. Registration moves to the component's barrel, which registers the elements
that component renders:

```diff
- import '@carbon/web-components/es/components/button/button.js';
+ import '@carbon/web-components/es/components/button/index.js';
```

Registration is also no longer transitive. In v2, importing one component
registers everything that component happens to pull in, so an element can work
on your page without you ever importing it. This changes in v3 — import the
barrel for every Carbon element you render yourself. A composite's barrel still
covers what it renders internally, so importing the data table is enough for all
internal components it requires.

For most applications that is the whole migration, and the [codemods](#codemods)
below will do it for you. Anything missed shows up in the browser: a Carbon
element matching `:not(:defined)` hasn't been registered.

## The `carbonElement` decorator is removed

In v2 the package exported a self-registering class decorator that consumers
imported to define their own custom elements:

```js
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
```

This decorator is deprecated in v2 and removed in v3. Migrate with one of the
two options below.

### Option A — use Lit's `customElement`

If your elements extend `LitElement`, Lit ships an equivalent self-registering
decorator. Only the import changes and every `@customElement('...')` usage site
stays the same.

```diff
- import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
+ import { customElement } from 'lit/decorators.js';

  @customElement('my-component')
  class MyComponent extends LitElement {
    // ...
  }
```

**Behavior differences to expect:** Carbon's custom decorator swallowed a
duplicate `define()` and logged `Attempting to re-define <tag>`. Lit's
`customElement` throws a `NotSupportedError` if the tag or class is already
registered. To prevent the same module from loading twice in your app, you can
guard against it with:

```js
if (!customElements.get('my-widget')) {
  customElements.define('my-widget', MyWidget);
}
```

### Option B — pure class and `defineCustomElement`

Drop the decorator, declare the tag as a static field, and register explicitly.
This is how Carbon's web components are authored in v3.

```diff
- import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
+ import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

- @customElement('my-component')
  class MyComponent extends LitElement {
+   static is = 'my-component';
    // ...
  }
+ defineCustomElement(MyComponent);
```

`defineCustomElement(clazz, { name?, registry? })` defaults the tag to
`clazz.is` and the registry to the global `customElements`. It is idempotent,
and returns the class it registered so a barrel can register and re-export in
one step.

## The `es-custom` build is removed

The prebuilt `es-custom` bundle is a full copy of the package under one fixed
`cds-custom-` prefix. It is deprecated in v2, emits a one-time deprecation
warning on load, and is removed in v3. Three more flexible options replace it.

### A custom tag name, for individual elements

Passing `name` registers a component under a tag you choose:

```js
import CDSButton from '@carbon/web-components/es/components/button/button.js';
import { defineCustomElement } from '@carbon/web-components/es/globals/register.js';

defineCustomElement(CDSButton, { name: 'cwc-button' });
```

A class can only be registered once per registry. When the default tag is
already defined, `defineCustomElement` registers an identical subclass under the
new name instead, so elements created from it remain `instanceof CDSButton`.

Use this when a `cds-*` tag is already taken on the page and you need to move a
few elements out of the way. It does not rename the tags a composite renders
internally, because those are fixed at build time — a renamed `cds-table` still
looks for `cds-checkbox`.

**Renaming an element costs it its host styles.** Most of a component's styles
are plain classes inside its shadow root and apply to a renamed element already,
but the `:host(cds-button)` rules do not. Those carry the host's layout box and
the layout custom properties the inner `.cds--btn` reads for its height and
padding, which is why a renamed element renders with the right colors but
collapses to the size of its text. Re-declare that one block against your tag,
reusing Carbon's mixins:

```scss
@use '@carbon/styles/scss/config' as *;
@use '@carbon/styles/scss/utilities/layout' as *;

:host(cwc-button) {
  @include emit-layout-tokens();

  display: inline-flex;

  .#{$prefix}--btn {
    flex-grow: 1;
    max-inline-size: 100%;
  }
}
```

Then declare the subclass yourself so it can carry those styles alongside the
component's own:

```js
class CWCButton extends CDSButton {
  static is = 'cwc-button';
  static styles = [CDSButton.styles, hostStyles].flat();
}

defineCustomElement(CWCButton);
```

### A prefixed build, for the whole package

`create-prefixed-build` writes a copy of the package with every `cds-*` element
renamed, composites included, rewriting the JavaScript and the Sass together:

```sh
npx -p @carbon/web-components create-prefixed-build --prefix foo --out ./vendor/carbon-foo
```

```js
// registers <foo-button>
import './vendor/carbon-foo/components/button/index.js';
```

Design tokens keep the `--cds` prefix on purpose, so theming stays shared
between prefixed and unprefixed Carbon on the same page. This is the direct
replacement for `es-custom`, without the fixed `cds-custom-` name. The rename
happens at build time, so there is no polyfill, no runtime cost, and no
load-order constraint. Prefer it over a custom tag name as soon as composites
are involved.

### A scoped registry, for isolation

Passing `registry` defines the element in a `CustomElementRegistry` you own
rather than the global one. A shadow root then opts into that registry, and tags
inside it resolve there:

```js
const registry = new CustomElementRegistry();
defineCustomElement(CDSButton, { registry });

host.attachShadow({ mode: 'open', customElementRegistry: registry });
```

This needs native support or the `@webcomponents/scoped-custom-element-registry`
polyfill. Use it when the same tag needs to mean different things in different
parts of the page — two versions of Carbon inside one application is the usual
reason. Only the elements you register land in the scoped registry, so a
composite's internals have to be registered there too.

## The WCA manifest is replaced by CEM

`custom-elements.json` is generated today in Web Component Analyzer (WCA)
format. That format is deprecated in v2 and removed in v3, replaced by the
standard
[Custom Elements Manifest (CEM)](https://github.com/webcomponents/custom-elements-manifest).
The deprecated manifest carries a `_deprecated` marker at the top of the file
and the build prints a deprecation warning. Tracking:
[#20670](https://github.com/carbon-design-system/carbon/issues/20670).

## Form participation moves to `ElementInternals`

Carbon's form components become real form controls. Rather than collecting their
values through the `formdata` event, they associate with their `<form>` natively
through
[`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals),
so the behavior a form control is expected to have comes from the browser
instead of from Carbon emulating it.

In practice that means the platform treats a `cds-text-input` the way it treats
an `<input>` — for labelling, resetting, disabling, validating and submitting.
The table under [What you get](#what-you-get) lists exactly what that adds.

The `formdata` mechanism they use today — `FormMixin` internally — is deprecated
in v2 and removed in v3.

> **Read more:** [Form participation][form-participation] covers why the
> `formdata` mechanism existed, what it could and could not do, and the
> implementation details of the replacement.

[form-participation]:
  ../../packages/web-components/src/components/form/form-data.md

### Try it today

Form association cannot ship behind Carbon's `<feature-flags>` element. The
browser reads `static formAssociated` once, at `customElements.define()`, and it
cannot be toggled per instance or after registration — so a runtime flag has
nothing to switch.

It ships instead under separate `cds-preview-*` tags, the same approach used by
`cds-preview-date-picker`. Import the `next` barrel and change the tag name:

```diff
- import '@carbon/web-components/es/components/text-input/index.js';
+ import '@carbon/web-components/es/components/text-input/next/index.js';
```

```diff
- <cds-text-input name="email" value="[email protected]"></cds-text-input>
+ <cds-preview-text-input name="email" value="[email protected]"></cds-preview-text-input>
```

| v2 tag                     | Preview tag                        |
| -------------------------- | ---------------------------------- |
| `<cds-text-input>`         | `<cds-preview-text-input>`         |
| `<cds-textarea>`           | `<cds-preview-textarea>`           |
| `<cds-number-input>`       | `<cds-preview-number-input>`       |
| `<cds-password-input>`     | `<cds-preview-password-input>`     |
| `<cds-checkbox>`           | `<cds-preview-checkbox>`           |
| `<cds-select>`             | `<cds-preview-select>`             |
| `<cds-dropdown>`           | `<cds-preview-dropdown>`           |
| `<cds-multi-select>`       | `<cds-preview-multi-select>`       |
| `<cds-radio-button-group>` | `<cds-preview-radio-button-group>` |
| `<cds-search>`             | `<cds-preview-search>`             |
| `<cds-slider>`             | `<cds-preview-slider>`             |

Child elements are unchanged — a `<cds-preview-dropdown>` still holds v2
`<cds-dropdown-item>` children, and `<cds-preview-radio-button-group>` still
holds `<cds-radio-button>`. Only the container participates in the form.

Not yet converted: `cds-date-picker`, `cds-time-picker`, `cds-combo-box` and the
`cds-fluid-*` variants.

Properties, events, slots and styling are unchanged — these are subclasses of
the v2 components, not rewrites. Only form participation differs. Both versions
can coexist on the same page, so you can migrate one field at a time.

> **Preview:** these tags exist to gather feedback before v3. They are removed
> in v3, when the behavior moves onto the canonical tags.

### What you get

| Behavior                                      | v2  | Preview |
| --------------------------------------------- | --- | ------- |
| Contributes a value on submit                 | Yes | Yes     |
| `<label for>` associates with the control     | No  | Yes     |
| Appears in `form.elements`                    | No  | Yes     |
| `form` / `labels` / `validity` properties     | No  | Yes     |
| Restored by `form.reset()`                    | No  | Yes     |
| Excluded by an ancestor `<fieldset disabled>` | No  | Yes     |
| `required` blocks submission                  | No  | Yes     |
| `disabled` follows native semantics           | No  | Yes[^1] |

[^1]:
    `disabled` reports only the element's _own_ attribute, matching
    `HTMLInputElement.disabled` — an element inside a disabled `<fieldset>`
    reports `false`. Use `el.matches(':disabled')` for the effective state. The
    rendered control is disabled either way.

Two of the "No" rows are defects rather than gaps. `<label for>` silently not
associating is an **accessibility** failure, and a value inside a disabled
`<fieldset>` still being submitted is a **correctness** one.

### What changes when it becomes the default

In v3 these behaviors move onto `<cds-text-input>`, `<cds-checkbox>` and the
rest, and the preview tags are removed. Being a real form control is observable,
so some of that change reaches your application.

#### Check these in your app

| What changes                                                                                                | What to do                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `form.elements` includes Carbon controls, changing its `length`, indices and `namedItem()`                  | Review anything that iterates `form.elements` by index or count.                                                                   |
| `click` no longer fires on a disabled control, matching a native `<button disabled>`                        | If you show a tooltip explaining _why_ a control is disabled, move to `aria-disabled` plus a wrapper element that stays clickable. |
| The host matches `:disabled`                                                                                | Check broad application CSS such as `*:disabled` or `[disabled]`, which now applies to the Carbon element itself.                  |
| A wrapping `<label>` forwards a click, and `label.control` resolves to the Carbon element instead of `null` | Check test selectors and any click handling that assumed the label did nothing.                                                    |
| Submitted entry order follows DOM order rather than listener order                                          | Only matters if you parse repeated keys positionally.                                                                              |

None of these require a change before v3 — the preview tags let you find them
early.

#### Still being decided

These are open questions rather than settled behavior. They are tracked
individually so you can follow or weigh in:

| Question                                                                                                           | Current preview behavior                                                                    | Tracking |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | -------- |
| Should `cds-multi-select` submit one entry per selection (`name=a&name=b`) instead of a joined value (`name=a,b`)? | Keeps the v2 joined format. A native `<select multiple>` submits repeated entries.          | TBD      |
| Should `invalid` participate in constraint validation, or stay presentational?                                     | Stays presentational — it styles the control without blocking submission, as it always has. | TBD      |
| Should `checkValidity()` and `setCustomValidity()` adopt native semantics?                                         | Carbon's existing non-standard versions still apply on components that have them.           | TBD      |

One deliberate improvement, not an open question: **`cds-preview-slider` with no
value submits no entry**, where the v2 component submitted the string
`"undefined"`.

### If you built a workaround, remove it

Because this closes gaps rather than changing working behavior, the code most
likely to break is the code written to work around the gaps. If you:

- collect Carbon values by hand instead of using `new FormData(form)`
- reset Carbon fields manually because `form.reset()` did not reach them
- disable Carbon fields manually because `<fieldset disabled>` did not
- subclass a Carbon form component and call `attachInternals()` yourself

…then that code is now redundant, and in the first case it will submit values
twice. Note the last one is safe today: the preview components hand a subclass
the internals they already attached rather than letting the second call fail.

## Deprecations at a glance

These keep working in v2 and are removed in v3.

| Deprecated                            | Replacement                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `carbonElement` decorator             | Lit's `customElement`, or `static is` with `defineCustomElement`           |
| `es-custom` build (`cds-custom-*`)    | custom tag names, the `create-prefixed-build` binary, or scoped registries |
| `custom-elements.json` (WCA manifest) | the standard Custom Elements Manifest (CEM)                                |
| `FormMixin` / the `formdata` event    | native form association via `ElementInternals`                             |

## Codemods

`@carbon/upgrade` ships two migrations for the barrel change. Both accept an
optional list of paths and default to the whole workspace. The CLI stops if the
working tree is dirty, so commit or stash first, or pass `--force`.

`wc-report-non-barrel-imports` lists the class file imports it finds and the
barrel each one should become. It only reports, so run it first to see the scope
of the change:

```sh
npx @carbon/upgrade migrate wc-report-non-barrel-imports
```

```
src/app.js  (2 need a barrel)
  ├─ L1  button/button.js  (side-effect)  →  button/index.js
  └─ L2  tag/tag.js        (side-effect)  →  tag/index.js
```

`wc-add-barrel-imports` applies the rewrite. Migrations run dry unless you pass
`--write`:

```sh
npx @carbon/upgrade migrate wc-add-barrel-imports --write
```

```diff
- import '@carbon/web-components/es/components/button/button.js';
+ import '@carbon/web-components/es/components/button/index.js';
```
