# `cds-tooltip-definition`

## `Rendering`

#### `Should render with minimum attributes`

```
<button
  aria-describedby="tooltip-body"
  class="cds--tooltip--a11y cds--tooltip--align-center cds--tooltip--bottom cds--tooltip__trigger cds--tooltip__trigger--definition"
>
  <slot>
  </slot>
</button>
<div
  class="cds--assistive-text"
  id="tooltip-body"
  role="tooltip"
>
  <slot name="body">
  </slot>
</div>

```

#### `Should render with various attributes`

```
<button
  aria-describedby="tooltip-body"
  class="cds--tooltip--a11y cds--tooltip--align-start cds--tooltip--top cds--tooltip__trigger cds--tooltip__trigger--definition"
>
  <slot>
  </slot>
</button>
<div
  class="cds--assistive-text"
  id="tooltip-body"
  role="tooltip"
>
  <slot name="body">
    body-text-foo
  </slot>
</div>

```
