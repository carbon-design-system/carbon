### JavaScript

#### Functions

| Name         | Params          | Description                                                                                                                                                                      |
|--------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| initCheckbox | doc : `Object`  | Watches for change in checkbox in the given document. This will use listener function to force change checked attribute so that DOM mutation overserver in svgxuse is triggered. |
| listener     | event : `Event` | Callback function used in initCheckbox function. On change events, checks if a checkbox input is checked and will set or remove checked attribute accordingly                    |

### FAQ

#### Two ways to write checkbox HTML

Checkbox HTML can be written in two ways:

With `input` and `label` as siblings

```html
<div class="bx--form-item">
  <input id="bx--checkbox" class="bx--checkbox" type="checkbox" value="green" name="checkbox">
  <label for="bx--checkbox" class="bx--checkbox-label">
    <span class="bx--checkbox-appearance">
      <svg class="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
        <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
      </svg>
    </span>
    Checkbox (input + label)
  </label>
</div>
```

With `label` wrapping `input`

```html
<div class="bx--form-item">
  <label class="bx--checkbox-label">
    <input class="bx--checkbox" type="checkbox" value="yellow" name="checkbox">
    <span class="bx--checkbox-appearance">
      <svg class="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
        <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
      </svg>
    </span>
    <span class="bx--checkbox-label-text">Checkbox (label > input)</span>
  </label>
</div>
```

Also note that it's now recommended to use inline SVG when possible.

#### Fieldset and Legend

As a best practice, groups of checkboxes should make use of `<fieldset>` and `<legend>` (see Form for details).
This is especially true for forms submitting data.

But, there are exceptions to the rule. For example, Data Tables make use of checkboxes as a way to select rows of data. 
Checkboxes in this context would represent an entire row of data in its associated table row.



