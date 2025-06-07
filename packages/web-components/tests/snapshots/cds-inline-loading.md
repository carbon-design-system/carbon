# `cds-inline-loading`

## `Misc attributes`

#### `should render with minimum attributes`

```
<div class="cds--inline-loading__animation">
  <div class="cds--loading cds--loading--small">
  </div>
</div>
<p class="cds--inline-loading__text">
  <slot>
  </slot>
</p>

```

#### `should render with unknown status`

```
<p class="cds--inline-loading__text">
  <slot>
  </slot>
</p>

```

#### `should render with inactive status`

```
<div class="cds--inline-loading__animation">
  <div class="cds--loading cds--loading--small cds--loading--stop">
  </div>
</div>
<p class="cds--inline-loading__text">
  <slot>
  </slot>
</p>

```

#### `should render with finished status`

```
<div class="cds--inline-loading__animation">
</div>
<p class="cds--inline-loading__text">
  <slot>
  </slot>
</p>

```

#### `should render with error status`

```
<div class="cds--inline-loading__animation">
</div>
<p class="cds--inline-loading__text">
  <slot>
  </slot>
</p>

```
