# `cds-input`

## `Rendering`

#### `Should render with various attributes`

```
<label
  class="cds--label cds--label--disabled"
  for="input"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="cds--text-input__field-wrapper">
  <input
    aria-describedby="helper-text"
    autocomplete=""
    autofocus=""
    class="cds--text-input cds--text-input--light cds--text-input--xl"
    disabled=""
    id="input"
    name="name-foo"
    pattern="pattern-foo"
    placeholder="placeholder-foo"
    readonly=""
    required=""
    type="text"
  >
</div>
<div
  class="cds--form__helper-text cds--form__helper-text--disabled"
  id="helper-text"
>
  <slot name="helper-text">
    helper-text-foo
  </slot>
</div>
<div class="cds--form-requirement">
  <slot name="validity-message">
    validity-message-foo
  </slot>
</div>

```
