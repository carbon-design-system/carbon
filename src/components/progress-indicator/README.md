### Javascript

[For details on initializing and getting components, look here]

#### Public Methods

| Name         | Params                          | Description                              |
|--------------|---------------------------------|------------------------------------------|
| getSteps | -               | Returns Array of Objects with `element` and `order` key/value pairs. The `element` key contains a step element. The `order` key is what order the step element is, order starts counting from 1 (the first step element) to whatever the last step element is. |
| getCurrent    | - | Returns an Object with data of the current step (`element` and `order` key/value pairs)     |
| setCurrent    | newCurrentStep: `Number` | Changes the current step with the given `index` number. (ex. `setCurrent(0)` sets the first step as the current step)     |

#### Options

| Option                | Default Selector                         |                         Description                         |
|-----------------------|------------------------------------------|-------------------------------------------------------------|
| `selectorInit`        | `[data-progress]`                          | The selector to find the ProgressIndicator element.                    |
| `selectorStepElement`        | `.bx--progress-step`                          | The selector to find the step element.                    |
| `selectorCurrent`        | `.bx--progress-step--current`                          | The selector to find the step current step element.                    |
| `selectorIncomplete`        | `.bx--progress-step--incomplete`                          | The selector to find incomplete step elements.                    |
| `selectorComplete`        | `.bx--progress-step--complete`                          | The selector to find complete step elements.                    |
| `classStep`        | `bx--progress-step`                          | ClassName for step element                    |
| `classCompleteStep`        | `bx--progress-step--complete`                          | ClassName for complete step element                    |
| `classIncompleteStep`        | `bx--progress-step--incomplete`                          | ClassName for incomplete step element                    |
| `classCurrent`        | `bx--progress-step--current`                          | ClassName for current step element                    |
