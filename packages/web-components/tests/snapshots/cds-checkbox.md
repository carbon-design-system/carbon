# `cds-checkbox`

## `Rendering`

####   `Should render with minimum attributes`

```
<input
  aria-checked="true"
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
    </slot>
  </span>
</label>
<slot name="slug">
</slot>
<div class="cds--checkbox__validation-msg">
</div>

```

####   `Should render with various attributes`

```
<input
  aria-checked="true"
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
  <span class="cds--checkbox-label-text">
    <slot>
    </slot>
  </span>
</label>
<slot name="slug">
</slot>
<div class="cds--checkbox__validation-msg">
</div>

```

