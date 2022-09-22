# `bx-input`

## `Rendering`

#### `Should render with various attributes`

```
<label
  class="bx--label bx--label--disabled"
  for="input"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="bx--text-input__field-wrapper">
  <input
    aria-describedby="helper-text"
    autocomplete=""
    autofocus=""
    class="bx--text-input bx--text-input--light bx--text-input--xl"
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
  class="bx--form__helper-text bx--form__helper-text--disabled"
  id="helper-text"
>
  <slot name="helper-text">
    helper-text-foo
  </slot>
</div>
<div class="bx--form-requirement">
  <slot name="validity-message">
    validity-message-foo
  </slot>
</div>

```
