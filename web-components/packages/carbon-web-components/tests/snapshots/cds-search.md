# `cds-search`

## `Misc attributes`

####   `should render with minimum attributes`

```
<label
  class="cds--label"
  for="input"
  part="label-text"
>
  <slot>
  </slot>
</label>
<input
  class="cds--search-input"
  id="input"
  part="input"
  role="searchbox"
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
  class="cds--search-input"
  disabled=""
  id="input"
  name="name-foo"
  part="input"
  placeholder="placeholder-foo"
  role="searchbox"
  type="submit"
  value="value-foo"
>
<button
  aria-label="close-button-assistive-text-foo"
  class="cds--search-close"
  part="close-button"
  type="button"
>
</button>

```

