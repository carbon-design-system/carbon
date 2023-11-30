# `cds-copy-button`

## `Rendering`

####   `Should render with minimum attributes`

```
<cds-copy
  feedback="Copied!"
  feedback-timeout="2000"
>
  <span slot="tooltip-content">
    <slot>
    </slot>
  </span>
</cds-copy>

```

####   `Should render with various attributes`

```
<cds-copy
  feedback="feedback-text-foo"
  feedback-timeout="16"
>
  <span slot="tooltip-content">
    <slot>
    </slot>
  </span>
</cds-copy>

```

