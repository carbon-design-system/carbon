# `js`

This is where we keep all JavaScript files that are consumed by the user.
Bluemix Components uses ES2015 (ES5-compatible files are also made consumable for prototyping).

`js` directory looks like this:
```
js
├── es2015
│   ├── fab.js
│   ├── file.js
│   ├── header.js
│   ├── modals.js
│   ├── overflow-menu.js
│   ├── spinner.js
│   ├── tabs-nav.js
│   ├── toolbars.js
│   └── index.js
├── es5
│   ├── bluemix-components.js
│   ├── bluemix-components.js.map
│   ├── bluemix-components.min.js
│   └── bluemix-components.min.js.map
└── polyfills
    ├── array-from.js
    ├── custom-event.js
    ├── event-matches.js
    └── object-assign.js
```
* `es2015`: JavaScript modules written with es2015
* `es5`: ES5-compatible scripts that can be used for prototyping.
* `polyfills`: These are polyfills for cross-browser compatibility.

## How It Works

### ES2015

Each ES2015 module (`_modal.js`, `_spinner.js`, etc) is exported as a `Class` using `export`.

```js
export default class OverflowMenu {
  constructor(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new TypeError('DOM element should be given to initialize this widget.');
    }
  }
  //... truncated for brevity
}
```

The `index.js` file imports each ES2015 module with `import` and re-exports them for the user to consume the from `index.js` file - this also imports other Polyfills from `node_modules` like `svgxuse`.

```js
// Polyfills
// -------------
import 'svgxuse';

// Base Elements & Components
// ---------------------------
import FileUploader from './file';
import FabButton from './fab';
import Tab from './tabs-nav';
import OverflowMenu from './overflow-menu';
import Modal from './modals';
import HeaderNav from './header';
import Toolbars from './toolbars';
import Spinner from './spinner';

// Export all classes for consumption:
// -----------------------------------
export {
  FabButton,
  FileUploader,
  Tab,
  OverflowMenu,
  Modal,
  HeaderNav,
  Toolbars,
  Spinner,
};
```

These classes can now be consumed in a project with named imports like this:

```js
import { FabButton, FileUploader } from './relative/path/to/index';
```

Users can then choose how they instantiate these classes.

Automatically instantiate (recommended)
```js
FabButton.init();
FileUploader.init();
```

Create an instance of a class:
```js
const element = document.querySelector('.puppy');
const anotherElement = document.querySelector('.koala');

FabButton.create(element);
FileUploader.create(anotherElement);

```

For more details on our Class API, see [examples]().

### ES5 (prototyping)

ES5-compatible js files are also available for prototyping purposes.

Include it in your HTML file as an external script.
By default, the JavaScript will automatically instantiate but you can turn off this feature by setting  `BluemixComponents.settings.disableAutoInit = true`.

```html
<script src="path/to/bluemix-components/consumables/js/es5/bluemix-components.min.js"></script>
<!-- Disable Auto Init with this flag -->
<!-- true = JavaScript will not instantiate automatically -->
<!-- false = JavaScript will instantiate automatically -->
<script>
  BluemixComponents.settings.disableAutoInit = true;
</script>
```
