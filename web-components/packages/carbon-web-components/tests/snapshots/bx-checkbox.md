# `cds-checkbox`

## `Rendering`

#### `Should render with minimum attributes`

```
<input
  aria-checked="false"
  class="cds--checkbox"
  id="checkbox"
  part="input"
  type="checkbox"
>
<label
  class="cds--checkbox-label"
  for="checkbox"
  part="label"
>
  <span class="cds--checkbox-label-text">
    <slot>
    </slot>
  </span>
</label>

```

#### `Should render with various attributes`

```
<input
  aria-checked="mixed"
  class="cds--checkbox"
  disabled=""
  id="checkbox"
  name="name-foo"
  part="input"
  type="checkbox"
  value="value-foo"
>
<label
  class="cds--checkbox-label cds--visually-hidden"
  for="checkbox"
  part="label"
>
  <span class="cds--checkbox-label-text">
    <slot>
      label-text-foo
    </slot>
  </span>
</label>

```
