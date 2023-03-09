# `cds-number-input`

## `Rendering`

#### `Should render with various attributes`

```
<div class="cds--number cds--number--md">
  <label
    class="cds--label cds--label--disabled"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
  <div class="cds--number__input-wrapper">
    <input
      aria-atomic="true"
      disabled=""
      id="input"
      max="200"
      min="-100"
      name="name-foo"
      placeholder="placeholder-foo"
      role="alert"
      step="1"
      type="number"
    >
    <div class="cds--number__controls">
      <button
        aria-atomic="true"
        aria-label="increase number input"
        aria-live="polite"
        class="cds--number__control-btn up-icon"
        disabled=""
        type="button"
      >
      </button>
      <button
        aria-atomic="true"
        aria-label="decrease number input"
        aria-live="polite"
        class="cds--number__control-btn down-icon"
        disabled=""
        type="button"
      >
      </button>
    </div>
  </div>
  <div class="cds--form__helper-text cds--form__helper-text--disabled">
    <slot name="helper-text">
    </slot>
  </div>
  <div
    class="cds--form-requirement"
    hidden=""
  >
    <slot name="validity-message">
    </slot>
  </div>
  <div
    class="cds--form-requirement"
    hidden=""
  >
    <slot name="validity-message-max">
    </slot>
  </div>
  <div
    class="cds--form-requirement"
    hidden=""
  >
    <slot name="validity-message-min">
    </slot>
  </div>
</div>

```
