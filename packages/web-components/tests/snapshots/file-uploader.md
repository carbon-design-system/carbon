# `file-uploader`

## `cds-file-uploader`

##   `Misc attributes`

####     `should render with various attributes`

```
<p class="cds--file--label">
  <slot name="label-title">
  </slot>
</p>
<p class="cds--label-description">
  <slot name="label-description">
  </slot>
</p>
<slot name="drop-container">
</slot>
<div class="cds--file-container">
  <slot>
  </slot>
</div>

```

## `cds-file-uploader-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<p class="cds--file-filename">
  <slot>
  </slot>
</p>
<span class="cds--file__state-container">
  <cds-loading
    assistive-text="Delete this file"
    type="small"
  >
  </cds-loading>
</span>
<div
  class="cds--form-requirement"
  hidden=""
>
  <div class="cds--form-requirement__title">
  </div>
  <p
    class="cds--form-requirement__supplement"
    hidden=""
  >
  </p>
</div>

```

####     `should render with various attributes`

```
<p class="cds--file-filename">
  <slot>
  </slot>
</p>
<span class="cds--file__state-container">
  <cds-loading
    assistive-text="Delete this file"
    type="small"
  >
  </cds-loading>
</span>
<div class="cds--form-requirement">
  <div class="cds--form-requirement__title">
  </div>
  <p
    class="cds--form-requirement__supplement"
    hidden=""
  >
  </p>
</div>

```

####     `should render uploaded state`

```
<p class="cds--file-filename">
  <slot>
  </slot>
</p>
<span class="cds--file__state-container">
</span>
<div
  class="cds--form-requirement"
  hidden=""
>
  <div class="cds--form-requirement__title">
  </div>
  <p
    class="cds--form-requirement__supplement"
    hidden=""
  >
  </p>
</div>

```

####     `should render editing state`

```
<p class="cds--file-filename">
  <slot>
  </slot>
</p>
<span class="cds--file__state-container">
  <button
    aria-label="Delete this file"
    class="cds--file-close"
    type="button"
  >
  </button>
</span>
<div
  class="cds--form-requirement"
  hidden=""
>
  <div class="cds--form-requirement__title">
  </div>
  <p
    class="cds--form-requirement__supplement"
    hidden=""
  >
  </p>
</div>

```

####     `should render editing state with various attributes`

```
<p class="cds--file-filename">
  <slot>
  </slot>
</p>
<span class="cds--file__state-container">
  <button
    aria-label="Delete this file"
    class="cds--file-close"
    type="button"
  >
  </button>
</span>
<div class="cds--form-requirement">
  <div class="cds--form-requirement__title">
  </div>
  <p
    class="cds--form-requirement__supplement"
    hidden=""
  >
  </p>
</div>

```

