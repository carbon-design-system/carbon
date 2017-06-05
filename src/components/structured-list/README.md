### SCSS

#### Modifiers

Use these modifiers with `.bx--structured-list` class.

| Selector                             | Description                                                                                  |
|--------------------------------------|----------------------------------------------------------------------------------------------|
| .bx--structured-list--border         | Applies border around structured-list and white background-color                             |
| .bx--structured-list--condensed      | Applies condensed styles for all body rows                                                   |
| .bx--structured-list-content--nowrap | Applies `white-space: nowrap;` on content. Prevents titles from wrapping in small viewports. |


Use these modifiers with `.bx--structured-list-td` class. 

| Selector                             | Description                               |
|--------------------------------------|-------------------------------------------|
| .bx--structured-list-content--nowrap | Applies `white-space: nowrap;` on content |

### Javascript                                                                                                                                 

#### Options

| Option                | Default Selector                                      | Description                                      |
|-----------------------|-------------------------------------------------------|--------------------------------------------------|
| `selectorInit`        | `[data-structured-list]`                              | The selector to find the StructuredList element. |
| `selectorStepElement` | `.bx--structured-list-tbody .bx--structured-list-row` | The selector to find the step element.           |

### FAQ

#### Keydown event

Once `StructuredList` instance is initialized, use [structured-list--selection.html](https://github.com/carbon-design-system/carbon-components/blob/master/src/components/structured-list/structured-list--selection.html) and users will be able to make row selections with keyboard similar to radio buttons.

- `up` and `down` arrow keys for navigation (focus and select)
- `tab` and `shift + tab` for navigation (focus only)
- `enter` and `space` for selecting

**Chrome**: `up` and `down` arrow keys will set `focus` on `<label>` elements and associated `<input type="radio">` will recieve `checked` attribute via `StructuredList` JavaScript.

**Firefox**: `up` and `down` arrows keys will set focus on `<input type="radio">` through the associated `<label>` and will only set the `checked` attribute on the input. Arrow keys will not set focus on the `<label>`.
