# `cds-btn`

## `Misc attributes`

#### `should render with minimum attributes for <button>`

```
<button
  class="cds--btn cds--btn--primary"
  id="button"
  part="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>

```

#### `should render with various attributes for <button>`

```
<button
  autofocus=""
  class="cds--btn cds--btn--disabled cds--btn--secondary cds--btn--sm"
  disabled=""
  id="button"
  part="button"
  type="submit"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>

```

#### `should render with minimum attributes for <a>`

```
<a
  class="cds--btn cds--btn--primary"
  href="about:blank"
  id="button"
  part="button"
  role="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</a>

```

#### `should render with various attributes for <a>`

```
<a
  class="cds--btn cds--btn--secondary cds--btn--sm"
  download="file-name-foo"
  href="about:blank"
  hreflang="en"
  id="button"
  part="button"
  ping="about:blank"
  rel="noopener"
  role="link"
  target="_blank"
  type="text/plain"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</a>

```

#### `should render disabled state for <a>`

```
<p
  class="cds--btn cds--btn--disabled cds--btn--secondary cds--btn--sm"
  id="button"
  part="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</p>

```
