# `data-table`

## `cds-table-batch-action`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div class="cds--batch-summary">
  <p class="cds--batch-summary__para">
    0 item selected
  </p>
</div>
<div class="cds--action-list">
  <slot>
  </slot>
  <button class="cds--batch-summary__cancel cds--btn cds--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

####     `should render with various attributes`

```
<div class="cds--batch-summary">
  <p class="cds--batch-summary__para">
    3 items selected
  </p>
</div>
<div class="cds--action-list">
  <slot>
  </slot>
  <button class="cds--batch-summary__cancel cds--btn cds--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

####     `should render non-plural selected rows count`

```
<div class="cds--batch-summary">
  <p class="cds--batch-summary__para">
    1 item selected
  </p>
</div>
<div class="cds--action-list">
  <slot>
  </slot>
  <button class="cds--batch-summary__cancel cds--btn cds--btn--primary">
    <slot name="cancel-button-content">
      Cancel
    </slot>
  </button>
</div>

```

## `cds-table-header-cell`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<span
  class="cds--table-header-label"
  part="label-text"
>
  <slot>
  </slot>
  <slot name="slug">
  </slot>
</span>

```

####     `should render with various attributes`

```
<button
  class="cds--table-sort"
  part="sort-button"
  title="
      Name
    "
>
  <span class="cds--table-sort__flex">
    <span
      class="cds--table-header-label"
      part="label-text"
    >
      <slot>
      </slot>
    </span>
    <slot name="slug">
    </slot>
  </span>
</button>

```

## `cds-table-row`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<slot>
</slot>

```

####     `should render with various attributes`

```
<div class="cds--table-column-checkbox">
  <div>
    <slot name="slug">
    </slot>
    <cds-checkbox
      checked=""
      data-table=""
      disabled=""
      hide-label=""
      label-text="selection-label-foo"
      name="selection-name-foo"
      value="selection-value-foo"
    >
    </cds-checkbox>
  </div>
</div>
<slot>
</slot>

```

## `cds-table-toolbar-search`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div
  class="cds--search cds--search--lg"
  tabindex="0"
>
  <div class="cds--search-magnifier">
    <slot name="icon">
    </slot>
  </div>
  <label
    class="cds--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    autocomplete="off"
    class="cds--search-input"
    id="input"
    part="input"
    placeholder="Search"
    role="search"
  >
  <button
    aria-label=""
    class="cds--search-close cds--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>

```

####     `should render with various attributes`

```
<div
  class="cds--search cds--search--xl"
  tabindex="-1"
>
  <div class="cds--search-magnifier">
    <slot name="icon">
    </slot>
  </div>
  <label
    class="cds--label"
    for="input"
    part="label-text"
  >
    <slot>
    </slot>
  </label>
  <input
    autocomplete="off"
    class="cds--search-input"
    id="input"
    part="input"
    placeholder="Search"
    role="search"
  >
  <button
    aria-label=""
    class="cds--search-close cds--search-close--hidden"
    part="close-button"
    type="button"
  >
  </button>
</div>

```

## `cds-table-expand-row`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div class="cds--table-expand">
  <button class="cds--table-expand__button">
  </button>
</div>
<slot>
</slot>
```

####     `should render with various attributes`

```
<div class="cds--table-expand">
  <button class="cds--table-expand__button">
  </button>
</div>
<div
  class="cds--table-column-checkbox"
  part="selection-container"
>
  <input
    class="cds--checkbox"
    disabled=""
    hide-label=""
    label-text="selection-label-foo"
    name="selection-name-foo"
    value="selection-value-foo"
  >
</div>
<slot>
</slot>
  <label
    aria-label="selection-label-foo"
    class="cds--checkbox-label"
    for="selection"
  >
  </label>
</div>
<slot>
</slot>
```

