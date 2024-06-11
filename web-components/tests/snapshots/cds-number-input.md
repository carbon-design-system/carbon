# `cds-number-input`

## `Rendering`

####   `Should render with various attributes`

```
<div class="cds--number cds--number--md cds--number--readonly">
  <label
    class="cds--label"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
  <div class="cds--number__input-wrapper">
    <input
      aria-atomic="true"
      autocomplete=""
      id="input"
      max="200"
      min="-100"
      readonly=""
      role="alert"
      step="1"
      type="number"
    >
    <slot name="slug">
    </slot>
    <div class="cds--number__controls">
      <button
        aria-atomic="true"
        aria-label="decrease number input"
        aria-live="polite"
        class="cds--number__control-btn down-icon"
        type="button"
      >
      </button>
      <div class="cds--number__rule-divider">
      </div>
      <button
        aria-atomic="true"
        aria-label="increase number input"
        aria-live="polite"
        class="cds--number__control-btn up-icon"
        type="button"
      >
      </button>
      <div class="cds--number__rule-divider">
      </div>
    </div>
  </div>
  <div class="cds--form__helper-text">
    <slot name="helper-text">
      helper-text-foo
    </slot>
  </div>
  <div
    class="cds--form-requirement"
    hidden=""
  >
    <slot name="">
    </slot>
  </div>
</div>

```

