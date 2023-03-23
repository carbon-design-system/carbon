# `cds-textarea`

## `Rendering`

####   `Should render with various attributes`

```
<label
  class="cds--label cds--label--disabled"
  for="input"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="cds--text-area__wrapper">
  <textarea
    autocomplete=""
    autofocus=""
    class="cds--text-area cds--text-area--light cds--text-area--v2"
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
<div class="cds--form__helper-text cds--form__helper-text--disabled">
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

