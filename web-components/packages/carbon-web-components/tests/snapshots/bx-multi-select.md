# `bx-multi-select`

## `Misc attributes`

#### `should render with minimum attributes`

```
<label
  class="bx--label"
  hidden=""
  part="label-text"
>
  <slot name="label-text">
  </slot>
</label>
<div
  class="bx--dropdown bx--list-box"
  role="listbox"
>
  <div
    aria-controls="menu-body"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="trigger-label"
    aria-owns="menu-body"
    class="bx--list-box__field"
    part="trigger-button"
    role="button"
    tabindex="0"
  >
    <span
      class="bx--list-box__label"
      id="trigger-label"
    >
    </span>
    <div class="bx--list-box__menu-icon">
    </div>
  </div>
</div>
<div
  class="bx--form__helper-text"
  hidden=""
  part="helper-text"
>
  <slot name="helper-text">
  </slot>
</div>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="bx--assistive-text"
  role="status"
>
</div>

```

#### `should render with various attributes`

```
<label
  class="bx--label bx--label--disabled"
  part="label-text"
>
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div
  class="bx--dropdown bx--dropdown--inline bx--dropdown--invalid bx--list-box bx--list-box--disabled bx--list-box--expanded bx--list-box--inline"
  data-invalid=""
  role="listbox"
>
  <div
    aria-controls="menu-body"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-labelledby="trigger-label"
    aria-owns="menu-body"
    class="bx--list-box__field"
    part="trigger-button"
    role="button"
    tabindex="0"
  >
    <div
      class="bx--list-box__selection bx--list-box__selection--multi bx--tag--filter"
      id="selection-button"
      role="button"
      tabindex="0"
      title="clear-selection-label-foo"
    >
      1
    </div>
    <span
      class="bx--list-box__label"
      id="trigger-label"
    >
      trigger-content-foo
    </span>
    <div class="bx--list-box__menu-icon bx--list-box__menu-icon--open">
    </div>
  </div>
  <div
    class="bx--list-box__menu"
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
  class="bx--form-requirement"
  part="validity-message"
>
  <slot name="validity-message">
    validity-message-foo
  </slot>
</div>
<div
  aria-live="assertive"
  aria-relevant="additions text"
  class="bx--assistive-text"
  role="status"
>
</div>

```
