# `cds-toggle`

## `Rendering`

####   `Should render with minimum attributes`

```
<button
  aria-checked="false"
  aria-lable=""
  class="cds--toggle__button"
  role="switch"
  type="button"
>
</button>
<label
  class="cds--toggle__label"
  for=""
>
  <span class="cds--toggle__label-text">
    Toggle element label
  </span>
  <div class="cds--toggle__appearance">
    <div class="cds--toggle__switch">
    </div>
    <span
      aria-hidden="true"
      class="cds--toggle__text"
    >
    </span>
  </div>
</label>

```

####   `Should render with various attributes`

```
<button
  aria-checked="true"
  aria-lable="label-text-foo"
  class="cds--toggle__button"
  disabled=""
  name="name-foo"
  role="switch"
  type="button"
  value="value-foo"
>
</button>
<label
  class="cds--toggle__label"
  for=""
>
  <span class="cds--toggle__label-text">
    Toggle element label
  </span>
  <div class="cds--toggle__appearance cds--toggle__appearance--small">
    <div class="cds--toggle__switch cds--toggle__switch--checked">
    </div>
    <span
      aria-hidden="true"
      class="cds--toggle__text"
    >
      checked-text-foo
    </span>
  </div>
</label>

```

