# `cds-progress-step`

## `Rendering`

####   `Should render with minimum attributes`

```
<slot>
  <p
    aria-describedby="label-tooltip"
    class="cds--progress-label"
    role="button"
    tabindex="0"
  >
    First step
  </p>
</slot>
<slot name="secondary-label-text">
</slot>
<span class="cds--progress-line">
</span>

```

####   `Should render with various attributes`

```
<slot>
  <p
    aria-describedby="label-tooltip"
    class="cds--progress-label"
    role="button"
    tabindex="0"
  >
    First step
  </p>
</slot>
<slot name="secondary-label-text">
  <p class="cds--progress-optional">
    secondary-label-text-foo
  </p>
</slot>
<span class="cds--progress-line">
</span>

```

