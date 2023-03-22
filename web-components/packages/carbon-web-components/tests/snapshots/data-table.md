# `data-table`

## `bx-table-batch-action`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div class="bx--batch-summary">
  <p class="bx--batch-summary__para">
    NaN items selected
  </p>
</div>
<div class="bx--action-list">
  <slot>
  </slot>
  <button class="bx--batch-summary__cancel bx--btn bx--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

####     `should render with various attributes`

```
<div class="bx--batch-summary">
  <p class="bx--batch-summary__para">
    3 items selected
  </p>
</div>
<div class="bx--action-list">
  <slot>
  </slot>
  <button class="bx--batch-summary__cancel bx--btn bx--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

####     `should render non-plural selected rows count`

```
<div class="bx--batch-summary">
  <p class="bx--batch-summary__para">
    1 item selected
  </p>
</div>
<div class="bx--action-list">
  <slot>
  </slot>
  <button class="bx--batch-summary__cancel bx--btn bx--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

## `bx-table-header-cell`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<slot>
</slot>

```

####     `should render with various attributes`

```
<button
  class="bx--table-sort"
  part="sort-button"
  title="
      Name
    "
>
  <span
    class="bx--table-header-label"
    part="label-text"
  >
    <slot>
    </slot>
  </span>
</button>

```

## `bx-table-row`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<slot>
</slot>

```

####     `should render with various attributes`

```
<div
  class="bx--table-column-checkbox"
  part="selection-container"
>
  <input
    class="bx--checkbox"
    disabled=""
    id="selection"
    name="selection-name-foo"
    part="selection"
    type="checkbox"
    value="selection-value-foo"
  >
  <label
    aria-label="selection-label-foo"
    class="bx--checkbox-label"
    for="selection"
  >
  </label>
</div>
<slot>
</slot>

```

## `bx-table-expand-row`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div class="bx--table-expand">
  <button class="bx--table-expand__button">
  </button>
</div>
<slot>
</slot>

```

####     `should render with various attributes`

```
<div class="bx--table-expand">
  <button class="bx--table-expand__button">
  </button>
</div>
<div
  class="bx--table-column-checkbox"
  part="selection-container"
>
  <input
    class="bx--checkbox"
    disabled=""
    id="selection"
    name="selection-name-foo"
    part="selection"
    type="checkbox"
    value="selection-value-foo"
  >
  <label
    aria-label="selection-label-foo"
    class="bx--checkbox-label"
    for="selection"
  >
  </label>
</div>
<slot>
</slot>

```

## `bx-table-toolbar-search`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div
  class="bx--search bx--search--sm"
  tabindex="0"
>
  <label
    class="bx--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    class="bx--search-input"
    id="input"
    part="input"
    role="searchbox"
  >
  <button
    aria-label=""
    class="bx--search-close bx--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>

```

####     `should render with various attributes`

```
<div
  class="bx--search bx--search--xl"
  tabindex="-1"
>
  <label
    class="bx--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    class="bx--search-input"
    id="input"
    part="input"
    role="searchbox"
  >
  <button
    aria-label=""
    class="bx--search-close bx--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>

```

## `Misc attributes`

####   `should render with minimum attributes`

```
<div
  class="bx--search bx--search--sm"
  tabindex="0"
>
  <label
    class="bx--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    class="bx--search-input"
    id="input"
    part="input"
    role="searchbox"
  >
  <button
    aria-label=""
    class="bx--search-close bx--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>
```

####   `should render with various attributes`

```
<div
  class="bx--search bx--search--xl"
  tabindex="-1"
>
  <label
    class="bx--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    class="bx--search-input"
    id="input"
    part="input"
    role="searchbox"
  >
  <button
    aria-label=""
    class="bx--search-close bx--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>
```

