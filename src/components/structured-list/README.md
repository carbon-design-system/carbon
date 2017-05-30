### SCSS

#### Modifiers

Use these modifiers with `.bx--structured-list` class.

| Selector                        | Description                                |
|---------------------------------|--------------------------------------------|
| .bx--structured-list--border    | Applies border around structured-list      |
| .bx--structured-list--condensed | Applies condensed styles for all body rows |
| .bx--structured-list-content--nowrap | Applies `white-space: nowrap;` on content |

### Javascript                                                                                                                                 

#### Options

| Option                | Default Selector                 | Description                                         |
|-----------------------|----------------------------------|-----------------------------------------------------|
| `selectorInit`        | `[data-structured-list]`                | The selector to find the StructuredList element. |
| `selectorStepElement` | `.bx--structured-list-row`             | The selector to find the step element.              |

### FAQ

#### Keydown event

Once `StructuredList` instance is initialized, use structured-list--selection.html and users will be able to make row selections with keyboard:

- `tab` key for navigation 
- `enter` (`13`) or `space` (`32`) keys for selection 
