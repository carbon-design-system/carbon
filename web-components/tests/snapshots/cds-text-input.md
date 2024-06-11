# `cds-text-input`

## `Rendering`

####   `Should render with various attributes`

```
<div class="cds--form-item cds--text-input-wrapper">
  <div class="cds--text-input__label-wrapper">
  </div>
  <div class="cds--text-input__field-outer-wrapper">
    <div class="cds--text-input__field-wrapper">
      <input
        aria-describedby="helper-text"
        class="cds--text-input cds--text-input--md"
        id="input"
        type="text"
      >
    </div>
    <div
      class="cds--form-requirement"
      hidden=""
    >
      <slot name="">
      </slot>
    </div>
  </div>
</div>

```

