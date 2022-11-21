# `bx-copy-button`

## `Rendering`

#### `Should render with minimum attributes`

```
<button
  class="bx--snippet-button"
  title="Copy to clipboard"
  type="button"
>
  <slot>
  </slot>
  <div
    class="bx--btn--copy__feedback"
    data-feedback="Copied!"
  >
  </div>
</button>

```

#### `Should render with various attributes`

```
<button
  class="bx--snippet-button"
  title="button-assistive-text-foo"
  type="button"
>
  <slot>
  </slot>
  <div
    class="bx--btn--copy__feedback"
    data-feedback="feedback-text-foo"
  >
  </div>
</button>

```
