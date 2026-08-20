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

## Deprecations at a glance

These keep working in v2 and are removed in v3.

| Deprecated                            | Replacement                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `carbonElement` decorator             | Lit's `customElement`, or `static is` with `defineCustomElement`           |
| `es-custom` build (`cds-custom-*`)    | custom tag names, the `create-prefixed-build` binary, or scoped registries |
| `custom-elements.json` (WCA manifest) | the standard Custom Elements Manifest (CEM)                                |

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
