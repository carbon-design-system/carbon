# `cds-progress-step`

## `Rendering`

####   `Should render with minimum attributes`

```
<div
  class="cds--progress-step-button"
  tabindex="0"
>
  <slot name="label-text">
    <p
      aria-describedby="label-tooltip"
      class="cds--progress-label"
      role="button"
      title="First step"
    >
      First step
    </p>
  </slot>
  <slot name="secondary-label-text">
  </slot>
  <span class="cds--progress-line">
  </span>
</div>

```

####   `Should render with various attributes`

```
<div
  class="cds--progress-step-button"
  tabindex="0"
>
  <slot name="label-text">
    <p
      aria-describedby="label-tooltip"
      class="cds--progress-label"
      role="button"
      title="First step"
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
</div>

```

