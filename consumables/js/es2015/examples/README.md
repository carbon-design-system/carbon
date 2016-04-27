# Using JavaScript (ES2015)

JavaScript from Bluemix Components is written with ES2015 and is best used when your build pipeline is set up for transpiling ES2015 to ES5.

This folder contains example `.js` files of how to use JavaScript for a specific base-element or component.

Below are common class methods that are used with every base-element and component.
Continue reading for guidance on common usage.

## Class Methods

All ES2015 modules are exported as classes with a set of common methods.

Some base-elements and components go beyond simple instantiation and you may find additional methods available for use.

### `init()`

This is the simplest way to get JavaScript working on its respective base-element(s) or component(s) - `init()` is for creating multiple instances on-demand by automatically finding elements where components should be initialized.

```js
import { Loading } from 'path/to/bluemix-components/consumables/js/es2015/index';

Loading.init();
```

### `create()`

This is used inside the `init()` method and is mainly for ensuring that an instance is there for the given element. If an instance for the given element does not exist, it will create a new instance.

```js
import { Loading } from 'path/to/bluemix-components/consumables/js/es2015/index';

const element = document.querySelector('[data-loading]');

// Use create() method
const loading = Loading.create(element);

// or init() method
Loading.init(element);
```


### `release()`

This is an instance method that deletes an instance for a given element and may do additional "clean-up" depending on the component or base-element.

Since instances are managed in `components` property as a `WeakMap`, use the `release` instance method to effectively delete an instance from the `WeakMap`.

```js
import { Loading } from 'path/to/bluemix-components/consumables/js/es2015/index';

const element = document.querySelector('[data-loading]');

// After using init method
Loading.init();
[… document.querySelectorAll(‘data-loading’)].forEach((element) => {
  let instance = Loading.components.get(element);
  if (instance) {
    instance.release();
  }
});

// After using create method
const element = document.querySelector('[data-loading]');
const loading = Loading.create(element);

loading.release(element);
```

## Managing Instances

When you create a new instance of any `Class`, it's managed in a [`WeakMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) object. You can look at all existing instances by accessing the `components` property.

```js
import { Loading } from 'path/to/bluemix-components/consumables/js/es2015/index';

Loading.init();

Loading.components
// Returns WeakMap of key/value pairs (DOM object: Class instance)
// => WeakMap {div.bx--loading {} => Loading {element: div.bx--loading, active: false, ie: "no"}}
```

You can use various `WeakMap` methods on the `components` property - see [MDN - WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
