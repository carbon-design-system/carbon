# `cds-link`

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="cds--link cds--link--md"
  href="about:blank"
  id="link"
  part="link"
  tabindex="0"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>

```

####   `should render with various attributes`

```
<a
  class="cds--link cds--link--md"
  download="file-name-foo"
  href="about:blank"
  hreflang="en"
  id="link"
  part="link"
  ping="about:blank"
  rel="noopener"
  role="button"
  tabindex="0"
  target="_blank"
  type="text/plain"
>
  <slot>
  </slot>
  <div
    class="cds--link__icon"
    hidden=""
  >
    <slot name="icon">
    </slot>
  </div>
</a>

```

####   `should render disabled state`

```
<p
  class="cds--link cds--link--disabled cds--link--md"
  id="link"
  part="link"
>
  <slot>
  </slot>
</p>
<div
  class="cds--link__icon"
  hidden=""
>
  <slot name="icon">
  </slot>
</div>
<p>
</p>

```

