# `bx-slider`

## `Rendering`

####   `Should render with minimum attributes`

```
<label class="bx--label">
  <slot name="label-text">
  </slot>
</label>
<div class="bx--slider-container">
  <span class="bx--slider__range-label">
    <slot name="min-text">
      0
    </slot>
  </span>
  <div
    class="bx--slider"
    role="presentation"
  >
    <div
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow="50"
      class="bx--slider__thumb"
      id="thumb"
      role="slider"
      style="left: 50%"
      tabindex="0"
    >
    </div>
    <div
      class="bx--slider__track"
      id="track"
    >
    </div>
    <div class="bx-ce--slider__filled-track-container">
      <div
        class="bx--slider__filled-track"
        style="transform: translate(0%, -50%) scaleX(0.5)"
      >
      </div>
    </div>
    <input
      class="bx--slider__input"
      max="100"
      min="0"
      type="hidden"
      value="50"
    >
  </div>
  <span class="bx--slider__range-label">
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
<label class="bx--label bx--label--disabled">
  <slot name="label-text">
    label-text-foo
  </slot>
</label>
<div class="bx--slider-container">
  <span class="bx--slider__range-label">
    <slot name="min-text">
      0
    </slot>
  </span>
  <div
    class="bx--slider bx--slider--disabled"
    role="presentation"
  >
    <div
      aria-valuemax="100"
      aria-valuemin="0"
      aria-valuenow="50"
      class="bx--slider__thumb"
      id="thumb"
      role="slider"
      style="left: 50%"
      tabindex="0"
    >
    </div>
    <div
      class="bx--slider__track"
      id="track"
    >
    </div>
    <div class="bx-ce--slider__filled-track-container">
      <div
        class="bx--slider__filled-track"
        style="transform: translate(0%, -50%) scaleX(0.5)"
      >
      </div>
    </div>
    <input
      class="bx--slider__input"
      max="100"
      min="0"
      name="name-foo"
      type="hidden"
      value="50"
    >
  </div>
  <span class="bx--slider__range-label">
    <slot name="max-text">
      100
    </slot>
  </span>
  <slot>
  </slot>
</div>

```

