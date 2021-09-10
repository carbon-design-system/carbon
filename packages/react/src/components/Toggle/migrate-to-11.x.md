# Toggle

## Markup

| Change                                                                                                                       | Rationale                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The underlying element was changed from a checkbox (`<input type="checkbox">`) to a switch button (`<button role="switch">`) | <ul> <li>The switch button better resembles the toggle component from an accessibility standpoint: _"A type of checkbox that represents on/off values, as opposed to checked/unchecked values" (https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#switch)_</li> <li>A toggle cannot present a mixed state which a checkbox can</li> <li>A switch button natively supports being toggled on <kbd>Enter</kbd></li> </ul> |
| `props['aria-label']` is no longer required                                                                                  | The new markup ensures `props.labelText` will always be available to screen readers without the use of `aria-label`                                                                                                                                                                                                                                                                                                        |

### New markup

```html
<div class="bx--toggle">
  <button
    id="toggle-id"
    class="bx--toggle__button"
    role="switch"
    type="button"
    aria-checked="true"
  ></button>
  <label class="bx--toggle__label" for="toggle-id">
    <span class="bx--toggle__label-text bx--visually-hidden">Toggle label</span>
    <div class="bx--toggle__appearance">
      <span class="bx--toggle__text" aria-hidden="true">On</span>
    </div>
  </label>
</div>
```

### Old markup

```html
<div class="bx--form-item">
  <input type="checkbox" id="toggle-id" class="bx--toggle-input" checked />
  <label class="bx--toggle-input__label" for="toggle-id">
    Toggle label
    <span class="bx--toggle__switch">
      <span class="bx--toggle__text--off" aria-hidden="true">Off</span>
      <span class="bx--toggle__text--on" aria-hidden="true">On</span>
    </span>
  </label>
</div>
```

## Props

| v7           | v11         | Note                                                                                         |
| :----------- | :---------- | :------------------------------------------------------------------------------------------- |
| `aria-label` | -           | Removed. No longer required. If still passed, it will be emitted on the `<button>` element.  |
| -            | `hideLabel` | New. Visually hides the label above the toggle while keeping it available to screen readers. |
| `onChange`   | -           | Removed. Not available on `<button>` elements.                                               |
| -            | `onClick`   | New. To substitute previous `props.onChange`.                                                |
| `labelA`     | `labelA`    | Made optional. Default: "Off".                                                               |
| `labelB`     | `labelB`    | Made optional. Default: "On".                                                                |
