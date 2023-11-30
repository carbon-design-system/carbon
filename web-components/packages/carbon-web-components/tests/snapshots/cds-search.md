# `cds-search`

## `Misc attributes`

####   `should render with minimum attributes`

```
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
  autocomplete=""
  class="cds--search-input"
  id="input"
  part="input"
  placeholder="Search"
  role=""
>
<button
  aria-label=""
  class="cds--search-close cds--search-close--hidden"
  part="close-button"
  type="button"
>
</button>

```

####   `should render with various attributes`

```
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
    label-text-foo
  </slot>
</label>
<input
  autocomplete=""
  class="cds--search-input"
  disabled=""
  id="input"
  part="input"
  placeholder="placeholder-foo"
  role=""
  type="submit"
  value="value-foo"
>
<button
  aria-label=""
  class="cds--search-close"
  part="close-button"
  type="button"
>
</button>

```

