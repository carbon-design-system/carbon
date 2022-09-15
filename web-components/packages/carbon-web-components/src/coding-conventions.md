<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Coding conventions](#coding-conventions)
  - [Linters/formatters](#lintersformatters)
  - [TSDoc comments](#tsdoc-comments)
  - [No kitchen-sink "base" class and using mix-in](#no-kitchen-sink-base-class-and-using-mix-in)
  - [Lifecycle management](#lifecycle-management)
  - [Component styles for different component states/variants](#component-styles-for-different-component-statesvariants)
  - [Customizing components](#customizing-components)
    - [Defining (default) component options](#defining-default-component-options)
    - [Component variants with different options](#component-variants-with-different-options)
      - [Areas to make them configurable as component options](#areas-to-make-them-configurable-as-component-options)
      - [Areas where component optinos are _not_ applied](#areas-where-component-optinos-are-_not_-applied)
    - [Creating inherited components](#creating-inherited-components)
  - [Polymorphism with static properties](#polymorphism-with-static-properties)
  - [Custom events](#custom-events)
  - [Globalization](#globalization)
    - [Translation](#translation)
    - [Collation](#collation)
  - [Null checks](#null-checks)
  - [Updating view upon change in `private`/`protected` properties](#updating-view-upon-change-in-privateprotected-properties)
  - [CSS considerations with IE11](#css-considerations-with-ie11)
  - [Custom element registration](#custom-element-registration)
  - [Propagating misc attributes from shadow host to an element in shadow DOM](#propagating-misc-attributes-from-shadow-host-to-an-element-in-shadow-dom)
  - [Private properties](#private-properties)
  - [Component-specific considerations](#component-specific-considerations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Coding conventions

## Linters/formatters

`carbon-web-components` uses ESLint with `typescript-eslint` for linting, and Prettier for code formatting.
Most of ESLint configurations are same as ones in `carbon-components`.

## TSDoc comments

In addition to using TypeScript, we try to leverage editors' code assistance feature as much as possible.

For that purpose, we add TSDoc comments to the following:

- All classes
- All properties/methods (including private properties), only exception here is one being overriden
- All type definitions (e.g. `interface`, `enum`)

## No kitchen-sink "base" class and using mix-in

We strive to avoid kitchen-sink "base" class, for the sake of maintenability and avoiding code bloat.
Toward that goal, we use mix-in classes. Instead of manipulating prototype, we simply use ECMAScript class feature ([Subclass Factory Pattern](https://github.com/justinfagnani/proposal-mixins#subclass-factory-pattern)), which is, something like:

```typescript
const Mixin = <T extends Constructor<SomeClass>>(Base: T) => class extends Base {
  ...

  someProperty = someValue;
  someMethod() { ... }

  ...
};
```

## Lifecycle management

To avoid memory leaks and zombie event listeners, we ensure the event listeners on custom elements themselves (hosts) and ones on `document`, etc. are released when they get out of render tree.

For that purpose, `carbon-web-components` uses `@HostListener(type, options)` decorator. `@HostListener(type, options)` decorator works with a custom element class inheriting `HostListenerMixin()` and attaches an event listener using the target method as the listener. The `type` argument can be something like `document:click` so the `click` event listener is attached to `document`.

Here's an example seen in `<bx-modal>` code:

```typescript
...
import HostListener from '../../globals/decorators/HostListener';
import HostListenerMixin from '../../globals/mixins/HostListener';
...

@customElement(`${prefix}-modal` as any)
class BXModal extends HostListenerMixin(LitElement) {
  ...

  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    ...
  };

  ...
}
```

## Component styles for different component states/variants

Carbon core CSS uses BEM modifier like `bx--btn--danger` to style different states/variants of a component.

OTOH `carbon-web-components` uses attributes to represent different states/variants (e.g. `<bx-btn type="danger">`), in a similar manner as how attributes influence states/variants of native elements (e.g. `<input type="hidden">`).

If such states/variants should affect the style of custom element (shadow host), we define attribute styles from the following reasons:

- Taking a cue from native elements with user agent shadow DOM (e.g. UA stylesheet for `<input type="hidden">`)
- [Adding CSS classes on our custom elements by ourselves may conflict with CSS classes set by consumers](https://developers.google.com/web/fundamentals/web-components/best-practices#do-not-self-apply-classes)

## Customizing components

Like `carbon-components` library does, `carbon-web-components` ensures components are written in a flexible manner enough to support use cases different applications have.

### Defining (default) component options

Component options are defined as static properties of custom element class, instead of in `options` object seen in `carbon-components`.

The primary reason for the difference is that [there is no support for constructor arguments in Custom Elements](https://github.com/w3c/webcomponents/issues/605) and the use case for using constructor for Custom Elements is rare. It makes instance-level configuration unrealistic.

### Component variants with different options

A component variant with different options can be created by creating a derived class which overrides static properties of component options.

#### Areas to make them configurable as component options

| Area                                                                                                   | Example of component option (static property) name | Remarks                                                                |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------- |
| CSS selectors/classes used in imperative DOM API calls (Doing so allows overriding `.render()` method) | `selectorNonSelectedItem`                          | An exception is where `lit-element`'s `@query` decorator is applicable |
| [Custom event](#custom-events) names                                                                   | `eventBeforeSelect`                                |                                                                        |

#### Areas where component optinos are _not_ applied

- CSS classes used in template (Should be done by overriding `.render()` method)

### Creating inherited components

This codebase intends to support the components being inherited, to some extent. e.g. Compoennts with different options described above. To support that, it's easier for all properties/methods exposed as `protected`, but it exposes a risk of the component internals being poked around. The current guideline for using `protected` is the following:

- Ones where override happens within this component library (e.g. `<bx-multi-select>` inheriting `<bx-dropdown>`)
- Element ID's auto-generation logic
- (Possibly some more, e.g. ones whose API are stable enough)

## Polymorphism with static properties

To support [polymorphism with static properties](https://github.com/Microsoft/TypeScript/issues/3841)...

We do:

```typescript
(this.constructor as typeof CustomElementClass).staticPropName;
```

```typescript
(customElementInstance.constructor as typeof CustomElementClass).staticPropName;
```

We don't:

```typescript
CustomElementClass.staticPropName;
```

## Custom events

Wherever it makes sense, `carbon-web-components` translates user-initiated events to something that gives event listeners more context of what they mean. For example, `<bx-modal>` translates `click` event on `<bx-modal-close-button>` to `bx-modal-beingclosed` and `bx-modal-closed` custom events.

`bx-modal-beingclosed` is cancelable in a similar manner as how `click` event on `<a href="...">` is cancelable; If `bx-modal-beingclosed` is canceled, `<bx-modal>` stops closing itself.

We define custom event names as static properties so derived classes can customize them.

## Globalization

### Translation

Like what most of native elements do, the primary means to handle translatable strings is let user put them in DOM, e.g. in attributes, child (text) nodes.

Some translatable strings are specified as a property, whose value is a function that takes a key-value map (object) as the arguments and returns the translatable string, e.g. `` ({ start, end, total }) => `${start}–${end} of ${total} item${total <= 1 ? '' : 's'}` ``. This is for supporting locale-specific pluralization, etc. that require string interpolation as well as the logic to dictate the locale-specific rule of pluralization.

The only exception to the above rules is `<bx-date-picker>` which uses the `locale` property for all locale-specific info since there is a huge amount of translatable strings.

### Collation

To avoid problems with collation, the primary means for user to determine order in list item is ordering them in DOM, for example:

```html
<bx-dropdown>
  <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
  <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
  <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
</bx-dropdown>
```

## Null checks

If you get TypeScript "may be null" errors, think twice to see if there is such edge case:

- If some other portion of your code ensures the `null` condition won't happen and nothing else is likely to break it, use the non-null assertion operator (`!`) - But don't blindly do so.
- Otherwise, add code to perform a `null` check by doing one of the following:
  - Throw an exception that explains why the `null` value won't be acceptable and (if applicable) what mistake may cause that wrong condition
  - Make the code no-op for `null` value, e.g. with optional chaining (`?.`)
  - Provide a fallback value, e.g. with null coalescing (`??`)

## Updating view upon change in `private`/`protected` properties

`lit-element` observes for changes in declared properties for updating the view. `carbon-web-components` codebase doesn't use this feature simply to get properties observed. Specifically, `carbon-web-components` doesn't set `private`/`protected` properties as declared. Whenever change in `private`/`protected` should cause update in the view, we take manual approach (`.requestUpdate()`).

## CSS considerations with IE11

We use ShadyCSS shim as the emulation of scoped CSS in shadow DOM in IE11. There is one notable limitation with that; It appears that `:host(bx-foo) ::slotted(bx-bar)` selector does not work in ShadyCSS unless `<slot>` is a direct child of the shadow root. There was an issue in ShadyCSS repo (https://github.com/webcomponents/shadycss/issues/5) that seems to have explained that in detail, but the repository has been deleted somehow.

To make such case work for ShadyCSS, we add a CSS class to an ancestor of `<slot>` in shadow DOM, and use `.bx-ce--some-class ::slotted(bx-bar)` selector.

## Custom element registration

This library registers custom elements to global `window` automatically upon importing the corresponding modules.
It may not be desirable in two scenarios:

- One is when consumer wants to customize our custom element's behavior before it's registered. In such case, consumer can create a derived class and register it with a different custom element name.
- Another, though the use case is rare, is using our custom element in a different realm. In such case, consumer can re-register the custom element in the realm.

## Propagating misc attributes from shadow host to an element in shadow DOM

Some components, e.g. `<bx-btn>`, simply represent the content in shadow DOM, e.g. `<button>` in it. It's sometimes desiable for applications to have control of attributes in `<button>`, for example, adding `data-` attributes there.

In such case, we let consumer create a derived class. For example, its `.attributeChangedCallback()` can propagate `<bx-btn>`'s attribute to `<button>` in it.

## Private properties

This codebase tends to make all component class/instance properties `private` unless they serve API purpose. This codebase makes some of them `protected` to support inherited components.

## Component-specific considerations

- [`<bx-tabs>`](./components/tabs/coding-conventions.md)
- [Handling `formdata` event](./components/form/form-data.md)
