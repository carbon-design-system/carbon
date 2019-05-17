### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { InlineLoading } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var InlineLoading = CarbonComponents.InlineLoading;
```

#### Instantiating

```javascript
// `#my-inline-loading` is an element with `[data-inline-loading]` attribute
InlineLoading.create(document.getElementById('my-inline-loading'));
```

#### Static properties

| Name   | Type   | Description                                                                  |
| ------ | ------ | ---------------------------------------------------------------------------- |
| states | Object | The loading states. Contains `INACTIVE`, `ACTIVE` and `FINISHED` properties. |

#### Public Methods

| Name       | Params           | Description                             |
| ---------- | ---------------- | --------------------------------------- |
| `release`  |                  | Deletes the instance                    |
| `setState` | state : `string` | Sets the active/inactive/finished state |

##### Example - Transitioning the loading spinner to the finished state

```javascript
// `#my-inline-loading` is an element with `[data-inline-loading]` attribute
var inlineLoadingInstance = InlineLoading.create(
  document.getElementById('my-inline-loading')
);
inlineLoadingInstance.setState(InlineLoading.states.FINISHED);
```

#### Options

| Option                 | Default Selector                      | Description                                                     |
| ---------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `selectorInit`         | `[data-inline-loading]`               | The CSS selector to find the inline loading components          |
| `selectorSpinner`      | `[data-inline-loading-spinner]`       | The CSS selector to find the spinner                            |
| `selectorFinished`     | `[data-inline-loading-finished]`      | The CSS selector to find the "finished" icon                    |
| `selectorTextActive`   | `[data-inline-loading-text-active]`   | The CSS selector to find the text describing the active state   |
| `selectorTextFinished` | `[data-inline-loading-text-finished]` | The CSS selector to find the text describing the finished state |
| `classLoadingStop`     | `.bx--loading--stop`                  | The CSS class for spinner's stopped state                       |
