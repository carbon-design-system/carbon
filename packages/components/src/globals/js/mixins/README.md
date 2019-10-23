# Carbon component model

Carbon has a very simple component model for vanilla JavaScript, like below,
covering basic lifecycle of [creation](#creation)/[clean-up](#clean-up). Most of
the interface is implemented in [`create-component.js`](./create-component.js)
mixin, explained [later](#component-lifecycle-create-componentjs).

```typescript
interface Handle {
  // Clean things up, e.g. event handlers
  release(): null;
}

// No mandatory properties in component options at bare-bone component model
// (But mix-ins define ones, e.g. `.selectorInit` used for most components)
interface ComponentOptions {}

interface Component extends Handle {
  // The constructor takes the DOM element to work with, and instance-specific options
  new (element: Element, options: ComponentOptions = {});

  // List of components instantiated by this component
  // `.release()` in this component should release them
  children: Component[];

  // Factory method, checks for existing instance before calling the constructor
  static create(element: Element, options: ComponentOptions = {}): Component;

  // Registry of component instances
  static WeakMap<Element, Component> components;

  // Default options
  static ComponentOptions options;
}
```

## Example

```javascript
import { Loading } from `carbon-components`;

// Where HTML snippet like one in http://carbondesignsystem.com/components/loading/code is
const element = document.querySelector('[data-loading]');

// Instantiates `Loading` (spinner) without making it spinning
const loading = Loading.create(element, { active: false });

loading.set(true); // Starts the spinner
loading.set(false); // Stops the spinner

// Returns an existing instance if there is one, creates a new instance otherwise
console.log(Loading.create(element) === loading); // `true`

// Looks for an existing instance
console.log(Loading.components.get(element) === loading); // `true`
```

# Carbon component mixins

Carbon component mixins, based on
[Subclass Factory Pattern](https://github.com/justinfagnani/proposal-mixins#subclass-factory-pattern),
provides the basis for Carbon component classes by allowing component
implementation to compose small pieces of functionalities to base them on,
instead of introducing "fat base class".

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Component lifecycle (`create-component.js`)](#component-lifecycle-create-componentjs)
  - [Creation](#creation)
  - [Clean-up](#clean-up)
  - [Registry of component instances](#registry-of-component-instances)
- [Sugar layers for component instantiation](#sugar-layers-for-component-instantiation)
  - [Searching for DOM nodes to intantiate components on (`init-component-by-search.js`)](#searching-for-dom-nodes-to-intantiate-components-on-init-component-by-searchjs)
  - [Lazily instantiating a component upon an event on a root element (`init-component-by-event.js`)](#lazily-instantiating-a-component-upon-an-event-on-a-root-element-init-component-by-eventjs)
  - [Lazily instantiating a component upon an event on a launcher button (`init-component-by-launcher.js`)](#lazily-instantiating-a-component-upon-an-event-on-a-launcher-button-init-component-by-launcherjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Component lifecycle ([`create-component.js`](./create-component.js))

[`create-component.js`](./create-component.js) mixin covers component lifecycle,
which is, [creation](#creation) and [clean-up](#clean-up).

### Creation

[Static `.create(element)` method](https://github.com/IBM/carbon-components/blob/0336425/src/globals/js/mixins/create-component.js#L44-L46)
covers the creation part. It first checks if there is an instance of the same
component class with by looking up static `components` property for one
associated with the given `element`, and simply returns it if there is one.
Otherwise, a new instance of the component is created by calling the constructor
with the given `element` and returns the new instance.

A Carbon component works with the given `element` and its descendants to hook
event handlers on, change DOM properties of, mangle styles of, and so on. We
call it the _root element_ of the component.

```javascript
import mixin from 'carbon-components/src/globals/js/misc/mixin.js';
import createComponent from 'carbon-components/src/globals/js/mixins/create-component.js';

class MyClass extends mixin(createComponent) {
  …

  // Every component must define static `components` property
  static components = new WeakMap();

  // Every component must define static `options` property
  static options = { foo: 'foo0', bar: 'bar0' };
}

const div = document.body.appendChild(document.createElement('div'));
const options = { foo: 'foo1', baz: 'baz1' };
const myClassInstance = MyClass.create(div, options);
```

The constructor in `create-component.js` mixin sets the following properties:

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`  | The root element of the component (see above).                                                                                                                                                                                                                                                                                                                                                     |
| `options`  | The component options.                                                                                                                                                                                                                                                                                                                                                                             |
| `children` | The array of Carbon component instances that has to be released along with this component. An exanple is with [overflow menu](http://www.carbondesignsystem.com/components/overflow-menu/code) component which creates another Carbon component called [floating menu](../../../components/floating-menu/floating-menu.js), and the floating menu has to be released along with the overflow menu. |

The `.options` property inherits static `.options` property and merges in the
2nd argument of static `.create()` method. In above example, `.options` will be
equal to `{ foo: 'foo1', bar: 'bar0', baz: 'baz1' }`.

### Clean-up

[`.release()`](https://github.com/IBM/carbon-components/blob/0336425/src/globals/js/mixins/create-component.js#L51-L57)
method covers the clean-up part. It takes care of cleaning-up Carbon components
in `.children` property as well as one in static `.components` property.

If a Carbon component has other things to clean-up (e.g. event listeners), it
can override the `.release()` method and write code there to clean things up.

`.release()` method should return `null` to allow the caller of `.release()`
e.g. to assign the return value to a variable referring to Carbon component
instance, marking that the instance is gone.

### Registry of component instances

Every component must define static `components` property, which is an instance
of
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).
The constructor in `create-component.js`
[sets the component instance to static `.components` property](https://github.com/IBM/carbon-components/blob/0336425/src/globals/js/mixins/create-component.js#L37),
mapped with the DOM element the component is instantiated on. This allows
application code to grab a Carbon component instance associated with the root
element.

## Sugar layers for component instantiation

Carbon defines three types of mixins to allow applications to instantiate
components in batch. A component can inherit one of those three mixins to
support batch instantiation.

### Searching for DOM nodes to intantiate components on ([`init-component-by-search.js`](./init-component-by-search.js))

The most basic one is
[`init-component-by-search.js`](./init-component-by-search.js), which searches
for DOM elements matching component option's `.selectorInit` property.

For example, given the following HTML:

```html
<main>
  <div data-my-component>The content of component 0</div>
  <div data-my-component>The content of component 1</div>
</main>
```

The call of static `.init()` method below instantiates components on the two
`<div>`s above:

```javascript
import mixin from 'carbon-components/src/globals/js/misc/mixin.js';
import createComponent from 'carbon-components/src/globals/js/mixins/create-component.js';
import initComponentBySearch from 'carbon-components/src/globals/js/mixins/init-component-by-search.js';

class MyClass extends mixin(createComponent, initComponentBySearch) {
  …

  static components = new WeakMap();
  static options = {
    selectorInit: '[data-my-component]',
  };
}

const main = document.querySelector('main');

// Instantiates components on two `<div>`s above
MyClass.init(main);
```

### Lazily instantiating a component upon an event on a root element ([`init-component-by-event.js`](./init-component-by-event.js))

[`init-component-by-event.js`](./init-component-by-event.js) mixin allows
delaying component instantiation until an event happens on a DOM element that
will be the root element. For example, the static `.init()` method of Carbon
[`Tooltip` component](http://www.carbondesignsystem.com/components/tooltip/code)
delays instantiating the components until user hovers the mouse over a trigger
button or user puts the keyboard focus on a trigger buton.

Given the same example HTML as the one for `init-component-by-search.js` above,
the call of static `.init()` method below detects `click` events on DOM elements
with `data-my-component` attribute, and instantiates the component when such
event happens:

```javascript
import mixin from 'carbon-components/src/globals/js/misc/mixin.js';
import createComponent from 'carbon-components/src/globals/js/mixins/create-component.js';
import initComponentByEvent from 'carbon-components/src/globals/js/mixins/init-component-by-event.js';

class MyClass extends mixin(createComponent, initComponentByEvent) {
  constructor(element) {
    super(element);
    // Side note: Make sure calling `.removeEventListener()` in the `.release()` method
    element.addEventListener('click', this._handleClick);
  }

  // Called when this component is instantiated upon an event
  createdByEvent(evt) {
    this._handleClick(evt);
  }

  …

  _handleClick = evt => {
    alert('clicked!');
  };

  …

  static components = new WeakMap();
  static options = {
    selectorInit: '[data-my-component]',
    // Clicking on a DOM element with `data-my-component` attribute will instantiate this component
    initEventNames: ['click'],
  };
}

const main = document.querySelector('main');
MyClass.init(main);
```

Changing `initEventNames` option above allows you to hook more/different event
types to instantiate components upon.

`.createdByEvent()` method allows you to run an event handler of the event that
caused instantiating the component.

### Lazily instantiating a component upon an event on a launcher button ([`init-component-by-launcher.js`](./init-component-by-launcher.js))

[`init-component-by-launcher.js`](./init-component-by-launcher.js) mix-in allows
delaying component instantiation until an event happens on an element that has
semantic association to the compoennt. For example, the static `.init()` method
of Carbon
[`Modal` component](http://www.carbondesignsystem.com/components/modal/code)
delays instantiating the components until user clicks on a launcher button.

```html
<main>
  <button
    class="bx--btn bx--btn--secondary"
    type="button"
    data-my-component-target="#id-of-my-component"
  >
    Launch
  </button>
  <div data-my-component id="id-of-my-component">
    The content of my component
  </div>
</main>
```

Given the example HTML above, the call of static `.init()` method below detects
`click` events on DOM elements with `data-my-component-target` attribute, and
when one happens, looks for the DOM element the element's
`data-my-component-target` attribute points to as a selector, and instantiates a
component on the DOM element if found.

```javascript
import mixin from 'carbon-components/src/globals/js/misc/mixin.js';
import createComponent from 'carbon-components/src/globals/js/mixins/create-component.js';
import initComponentByLauncher from 'carbon-components/src/globals/js/mixins/init-component-by-launcher.js';

class MyClass extends mixin(createComponent, initComponentByLauncher) {
  …

  // Called when user clicks on the launcher button
  createdByLauncher(evt) {
    alert('launched!');
  }

  …

  static components = new WeakMap();
  static options = {
    selectorInit: '[data-my-component]',
    // Clicking on DOM elements with `data-my-component-target` attribute
    // will look for a DOM element `data-my-component-target` points to,
    // and will instantiate this component on the DOM element found
    attribInitTarget: 'data-my-component-target',
    initEventNames: ['click'],
  };
}

const main = document.querySelector('main');
MyClass.init(main);
```

Changing `attribInitTarget` option above allows you to change the attribute name
to associate a trigger button with a component's root element.

Changing `initEventNames` option above allows you to hook more/different event
types to instantiate components upon.

`.createdByLauncher()` method allows you to run an event handler of the event
that caused instantiating the component.

# Other mixins

## `evented-state.js`

In our components, oftentimes clicking a UI element implies a certain state
change. Examples are things like closing menus, opening modals, or changing a
page. In our vanilla library, we try to emit CustomEvents for these actions to
let the consuming developer respond to them with a callback function.

_Public Methods added_

- `changeState`

**\*Required** Private Methods\*

- `_changeState`

## `evented-show-hide-state.js`

This one adds hide/show methods to your component and kicks off the change
state - you're expected to add in the element that triggers the action, as well
as a callback to do something with the state change.

_Public Methods Added_

- `show`
- `hide`

## `track-blur.js`

Adds a blur handler to your component - expects a handleBlur method to be added
into the consuming component

**Required Public Methods added**

- `handleBlur`
