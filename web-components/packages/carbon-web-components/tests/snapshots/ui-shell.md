# `ui-shell`

## `cds-header-menu-button`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-label="Open navigation menu"
  class="cds--header__action cds--header__menu-toggle cds--header__menu-trigger"
  part="button"
>
</button>

```

####     `should render with various attributes for inactive state`

```
<button
  aria-label="button-label-inactive"
  class="cds--header__action cds--header__menu-toggle cds--header__menu-trigger"
  disabled=""
  part="button"
>
</button>

```

####     `should render with various attributes for active state`

```
<button
  aria-label="button-label-active"
  class="cds--header__action cds--header__action--active cds--header__menu-toggle cds--header__menu-trigger"
  disabled=""
  part="button"
>
</button>

```

## `cds-header-menu`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  aria-expanded="false"
  aria-haspopup="menu"
  class="cds--header__menu-item cds--header__menu-title"
  href="javascript:void 0"
  part="trigger"
  tabindex="0"
>
</a>
<ul
  class="cds--header__menu"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<a
  aria-expanded="true"
  aria-haspopup="menu"
  class="cds--header__menu-item cds--header__menu-title"
  href="javascript:void 0"
  part="trigger"
  tabindex="0"
>
  trigger-content-foo
</a>
<ul
  aria-label="menu-label-foo"
  class="cds--header__menu"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

## `cds-header-name`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="cds--header__name"
  part="link"
>
  <slot>
  </slot>
</a>

```

####     `should render with various attributes`

```
<a
  class="cds--header__name"
  href="about:blank"
  part="link"
>
  <span
    class="cds--header__name--prefix"
    part="prefix"
  >
    prefix-foo
  </span>
  <slot>
  </slot>
</a>

```

## `cds-header-nav`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<div
  class="cds-ce--header__divider"
  part="divider"
>
</div>
<ul
  aria-label=""
  class="cds--header__menu-bar"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<div
  class="cds-ce--header__divider"
  part="divider"
>
</div>
<ul
  aria-label="menu-bar-label-foo"
  class="cds--header__menu-bar"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

## `cds-header-nav-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="cds--header__menu-item"
  part="link"
  tabindex="0"
>
  <span
    class="cds--text-truncate--end"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="cds--header__menu-item"
  href="about:blank"
  part="link"
  tabindex="0"
>
  <span
    class="cds--text-truncate--end"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

## `cds-side-nav-link`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="cds--side-nav__link"
  href=""
  part="link"
>
  <div
    class="cds--side-nav__icon"
    hidden=""
    id="title-icon-container"
    part="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span
    class="cds--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="cds--side-nav__link cds--side-nav__link--current"
  href="about:blank"
  part="link"
>
  <div
    class="cds--side-nav__icon"
    id="title-icon-container"
    part="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span
    class="cds--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

## `cds-side-nav-menu`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<button
  aria-expanded="false"
  aria-haspopup="true"
  class="cds--side-nav__submenu"
  part="expando"
  type="button"
>
  <div
    class="cds--side-nav__icon"
    hidden=""
    id="title-icon-container"
    part="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span
    class="cds--side-nav__submenu-title"
    part="title"
  >
  </span>
  <div
    class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
    part="expando-icon-container"
  >
  </div>
</button>
<ul
  class="cds--side-nav__menu"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

####     `should render with various attributes`

```
<button
  aria-expanded="true"
  aria-haspopup="true"
  class="cds--side-nav__submenu"
  part="expando"
  type="button"
>
  <div
    class="cds--side-nav__icon"
    hidden=""
    id="title-icon-container"
    part="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span
    class="cds--side-nav__submenu-title"
    part="title"
  >
    title-foo
  </span>
  <div
    class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
    part="expando-icon-container"
  >
  </div>
</button>
<ul
  class="cds--side-nav__menu"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

####     `should support collapsing side nav menu upon parent side nav is collapsed as rail`

```
<button
  aria-expanded="false"
  aria-haspopup="true"
  class="cds--side-nav__submenu"
  part="expando"
  type="button"
>
  <div
    class="cds--side-nav__icon"
    hidden=""
    id="title-icon-container"
    part="title-icon-container"
  >
    <slot name="title-icon">
    </slot>
  </div>
  <span
    class="cds--side-nav__submenu-title"
    part="title"
  >
  </span>
  <div
    class="cds--side-nav__icon cds--side-nav__icon--small cds--side-nav__submenu-chevron"
    part="expando-icon-container"
  >
  </div>
</button>
<ul
  class="cds--side-nav__menu"
  part="menu-body"
>
  <slot>
  </slot>
</ul>

```

## `cds-side-nav-menu-item`

##   `Misc attributes`

####     `should render with minimum attributes`

```
<a
  class="cds--side-nav__link"
  href=""
  part="link"
>
  <span
    class="cds--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

####     `should render with various attributes`

```
<a
  class="cds--side-nav__link cds--side-nav__link--current"
  href="about:blank"
  part="link"
>
  <span
    class="cds--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>

```

## `Misc attributes`

####   `should render with minimum attributes`

```
<a
  class="bx--side-nav__link"
  href=""
  part="link"
>
  <span
    class="bx--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>
```

####   `should render with various attributes`

```
<a
  class="bx--side-nav__link bx--side-nav__link--current"
  href="about:blank"
  part="link"
>
  <span
    class="bx--side-nav__link-text"
    part="title"
  >
    <slot>
    </slot>
  </span>
</a>
```

