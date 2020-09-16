# layout rule notes

## Package @carbon/layout

Files

- scss/index, scss/layout
  - \_convert
    - \$carbon--base-font-size
    - carbon-rem function
    - carbon-em function
  - \_breakpoint
    - \$carbon-grid-gutter
    - \$carbon-grid-gutter--condensed
    - carbon--grid-breakpoints map(sm, md, lg, xlg, max)
    - carbon--breakpoint-next function
    - carbon--breakpoint-prev function
    - carbon--is-smallest-breakpoint
    - carbon--largest-breakpoint-name
    - carbon--breakpoint-infix
    - carbon--breakpoint-up
    - carbon--breakpoint-down
    - carbon--breakpoint-between
    - carbon--largest-breakpoint
    - carbon--breakpoint
  - \_mini-unit
    - \$carbon--mini-unit-size
    - carbon--mini-units
  - \_spacing
    - generated from src/tokens.js spacing01 =>
      $spacing-01 & $carbon--spacing-01
- src/index.js exports
  - unstable tokens
  - baseFontSize
  - rem function
  - em function
  - px function
  - breakpoints (sm, md, lg, xlg, max)
  - breakpointUp
  - breakpointDown
  - miniUnits
  - ** tokens listed in unstable tokens **

## Linter should check for

- carbon breakpoint use
- carbon spacing tokens
- carbon-rem function ?
- carbon-em function ?
- carbon--mini-units
