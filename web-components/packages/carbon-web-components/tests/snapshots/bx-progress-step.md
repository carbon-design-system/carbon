# `bx-progress-step`

## `Rendering`

#### `Should render with minimum attributes`

```
<slot>
  <p
    aria-describedby="label-tooltip"
    class="bx--progress-label"
    role="button"
    tabindex="0"
  >
  </p>
</slot>
<slot name="secondary-label-text">
</slot>
<span class="bx--progress-line">
</span>

```

#### `Should render with various attributes`

```
<slot>
  <p
    aria-describedby="label-tooltip"
    class="bx--progress-label"
    role="button"
    tabindex="0"
  >
    label-text-foo
  </p>
</slot>
<slot name="secondary-label-text">
  <p class="bx--progress-optional">
    secondary-label-text-foo
  </p>
</slot>
<span class="bx--progress-line">
</span>

```
