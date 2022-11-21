# `bx-link`

## `Misc attributes`

#### `should render with minimum attributes`

```
<a
  class="bx--link"
  href="about:blank"
  id="link"
  part="link"
>
  <slot>
  </slot>
  <div
    class="bx--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>

```

#### `should render with various attributes`

```
<a
  class="bx--link"
  download="file-name-foo"
  href="about:blank"
  hreflang="en"
  id="link"
  part="link"
  ping="about:blank"
  rel="noopener"
  role="button"
  target="_blank"
  type="text/plain"
>
  <slot>
  </slot>
  <div
    class="bx--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>

```

#### `should render disabled state`

```
<p
  class="bx--link bx--link--disabled"
  id="link"
  part="link"
>
  <slot>
  </slot>
</p>
<div
  class="bx--link__icon"
  hidden=""
>
  <slot name="icon">
  </slot>
</div>
<p>
</p>

```
