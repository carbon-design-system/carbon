# Carbon Web Components: v3 migration guide

This guide covers breaking changes when upgrading `@carbon/web-components` from
v2 to v3.

> **The opt-in registration API is available now.** Both `defineCustomElement`
> and the `static is` tag field are available in v2, so you can write v3-ready
> registration code today. What **v3** delivers will be the **breaking** part:
> component classes no longer self-register when importing their class files, so
> registration becomes explicit (via a barrel or `defineCustomElement`). Until
> then the `carbonElement` decorator and `es-custom` build are deprecated but
> continue to work unchanged.
>
> **Test the v3 behavior now.** A prerelease that actually removes
> self-registration is published under the `v3` npm tag, built from the
> [`feat/web-components-v3`](https://github.com/carbon-design-system/carbon/tree/feat/web-components-v3)
> branch.

The rationale for the new model is captured in
[ADR 0007: Provide pure class exports and opt-in registration](../decisions/0007-provide-pure-class-exports-for-web-components.md).

## What changed

In v2, every component registered itself as a side effect of being imported:
each class carried a self-registering decorator
(`carbonElement`/`customElement`) that called `customElements.define()` at
module-evaluation time.

In v3, component classes are pure — importing a class will not register
anything. A class declares its tag with `static is = '${prefix}-name'`, and
registration is opt-in through a single helper, `defineCustomElement`. Carbon's
component barrels (`es/components/<name>/index.js`) still call
`defineCustomElement` for you, so importing a barrel registers the default
`cds-*` tag exactly as before, and existing apps that import this way don't need
any changes.

The break can happen in two places, covered below.

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
`clazz.is` and the registry to the global `customElements`. It is idempotent
(re-registering the same class under the same tag is a no-op), returns the
registered class for convenient re-export, and accepts a custom `name` or a
scoped `registry`. See
[ADR 0007](../decisions/0007-provide-pure-class-exports-for-web-components.md)
for the full registration model.

## Importing a class no longer registers it

Because class modules are now pure, importing a class file for its registration
side effect no longer registers the element:

In v2, importing the class registers the component

```js
import '@carbon/web-components/es/components/button/button.js';
```

In v3, import the barrel to register

```js
import '@carbon/web-components/es/components/button/index.js';
```

Additionally, transitive registration is gone. In v2, importing component X's
barrel also registered unrelated components that X happened to import; in v3 a
barrel registers only the elements X actually renders. If you render
`<cds-something>` but never import it, it will render inert. v3's approach is to
import what you render, and the dev diagnostic is the CSS `:not(:defined)`
selector — any Carbon element matching it was never registered.

## The `es-custom` build is removed

The prebuilt `es-custom` bundle (the `cds-custom-*` copy of every element) is
deprecated in v2 and will be removed in v3. It is full copy of the package under
one static alternate prefix; v3 replaces it with more flexible options:

- **Register under a custom tag name** with
  `defineCustomElement(Class, { name })` for an individual (leaf) element.
- **A build-time prefixed build** that re-prefixes the whole package — including
  the tags a composite renders internally — under any user-defined prefix.
- **Scoped custom element registries** for isolating elements inside a shadow
  root.

Until v3, `es-custom` keeps working and emits a one-time deprecation warning on
load. Migrate off it before upgrading to v3.

## The WCA manifest is replaced by CEM

`custom-elements.json` is generated today in Web Component Analyzer (WCA)
format. That format is deprecated in v2 and removed in v3, replaced by the
standard
[Custom Elements Manifest (CEM)](https://github.com/webcomponents/custom-elements-manifest).
The deprecated manifest carries a `_deprecated` marker at the top of the file
and the build prints a deprecation warning. Tracking:
[#20670](https://github.com/carbon-design-system/carbon/issues/20670).
