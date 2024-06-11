# `cds-combo-box`

## `Misc attributes`

####   `should render with minimum attributes`

```
<label
  class="cds--label"
  hidden=""
  part="title-text"
>
  <slot name="title-text">
  </slot>
</label>
<div
  class="cds--combo-box cds--dropdown cds--list-box cds--list-box--md"
  role="listbox"
>
  <div
    aria-controls="menu-body"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="trigger-label"
    aria-owns="menu-body"
    class="cds--list-box__field"
    part="trigger-button"
  >
    <input
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-label=""
      class="cds--text-input cds--text-input--empty"
      id="trigger-label"
      placeholder=""
      role="combobox"
    >
    <div
      class="cds--list-box__menu-icon"
      id="trigger-caret"
    >
    </div>
  </div>
  <slot name="slug">
  </slot>
</div>
<div
  class="cds--form__helper-text"
  hidden=""
  part="helper-text"
>
  <slot name="helper-text">
  </slot>
</div>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="cds--assistive-text"
  role="status"
>
</div>

```

####   `should render with various attributes`

```
<label
  class="cds--label cds--label--disabled"
  hidden=""
  part="title-text"
>
  <slot name="title-text">
  </slot>
</label>
<div
  class="cds--combo-box cds--dropdown cds--dropdown--invalid cds--list-box cds--list-box--disabled cds--list-box--md"
  data-invalid=""
  role="listbox"
>
  <div
    aria-controls="menu-body"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="trigger-label"
    aria-owns="menu-body"
    class="cds--list-box__field"
    part="trigger-button"
  >
    <input
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-label=""
      class="cds--text-input"
      disabled=""
      id="trigger-label"
      placeholder=""
      role="combobox"
    >
    <div
      class="cds--list-box__menu-icon"
      id="trigger-caret"
    >
    </div>
  </div>
  <slot name="slug">
  </slot>
</div>
<div
  class="cds--form__helper-text cds--form__helper-text--disabled"
  part="helper-text"
>
  <slot name="helper-text">
  </slot>
</div>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="cds--assistive-text"
  role="status"
>
</div>

```

