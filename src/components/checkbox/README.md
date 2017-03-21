### Javascript

Initializing and getting component instances.

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
      <svg class="bx--checkbox-checkmark">
        <use xlink:href="/@console/bluemix-icons/bluemix-icons.svg#checkmark"></use>
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
      <svg class="bx--checkbox-checkmark">
        <use xlink:href="/@console/bluemix-icons/bluemix-icons.svg#checkmark"></use>
      </svg>
    </span>
    <span class="bx--checkbox-label-text">Checkbox (label > input)</span>
  </label>
</div>
```
