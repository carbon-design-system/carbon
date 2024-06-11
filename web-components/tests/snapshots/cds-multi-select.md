# `cds-multi-select`

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
  class="cds--list-box cds--list-box--md cds--multi-select"
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
    role="button"
    tabindex="0"
  >
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
    </span>
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
  class="cds--list-box cds--list-box--disabled cds--list-box--inline cds--list-box--md cds--multi-select cds--multi-select--inline cds--multi-select--invalid"
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
    role="button"
    tabindex="0"
  >
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
    </span>
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

