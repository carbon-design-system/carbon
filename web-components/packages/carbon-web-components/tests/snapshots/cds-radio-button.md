# `cds-radio-button`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  class="cds--radio-button"
  id="input"
  tabindex="-1"
  type="radio"
  value="staging"
>
<label
  class="cds--radio-button__label"
  for="input"
>
  <span class="cds--radio-button__appearance">
  </span>
  <span>
    <slot>
    </slot>
  </span>
</label>

```

####   `Should render with various attributes`

```
<input
  class="cds--radio-button"
  disabled=""
  id="input"
  name="name-foo"
  tabindex="0"
  type="radio"
  value="staging"
>
<label
  class="cds--radio-button__label"
  for="input"
>
  <span class="cds--radio-button__appearance">
  </span>
  <span class="cds--visually-hidden">
    <slot>
      label-text-foo
    </slot>
  </span>
</label>

```

