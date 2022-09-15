# `bx-inline-loading`

## `Misc attributes`

####   `should render with minimum attributes`

```
<div class="bx--inline-loading__animation">
  <div class="bx--loading bx--loading--small">
  </div>
</div>
<p class="bx--inline-loading__text">
  <slot>
  </slot>
</p>

```

####   `should render with unknown status`

```
<p class="bx--inline-loading__text">
  <slot>
  </slot>
</p>

```

####   `should render with inactive status`

```
<div class="bx--inline-loading__animation">
  <div class="bx--loading bx--loading--small bx--loading--stop">
  </div>
</div>
<p class="bx--inline-loading__text">
  <slot>
  </slot>
</p>

```

####   `should render with finished status`

```
<div class="bx--inline-loading__animation">
</div>
<p class="bx--inline-loading__text">
  <slot>
  </slot>
</p>

```

####   `should render with error status`

```
<div class="bx--inline-loading__animation">
</div>
<p class="bx--inline-loading__text">
  <slot>
  </slot>
</p>

```

