### SCSS

#### Modifiers

Use these modifiers with `.bx--progress` class.

| Selector                       | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| .bx--progress-step--current    | Applies styles for the current progress-step   |
| .bx--progress-step--incomplete | Applies styles for an incomplete progress-step |
| .bx--progress-step--complete   | Applies styles for a complete progress-step    |

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

| Name               | Params                   | Description                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getSteps           |                          | Returns Array of Objects with `element` and `order` key/value pairs. The `element` key contains a step element. The `order` key is what order the step element is, order starts counting from 1 (the first step element) to whatever the last step element is. |
| getCurrent         |                          | Returns an Object with data of the current step (`element` and `order` key/value pairs)                                                                                                                                                                        |
| setCurrent         | newCurrentStep: `Number` | Changes the current step with the given `index` number. (ex. `setCurrent(0)` sets the first step as the current step)                                                                                                                                          |
| addOverflowTooltip |                          | Adds an overflow class that displays the tooltip if step label is truncated                                                                                                                                                                                    |

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

| Option                | Default Selector                 | Description                                                 |
| --------------------- | -------------------------------- | ----------------------------------------------------------- |
| `selectorInit`        | `[data-progress]`                | The selector to find the ProgressIndicator element          |
| `selectorStepElement` | `.bx--progress-step`             | The selector to find the step element                       |
| `selectorCurrent`     | `.bx--progress-step--current`    | The selector to find the step current step element          |
| `selectorIncomplete`  | `.bx--progress-step--incomplete` | The selector to find incomplete step elements               |
| `selectorComplete`    | `.bx--progress-step--complete`   | The selector to find complete step elements                 |
| `selectorLabel`       | `.bx---progress-label`           | The selector to find all label elements                     |
| `selectorTooltip`     | `.bx----tooltip`                 | The selector to find all tooltip elements                   |
| `selectorTooltipText` | `.bx--tooltip__text`             | The selector to find the child text of each tooltip         |
| `classStep`           | `bx--progress-step`              | ClassName for step element                                  |
| `classCurrent`        | `bx--progress-step--current`     | ClassName for current step element                          |
| `classComplete`       | `bx--progress-step--complete`    | ClassName for complete step element                         |
| `classIncomplete`     | `bx--progress-step--incomplete`  | ClassName for incomplete step element                       |
| `classOverflowLabel`  | `bx--progress-label-overflow`    | ClassName for current step element                          |
| `classTooltipMulti`   | `bx--tooltip_multi`              | ClassName for multi line tooltip element                    |
| `maxWidth`            | `81`                             | The max width of a step label before it's truncated         |
| `tooltipMinHeight`    | `21`                             | The max height before a tooltip is given a multi line class |

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
of steps. A Progress step with an overflow tooltip and optional helper text in
HTML looks like this:

```html
<li class="bx--progress-step bx--progress-step--complete">
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
    ></path>
    <path d="M7 10.8L4.5 8.3l.8-.8L7 9.2l3.7-3.7.8.8z"></path>
  </svg>
  <p
    tabindex="0"
    class="bx--progress-label bx--progress-label-overflow"
    aria-describedby="label-tooltip"
  >
    Overflow Example First step
  </p>
  <div
    id="label-tooltip"
    role="tooltip"
    data-floating-menu-direction="bottom"
    class="bx--tooltip bx--tooltip_multi"
    data-avoid-focus-on-open
  >
    <span class="bx--tooltip__caret"></span>
    <p class="bx--tooltip__text">Overflow Example First Step</p>
  </div>
  <p class="bx--progress-optional">Optional Helper Text</p>
  <span class="bx--progress-line"></span>
</li>
```

Note that each progress step will need a modifier class. In the example above,
it is `bx--progress-step--complete`, but the JavaScript will set this to the
appropriate modifier class relative to the current step as indicated by
`bx--progress-step--incomplete`.
