# Stylelint best practices for web components

`@carbon/web-components` uses an additional stylelint rule to keep shadow-DOM
styling patterns consistent and prevent regressions from known pitfalls.

## Rules

### Prefer `:dir(rtl)` over `[dir=rtl]`

- Use `:dir(rtl)` when writing RTL direction selectors
- Avoid `[dir=rtl]` because attribute selectors do not cross shadow boundaries

Example:

```scss
// Good
:host(cds-button:dir(rtl)) { ... }

// Avoid
:host(cds-button[dir=rtl]) { ... }
```

### Shared custom properties need host/custom-element boundaries

Shared CSS custom properties (currently prefixes `--cds-` and `--tabs-`) should
be declared on:

- `:host(...)`, or
- a child custom-element selector (including `::slotted(...)` selectors that
  target a custom element)

This keeps shared tokens available across component boundaries and avoids
leaking boundary-sensitive contract values into implementation-only class
selectors.

Example:

```scss
// Good
:host(cds-page-header) ::slotted(cds-tabs) {
  --tabs-overflow-button-background: #262626;
}

// Avoid
.#{$prefix}--page-header-tabs {
  --tabs-overflow-button-background: #262626;
}
```
