### SCSS

#### Modifiers

Use these modifiers with `.bx--loading` class.

| Selector                     | Description                              |
| ---------------------------- | ---------------------------------------- |
| `.bx--loading--small`        | Class for small loading spinner          |
| `.bx--loading--stop`         | Class for stopping the loading animation |
| `.bx--loading-overlay--stop` | Class for hiding the overlay             |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { Loading } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var Loading = CarbonComponents.Loading;
```

#### Instantiating

```javascript
// `#my-loading` is an element with `[data-loading]` attribute
Loading.create(document.getElementById('my-loading'));
```

#### Public Methods

| Name       | Params             | Description                                                 |
| ---------- | ------------------ | ----------------------------------------------------------- |
| `release`  |                    | Deletes the instance                                        |
| `set`      | active : `Boolean` | Sets the active/inactive state                              |
| `toggle`   |                    | Toggles active/inactive state                               |
| `isActive` |                    | Returns current state                                       |
| `end`      |                    | Runs end animation and then delete the element from the DOM |

##### Example - Activating the loading spinner

```javascript
// `#my-loading` is an element with `[data-loading]` attribute
var loadingInstance = Loading.create(document.getElementById('my-loading'));
loadingInstance.set(true);
```

#### Options

| Option                    | Default Selector            | Description                                                      |
| ------------------------- | --------------------------- | ---------------------------------------------------------------- |
| `selectorInit`            | `[data-loading]`            | The CSS selector to find the loading component                   |
| `selectorLoadingOverlay`  | `.bx--loading-overlay`      | The selector for the loading overlay.                            |
| `classLoadingOverlayStop` | `bx--loading-overlay--stop` | The class for the loading overlay's stopped state.               |
| `active`                  | `true`                      | A boolean value representing the initial state of the component. |

##### Example - Activating upon instantiating

```javascript
// `#my-loading` is an element with `[data-loading]` attribute
Loading.create(document.getElementById('my-loading'), { active: true });
```
