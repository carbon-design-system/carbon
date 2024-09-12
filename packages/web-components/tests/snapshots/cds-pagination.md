# `cds-pagination`

## `Misc attributes`

#### `should render <cds-pagination> with minimum attributes`

```
<div class="cds--pagination__left">
  <slot name="page-sizes-select">
  </slot>
  <div class="cds-ce--pagination__divider">
  </div>
  <span class="cds--pagination__items-count cds--pagination__text">
    Item 1–10
  </span>
</div>
<div class="cds-ce--pagination__divider">
</div>
<div class="cds--pagination__right">
  <slot>
  </slot>
  <div class="cds--pagination__control-buttons">
    <button
      class="cds--pagination__button cds--pagination__button--backward cds--pagination__button--no-index"
      disabled=""
      title="Previous page"
    >
    </button>
    <button
      class="cds--pagination__button cds--pagination__button--forward"
      title="Next page"
    >
    </button>
  </div>
</div>

```

#### `should render <cds-pagination> with various attributes`

```
<div class="cds--pagination__left">
  <slot name="page-sizes-select">
  </slot>
  <div class="cds-ce--pagination__divider">
  </div>
  <span class="cds--pagination__items-count cds--pagination__text">
    11–30 of 200 items
  </span>
</div>
<div class="cds-ce--pagination__divider">
</div>
<div class="cds--pagination__right">
  <slot>
  </slot>
  <div class="cds--pagination__control-buttons">
    <button
      class="cds--pagination__button cds--pagination__button--backward"
      title="Previous page"
    >
    </button>
    <button
      class="cds--pagination__button cds--pagination__button--forward"
      title="Next page"
    >
    </button>
  </div>
</div>

```

#### `should render <cds-page-sizes-select> with minimum attributes`

```
<label
  class="cds--pagination__text"
  for="select"
>
  <slot name="label-text">
    Items per page:
  </slot>
</label>
<div class="cds--select__item-count">
  <select
    class="cds--select-input"
    id="select"
  >
    <option value="10">
      10
    </option>
    <option value="20">
      20
    </option>
    <option value="30">
      30
    </option>
  </select>
</div>
<div hidden="">
  <slot>
  </slot>
</div>

```

#### `should render <cds-pages-select> with minimum attributes`

```
<div class="cds--select__page-number">
  <label
    class="cds--label cds--visually-hidden"
    for="select"
  >
    Page number, of 10 pages
  </label>
  <select class="cds--select-input">
    <option
      selected=""
      value="0"
    >
      1
    </option>
    <option value="1">
      2
    </option>
    <option value="2">
      3
    </option>
    <option value="3">
      4
    </option>
    <option value="4">
      5
    </option>
    <option value="5">
      6
    </option>
    <option value="6">
      7
    </option>
    <option value="7">
      8
    </option>
    <option value="8">
      9
    </option>
    <option value="9">
      10
    </option>
  </select>
</div>
<span class="cds--pagination__text">
  of 10 pages
</span>

```
