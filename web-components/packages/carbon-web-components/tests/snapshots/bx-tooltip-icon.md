# `bx-tooltip-icon`

## `Rendering`

####   `Should render with minimum attributes`

```
<button
  aria-describedby="tooltip-body"
  class="bx--tooltip--a11y bx--tooltip--align-center bx--tooltip--bottom bx--tooltip__trigger"
>
  <span
    class="bx--assistive-text"
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

####   `Should render with various attributes`

```
<button
  aria-describedby="tooltip-body"
  class="bx--tooltip--a11y bx--tooltip--align-start bx--tooltip--top bx--tooltip__trigger"
>
  <span
    class="bx--assistive-text"
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

