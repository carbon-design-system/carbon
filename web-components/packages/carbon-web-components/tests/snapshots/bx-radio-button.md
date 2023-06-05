# `bx-radio-button`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  class="bx--radio-button"
  id="input"
  tabindex="-1"
  type="radio"
  value="staging"
>
<label
  class="bx--radio-button__label"
  for="input"
>
  <span class="bx--radio-button__appearance">
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
  class="bx--radio-button"
  disabled=""
  id="input"
  name="name-foo"
  tabindex="0"
  type="radio"
  value="staging"
>
<label
  class="bx--radio-button__label"
  for="input"
>
  <span class="bx--radio-button__appearance">
  </span>
  <span class="bx--visually-hidden">
    <slot>
      label-text-foo
    </slot>
  </span>
</label>

```

