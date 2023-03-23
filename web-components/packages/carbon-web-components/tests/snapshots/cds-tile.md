# `cds-tile`

## `cds-clickable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="cds--link cds--tile cds--tile--clickable"
  id="link"
  part="link"
  role="button"
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

####     `should render with various attributes`

```
<a
  class="cds--link cds--tile cds--tile--clickable"
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

####     `should render disabled state`

```
<a
  class="cds--link cds--tile cds--tile--clickable"
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

## `cds-expandable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-controls="below-the-fold-content"
  aria-expanded="false"
  aria-labelledby="above-the-fold-content"
  class="cds--tile__chevron"
>
</button>
<div
  class="cds--tile-content"
  id="content"
>
  <div>
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div class="cds-ce--expandable-tile--below-the-fold-content">
    <slot>
    </slot>
  </div>
</div>

```

####     `should render with various attributes`

```
<button
  aria-controls="below-the-fold-content"
  aria-expanded="true"
  aria-labelledby="above-the-fold-content"
  class="cds--tile__chevron"
>
</button>
<div
  class="cds--tile-content"
  id="content"
>
  <div>
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div
    class="cds-ce--expandable-tile--below-the-fold-content"
    style="max-height: 0px"
  >
    <slot>
    </slot>
  </div>
</div>

```

## `cds-selectable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<input
  class="cds--tile-input"
  id="input"
  tabindex="-1"
  type="checkbox"
>
<label
  class="cds--tile cds--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="cds--tile__checkmark cds--tile__checkmark--persistent">
  </div>
  <div class="cds--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

####     `should render with various attributes`

```
<input
  class="cds--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="checkbox"
  value="value-foo"
>
<label
  class="cds--tile cds--tile--is-selected cds--tile--light cds--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="cds--tile__checkmark cds--tile__checkmark--persistent">
  </div>
  <div class="cds--tile-content">
    <slot>
    </slot>
  </div>
</label>

```

## `cds-radio-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<input
  class="cds--tile-input"
  id="input"
  tabindex="-1"
  type="radio"
>
<label
  class="cds--tile cds--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="cds--tile__checkmark">
  </div>
  <div class="cds--tile-content">
    <slot>
    </slot>
  </div>
</label>
```

####     `should render with various attributes`

```
<input
  class="cds--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="radio"
  value="value-foo"
>
<label
  class="cds--tile cds--tile--light cds--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="cds--tile__checkmark">
  </div>
  <div class="cds--tile-content">
    <slot>
    </slot>
  </div>
</label>
```

## `Misc attributes`

####   `should render with minimum attributes`

```
<input
  class="bx--tile-input"
  id="input"
  tabindex="-1"
  type="checkbox"
>
<label
  class="bx--tile bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>
```

####   `should render with various attributes`

```
<input
  class="bx--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="checkbox"
  value="value-foo"
>
<label
  class="bx--tile bx--tile--light bx--tile--selectable"
  for="input"
  tabindex="0"
>
  <div class="bx--tile__checkmark">
  </div>
  <div class="bx--tile-content">
    <slot>
    </slot>
  </div>
</label>
```

