# `cds-checkbox`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  aria-checked="false"
  aria-readonly="false"
  class="cds--checkbox"
  id="checkbox"
  part="input"
  type="checkbox"
>
<label
  class="cds--checkbox-label"
  for="checkbox"
  part="label"
  title=""
>
  <span class="cds--checkbox-label-text">
    <slot>
      Checkbox label
    </slot>
  </span>
</label>

```

####   `Should render with various attributes`

```
<input
  aria-checked="mixed"
  aria-readonly="false"
  class="cds--checkbox"
  disabled=""
  id="checkbox"
  part="input"
  type="checkbox"
>
<label
  class="cds--checkbox-label"
  for="checkbox"
  part="label"
  title=""
>
  <span class="cds--checkbox-label-text cds--visually-hidden">
    <slot>
      label-text-foo
    </slot>
  </span>
</label>

```

