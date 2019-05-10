### Javascript

#### Public Methods

| Name          | Params                                       | Description                                                                                       |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `setState`    | `state`: `String` ['true', 'false', 'mixed'] | Can be used to set the checkbox to `true`(checked), `false`(unchecked) or `mixed` (indeterminate) |
| `setDisabled` | `state`: `Boolean`                           | Can be used to set the checkbox to disabled, needed for the `label > input`                       |

#### Options

| Option                              | Default Selector                     | Description                                                                |
| ----------------------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `selectorInit`                      | `.bx--checkbox`                      | The CSS selector to find checkbox                                          |
| `selectorContainedCheckboxState`    | `[data-contained-checkbox-state]`    | The CSS selector to find a container of checkbox preserving checked state  |
| `selectorContainedCheckboxDisabled` | `[data-contained-checkbox-disabled]` | The CSS selector to find a container of checkbox preserving disabled state |
| `classLabel`                        | `.bx--checkbox-label`                | The CSS class for the label                                                |
| `classLabelFocused`                 | `.bx--checkbox-label__focus`         | The CSS class for the focused label                                        |
| `attribContainedCheckboxState`      | `data-contained-checkbox-state`      | The attribute name for the checked state of contained checkbox             |
| `attribContainedCheckboxDisabled`   | `data-contained-checkbox-disabled`   | The attribute name for the disabled state of contained checkbox            |

### FAQ

#### Two ways to write checkbox HTML

Checkbox HTML can be written in two ways:

With `input` and `label` as siblings

```html
<div class="bx--form-item">
  <input
    id="bx--checkbox"
    class="bx--checkbox"
    type="checkbox"
    value="green"
    name="checkbox"
  />
  <label for="bx--checkbox" class="bx--checkbox-label">
    Checkbox (input + label)
  </label>
</div>
```

With `label` wrapping `input`

```html
<div class="bx--form-item">
  <label class="bx--checkbox-label">
    <input
      class="bx--checkbox"
      type="checkbox"
      value="yellow"
      name="checkbox"
    />
    Checkbox (label > input)
  </label>
</div>
```

Note: You no longer need to include a SVG for the checkmark to render.

#### Fieldset and Legend

As a best practice, groups of checkboxes should make use of `<fieldset>` and
`<legend>` (see Form for details). This is especially true for forms submitting
data.

But, there are exceptions to the rule. For example, Data Tables make use of
checkboxes as a way to select rows of data. Checkboxes in this context would
represent an entire row of data in its associated table row.
