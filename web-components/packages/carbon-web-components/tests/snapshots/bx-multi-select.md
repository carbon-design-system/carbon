# `cds-multi-select`

## `Misc attributes`

#### `should render with minimum attributes`

```
<label
  class="cds--label"
  hidden=""
  part="label-text"
>
  <slot name="label-text">
  </slot>
</label>
<div
  class="cds--dropdown cds--list-box"
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
    <div class="cds--list-box__menu-icon">
    </div>
  </div>
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

#### `should render with various attributes`

```
<label
  class="cds--label cds--label--disabled"
  part="label-text"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div
  class="cds--dropdown cds--dropdown--inline cds--dropdown--invalid cds--list-box cds--list-box--disabled cds--list-box--expanded cds--list-box--inline"
  data-invalid=""
  role="listbox"
>
  <div
    aria-controls="menu-body"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-labelledby="trigger-label"
    aria-owns="menu-body"
    class="cds--list-box__field"
    part="trigger-button"
    role="button"
    tabindex="0"
  >
    <div
      class="cds--list-box__selection cds--list-box__selection--multi cds--tag--filter"
      id="selection-button"
      role="button"
      tabindex="0"
      title="clear-selection-label-foo"
    >
      1
    </div>
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
      trigger-content-foo
    </span>
    <div class="cds--list-box__menu-icon cds--list-box__menu-icon--open">
    </div>
  </div>
  <div
    class="cds--list-box__menu"
    id="menu-body"
    part="menu-body"
    role="listbox"
    tabindex="-1"
  >
    <slot>
    </slot>
  </div>
</div>
<div
  class="cds--form-requirement"
  part="validity-message"
>
  <slot name="validity-message">
    validity-message-foo
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
