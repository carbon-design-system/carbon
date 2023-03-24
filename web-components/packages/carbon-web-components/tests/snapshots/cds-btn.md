# `cds-btn`

## `Misc attributes`

####   `should render with minimum attributes for <button>`

```
<button
  class="cds--btn cds--btn--lg cds--btn--primary"
  id="button"
  part="button"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</button>

```

####   `should render with various attributes for <button>`

```
<button
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

####   `should render with minimum attributes for <a>`

```
<a
  class="cds--btn cds--btn--lg cds--btn--primary"
  href="about:blank"
  id="button"
  part="button"
  role="button"
  type="button"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</a>

```

####   `should render with various attributes for <a>`

```
<a
  class="cds--btn cds--btn--secondary cds--btn--sm"
  href="about:blank"
  id="button"
  part="button"
  role="button"
  type="text/plain"
>
  <slot>
  </slot>
  <slot name="icon">
  </slot>
</a>

```

####   `should render disabled state for <a>`

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

