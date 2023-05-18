# `cds-progress-bar`

## `Rendering`

####   `Should render with minimum attributes`

```
<div class="cds--progress-bar cds--progress-bar--big cds--progress-bar--default">
  <div class="cds--progress-bar__label">
    <span class="cds--progress-bar__label-text">
    </span>
  </div>
  <div
    aria-busy="true"
    aria-invalid="false"
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow="0"
    class="cds--progress-bar__track"
    role="progressbar"
  >
    <div
      class="cds--progress-bar__bar"
      style="transform: scaleX(0);"
    >
    </div>
  </div>
</div>

```

####   `Should render with various attributes`

```
<div class="cds--progress-bar cds--progress-bar--big cds--progress-bar--default">
  <div class="cds--progress-bar__label">
    <span class="cds--progress-bar__label-text">
      Progress Bar label
    </span>
  </div>
  <div
    aria-busy="true"
    aria-invalid="false"
    aria-valuemax="100"
    aria-valuemin="0"
    aria-valuenow="50"
    class="cds--progress-bar__track"
    role="progressbar"
  >
    <div
      class="cds--progress-bar__bar"
      style="transform: scaleX(0.5);"
    >
    </div>
  </div>
  <div class="cds--progress-bar__helper-text">
    Optional helper text
    <div
      aria-live="polite"
      class="cds--visually-hidden"
    >
      Loading
    </div>
  </div>
</div>

```

