# `file-uploader`

## `bx-file-uploader`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<strong class="bx--file--label">
  <slot name="label-text">
  </slot>
</strong>
<p class="bx--label-description">
  <slot name="helperText-text">
  </slot>
</p>
<slot name="drop-container">
</slot>
<div class="bx--file-container">
  <slot>
  </slot>
</div>

```

####     `should render with various attributes`

```
<strong class="bx--file--label">
  <slot name="label-text">
    label-text-foo
  </slot>
</strong>
<p class="bx--label-description">
  <slot name="helperText-text">
    helper-text-foo
  </slot>
</p>
<slot name="drop-container">
</slot>
<div class="bx--file-container">
  <slot>
  </slot>
</div>

```

## `bx-file-drop-container`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<label
  class="bx--file-browse-btn"
  for="file"
  tabindex="0"
>
  <div
    class="bx--file__drop-container"
    role="button"
  >
    <slot>
    </slot>
    <input
      class="bx--file-input"
      id="file"
      tabindex="-1"
      type="file"
    >
  </div>
</label>

```

####     `should render with various attributes`

```
<label
  class="bx--file-browse-btn bx--file-browse-btn--disabled"
  for="file"
  tabindex="0"
>
  <div
    class="bx--file__drop-container"
    role="button"
  >
    <slot>
    </slot>
    <input
      accept="image/png"
      class="bx--file-input"
      disabled=""
      id="file"
      multiple=""
      tabindex="-1"
      type="file"
    >
  </div>
</label>

```

##   `Handling events`

####     `Should handle drag-over`

```
<label
  class="bx--file-browse-btn"
  for="file"
  tabindex="0"
>
  <div
    class="bx--file__drop-container bx--file__drop-container--drag-over"
    role="button"
  >
    <slot>
    </slot>
    <input
      accept="image/png"
      class="bx--file-input"
      id="file"
      tabindex="-1"
      type="file"
    >
  </div>
</label>

```

## `bx-file-uploader-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<p class="bx--file-filename">
  <slot>
  </slot>
</p>
<span class="bx--file__state-container">
  <bx-loading
    assistive-text="Uploading"
    type="small"
  >
  </bx-loading>
</span>
<div class="bx--form-requirement">
  <div class="bx--form-requirement__title">
    <slot name="validity-message">
    </slot>
  </div>
  <p class="bx--form-requirement__supplement">
    <slot name="validity-message-supplement">
    </slot>
  </p>
</div>

```

####     `should render with various attributes`

```
<p class="bx--file-filename">
  <slot>
  </slot>
</p>
<span class="bx--file__state-container">
  <bx-loading
    assistive-text="uploading-assistive-text-foo"
    type="small"
  >
  </bx-loading>
</span>
<div class="bx--form-requirement">
  <div class="bx--form-requirement__title">
    <slot name="validity-message">
      validity-message-foo
    </slot>
  </div>
  <p class="bx--form-requirement__supplement">
    <slot name="validity-message-supplement">
    </slot>
  </p>
</div>

```

####     `should render uploaded state`

```
<p class="bx--file-filename">
  <slot>
  </slot>
</p>
<span class="bx--file__state-container">
</span>
<div class="bx--form-requirement">
  <div class="bx--form-requirement__title">
    <slot name="validity-message">
    </slot>
  </div>
  <p class="bx--form-requirement__supplement">
    <slot name="validity-message-supplement">
    </slot>
  </p>
</div>

```

####     `should render editing state`

```
<p class="bx--file-filename">
  <slot>
  </slot>
</p>
<span class="bx--file__state-container">
  <button
    aria-label="Delete this file"
    class="bx--file-close"
    type="button"
  >
  </button>
</span>
<div class="bx--form-requirement">
  <div class="bx--form-requirement__title">
    <slot name="validity-message">
    </slot>
  </div>
  <p class="bx--form-requirement__supplement">
    <slot name="validity-message-supplement">
    </slot>
  </p>
</div>

```

####     `should render editing state with various attributes`

```
<p class="bx--file-filename">
  <slot>
  </slot>
</p>
<span class="bx--file__state-container">
  <button
    aria-label="delete-assistive-text-foo"
    class="bx--file-close"
    type="button"
  >
  </button>
</span>
<div class="bx--form-requirement">
  <div class="bx--form-requirement__title">
    <slot name="validity-message">
      validity-message-foo
    </slot>
  </div>
  <p class="bx--form-requirement__supplement">
    <slot name="validity-message-supplement">
    </slot>
  </p>
</div>

```

## `bx-file-uploader-shell`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<strong class="bx--file--label">
  <slot name="label-text">
  </slot>
</strong>
<p class="bx--label-description">
  <slot name="helperText-text">
  </slot>
</p>
<slot name="drop-container">
</slot>
<div class="bx--file-container">
  <slot>
  </slot>
</div>
```

####     `should render with various attributes`

```
<strong class="bx--file--label">
  <slot name="label-text">
    label-text-foo
  </slot>
</strong>
<p class="bx--label-description">
  <slot name="helperText-text">
    helper-text-foo
  </slot>
</p>
<slot name="drop-container">
</slot>
<div class="bx--file-container">
  <slot>
  </slot>
</div>
```

