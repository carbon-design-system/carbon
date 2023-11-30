# `cds-slider`

## `Rendering`

####   `Should render with minimum attributes`

```
<label class="cds--label">
  <slot name="label-text">
  </slot>
</label>
<div class="cds--slider-container">
  <span class="cds--slider__range-label">
    <slot name="min-text">
      0
    </slot>
  </span>
  <div
    class="cds--slider"
    role="presentation"
    tabindex="-1"
  >
    <div
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow=""
      class="cds--slider__thumb"
      id="thumb"
      role="slider"
      style="left: NaN%"
      tabindex="0"
    >
    </div>
    <div
      class="cds--slider__track"
      id="track"
    >
    </div>
    <div class="cds-ce--slider__filled-track-container">
      <div
        class="cds--slider__filled-track"
        style="transform: translate(0%, -50%) scaleX(NaN)"
      >
      </div>
    </div>
  </div>
  <span class="cds--slider__range-label">
    <slot name="max-text">
      100
    </slot>
  </span>
  <slot>
  </slot>
</div>

```

####   `Should render with various attributes`

```
<label class="cds--label cds--label--disabled">
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="cds--slider-container">
  <span class="cds--slider__range-label">
    <slot name="min-text">
      0
    </slot>
  </span>
  <div
    class="cds--slider cds--slider--disabled"
    role="presentation"
    tabindex="-1"
  >
    <div
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow="50"
      class="cds--slider__thumb"
      id="thumb"
      role="slider"
      style="left: 50%"
      tabindex="0"
    >
    </div>
    <div
      class="cds--slider__track"
      id="track"
    >
    </div>
    <div class="cds-ce--slider__filled-track-container">
      <div
        class="cds--slider__filled-track"
        style="transform: translate(0%, -50%) scaleX(0.5)"
      >
      </div>
    </div>
  </div>
  <span class="cds--slider__range-label">
    <slot name="max-text">
      100
    </slot>
  </span>
  <slot>
  </slot>
</div>

```

