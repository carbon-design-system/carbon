# `cds-textarea`

## `Rendering`

####   `Should render with various attributes`

```
<div class="cds--text-area__label-wrapper">
  <label
    class="cds--label cds--label--disabled"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
</div>
<div class="cds--text-area__wrapper cds--text-area__wrapper--readonly">
  <textarea
    class="cds--text-area"
    disabled=""
    id="input"
    placeholder="placeholder-foo"
    readonly=""
    rows="4"
  >
  </textarea>
</div>
<div class="cds--form__helper-text cds--form__helper-text--disabled">
  <slot name="helper-text">
    helper-text-foo
  </slot>
</div>
<div
  class="cds--form-requirement"
  hidden=""
>
  <slot name="warn-text">
  </slot>
</div>

```

