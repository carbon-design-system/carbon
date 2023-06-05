# `bx-number-input`

## `Rendering`

####   `Should render with various attributes`

```
<div class="bx--number bx--number--md">
  <label
    class="bx--label bx--label--disabled"
    for="input"
  >
    <slot name="label-text">
    </slot>
  </label>
  <div class="bx--number__input-wrapper">
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
    <div class="bx--number__controls">
      <button
        aria-atomic="true"
        aria-label="increase number input"
        aria-live="polite"
        class="bx--number__control-btn up-icon"
        disabled=""
        type="button"
      >
      </button>
      <button
        aria-atomic="true"
        aria-label="decrease number input"
        aria-live="polite"
        class="bx--number__control-btn down-icon"
        disabled=""
        type="button"
      >
      </button>
    </div>
  </div>
  <div class="bx--form__helper-text bx--form__helper-text--disabled">
    <slot name="helper-text">
    </slot>
  </div>
  <div
    class="bx--form-requirement"
    hidden=""
  >
    <slot name="validity-message">
    </slot>
  </div>
  <div
    class="bx--form-requirement"
    hidden=""
  >
    <slot name="validity-message-max">
    </slot>
  </div>
  <div
    class="bx--form-requirement"
    hidden=""
  >
    <slot name="validity-message-min">
    </slot>
  </div>
</div>

```

