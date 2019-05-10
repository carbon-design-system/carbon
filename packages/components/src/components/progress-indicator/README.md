### SCSS

#### Modifiers

Use these modifiers with `.bx--progress` class.

| Selector                         | Description                                    |
| -------------------------------- | ---------------------------------------------- |
| `.bx--progress-step--current`    | Applies styles for the current progress-step   |
| `.bx--progress-step--incomplete` | Applies styles for an incomplete progress-step |
| `.bx--progress-step--complete`   | Applies styles for a complete progress-step    |

### Javascript

#### Getting component class reference

##### ES2015

```javascript
import { ProgressIndicator } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var ProgressIndicator = CarbonComponents.ProgressIndicator;
```

#### Instantiating

```javascript
// `#my-progress` is an element with `[data-progress]` attribute
ProgressIndicator.create(document.getElementById('my-progress'));
```

#### Public Methods

| Name         | Params                     | Description                                                                                                                                                                                                                                                    |
| ------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getSteps`   |                            | Returns Array of Objects with `element` and `order` key/value pairs. The `element` key contains a step element. The `order` key is what order the step element is, order starts counting from 1 (the first step element) to whatever the last step element is. |
| `getCurrent` |                            | Returns an Object with data of the current step (`element` and `order` key/value pairs)                                                                                                                                                                        |
| `setCurrent` | `newCurrentStep`: `Number` | Changes the current step with the given `index` number. (ex. `setCurrent(0)` sets the first step as the current step)                                                                                                                                          |

##### Example - Changing the current step

```javascript
// `#my-progress` is an element with `[data-progress]` attribute
var progressIndicatorInstance = ProgressIndicator.create(
  document.getElementById('my-progress')
);
// Sets the 2nd step current
progressIndicatorInstance.setCurrent(1);
```

- All index numbers less than the current index will be complete
- All index numbers greater than the current index will be incomplete

#### Options

| Option                | Default Selector                 | Description                                         |
| --------------------- | -------------------------------- | --------------------------------------------------- |
| `selectorInit`        | `[data-progress]`                | The selector to find the ProgressIndicator element. |
| `selectorStepElement` | `.bx--progress-step`             | The selector to find the step element.              |
| `selectorCurrent`     | `.bx--progress-step--current`    | The selector to find the step current step element. |
| `selectorIncomplete`  | `.bx--progress-step--incomplete` | The selector to find incomplete step elements.      |
| `selectorComplete`    | `.bx--progress-step--complete`   | The selector to find complete step elements.        |
| `classStep`           | `bx--progress-step`              | ClassName for step element                          |
| `classCompleteStep`   | `bx--progress-step--complete`    | ClassName for complete step element                 |
| `classIncompleteStep` | `bx--progress-step--incomplete`  | ClassName for incomplete step element               |
| `classCurrent`        | `bx--progress-step--current`     | ClassName for current step element                  |

#### Classes

| Name                            | Description                              |
| ------------------------------- | ---------------------------------------- |
| `bx--progress-step`             | The class for a step element             |
| `bx--progress-step--complete`   | The class for a complete step element    |
| `bx--progress-step--incomplete` | The class for an incomplete step element |
| `bx--progress-step--current`    | The class for a current step element     |

### FAQ

#### Adding or removing Progress steps

Once `ProgressIndicator` instance is initialized, simply add or remove Progress
steps in the HTML. The JavaScript will automatically accommodate for any number
of steps. A Progress step in HTML looks like this:

```html
<li class="bx--progress-step bx--progress-step--complete">
  <svg width="24px" height="24px" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12"></circle>
    <polygon
      points="10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6"
    ></polygon>
  </svg>
  <p class="bx--progress-label">Label 1</p>
  <span class="bx--progress-line"></span>
</li>
```

Note that each progress step will need a modifier class. In the example above,
it is `bx--progress-step--complete`, but the JavaScript will set this to the
appropriate modifier class relative to the current step as indicated by
`bx--progress-step--incomplete`.
