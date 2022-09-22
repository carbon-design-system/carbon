# `bx-combo-box`

## `Misc attributes`

#### `should render with minimum attributes`

```
<label
  class="bx--label"
  part="label-text"
>
  <slot name="label-text">
    undefined
  </slot>
</label>
<div
  class="bx--combo-box bx--dropdown bx--list-box"
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
  >
    <input
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-label=""
      class="bx--text-input"
      id="trigger-label"
      placeholder="undefined"
      role="combobox"
    >
    <div class="bx--list-box__menu-icon">
    </div>
  </div>
</div>
<div
  class="bx--form__helper-text"
  part="helper-text"
>
  <slot name="helper-text">
    undefined
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
  class="bx--combo-box bx--dropdown bx--dropdown--invalid bx--list-box bx--list-box--disabled bx--list-box--expanded"
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
  >
    <input
      aria-autocomplete="list"
      aria-controls="menu-body"
      aria-label=""
      class="bx--text-input"
      disabled=""
      id="trigger-label"
      placeholder="trigger-content-foo"
      role="combobox"
    >
    <div
      class="bx--list-box__selection"
      id="selection-button"
      role="button"
      tabindex="0"
      title=""
    >
    </div>
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
