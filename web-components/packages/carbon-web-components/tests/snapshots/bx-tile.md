# `bx-tile`

## `bx-clickable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="bx--link bx--tile bx--tile--clickable"
  id="link"
  part="link"
  role="button"
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

####     `should render with various attributes`

```
<a
  class="bx--link bx--tile bx--tile--clickable bx--tile--light"
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

####     `should render disabled state`

```
<p
  class="bx--link bx--link--disabled bx--tile bx--tile--clickable bx--tile--light"
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

## `bx-expandable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-controls="below-the-fold-content"
  aria-expanded="false"
  aria-labelledby="above-the-fold-content"
  class="bx--tile__chevron"
>
</button>
<div
  class="bx--tile-content"
  id="content"
>
  <div>
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div class="bx-ce--expandable-tile--below-the-fold-content">
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
  class="bx--tile__chevron"
>
</button>
<div
  class="bx--tile-content"
  id="content"
>
  <div>
    <slot name="above-the-fold-content">
    </slot>
  </div>
  <div
    class="bx-ce--expandable-tile--below-the-fold-content"
    style="max-height: 0px"
  >
    <slot>
    </slot>
  </div>
</div>

```

## `bx-radio-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<input
  class="bx--tile-input"
  id="input"
  tabindex="-1"
  type="radio"
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

####     `should render with various attributes`

```
<input
  class="bx--tile-input"
  id="input"
  name="name-foo"
  tabindex="-1"
  type="radio"
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

## `bx-selectable-tile`

##   `Misc attributes`

####     `should render with minimum attributes`

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

####     `should render with various attributes`

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

