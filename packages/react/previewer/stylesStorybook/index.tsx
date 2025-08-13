/**
 * Inline strings for story SCSS (keeps monorepo flow w/o ?raw).
 * We inject these into the StackBlitz virtual project only when needed.
 */
export const FlexGridScssRaw = `@use '@carbon/styles/scss/colors' as *;

// base of project work area
#root > #templates > div:first-child {
  inline-size: 100%;
}

// grid styles
.cds--grid .outside {
  block-size: 100%;
  min-block-size: 80px;
}

.cds--grid .inside {
  block-size: 100%;
  min-block-size: 80px;
}

// hack to enable zoom feature to trigger
.cds--grid--full-width {
  max-inline-size: 100%;
}

.default .cds--col code {
  display: flex;
  justify-content: center;
}

// template hard-coded styles
#templates .inside {
  background-color: $blue-10;
}

#templates .cds--grid [class*='col'] {
  background-color: $blue-20;
  outline: 1px dashed $blue-40;
}

#templates .cds--grid--condensed,
#templates .cds--row--condensed {
  background-color: $warm-gray-100;
  color: $gray-10;
}

#templates .cds--grid--condensed [class*='col'],
#templates .cds--row--condensed [class*='col'] {
  background: none;
  outline: none;
}

#templates .cds--grid--condensed .outside,
#templates .cds--row--condensed .outside {
  background-color: $gray-80;
  outline: none;
}

#templates .cds--grid--condensed .inside,
#templates .cds--row--condensed .inside {
  background: none;
}

#templates .cds--grid--narrow .inside,
#templates .cds--row--narrow .inside {
  background-color: $teal-10;
}

#templates .cds--grid--narrow [class*='col'],
#templates .cds--row--narrow [class*='col'] {
  background-color: $teal-20;
  outline: 1px dashed $teal-40;
}

// css grid
#templates > .cds--css-grid {
  border: 1px dashed #000000;
}

#templates .cds--css-grid [class*='col'] {
  background-color: #edf4ff;
  min-block-size: 80px;
  outline: 1px solid #a6c8ff;
}

#templates .cds--css-grid .cds--subgrid [class*='col'] {
  background-color: rgba(#ffe056, 0.25);
  outline: 1px solid #ffe056;
}
`;

export const GridScssRaw = `@use '@carbon/styles/scss/colors' as *;

// base of project work area
#root > #templates > div:first-child {
  inline-size: 100%;
}

// grid styles
.cds--grid .outside {
  block-size: 100%;
  min-block-size: 80px;
}

.cds--grid .inside {
  block-size: 100%;
  min-block-size: 80px;
}

// hack to enable zoom feature to trigger
.cds--grid--full-width {
  max-inline-size: 100%;
}

.default .cds--col code {
  display: flex;
  justify-content: center;
}

// template hard-coded styles
#templates .inside {
  background-color: $blue-10;
}

#templates .cds--grid [class*='col'] {
  background-color: $blue-20;
  outline: 1px dashed $blue-40;
}

#templates .cds--grid--condensed,
#templates .cds--row--condensed {
  background-color: $warm-gray-100;
  color: $gray-10;
}

#templates .cds--grid--condensed [class*='col'],
#templates .cds--row--condensed [class*='col'] {
  background: none;
  outline: none;
}

#templates .cds--grid--condensed .outside,
#templates .cds--row--condensed .outside {
  background-color: $gray-80;
  outline: none;
}

#templates .cds--grid--condensed .inside,
#templates .cds--row--condensed .inside {
  background: none;
}

#templates .cds--grid--narrow .inside,
#templates .cds--row--narrow .inside {
  background-color: $teal-10;
}

#templates .cds--grid--narrow [class*='col'],
#templates .cds--row--narrow [class*='col'] {
  background-color: $teal-20;
  outline: 1px dashed $teal-40;
}

// css grid
#templates > .cds--css-grid {
  border: 1px dashed #000000;
}

#templates .cds--css-grid [class*='col'] {
  background-color: #edf4ff;
  min-block-size: 80px;
  outline: 1px solid #a6c8ff;
}

#templates .cds--css-grid .cds--subgrid [class*='col'] {
  background-color: rgba(#ffe056, 0.25);
  outline: 1px solid #ffe056;
}
`;

export const HideAtBreakpointScssRaw = `@use '@carbon/styles/scss/utilities/hide-at-breakpoint' as *;

.hide-at-sm {
  padding: 2rem 1rem;
  background: #8a3ffc;
  @include hide-at-sm;
}

.hide-at-md {
  padding: 2rem 1rem;
  background: #4589ff;
  @include hide-at-md;
}

.hide-at-lg {
  padding: 2rem 1rem;
  background: #42be65;
  @include hide-at-lg;
}

.hide-at-xlg {
  padding: 2rem 1rem;
  background: #f1c21b;
  @include hide-at-xlg;
}

.hide-at-max {
  padding: 2rem 1rem;
  background: #da1e28;
  @include hide-at-max;
}
`;

export const LayerScssRaw = `@use '@carbon/styles/scss/theme';

.example-layer-test-component {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.example-layer-test-component-no-background {
  padding: 1rem;
  color: theme.$text-primary;
}
`;

export const ThemeScssRaw = `@use '@carbon/styles/scss/themes';
@use '@carbon/styles/scss/theme';

.theme-section {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-example {
  padding: 1rem;
  background: theme.$background;
  color: theme.$text-primary;
}

.theme-layer-header {
  margin-block-end: 1rem;
}

.theme-with-layer {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.carbon-storybook-template--annotation--background {
  margin: 0 !important; /* stylelint-disable-line declaration-no-important */
  min-block-size: 0 !important; /* stylelint-disable-line declaration-no-important */
}
`;
