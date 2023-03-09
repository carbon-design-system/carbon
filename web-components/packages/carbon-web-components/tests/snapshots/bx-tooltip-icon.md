# `cds-tooltip-icon`

## `Rendering`

#### `Should render with minimum attributes`

```
<button
  aria-describedby="tooltip-body"
  class="cds--tooltip--a11y cds--tooltip--align-center cds--tooltip--bottom cds--tooltip__trigger"
>
  <span
    class="cds--assistive-text"
    id="tooltip-body"
    role="tooltip"
  >
    <slot name="body">
    </slot>
  </span>
  <slot>
  </slot>
</button>

```

#### `Should render with various attributes`

```
<button
  aria-describedby="tooltip-body"
  class="cds--tooltip--a11y cds--tooltip--align-start cds--tooltip--top cds--tooltip__trigger"
>
  <span
    class="cds--assistive-text"
    id="tooltip-body"
    role="tooltip"
  >
    <slot name="body">
      body-text-foo
    </slot>
  </span>
  <slot>
  </slot>
</button>

```
