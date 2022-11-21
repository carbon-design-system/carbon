# `bx-search`

## `Misc attributes`

#### `should render with minimum attributes`

```
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

```

#### `should render with various attributes`

```
<label
  class="bx--label"
  for="input"
  part="label-text"
>
  <slot>
    label-text-foo
  </slot>
</label>
<input
  class="bx--search-input"
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
  class="bx--search-close"
  part="close-button"
  type="button"
>
</button>

```
