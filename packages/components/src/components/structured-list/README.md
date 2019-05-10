### SCSS

#### Variables

All configurable variables are located in
[src/globals/scss/\_vars.scss](https://github.com/IBM/carbon-components/blob/master/src/globals/scss/_vars.scss)

| name                       | description                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `$structured-list-padding` | Set padding value for structured-list. This will change gutter sizes between table cells. |

#### Mixins

Mixins specific to structured-list are located in
[src/components/structured-list/\_mixins.scss](https://github.com/IBM/carbon-components/blob/master/src/components/structured-list/_mixins.scss).
All mixins listed below take an optional `$padding` parameter. Default value for
`$padding` is equal to `$structured-list-padding: 2rem !default;`, which can be
overwritten.

| name                            | params     | description                                                                                                                                            |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `padding-td--condensed`         | `$padding` | Customizes padding when `.bx--structured-list--condensed` modifier class is used. Default padding is the value of `$structured-list-padding` (`2rem`). |
| `padding--data-structured-list` | `$padding` | Customizes padding. Only used when `[data-structured-list]` attribute is on HTML indicating that this component uses `<input type="radio">` controls.  |
| `padding-td`                    | `$padding` | Customizes padding for `.bx--structured-list-td`                                                                                                       |
| `padding-th`                    | `$padding` | Customizes padding for `.bx--structured-list-th`                                                                                                       |

#### Modifiers

Use these modifiers with `.bx--structured-list` class.

| Selector                               | Description                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `.bx--structured-list--border`         | Applies border around structured-list and white background-color                                             |
| `.bx--structured-list--condensed`      | Applies condensed styles for all body rows                                                                   |
| `.bx--structured-list-content--nowrap` | Applies `white-space: nowrap;` on content. Prevents titles from wrapping in small viewports.                 |
| `.bx--structured-list--selection`      | Applies styles used for selection variant of structured-list.                                                |
| `.bx--structured-list-row--selected`   | Applies modifier class to label row. This changes the background color to indicate that the row is selected. |

Use these modifiers with `.bx--structured-list-td` class.

| Selector                               | Description                               |
| -------------------------------------- | ----------------------------------------- |
| `.bx--structured-list-content--nowrap` | Applies `white-space: nowrap;` on content |

### Javascript

#### Options

| Option                | Default Selector                                      | Description                                      |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `selectorInit`        | `[data-structured-list]`                              | The selector to find the StructuredList element. |
| `selectorStepElement` | `.bx--structured-list-tbody .bx--structured-list-row` | The selector to find the step element.           |
| `classActive`         | `'bx--structured-list-row--selected'`                 | The class to indicate a selected row             |

### FAQ

#### Keydown event

Once `StructuredList` instance is initialized, use
[structured-list--selection.html](https://github.com/IBM/carbon-components/blob/master/src/components/structured-list/structured-list--selection.html)
and users will be able to make row selections with keyboard similar to radio
buttons.

- `up` and `down` arrow keys for navigation (focus and select)
- `tab` and `shift + tab` for navigation (focus only)
- `enter` and `space` for selecting

**Chrome**: `up` and `down` arrow keys will set `focus` on `<label>` elements
and associated `<input type="radio">` will recieve `checked` attribute via
`StructuredList` JavaScript.

**Firefox**: `up` and `down` arrows keys will set focus on
`<input type="radio">` through the associated `<label>` and will only set the
`checked` attribute on the input. Arrow keys will not set focus on the
`<label>`.

#### Add visual styles to text

You can add text to each cell in a structured-list. Use CSS to add visual styles
to text.

**HTML**

```html
<div class="bx--structured-list-td bold">Apache Spark</div>
```

**CSS**

```css
.bold {
  font-weight: 700;
}
```
