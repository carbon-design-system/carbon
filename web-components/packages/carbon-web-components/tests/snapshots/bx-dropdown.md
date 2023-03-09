# `cds-dropdown`

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
  class="cds--dropdown cds--list-box cds--list-box--disabled cds--list-box--expanded"
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
    <span
      class="cds--list-box__label"
      id="trigger-label"
    >
      Option 3
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
  class="cds--form__helper-text cds--form__helper-text--disabled"
  part="helper-text"
>
  <slot name="helper-text">
    helper-text-foo
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
