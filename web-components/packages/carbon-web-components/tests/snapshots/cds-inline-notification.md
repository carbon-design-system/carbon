# `cds-inline-notification`

## `Rendering titles`

####   `Should render with minimum attributes`

```
<div class="cds--inline-notification__details">
  <div class="cds--inline-notification__text-wrapper">
    <p class="cds--inline-notification__title">
      <slot name="title">
      </slot>
    </p>
    <div class="cds--inline-notification__subtitle">
      <slot name="subtitle">
      </slot>
    </div>
    <slot>
    </slot>
  </div>
</div>
<button
  class="cds--inline-notification__close-button"
  type="button"
>
</button>

```

####   `Should render with various attributes`

```
<div class="cds--inline-notification__details">
  <div class="cds--inline-notification__text-wrapper">
    <p class="cds--inline-notification__title">
      title-foo
      <slot name="title">
      </slot>
    </p>
    <div class="cds--inline-notification__subtitle">
      subtitle-foo
      <slot name="subtitle">
      </slot>
    </div>
    <slot>
    </slot>
  </div>
</div>
<button
  aria-label="close-button-label-foo"
  class="cds--inline-notification__close-button"
  title="close-button-label-foo"
  type="button"
>
</button>

```

