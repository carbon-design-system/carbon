# `bx-textarea`

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
<div class="bx--text-area__wrapper">
  <textarea
    autocomplete=""
    autofocus=""
    class="bx--text-area bx--text-area--light bx--text-area--v2"
    cols="50"
    disabled=""
    id="input"
    name="name-foo"
    pattern="pattern-foo"
    placeholder="placeholder-foo"
    readonly=""
    required=""
    rows="4"
  >
  </textarea>
</div>
<div class="bx--form__helper-text bx--form__helper-text--disabled">
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
