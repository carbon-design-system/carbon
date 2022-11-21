# `bx-pagination`

## `Misc attributes`

#### `should render <bx-pagination> with minimum attributes`

```
<div class="bx--pagination__left">
  <slot name="page-sizes-select">
  </slot>
  <div class="bx-ce--pagination__divider">
  </div>
  <span class="bx--pagination__items-count bx--pagination__text">
    Item 1–10
  </span>
</div>
<div class="bx-ce--pagination__divider">
</div>
<div class="bx--pagination__right">
  <slot>
  </slot>
  <div class="bx--pagination__control-buttons">
    <button
      class="bx--pagination__button bx--pagination__button--backward bx--pagination__button--no-index"
      disabled=""
      title="Previous page"
    >
    </button>
    <button
      class="bx--pagination__button bx--pagination__button--forward"
      title="Next page"
    >
    </button>
  </div>
</div>

```

#### `should render <bx-pagination> with various attributes`

```
<div class="bx--pagination__left">
  <slot name="page-sizes-select">
  </slot>
  <div class="bx-ce--pagination__divider">
  </div>
  <span class="bx--pagination__items-count bx--pagination__text">
    11–30 of 200 items
  </span>
</div>
<div class="bx-ce--pagination__divider">
</div>
<div class="bx--pagination__right">
  <slot>
  </slot>
  <div class="bx--pagination__control-buttons">
    <button
      class="bx--pagination__button bx--pagination__button--backward"
      title="Previous page"
    >
    </button>
    <button
      class="bx--pagination__button bx--pagination__button--forward"
      title="Next page"
    >
    </button>
  </div>
</div>

```

#### `should render <bx-page-sizes-select> with minimum attributes`

```
<label
  class="bx--pagination__text"
  for="select"
>
  <slot name="label-text">
    Items per page:
  </slot>
</label>
<div class="bx--select__item-count">
  <select
    class="bx--select-input"
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

#### `should render <bx-pages-select> with minimum attributes`

```
<div class="bx--select__page-number">
  <label
    class="bx--label bx--visually-hidden"
    for="select"
  >
    Page number, of 10 pages
  </label>
  <select class="bx--select-input">
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
<span class="bx--pagination__text">
  of 10 pages
</span>

```
